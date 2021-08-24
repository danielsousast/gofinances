import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Category, Icon } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
}

const CategorySelectButton: React.FC<ComponentProps> = ({ title, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
