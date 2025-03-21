import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/images/home-page-background.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <Text style={styles.screenTitle}>
        <Text style={styles.screenTitleBold}>Virtual </Text>gallery
      </Text>
      <View style={styles.imagesContainer}>
        <View style={styles.topContainer}>
          <Image
            style={styles.smallImg}
            source={require("../assets/images/home-page-digital-art1.png")}
          />
          <Image
            style={styles.smallImg}
            source={require("../assets/images/home-page-digital-art2.png")}
          />
        </View>
        <Image
          style={styles.bigImg}
          source={require("../assets/images/home-page-digital-art3.png")}
        />
      </View>
      <Text style={styles.introText}>Become an Artist & Collector</Text>
      <TouchableOpacity>
        <LinearGradient
          colors={["#B24E9D", "#7E3BA1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logInBtn}
        >
          <Text style={styles.logInBtnText}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity>
        <LinearGradient
          colors={["#7E3BA1", "#B24E9D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logInBtn}
        >
          <Text style={styles.logInBtnText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  screenTitle: {
    marginTop: 40,
    fontFamily: "Poppins_500Medium",
    fontSize: 36,
    color: "#fff",
  },
  screenTitleBold: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
  },
  imagesContainer: {
    marginTop: 20,
    flexDirection: "column",
    width: "100%",
  },
  topContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  smallImg: {
    width: "48%",
    borderRadius: 7,
  },
  bigImg: {
    width: "96%",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 15,
  },
  introText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "#fff",
    marginTop: 25,
    textAlign: "center",
  },
  logInBtn: {
    width: 200,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.54,
    shadowRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  logInBtnText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "transparent",
  },
});
