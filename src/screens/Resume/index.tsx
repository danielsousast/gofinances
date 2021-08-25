import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import Header from "../../components/Header";
import ResumeItem from "../../components/ResumeItem";
import { dataKey } from "../../utils/asyncstorage";
import { categories } from "../../utils/categories";
import { Container, Content, LoadingContainer } from "./styles";

interface Transaction {
  id: string;
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Category {
  key: string;
  name: string;
  color: string;
  total: string;
}

const Resume: React.FC = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<Category[]>(
    [] as Category[]
  );

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (item: Transaction) => item.type === "negative"
    );

    const totalByCategory: Category[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: Transaction) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setCategoriesTotal(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <Header title="Resumo por categoria" />
      <Content>
        {categoriesTotal.map((category) => (
          <ResumeItem
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Resume;
