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
jest.mock("react-native-vector-icons/AntDesign", () => "Icon");
jest.mock("react-native-vector-icons/Entypo", () => "Icon");
