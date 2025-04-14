import { ChevronLeft, ChevronRight, Home, Settings } from "lucide-react";
import { BiCategory, BiEdit, BiLabel, BiPlus, BiUser } from "react-icons/bi";

type IconName =
  | "category"
  | "edit"
  | "add"
  | "home"
  | "settings"
  | "item"
  | "user"
  | "chevronLeft"
  | "chevronRight";

type IconVariant = "normal" | "large" | "small";

export function Icon(props: { icon: IconName; variant?: IconVariant }) {
  const variant = props.variant ?? "normal";
  const size =
    variant === "large"
      ? "size-24"
      : variant === "small"
      ? "size-16"
      : "size-20";

  switch (props.icon) {
    case "category":
      return <BiCategory className="size" />;
    case "edit":
      return <BiEdit className="size" />;
    case "add":
      return <BiPlus className="size" />;
    case "home":
      return <Home className="size" />;
    case "settings":
      return <Settings className="size" />;
    case "item":
      return <BiLabel className="size" />;
    case "user":
      return <BiUser className="size" />;
    case "chevronLeft":
      return <ChevronLeft className="size" />;
    case "chevronRight":
      return <ChevronRight className="size" />;
  }
}
