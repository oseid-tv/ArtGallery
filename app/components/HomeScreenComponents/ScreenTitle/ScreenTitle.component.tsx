import React from "react";
import { useFonts } from "expo-font";
import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ScreenTitleWrapper, ScreenTitleBold } from "./ScreenTitle.style";

const ScreenTitle = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ScreenTitleWrapper>
      <ScreenTitleBold>Virtual </ScreenTitleBold>gallery
    </ScreenTitleWrapper>
  );
};

export default ScreenTitle;
