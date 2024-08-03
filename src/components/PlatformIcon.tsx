import { Icon } from "@/components/ui/icons/Icon";
import type { IconName } from "@/components/ui/icons/name";

const platformToIcon: Record<string, IconName> = {
  Android: "android" as const,
  macOS: "macos" as const,
  iOS: "ios" as const,
  PlayStation: "playstation" as const,
  PC: "windows" as const,
  Xbox: "xbox" as const,
} satisfies Record<
  NonNullable<ReturnType<typeof getUnifiedPlatformName>>,
  string
>;

const iconSize = 20;

export function PlatformIcon(props: { platform: string }) {
  const { platform } = props;
  const iconName = platformToIcon[platform];
  if (iconName == null) {
    return null;
  }
  return (
    <div className="min-w-max" title={iconName}>
      <div className="sr-only">{platform}</div>
      <Icon
        name={iconName}
        height={iconSize}
        width={iconSize}
        className="text-white"
      />
    </div>
  );
}

/**
 *
 * <Image
 *                             height={56}
 *                             width={56}
 *                             src={
 *                               platforms.platforms.image ??
 *                               platforms.platforms.image_background
 *                             }
 *                             alt={platforms.platforms.name}
 *                           />
 */
