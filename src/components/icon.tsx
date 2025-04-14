import { Home, Settings } from "lucide-react";
import { BiCategory, BiEdit, BiLabel, BiPlus, BiUser } from "react-icons/bi";

type IconName =
  | "category"
  | "edit"
  | "add"
  | "home"
  | "settings"
  | "item"
  | "user";

export function Icon(props: { icon: IconName }) {
  switch (props.icon) {
    case "category":
      return <BiCategory />;
    case "edit":
      return <BiEdit />;
    case "add":
      return <BiPlus />;
    case "home":
      return <Home />;
    case "settings":
      return <Settings />;
    case "item":
      return <BiLabel />;
    case "user":
      return <BiUser />;
  }
}
