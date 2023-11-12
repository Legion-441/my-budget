//* MUI & Icons
import {
  Cottage,
  DirectionsCar,
  Fastfood,
  Groups,
  Kayaking,
  Luggage,
  Person,
  Sailing,
  School,
  SportsBasketball,
  TwoWheeler,
  Work,
} from "@mui/icons-material";

export const ICON_COMPONENT_DICTIONARY = {
  person: Person,
  cottage: Cottage,
  school: School,
  luggage: Luggage,
  groups: Groups,
  work: Work,
  directionsCar: DirectionsCar,
  twoWheeler: TwoWheeler,
  fastfood: Fastfood,
  sportsBasketball: SportsBasketball,
  kayaking: Kayaking,
  sailing: Sailing,
} as const;
type IconMapping = Record<string, React.ElementType>;
export const VALIDATED_ICON_MAPPING: IconMapping = ICON_COMPONENT_DICTIONARY;

export const FIREBASE_COLLECTIONS = {
  accounts: "accounts",
  budgets: "budgets",
  users: "users",
} as const;

export const APP_THEME_OPTIONS = ["system", "dark", "light"] as const;
