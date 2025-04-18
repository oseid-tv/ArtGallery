import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import { fireEvent, render, waitFor } from "../../../test-utils";
import Header from "./Header.Component";

describe("Header", () => {
  it("should navigate to previous page when back button is pressed", async () => {
    const navigation = {
      canGoBack: jest.fn().mockReturnValue(true),
      goBack: jest.fn(),
    };

    jest.doMock("@expo-google-fonts/poppins", () => ({
      Poppins_500Medium: "Poppins_500Medium",
      useFonts: jest.fn().mockResolvedValue(true),
    }));

    const { findByTestId } = render(<Header navigation={navigation} />);
    const iconWrapper = await findByTestId("IconWrapper");
    fireEvent.press(iconWrapper);

    await waitFor(() => {
      expect(navigation.goBack).toHaveBeenCalled();
    });
  });
});
