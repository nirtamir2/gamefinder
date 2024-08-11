import type { ComponentProps } from "react";
import { forwardRef } from "react";
import type { OmitClassName } from "@/components/ui/OmitClassName";
import { Icon } from "@/components/ui/icons/Icon";
import type { IconName } from "@/components/ui/icons/name";

export const IconButton = forwardRef<
  HTMLButtonElement,
  OmitClassName<ComponentProps<"button">> & { iconName: IconName }
>((props, ref) => {
  const { iconName, children, type = "button", ...restProps } = props;

  return (
    <button
      ref={ref}
      type={type}
      {...restProps}
      className="space-x-4 rounded-lg"
    >
      <Icon
        name={iconName}
        height={24}
        width={24}
        className="inline align-text-top text-white"
      />
      <div className="inline text-sm text-white underline">{children}</div>
    </button>
  );
});
