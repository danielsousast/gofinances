import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  RFPercentage as percent,
  RFValue as value,
} from "react-native-responsive-fontsize";

interface StyleProps {
  type: "up" | "down" | "total";
}

export const Container = styled.View<StyleProps>`
  width: ${value(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${value(42)}px;
  margin-right: 16px;
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};

  height: ${value(220)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${value(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<StyleProps>`
  font-size: 40px;
  ${({ type }) =>
    type === "up" &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
  ${({ type }) =>
    type === "down" &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
  ${({ type }) =>
    type === "total" &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${value(32)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${value(12)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.text};
`;
