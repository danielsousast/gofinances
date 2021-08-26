import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userLoading } = useAuth();

  if (!fontsLoaded || userLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />

        <AuthProvider>
          <Routes />
        </AuthProvider>
      </>
    </ThemeProvider>
  );
}
