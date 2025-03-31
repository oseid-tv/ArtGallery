import styled from "styled-components/native";

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

export const CreateAccountBtn = styled.TouchableOpacity`
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

export const CreateAccountText = styled.Text`
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

export const VerifyButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.5;
  shadow-radius: 20px;
  elevation: 8;
`;
