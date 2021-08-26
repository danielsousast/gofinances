import React, { useState } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

import AppleSvg from "../../assets/apple.svg";
import GoggleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import SocialButton from "../../components/SocialButton";
import { useAuth } from "../../context/AuthContext";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

const SignIn: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);

      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas {" \n"} financas de forma muito simples</Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SocialButton
            title="Entrar com Goolge"
            svg={GoggleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>
      </Footer>
      {isLoading && (
        <ActivityIndicator color={theme.colors.shape} size="large" />
      )}
    </Container>
  );
};

export default SignIn;
