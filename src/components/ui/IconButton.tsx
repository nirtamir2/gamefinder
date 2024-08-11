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
      className="flex items-center gap-4 rounded-lg"
    >
      <Icon
        name={iconName}
        height={20}
        width={20}
        className="min-w-max text-white"
      />
      <div className="text-sm text-white underline">{children}</div>
    </button>
  );
});
