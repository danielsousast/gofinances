import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import Input from "../Input";
import { Container, Error } from "./styles";

interface ComponentProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const InputForm: React.FC<ComponentProps> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default InputForm;
