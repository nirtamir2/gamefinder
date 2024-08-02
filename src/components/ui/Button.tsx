import type { ReactNode } from "react";
import { forwardRef } from "react";

interface Props {
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children } = props;
  return (
    <button
      ref={ref}
      type="button"
      className="h-10 bg-primary p-2 px-8 text-sm font-bold text-black transition-colors hover:bg-primary-hover focus:bg-primary-focus"
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
