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

const platformToIcon: Record<string, string> = {
  macOS: "macOS",
  iOS: "iOS",
  PC: "PC",
  Xbox: "Xbox",
  Android: "Android",
  PlayStation: "PlayStation",
} satisfies Record<
  NonNullable<ReturnType<typeof getUnifiedPlatformName>>,
  string
>;

export function PlatformIcon(props: { platform: string }) {
  const { platform } = props;
  return platformToIcon[platform];
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
