import type { ComponentProps } from "react";
import { forwardRef } from "react";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  Omit<ComponentProps<"textarea">, "className">
>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="w-full resize-none rounded-lg bg-button-background p-4 text-white transition duration-200 placeholder:text-gray-500 focus:bg-button-background-brighter"
    />
  );
});
