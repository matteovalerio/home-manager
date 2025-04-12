import {
  BiCategory,
  BiEdit,
  BiPlus,
  BiHome,
  BiLabel,
  BiUser,
} from "react-icons/bi";
import { BsGear } from "react-icons/bs";

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
      return <BiHome />;
    case "settings":
      return <BsGear />;
    case "item":
      return <BiLabel />;
    case "user":
      return <BiUser />;
  }
}
