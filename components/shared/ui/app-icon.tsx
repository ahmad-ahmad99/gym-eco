import type { SvgIconProps } from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const icons = {
  search: SearchIcon,
  heart: FavoriteBorderIcon,
  cart: ShoppingCartOutlinedIcon,
  user: PersonOutlineIcon,
  chevronDown: KeyboardArrowDownIcon,
  chevronUp: KeyboardArrowUpIcon,
  navChevronDown: ExpandMoreIcon,
  navChevronUp: ExpandLessIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  truck: LocalShippingOutlinedIcon,
  return: ReplayOutlinedIcon,
  help: HelpOutlineIcon,
  compare: CompareArrowsIcon,
  share: ShareOutlinedIcon,
  location: LocationOnOutlinedIcon,
  phone: CallOutlinedIcon,
  email: EmailOutlinedIcon,
  settings: SettingsOutlinedIcon,
  close: CloseIcon,
  plus: AddIcon,
  minus: RemoveIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  fire: LocalFireDepartmentOutlinedIcon,
  visibility: VisibilityOutlinedIcon,
  zoom: ZoomInOutlinedIcon,
  navPrev: NavigateBeforeIcon,
  navNext: NavigateNextIcon,
} as const;

export type AppIconName = keyof typeof icons;

type AppIconProps = SvgIconProps & {
  name: AppIconName;
};

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = icons[name];
  return <Icon fontSize="small" {...props} />;
}
