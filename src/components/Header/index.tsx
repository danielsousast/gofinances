import React from "react";
import { Container, Title } from "./styles";

interface ComponentProps {
  title: string;
}

const Header: React.FC<ComponentProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
