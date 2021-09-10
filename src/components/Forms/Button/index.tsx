import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
  onPress: () => void;
  testID?: string;
}

const Button: React.FC<ComponentProps> = ({ title, onPress, testID }) => {
  return (
    <Container onPress={onPress} testID={testID}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
