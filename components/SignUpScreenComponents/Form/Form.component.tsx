import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";
import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/Entypo";
import {
  Poppins_300Light,
  Poppins_400Regular,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  CheckboxContainer,
  CheckboxText,
  ConfirmationInput,
  CreateAccountButton,
  CreateAccountButtonText,
  FormComponent,
  Input,
  InputErrorText,
  Label,
  PasswordInputWrapper,
  VerifyAccountButtonText,
  VerifyButton,
} from "./Form.style";
import { LinearGradient } from "expo-linear-gradient";
import { useSignUp } from "@clerk/clerk-expo";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase-config";
import { useDispatch } from "react-redux";
import {
  selectAuthType,
  selectAuthenticated,
  selectEmailAddress,
  selectFullname,
} from "../../../redux/reducers/Auth";
import { useNavigation } from "@react-navigation/native";

const Form = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loaded, error] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [emailInputError, setEmailInputError] = useState("");
  const [fullnameInputError, setFullnameInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  function validateData() {
    const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const fullNamePattern = /^[a-zA-Z\s]+$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailInputError("Invalid email format");
      valid = false;
    }

    if (
      !fullNamePattern.test(fullname) ||
      fullname.length < 3 ||
      fullname.length > 50
    ) {
      setFullnameInputError(
        "Fullname must contain only letters and have a length between 3 and 50"
      );
      valid = false;
    }

    if (password.length < 8) {
      setPasswordInputError("Password must be at least 8 characters long");
      valid = false;
    }

    return valid;
  }

  const onSignUpPress = async () => {
    if (!isChecked) {
      Alert.alert("You must agree to privacy policy");
      return;
    }

    if (!validateData()) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      Alert.alert("Error occured, try again");
      console.log(err);
    }
  };

  const onPressVerify = async () => {
    const completeSignUp = await signUp?.attemptEmailAddressVerification({
      code: code.join(""),
    });

    if (setActive) {
      await setActive({ session: completeSignUp?.createdSessionId });
      setPendingVerification(false);
    } else {
      return;
    }

    await setDoc(doc(db, "users", email), {
      fullname,
      emailAddress: email,
      username: "",
      profileImgUrl: "",
      authType: "email",
      creationDate: new Date(),
    });

    dispatch(selectAuthType("email"));
    dispatch(selectAuthenticated(true));
    dispatch(selectEmailAddress(email));
    dispatch(selectFullname(fullname));

    navigation.navigate("profile" as never);
  };

  if (!loaded || error) {
    return <></>;
  }

  return (
    <FormComponent>
      <Label>Email</Label>
      <Input
        testID="emailInput"
        editable={!pendingVerification}
        value={email}
        onChangeText={(email: string) => setEmail(email)}
        placeholder="artist@gmail.com"
        placeholderTextColor="#757575"
        onFocus={() => setIsFocusedEmail(true)}
        onBlur={() => setIsFocusedEmail(false)}
        isFocused={isFocusedEmail}
        style={{
          borderColor: isFocusedEmail ? "#A463F8" : "#fff",
          backgroundColor: isFocusedEmail ? "#000" : "transparent",
        }}
      />
      {emailInputError && (
        <InputErrorText testID="emailInputError">
          {emailInputError}
        </InputErrorText>
      )}

      <Label>Full Name</Label>
      <Input
        testID="fullnameInput"
        editable={!pendingVerification}
        value={fullname}
        onChangeText={(fullname: string) => setFullname(fullname)}
        placeholder="John Doe"
        placeholderTextColor="#757575"
        onFocus={() => setIsFocusedFullName(true)}
        onBlur={() => setIsFocusedFullName(false)}
        isFocused={isFocusedFullName}
        style={{
          borderColor: isFocusedFullName ? "#A463F8" : "#fff",
          backgroundColor: isFocusedFullName ? "#000" : "transparent",
        }}
      />
      {fullnameInputError && (
        <InputErrorText testID="fullnameInputError">
          {fullnameInputError}
        </InputErrorText>
      )}

      <Label>Password</Label>
      <PasswordInputWrapper isFocused={isFocusedPassword}>
        <Input
          testID="passwordInput"
          ref={passwordInputRef}
          editable={!pendingVerification}
          value={password}
          onChangeText={(password: string) => setPassword(password)}
          placeholder="At least 8 characters"
          placeholderTextColor="#757575"
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocusedPassword(true)}
          onBlur={() => setIsFocusedPassword(false)}
          isFocused={isFocusedPassword}
          style={{
            flex: 1,
            borderColor: "transparent",
            backgroundColor: "transparent",
            marginTop: 0,
          }}
        />
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            setIsPasswordVisible(!isPasswordVisible);
            setTimeout(() => {
              passwordInputRef.current?.focus();
            }, 0);
          }}
        >
          <Icon
            name={isPasswordVisible ? "eye-with-line" : "eye"}
            color="#fff"
            size={26}
          />
        </TouchableOpacity>
      </PasswordInputWrapper>
      {passwordInputError && (
        <InputErrorText testID="passwordInputError">
          {passwordInputError}
        </InputErrorText>
      )}

      <CheckboxContainer>
        <TouchableOpacity
          testID="checkbox"
          onPress={() => setIsChecked(!isChecked)}
        >
          <View
            style={{
              height: 24,
              width: 24,
              backgroundColor: isChecked ? "#A463F8" : "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            {isChecked && <Icon name="check" size={20} color="#fff" />}
          </View>
        </TouchableOpacity>
        <CheckboxText>
          I have read and agree to Teams of Use and Privacy Policy
        </CheckboxText>
      </CheckboxContainer>
      {pendingVerification ? (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {code.map((codePart, index) => (
              <ConfirmationInput
                key={index}
                value={codePart}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text: string) => {
                  const newCode = [...code];
                  newCode[index] = text;
                  setCode(newCode);
                  if (text && index < code.length - 1) {
                    inputRefs.current[index + 1]?.focus();
                  } else if (text === "" && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                onKeyPress={({
                  nativeEvent,
                }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                  if (nativeEvent.key === "Backspace" && codePart === "") {
                    if (index > 0) {
                      const newCode = [...code];
                      newCode[index - 1] = "";
                      setCode(newCode);
                      inputRefs.current[index - 1]?.focus();
                    }
                  }
                }}
                // @ts-ignore
                ref={(ref: TextInput | null) =>
                  (inputRefs.current[index] = ref)
                }
              />
            ))}
          </View>
          <VerifyButton onPress={onPressVerify}>
            <LinearGradient
              colors={["#B24E90", "#7E3BA1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 8,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <VerifyAccountButtonText>Verify Email</VerifyAccountButtonText>
            </LinearGradient>
          </VerifyButton>
        </View>
      ) : (
        <CreateAccountButton onPress={onSignUpPress}>
          <LinearGradient
            colors={["#B24E90", "#7E3BA1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 8,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <CreateAccountButtonText>Create account</CreateAccountButtonText>
          </LinearGradient>
        </CreateAccountButton>
      )}
    </FormComponent>
  );
};

export default Form;
