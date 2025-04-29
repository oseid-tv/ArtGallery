import styled from "styled-components/native";
import { StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Header from "../components/SignInScreenComponents/Header/Header.component";
import Form from "../components/SignInScreenComponents/Form/Form.component";
import AuthButtons from "../components/SignInScreenComponents/AuthButtons/AuthButtons.component";
import SignUpLink from "../components/SignInScreenComponents/SignUpLink/SignUpLink.component";

export default function SignInScreen() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header navigation={navigation} />
      <Form />
      <AuthButtons />
      <SignUpLink navigation={navigation} />
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
