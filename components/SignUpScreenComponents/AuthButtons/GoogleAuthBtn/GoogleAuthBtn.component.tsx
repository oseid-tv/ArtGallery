import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowswer } from "../../../../hooks/useWarmUpBrowser";
import { ButtonWrapper, Icon } from "../AuthButtons.style";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,
} from "../../../../redux/reducers/Auth";

const GoogleAuthBtn = () => {
  useWarmUpBrowswer();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const googleSignup = async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });

        await setDoc(doc(db, "users", signUp?.emailAddress as string), {
          fullname: `${signUp?.firstName} ${signUp?.lastName}`,
          emailAddress: signUp?.emailAddress,
          username: "",
          profileImgUrl: "",
          authType: "google",
          creationDate: new Date(),
        });

        dispatch(selectAuthType("google"));
        dispatch(selectAuthenticated(true));
        dispatch(selectEmailAddress(signUp?.emailAddress));
        dispatch(selectFullname(`${signUp?.firstName} ${signUp?.lastName}`));

        navigation.navigate("profile" as never);
      } else {
        console.log("Failed to sign up");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ButtonWrapper onPress={googleSignup}>
      <Icon name="google" color="#fff" size={30} />
    </ButtonWrapper>
  );
};

export default GoogleAuthBtn;
