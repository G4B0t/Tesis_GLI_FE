import { forwardRef, memo, useMemo } from "react";

import { DEFAULT_BUTTON_TYPE } from "./constants";
import { Sizes, StyleTypes } from "./enums";
import { Label, Root, StyledLoader } from "./styles";
import type { Props } from "./types";

const Button = (
  {
    className,
    disabled,
    icon,
    id,
    label,
    loading,
    onClick,
    size = Sizes.medium,
    styleType = StyleTypes.filled,
    type = DEFAULT_BUTTON_TYPE,
    width100 = false,
    ...rest
  }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const content = useMemo(
    () =>
      loading ? (
        <StyledLoader aria-label="Loading" role="status" />
      ) : (
        <>
          {icon}
          <Label>{label}</Label>
        </>
      ),
    [icon, label, loading],
  );

  return (
    <Root
      $hasIcon={!!icon}
      className={className}
      disabled={disabled || loading}
      id={id}
      onClick={onClick}
      ref={ref}
      size={size}
      styleType={styleType}
      type={type}
      width100={width100}
      {...rest}
    >
      {content}
    </Root>
  );
};

export { Sizes, StyleTypes };
export type { Props };

export default memo(forwardRef(Button));
