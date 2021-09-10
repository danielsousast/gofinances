import React from "react";
import { ThemeProvider } from "styled-components/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import Register from "./index";
import theme from "../../global/styles/theme";
import { NavigationContainer } from "@react-navigation/native";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <NavigationContainer> {children}</NavigationContainer>
  </ThemeProvider>
);

describe("register screen", () => {
  test("should be open category modal when user click on the button", () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId("register:modal-category");

    const submitButton = getByTestId("register:category-button");
    fireEvent.press(submitButton);

    expect(categoryModal.props.visible).toBeTruthy();
  });

  test("should be open category modal when user click on the button", async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId("register:modal-category");

    const submitButton = getByTestId("register:category-button");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
