import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const AuthBtn = styled(LinearGradient)`
  width: 200px;
  border-radius: 8px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.54);
  elevation: 20;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
`;

export const AuthBtnText = styled.Text`
  font-family: "Poppins_500Medium";
  font-size: 20px;
  color: #fff;
`;
