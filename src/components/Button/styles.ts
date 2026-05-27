import styled, { css } from "styled-components";

import { rgba } from "@themes/mixins";

import { Sizes, StyleTypes } from "./enums";
import type { RootProps } from "./types";

export const StyledLoader = styled.span`
  animation: button-loader-spin 700ms linear infinite;
  border: 2px solid transparent;
  border-bottom-color: currentColor;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.round};
  border-top-color: currentColor;
  display: inline-flex;
  height: 20px;
  width: 20px;

  @keyframes button-loader-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Root = styled.button<RootProps>`
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.spacing.borderRadius.sm};
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  font: inherit;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  gap: ${({ $hasIcon, theme }) => ($hasIcon ? theme.spacing.sm : 0)};
  justify-content: center;
  transition:
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out;
  width: ${({ width100 }) => (width100 ? "100%" : "initial")};

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primaryLight};
    outline-offset: 2px;
  }

  ${({ styleType = StyleTypes.filled, theme }) => {
    if (styleType === StyleTypes.outlined) {
      return css`
        background-color: transparent;
        border-color: ${theme.colors.primary};
        color: ${theme.colors.primary};

        &:hover:not(:disabled) {
          background-color: ${rgba(theme.colors.primary, 8)};
        }

        &:disabled {
          border-color: ${theme.colors.divider};
          color: ${theme.colors.grey};
        }
      `;
    }

    return css`
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primaryDark};
      }

      &:disabled {
        background-color: ${theme.colors.surfaceSecondary};
        border-color: ${theme.colors.divider};
        color: ${theme.colors.grey};
      }
    `;
  }}

  ${({ size = Sizes.medium }) => {
    switch (size) {
      case Sizes.small:
        return css`
          height: 32px;
          padding: 0 14px;
        `;
      case Sizes.large:
        return css`
          height: 54px;
          padding: 0 22px;
        `;
      default:
        return css`
          height: 48px;
          padding: 0 18px;
        `;
    }
  }}
`;

export const Label = styled.span`
  font-size: 14px;
  line-height: normal;
  text-align: center;
`;
