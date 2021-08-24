import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Button from "../../components/Forms/Button";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import InputForm from "../../components/Forms/InputForm";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import {
  Container,
  Fields,
  FieldsContainer,
  Form,
  Header,
  Title,
} from "./styles";

type TransactionType = "up" | "down";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome e obrigatorio"),
  amount: Yup.number()
    .typeError("Informe um valor numerico")
    .positive("O valor nao pode ser negativo")
    .required("O Valor e obrigatorio"),
});

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "any",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: TransactionType) => {
    setTransactionType(type);
  };

  const closeSelectCategory = () => {
    setCategoryModalOpen(false);
  };

  const openSelectCategory = () => {
    setCategoryModalOpen(true);
  };

  const handleRegister = (form: FormData) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transacao");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categria");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preco"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <FieldsContainer>
              <TransactionTypeButton
                active={transactionType === "up"}
                type="up"
                title="Entradas"
                onPress={() => handleTransactionTypeSelect("up")}
              />
              <TransactionTypeButton
                active={transactionType === "down"}
                type="down"
                title="Saidas"
                onPress={() => handleTransactionTypeSelect("down")}
              />
            </FieldsContainer>
            <CategorySelectButton
              title={category.name}
              onPress={openSelectCategory}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={closeSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
