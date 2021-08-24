import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface StyledProps {
  type: "up" | "down";
  active?: boolean;
}

export const Container = styled.View.attrs({
  activeOpacity: 0.5,
})<StyledProps>`
  width: 48%;
  ${({ active }) =>
    !active &&
    css`
      border: 1.5px solid ${({ theme }) => theme.colors.text};
    `}

  border-radius: 5px;
  ${({ active, type }) =>
    active &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}

  ${({ active, type }) =>
    active &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
`;

export const ButtonPress = styled(RectButton)`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<StyledProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  margin-left: 12px;
`;

export const Icon = styled(Feather)<StyledProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
