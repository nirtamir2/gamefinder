import type { ComponentProps } from "react";
import { forwardRef } from "react";

type Props = Omit<ComponentProps<"button">, "className">;

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, type = "button", ...restProps } = props;
  return (
    <button
      ref={ref}
      {...restProps}
      type={type}
      className="h-10 w-full rounded-lg bg-primary p-2 px-8 text-sm font-bold text-black transition-colors hover:bg-primary-hover focus:bg-primary-focus"
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
