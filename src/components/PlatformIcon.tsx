import { Icon } from "@/components/ui/icons/Icon";
import type { IconName } from "@/components/ui/icons/name";

export function getUnifiedPlatformName(platform: string) {
  switch (platform) {
    case "macos": {
      return "macOS";
    }
    case "ios": {
      return "iOS";
    }
    case "android": {
      return "Android";
    }
    case "pc": {
      return "PC";
    }
    case "xbox-old":
    case "xbox-one":
    case "xbox360": {
      return "Xbox";
    }
    case "playstation4":
    case "playstation3":
    case "playstation2": {
      return "PlayStation";
    }
  }
  return null;
}

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

export function PlatformIcon(props: { platform: string }) {
  const { platform } = props;
  const iconName = platformToIcon[platform];
  if (iconName == null) {
    return null;
  }
  return (
    <div className="min-w-max" title={iconName}>
      <div className="sr-only">{platform}</div>
      <Icon name={iconName} height={24} width={24} className="text-white" />
    </div>
  );
}

/**
 *
 * <Image
 *                             height={56}
 *                             width={56}
 *                             src={
 *                               platform.platform.image ??
 *                               platform.platform.image_background
 *                             }
 *                             alt={platform.platform.name}
 *                           />
 */
