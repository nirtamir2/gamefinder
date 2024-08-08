import type { SVGProps } from "react";
import { iconSpritePath } from "@/components/ui/icons/iconSpritePath";
// Configure this path in your tsconfig.json
import type { IconName } from "@/components/ui/icons/name";

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props}>
      <use href={`${iconSpritePath}#${name}`} />
    </svg>
  );
}

export { type IconName } from "@/components/ui/icons/name";
