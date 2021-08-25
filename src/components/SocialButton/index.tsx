import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Container, ImageContainer, Title } from "./styles";

interface ComponentProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

const SocialButton: React.FC<ComponentProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <Container>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Container>
  );
};

export default SocialButton;
