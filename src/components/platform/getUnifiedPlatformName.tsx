export function getUnifiedPlatformName(platform: string) {
  switch (platform) {
    case "wii-u":
    case "nintendo-3ds'":
    case "nintendo-switch": {
      return "Nintendo";
    }
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
    case "xbox-series-x":
    case "xbox360": {
      return "Xbox";
    }
    case "playstation5":
    case "playstation4":
    case "playstation3":
    case "playstation2":
    case "ps-vita": {
      return "PlayStation";
    }
  }
  return null;
}
