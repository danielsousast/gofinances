import React from "react";
import { categories } from "../../utils/categories";
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

export interface TransactionsProps {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface ComponentProps {
  data: TransactionsProps;
}

const TransactionCard: React.FC<ComponentProps> = ({ data }) => {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <CategoryWrapper>
          <Icon name={category.icon} />
          <Category>{category.name}</Category>
        </CategoryWrapper>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
