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
