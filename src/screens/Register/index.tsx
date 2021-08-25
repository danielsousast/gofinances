import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";

import Button from "../../components/Forms/Button";
import CategorySelectButton from "../../components/Forms/CategorySelectButton";
import InputForm from "../../components/Forms/InputForm";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import { Container, Fields, FieldsContainer, Form } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { dataKey } from "../../utils/asyncstorage";
import Header from "../../components/Header";

type TransactionType = "positive" | "negative";

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

  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  function resetFields() {
    reset();
    setTransactionType("");
    setCategory({
      key: "category",
      name: "Categoria",
      icon: "any",
    });
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transacao");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const currentData = response ? JSON.parse(response) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      resetFields();

      navigate("Listagem");
    } catch (error) {
      Alert.alert("Nao foi possivel salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
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
                onPress={() => handleTransactionTypeSelect("positive")}
              />
              <TransactionTypeButton
                active={transactionType === "negative"}
                type="down"
                title="Saidas"
                onPress={() => handleTransactionTypeSelect("negative")}
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
