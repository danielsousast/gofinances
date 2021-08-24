import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title, Icon, ButtonPress } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  active: boolean;
}
const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const TransactionTypeButton: React.FC<ComponentProps> = ({
  title,
  type,
  active,
  onPress,
}) => {
  return (
    <Container active={active} type={type}>
      <ButtonPress onPress={onPress}>
        <Icon name={icons[type]} type={type} />
        <Title type={type}>{title}</Title>
      </ButtonPress>
    </Container>
  );
};

export default TransactionTypeButton;
