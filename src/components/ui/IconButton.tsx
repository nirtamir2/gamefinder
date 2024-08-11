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
      className="flex items-center space-x-4 rounded-lg"
    >
      <Icon name={iconName} height={20} width={20} className="text-white" />
      <div className="text-white underline" style={{ fontSize: "13px" }}>
        {children}
      </div>
    </button>
  );
});
