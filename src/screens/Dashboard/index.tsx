import React from "react";
import PrimaryCard from "../../components/PrimaryCard";
import TransactionCard, {
  TransactionsProps,
} from "../../components/TransactionCard";

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
} from "./styles";

const list: TransactionsProps[] = [
  {
    id: "1",
    type: "positive",
    title: "Desenvolvimebto de sites",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
    date: "13/04/2020",
  },
  {
    id: "2",
    type: "negative",
    title: "Desenvolvimebto de sites 2",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "coffee",
    },
    date: "13/04/2020",
  },
];

const Dashboard: React.FC = () => {
  const renderTransactionItem = ({ item }: any) => (
    <TransactionCard data={item} />
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/15719314?v=4",
              }}
            />

            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Daniel</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <PowerIcon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <CardsScroll horizontal>
        <PrimaryCard
          title="Entradas"
          amount="R$ 17.400,00"
          type="up"
          lastTransaction="Ultima entrada dia 3 de abril"
        />
        <PrimaryCard
          title="Saidas"
          amount="R$ 17.400,00"
          type="down"
          lastTransaction="Ultima entrada dia 3 de abril"
        />
        <PrimaryCard
          title="Total"
          amount="R$ 17.400,00"
          type="total"
          lastTransaction="Ultima entrada dia 3 de abril"
        />
      </CardsScroll>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={list}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
