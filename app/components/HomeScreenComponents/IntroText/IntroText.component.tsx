import { IntroTextWrapper } from "./IntroText.style";
import { Poppins_500Medium, useFonts } from "@expo-google-fonts/poppins";

const IntroText = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <IntroTextWrapper>Become an Artist & Collector</IntroTextWrapper>;
};

export default IntroText;
