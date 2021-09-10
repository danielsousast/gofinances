import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Category, Icon } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
}

const CategorySelectButton: React.FC<ComponentProps> = ({
  title,
  onPress,
  testID,
}) => {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
