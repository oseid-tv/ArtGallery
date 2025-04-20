import styled from "styled-components/native";
import { StatusBar } from "react-native";

import Header from "../components/SignUpScreenComponents/Header/Header.Component";
import Form from "../components/SignUpScreenComponents/Form/Form.component";
import AuthButtons from "../components/SignUpScreenComponents/AuthButtons/AuthButtons.component";
import LogInLink from "../components/SignUpScreenComponents/LogInLink/LogInLink.Component";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header navigation={navigation} />
      <Form />
      <AuthButtons />
      <LogInLink navigation={navigation} />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: #1b1b1b;
  padding-top: ${StatusBar.currentHeight}px;
`;
