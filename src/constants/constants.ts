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
//* Types
import { AppBudgetMetaData, BudgetsListItem } from "../types/AppTypes";

export const BUDGET_LIST_ITEM_INITIAL: BudgetsListItem = {
  icon: "none",
  id: "",
  name: "",
  owner: { id: "", username: "" },
};

export const BUDGET_INITIAL: AppBudgetMetaData = {
  ...BUDGET_LIST_ITEM_INITIAL,
  createdAt: 0,
  description: "",
  members: [],
  state: "active",
};

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
