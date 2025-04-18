import styled from "styled-components/native";
import { StatusBar } from "react-native";

import Header from "../components/SignUpScreenComponents/Header/Header.Component";
import Form from "../components/SignUpScreenComponents/Form/Form.component";
import AuthButtons from "../components/SignUpScreenComponents/AuthButtons/AuthButtons.component";
import LogInLink from "../components/SignUpScreenComponents/LogInLink/LogInLink.Component";

export default function SignUpScreen() {
  return (
    <Container>
      <Header />
      <Form />
      <AuthButtons />
      <LogInLink />
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
