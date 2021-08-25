import React from "react";
import { Container, Title, Amount } from "./styles";

interface ComponentProps {
  title: string;
  color: string;
  amount: string;
}

const ResumeItem: React.FC<ComponentProps> = ({ title, amount, color }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default ResumeItem;
