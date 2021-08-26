import React from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

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
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
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
          <SocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default SignIn;
