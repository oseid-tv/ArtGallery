import React from "react";
import {
  HeaderComponent,
  PageTitle,
  IconWrapper,
  ArrowIcon,
  PlaceholderView,
} from "./Header.style";
import { Poppins_500Medium, useFonts } from "@expo-google-fonts/poppins";
import { NavigationProp } from "@react-navigation/native";

const Header = ({
  navigation,
}: {
  navigation:
    | NavigationProp<ReactNavigation.RootParamList>
    | { canGoBack: Function; goBack: Function }
    | undefined;
}) => {
  const [loaded, error] = useFonts({
    Poppins_500Medium,
  });

  if (!loaded || error) return <></>;

  return (
    <HeaderComponent>
      <IconWrapper
        onPress={() => {
          if (navigation?.canGoBack()) {
            navigation?.goBack();
          }
        }}
      >
        <ArrowIcon name="left" size={24} color="#fff" />
      </IconWrapper>
      <PageTitle>Sign In</PageTitle>
      <PlaceholderView />
    </HeaderComponent>
  );
};

export default Header;
