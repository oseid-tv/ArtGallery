import "@testing-library/jest-native/extend-expect";

// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true],
  loadAsync: jest.fn(),
}));

// Mock expo-linear-gradient
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

// Mock @expo-google-fonts/poppins
jest.mock("@expo-google-fonts/poppins", () => ({
  Poppins_500Medium: "Poppins_500Medium",
  Poppins_700Bold: "Poppins_700Bold",
  useFonts: () => [true],
}));

// Mock react-native-vector-icons
jest.mock("react-native-vector-icons/AntDesign", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Icon = (props) =>
    React.createElement(View, { testID: "AntDesignIcon", ...props });
  Icon.displayName = "Icon";
  return Icon;
});

jest.mock("react-native-vector-icons/Entypo", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Icon = (props) =>
    React.createElement(View, { testID: "EntypoIcon", ...props });
  Icon.displayName = "Icon";
  return Icon;
});
