import React from "react";
import {
  Container,
  Title,
  Footer,
  Amount,
  CategoryWrapper,
  Category,
  Icon,
  Date,
} from "./styles";

interface CategoryType {
  name: string;
  icon: string;
}

export interface TransactionsProps {
  id: string;
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: CategoryType;
  date: string;
}

export interface ComponentProps {
  data: TransactionsProps;
}

const TransactionCard: React.FC<ComponentProps> = ({ data }) => {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <CategoryWrapper>
          <Icon name={data.category.icon} />
          <Category>{data.category.name}</Category>
        </CategoryWrapper>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
