import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";

import { Category } from ".";
import theme from "../../global/styles/theme";

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const CategoryList = styled(
  FlatList as new () => FlatList<Category>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CategoryContainer = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(15)}px;

  background-color: ${({ isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.separator};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
