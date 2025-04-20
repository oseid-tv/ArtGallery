import { render, fireEvent } from "@testing-library/react-native";
import LogInLink from "./LogInLink.Component";

describe("LogInLink", () => {
  it("should render a component with a 'Log In'link and a 'Already have an account' text", async () => {
    const { findByText } = render(<LogInLink navigation={undefined} />);
    expect(await findByText("Already have an account?")).toBeTruthy();
    expect(await findByText("Log In")).toBeTruthy();
  });

  it("should navigate to the signin screen when the link is pressed", async () => {
    const navigation = { navigate: jest.fn() };
    const { findByText } = render(<LogInLink navigation={navigation} />);

    const logInLink = await findByText("Log In");

    fireEvent.press(logInLink);

    expect(navigation.navigate).toHaveBeenCalledWith("signin");
  });

  it("should use Poppins_300Light and Poppins_400Regular fonts", async () => {
    const { findByText } = render(<LogInLink navigation={undefined} />);

    const preText = await findByText("Already have an account?");
    const linkText = await findByText("Log In");

    expect(preText.props.style.fontFamily).toBe("Poppins_300Light");
    expect(linkText.props.style.fontFamily).toBe("Poppins_400Regular");
  });
});
