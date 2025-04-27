import styled from "styled-components/native";
import { TextInputProps, ViewProps } from "react-native";

export const FormComponent = styled.View`
  margin-top: 50px;
  width: 84%;
`;

export const Label = styled.Text`
  font-family: Poppins_400Regular;
  font-size: 16px;
  color: #fff;
  margin-top: 25px;
`;

interface InputProps extends TextInputProps {
  isFocused: boolean;
}

export const Input = styled.TextInput.attrs<InputProps>({
  autoCapitalize: "none",
  autoCorrect: false,
})<InputProps>`
  border-width: 1px;
  border-radius: 5px;
  height: 50px;
  font-family: Poppins_300Light;
  font-size: 13px;
  color: #fff;
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

export const PasswordInputWrapper = styled.View<
  ViewProps & { isFocused: boolean }
>`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${(props) => (props.isFocused ? "#A463F8" : "#fff")};
  border-radius: 5px;
  background-color: ${(props) => (props.isFocused ? "#1f2937" : "#fff")};

  ${(props) =>
    props.isFocused &&
    `
    shadow-color: #A463F8;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.8;
    shadow-radius: 4px;
    `}
`;

export const PasswordInput = styled(Input)``;
