import { Checkbox, Chip } from '@mui/material';
import { AlertCircle } from 'lucide-react';
import { flexStyle, rgba, textStyle } from '@themes/mixins';
import styled, { css } from 'styled-components';


import { Sizes } from './enums';

const cssObject = (rules: object) => css(rules as never);

export const Root = styled.div<{ fullWidth: boolean }>`
  ${cssObject(flexStyle({
    align: 'flex-start',
    direction: 'column',
    justify: 'flex-start',
    wrap: 'nowrap',
  }))};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
export const StyledChip = styled(Chip)`
  ${cssObject(flexStyle({ align: 'center', wrap: 'nowrap' }))};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  height: 25px;
  max-width: 100px;
  margin-right: 5px;
  cursor: pointer;

  & .MuiChip-deleteIcon {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 18px;

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      opacity: 0.8;
    }
  }
`;
export const AutoCompleteContainer = styled.div<{
  sizeType: Sizes;
  readOnly: boolean;
}>`
  width: 100%;

  ${StyledChip} {
    ${({ sizeType }) => {
      switch (sizeType) {
        case Sizes.small:
          return css`
            height: 15px;
          `;

        default:
          return css`
            height: 25px;
          `;
      }
    }}
  }

  & label {
    color: ${({ theme }) => theme.colors.textSecondary};

    ${({ sizeType }) => {
      switch (sizeType) {
        case Sizes.small:
          return css`
            font-size: 14px;
            top: -10px;
          `;
        case Sizes.medium:
          return css`
            top: -4px;
          `;
        default:
          return css``;
      }
    }}
  }

  & label.Mui-focused {
    color: ${({ theme }) => theme.colors.textPrimary};
    top: 0;
  }

  & label.MuiFormLabel-filled {
    top: 0;
  }

  & label.MuiInputLabel-shrink {
    top: 0;
  }

  & .MuiAutocomplete-tag {
    margin: 7px 3px 3px 3px;
    max-width: calc(100% - 26px);
  }

  & span.MuiAutocomplete-tag {
    position: absolute;
    right: 28px;
  }

  & .MuiAutocomplete-tag + input.MuiAutocomplete-input {
    position: relative;
  }

  & .MuiInputLabel-formControl.Mui-error {
    color: ${({ theme }) => theme.colors.danger};

    & .MuiInputLabel-asterisk.Mui-error {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  & .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.colors.textPrimary};

    ${({ sizeType }) => {
      switch (sizeType) {
        case Sizes.small:
          return css`
            padding: 2px 14px;
            font-size: 12px;
          `;
        case Sizes.medium:
          return css`
            padding: 5px 14px;
          `;
        default: //large
          return css`
            padding: 9px;
          `;
      }
    }}
    ${({ readOnly }) => {
      switch (readOnly) {
        case true:
          return css`
            background-color: ${({ theme }) => rgba(theme.colors.divider, 10)};
          `;
        default:
          return css``;
      }
    }}
    & input.MuiAutocomplete-input {
      ${({ sizeType }) => {
        switch (sizeType) {
          case Sizes.small:
            return css`
              padding: 5px 4px 3px 5px;
              font-size: 12px;
            `;
          default: //large
            return css``;
        }
      }}
    }

    & .MuiChip-root + input.MuiAutocomplete-input {
      position: absolute;
    }

    & .MuiChip-label {
      ${cssObject(textStyle({
        color: 'textPrimary',
        lineHeight: 1,
        size: '11px',
        textAlign: 'left',
        weight: 400,
      }))};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 6px;
      padding-right: 6px;

      ${({ sizeType }) => {
        switch (sizeType) {
          case Sizes.small:
            return css`
              font-size: 10px;
            `;
          default:
            return css``;
        }
      }}
    }

    & fieldset {
      border-color: ${({ theme }) => theme.colors.divider};
    }

    &:hover fieldset {
      border-color: ${({ theme }) => theme.colors.textSecondary};
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.colors.textSecondary};
    }

    &.Mui-focused .MuiChip-root + input.MuiAutocomplete-input:focus {
      position: relative;
      width: 100%;
    }

    & .MuiAutocomplete-endAdornment {
      & .MuiIconButton-root {
        color: ${({ theme }) => theme.colors.textPrimary};

        &:hover {
          background-color: ${({ theme }) =>
            rgba(theme.colors.textPrimary, 10)};
        }
      }
    }

    &.Mui-error {
      & .MuiOutlinedInput-input::placeholder {
        color: ${({ theme }) => theme.colors.danger};
      }

      &.Mui-focused fieldset {
        border-color: ${({ theme }) => theme.colors.danger};
      }

      & fieldset {
        color: ${({ theme }) => theme.colors.danger};
      }

      &:hover fieldset {
        border-color: ${({ theme }) => theme.colors.danger};
      }

      & .MuiAutocomplete-endAdornment {
        & .MuiIconButton-root {
          color: ${({ theme }) => theme.colors.danger};
        }
      }
    }
  }
`;
export const ErrorMessageContainer = styled.div<{
  sizetype: Sizes;
}>`
  ${cssObject(flexStyle({ align: 'center', wrap: 'nowrap' }))};
  ${({ sizetype }) => {
    switch (sizetype) {
      case Sizes.small:
        return css`
          margin-top: 2px;
        `;
      case Sizes.medium:
        return css`
          margin-top: 8px;
        `;
      default:
        return css`
          margin-top: 8px;
        `;
    }
  }}
`;
export const AttentionIcon = styled(AlertCircle)`
  color: ${({ theme }) => theme.colors.danger};
  margin-right: 8px;
`;
export const ErrorMessage = styled.span`
  ${cssObject(textStyle({
    color: 'red',
    lineHeight: 1,
    size: '12px',
    textAlign: 'left',
    weight: 400,
  }))};
  letter-spacing: 0.4px;
`;
export const StyledCheckBox = styled(Checkbox)`
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 0;
  margin-right: 8px;

  & .MuiCheckbox-root {
    color: ${({ theme }) => theme.colors.textPrimary};
    padding: 2px 9px 2px 9px;
  }
`;
export const Option = styled.li`
  ${cssObject(textStyle({
    color: 'textPrimary',
    lineHeight: 1,
    size: '12px',
    textAlign: 'left',
    weight: 400,
  }))};
  letter-spacing: 0.4px;
`;
export const Label = styled.label<{ error?: boolean }>`
  ${cssObject(flexStyle({ align: 'center', wrap: 'nowrap' }))};
  ${cssObject(textStyle({
    color: 'textPrimary',
    lineHeight: 1,
    size: '12px',
    textAlign: 'left',
    weight: 400,
  }))};
  margin-bottom: 8px;
  letter-spacing: 0.5px;

  ${({ error, theme }) =>
    error &&
    css`
      color: ${theme.colors.danger};
    `}
`;
export const RequiredMark = styled.span<{ error?: boolean }>`
  ${cssObject(textStyle({
    color: 'textPrimary',
    lineHeight: 1,
    size: '12px',
    textAlign: 'left',
    weight: 400,
  }))};
  margin-left: 5px;

  ${({ error, theme }) =>
    error &&
    css`
      color: ${theme.colors.danger};
    `}
`;


