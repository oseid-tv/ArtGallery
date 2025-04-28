import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { useWarmUpBrowswer } from "../../../../hooks/useWarmUpBrowser";
import { ButtonWrapper, Icon } from "../AuthButtons.style";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,
  selectProfileImgUrl,
  selectUsername,
} from "../../../../redux/reducers/Auth";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const GoogleAuthBtn = () => {
  useWarmUpBrowswer();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const handleSignIn = async () => {};

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const email = user.user?.primaryEmailAddress?.emailAddress;
        const docRef = doc(db, "users", email as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          dispatch(selectEmailAddress(email));
          dispatch(selectFullname(data.fullname));
          dispatch(selectProfileImgUrl(data.profileImgUrl));
          dispatch(selectUsername(data.username));
          dispatch(selectAuthType("google"));
          dispatch(selectAuthenticated(true));
          navigation.navigate("profile" as never);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Failed to store user data:", err);
        return;
      }
    })();
  }, [user]);

  const googleSignin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        dispatch(selectAuthType("google"));
        dispatch(selectAuthenticated(true));
      } else {
        console.log("failed to sign in");
      }
    } catch (err) {
      Alert.alert("Error occurred, try again!");
      console.log(err);
    }
  };

  return (
    <ButtonWrapper onPress={googleSignin}>
      <Icon name="google" color="#fff" size={30} />
    </ButtonWrapper>
  );
};

export default GoogleAuthBtn;
