import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput
        placeholder="Nome"
        autoCorrect={false}
        testID="profile-input-name"
      />
      <TextInput placeholder="Sobrenone" autoCorrect={false} />

      <Button
        title="Salvar"
        onPress={() => {}}
        testID="profile-submit-button"
      />
    </View>
  );
}
