import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ComponentProps> = ({ title, onPress, ...rest }) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
