import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  RFPercentage as percent,
  RFValue as value,
} from "react-native-responsive-fontsize";

interface StyledProps {
  type: string;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 23px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${value(14)}px;
`;

export const Amount = styled.Text<StyledProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${value(20)}px;
  margin-top: 2px;
  color: ${({ type, theme }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 19px;
  justify-content: space-between;
`;

export const Icon = styled(Feather)`
  font-size: ${value(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Category = styled.Text`
  font-size: ${value(14)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 17px;
`;

export const Date = styled.Text`
  font-size: ${value(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
