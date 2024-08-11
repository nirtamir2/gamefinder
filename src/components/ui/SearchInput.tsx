import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { Icon } from "@/components/ui/icons/Icon";

export const SearchInput = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "className">
>(({ type = "input", ...props }, ref) => {
  return (
    <div className="group relative w-full">
      <input
        ref={ref}
        type={type}
        {...props}
        className="w-full resize-none appearance-none rounded-full bg-button-background py-4 pl-6 pr-14 text-white transition duration-200 placeholder:text-gray-500 focus:bg-button-background-brighter"
      />
      <div className="absolute right-3 top-0 flex h-full items-center">
        <button type="submit" className="rounded-full p-3">
          <Icon
            name="search"
            className="text-gray-500 transition-colors group-hover:text-white"
            height={16}
            width={16}
          />
          <span className="sr-only">Submit</span>
        </button>
      </div>
    </div>
  );
});
