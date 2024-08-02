import type { SVGProps } from "react";
// Configure this path in your tsconfig.json
import type { IconName } from "@/components/ui/icons/name";

// Be sure to configure the icon generator to output to the public folder
const href = "/icons/sprite.svg";

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props}>
      <use href={`${href}#${name}`} />
    </svg>
  );
}

export { type IconName } from "@/components/ui/icons/name";
