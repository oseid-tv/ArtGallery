import styled from "styled-components/native";
import { Text } from "react-native";

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

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
