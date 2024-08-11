import type { ComponentProps } from "react";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "className">
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full rounded-full bg-button-background py-5 pl-6 text-white transition duration-200 placeholder:text-gray-500 focus:bg-button-background-brighter"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent default form submission
          const form = e.currentTarget.closest("form");
          if (form) {
            form.dispatchEvent(new Event("submit", { bubbles: true }));
          }
        }
      }}
    />
  );
});
