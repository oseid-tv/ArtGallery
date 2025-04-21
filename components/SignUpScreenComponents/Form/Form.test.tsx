import { fireEvent, render, waitFor } from "../../../test-utils";
import Form from "./Form.component";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useSignUp } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { isLoaded } from "expo-font";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.Alert.alert = jest.fn();
  return rn;
});

jest.mock("firebase/firestore", () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn(),
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("@clerk/clerk-expo", () => ({
  useSignUp: jest.fn(),
  setActive: jest.fn(),
}));

describe("Form Component", () => {
  it("should display and error message when email address is in an invalid format", async () => {
    (useSignUp as jest.Mock).mockImplementation(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(),
      },
    }));

    const { findByTestId, getByTestId } = render(<Form />);

    const emailInput = await findByTestId("emailInput");
    fireEvent.changeText(emailInput, "invalidEmail");

    const checkbox = await findByTestId("checkbox");
    fireEvent.press(checkbox);

    const createAccountBtn = await findByTestId("createAccountBtn");
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(getByTestId("emailInputError")).toBeTruthy();
    });
  });

  it("should display and error message when full name is invalid characters or is too long/short", async () => {
    (useSignUp as jest.Mock).mockImplementation(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(),
      },
    }));

    const { findByTestId, getByTestId } = render(<Form />);

    const fullnameInput = await findByTestId("fullnameInput");
    fireEvent.changeText(fullnameInput, "1234%%%%%1234");

    const checkbox = await findByTestId("checkbox");
    fireEvent.press(checkbox);

    const createAccountBtn = await findByTestId("createAccountBtn");
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(getByTestId("fullnameInputError")).toBeTruthy();
    });
  });

  it("should display an error message when password is too short", async () => {
    (useSignUp as jest.Mock).mockImplementation(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(),
      },
    }));

    const { findByTestId, getByTestId } = render(<Form />);

    const passwordInput = await findByTestId("passwordInput");
    fireEvent.changeText(passwordInput, "1234567");

    const checkbox = await findByTestId("checkbox");
    fireEvent.press(checkbox);

    const createAccountBtn = await findByTestId("createAccountBtn");
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(getByTestId("passwordInputError")).toBeTruthy();
    });
  });

  it("should sign up and redirect to profile page when all fields are filled and privacy policy is agreed", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(
      mockDispatch as unknown as AppDispatch
    );

    const mockSignUp = {
      isLoaded: true,
      signUp: {
        create: jest.fn(),
        prepareEmailAddressVerification: jest.fn(),
        attemptEmailAddressVerification: jest.fn().mockReturnValue(true),
      },
      setActive: jest.fn(),
    };

    (useSignUp as jest.Mock).mockReturnValue(mockSignUp);

    const { findByTestId } = render(<Form />);

    const emailInput = await findByTestId("emailInput");
    const fullnameInput = await findByTestId("fullnameInput");
    const passwordInput = await findByTestId("passwordInput");
    const checkbox = await findByTestId("checkbox");
    const createAccountBtn = await findByTestId("createAccountBtn");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(fullnameInput, "John Doe");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(checkbox);
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(mockSignUp.signUp.create).toHaveBeenCalledWith({
        emailAddress: "test@test.com",
        password: "password123",
      });
    });

    await waitFor(async () => {
      expect(await findByTestId("verifyBtn")).toBeTruthy();
    });

    const verifyBtn = await findByTestId("verifyBtn");
    fireEvent.press(verifyBtn);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("profile");
    });
  });

  it("should display an error message when there is an error in the sign up process", async () => {
    (useSignUp as jest.Mock).mockImplementation(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(() => Promise.reject(new Error("Sign up failed"))),
      },
    }));

    const { getByText, findByTestId } = render(<Form />);

    const emailInput = await findByTestId("emailInput");
    const fullnameInput = await findByTestId("fullnameInput");
    const passwordInput = await findByTestId("passwordInput");
    const checkbox = await findByTestId("checkbox");
    const createAccountBtn = await findByTestId("createAccountBtn");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(fullnameInput, "John Doe");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(checkbox);
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error occured, try again");
    });
  });

  it("should display an alert message when privacy policy is not agreed", async () => {
    (useSignUp as jest.Mock).mockImplementation(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(() => Promise.reject(new Error("Sign up failed"))),
      },
    }));

    const { getByText, findByTestId } = render(<Form />);

    const emailInput = await findByTestId("emailInput");
    const fullnameInput = await findByTestId("fullnameInput");
    const passwordInput = await findByTestId("passwordInput");
    const createAccountBtn = await findByTestId("createAccountBtn");

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(fullnameInput, "John Doe");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(createAccountBtn);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "You must agree to privacy policy"
      );
    });
  });
});
