import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { useAuth } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PrimaryCard from "../../components/PrimaryCard";
import TransactionCard, {
  TransactionsProps,
} from "../../components/TransactionCard";

import { dataKey } from "../../utils/asyncstorage";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  UserGreeting,
  User,
  UserName,
  LogoutButton,
  PowerIcon,
  CardsScroll,
  Transactions,
  Title,
  TransactionsList,
  LoadingContainer,
} from "./styles";

interface BalanceProps {
  amount: string;
  lastTransaction: string;
}
interface Balance {
  entries: BalanceProps;
  expensives: BalanceProps;
  total: BalanceProps;
}

interface GetLastTransaction {
  collection: TransactionsProps[];
  type: "positive" | "negative";
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransacrions({ collection, type }: GetLastTransaction) {
    const collectionFilttered = collection.filter(
      (transaction: TransactionsProps) => transaction.type === type
    );

    if (collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction: TransactionsProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );

    const day = lastTransaction.getDate();
    const month = lastTransaction.toLocaleString("pt-BR", {
      month: "long",
    });

    const lastTransactionsFormatted = `${day} de ${month}`;

    return lastTransactionsFormatted;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(`${dataKey}:${user.email}`);

    const transactionsReponse = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: TransactionsProps[] = transactionsReponse.map(
      (transaction: TransactionsProps) => {
        if (transaction.type === "positive") {
          entriesTotal += Number(transaction.amount);
        }

        if (transaction.type === "negative") {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          date,
          type: transaction.type,
          category: transaction.category,
        };
      }
    );

    const lastEntrie = getLastTransacrions({
      collection: transactionsReponse,
      type: "positive",
    });

    const lastExpensive = getLastTransacrions({
      collection: transactionsReponse,
      type: "negative",
    });

    const totalInterval = lastExpensive === 0 ? "" : `01 a ${lastExpensive}`;

    const total = entriesTotal - expensiveTotal;

    setBalance({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: entriesTotal > 0 ? `Ultima entrada ${lastEntrie}` : "",
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          expensiveTotal > 0 ? `Ultima entrada ${lastExpensive}` : "",
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setTransactions(transactionsFormatted);

    console.log(transactions);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Ola,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <PowerIcon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <CardsScroll horizontal>
            <PrimaryCard
              title="Entradas"
              amount={balance.entries.amount}
              type="up"
              lastTransaction={balance.entries.lastTransaction}
            />
            <PrimaryCard
              title="Saidas"
              amount={balance.expensives.amount}
              type="down"
              lastTransaction={balance.expensives.lastTransaction}
            />
            <PrimaryCard
              title="Total"
              amount={balance.total.amount}
              type="total"
              lastTransaction={balance.total.lastTransaction}
            />
          </CardsScroll>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              renderItem={({ item }) => <TransactionCard data={item} />}
              keyExtractor={(item) => item.id}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
