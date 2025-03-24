import styled from "styled-components/native";
import { useFonts } from "expo-font";
import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";

import ScreenTitle from "../components/HomeScreenComponents/ScreenTitle/ScreenTitle.component";
import ImagesContainer from "../components/HomeScreenComponents/ImagesContainer/ImagesContainer.component";
import IntroText from "../components/HomeScreenComponents/IntroText/IntroText.component";
import LogInBtn from "../components/HomeScreenComponents/LogInBtn/LogInBtn.component";
import SignUpBtn from "../components/HomeScreenComponents/SignUpBtn/SignUpBtn.component";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Container
      source={require("../assets/images/home-page-background.png")}
      resizeMode="cover"
    >
      <ScreenTitle />
      <ImagesContainer />
      <IntroText />
      <LogInBtn />
      <SignUpBtn />
    </Container>
  );
}

const Container = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
