import styled from "styled-components/native";
import { TextInputProps, ViewProps } from "react-native";

export const FormComponent = styled.View`
  margin-top: 50px;
  width: 84%;
`;

export const Label = styled.Text`
  font-family: Poppins_400Regular;
  color: #fff;
  font-size: 16px;
  margin-top: 25px;
`;

interface InputProps extends TextInputProps {
  isFocused: boolean;
}

export const Input = styled.TextInput.attrs({
  autoCapitalize: "none",
  autoCorrect: false,
})<InputProps>`
  border-width: 1px;
  border-radius: 5px;
  height: 50px;
  font-family: Poppins_300Light;
  color: #fff;
  font-size: 13px;
  padding: 10px;

  ${(props) =>
    props.isFocused &&
    `
      shadow-color: #A463F8;
      shadow-offset: 0px 1px;
      shadow-opacity: 0.8;
      shadow-radius: 4px;
    `}
`;

export const PasswordInputWrapper = styled.View<
  ViewProps & { isFocused: boolean }
>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => (props.isFocused ? "#A463F8" : "#fff")};
  border-radius: 5px;
  background-color: ${(props) => (props.isFocused ? "#000" : "transparent")};
  height: 50px;
  padding: 0 10px;

  ${(props) =>
    props.isFocused &&
    `
        shadow-color: #A463F8;
        shadow-offset: 0px 1px;
        shadow-opacity: 0.8;
        shadow-radius: 4px;
      `}
`;

export const InputErrorText = styled.Text`
  font-family: Poppins_300Light;
  color: red;
  font-size: 15px;
  margin-top: 5px;
`;

export const CheckboxContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin-top: 20px;
`;

export const CheckboxText = styled.Text`
  font-family: Poppins_300Light;
  color: #fff;
  margin-left: 10px;
`;

export const CreateAccountButton = styled.TouchableOpacity.attrs({
  testID: "createAccountBtn",
})`
  margin-top: 20px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.5;
  shadow-radius: 20px;
  elevation: 8;
  width: 100%;
  height: 60px;
  align-self: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin: 10px;
  font-family: Poppins_400regular;
`;

export const ConfirmationInput = styled.TextInput`
  width: 40px;
  heigth: 50px;
  margin: 0 5px;
  border: 1px solid #fff;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

export const VerifyButton = styled.TouchableOpacity.attrs({
  testID: "verifyBtn",
})`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.5;
  shadow-radius: 20px;
  elevation: 8;
`;

export const VerifyAccountButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: Poppins_400Regular;
  text-align: center;
  line-height: 50px;
`;
