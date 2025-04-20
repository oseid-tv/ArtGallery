import {
  ComponentWrapper,
  PreText,
  LinkWrapper,
  LinkText,
} from "./LogInLink.style";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const LogInLink = ({
  navigation,
}: {
  navigation:
    | NavigationProp<ReactNavigation.RootParamList>
    | { navigate: Function }
    | undefined;
}) => {
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ComponentWrapper>
      <PreText>Already have an account?</PreText>
      <LinkWrapper onPress={() => navigation?.navigate("signin" as never)}>
        <LinkText>Log In</LinkText>
      </LinkWrapper>
    </ComponentWrapper>
  );
};

export default LogInLink;
