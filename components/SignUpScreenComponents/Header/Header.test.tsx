import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import { fireEvent, render, waitFor } from "../../../test-utils";
import Header from "./Header.Component";

// Mock the useNavigation hook
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: jest.fn(),
    }),
  };
});

// Mock the font loading
jest.mock("@expo-google-fonts/poppins", () => ({
  Poppins_500Medium: "Poppins_500Medium",
  useFonts: jest.fn().mockReturnValue([true, null]),
}));

describe("Header", () => {
  it("should navigate to previous page when back button is pressed", async () => {
    const mockGoBack = jest.fn();
    const navigation = {
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: mockGoBack,
    };

    const { findByTestId } = render(<Header navigation={navigation} />);
    const iconWrapper = await findByTestId("IconWrapper");
    fireEvent.press(iconWrapper);

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it("should render and header component with title and back button", async () => {
    const navigation = {
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: jest.fn(),
    };

    const { findByTestId } = render(<Header navigation={navigation} />);

    expect(await findByTestId("HeaderComponent")).toBeTruthy();
    expect(await findByTestId("IconWrapper")).toBeTruthy();
    expect(await findByTestId("PageTitle")).toBeTruthy();
    expect(await findByTestId("PlaceholderView")).toBeTruthy();
  });

  it("should return empty fragment when font is not loaded", async () => {
    const navigation = {
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: jest.fn(),
    };

    // Override the useFonts mock for this test
    jest
      .spyOn(require("@expo-google-fonts/poppins"), "useFonts")
      .mockImplementation(() => [false, "error"]);

    const { queryByTestId } = render(<Header navigation={navigation} />);

    // When font is not loaded, the component returns an empty fragment
    // So none of the testID elements should be present
    expect(queryByTestId("HeaderComponent")).toBeNull();
    expect(queryByTestId("IconWrapper")).toBeNull();
    expect(queryByTestId("PageTitle")).toBeNull();
    expect(queryByTestId("PlaceholderView")).toBeNull();
  });

  it("should not render back button when navigation can't go back", async () => {
    const navigation = {
      canGoBack: jest.fn().mockReturnValue(false),
      goBack: jest.fn(),
    };

    const { queryByTestId } = render(<Header navigation={navigation} />);

    // queryByTestId returns null if element not found
    expect(queryByTestId("IconWrapper")).toBeNull();
  });

  it("should not render back button when navigation is undefined", async () => {
    const navigation = undefined;

    const { queryByTestId } = render(<Header navigation={navigation} />);

    // queryByTestId returns null if element not found
    expect(queryByTestId("IconWrapper")).toBeNull();
  });
});
