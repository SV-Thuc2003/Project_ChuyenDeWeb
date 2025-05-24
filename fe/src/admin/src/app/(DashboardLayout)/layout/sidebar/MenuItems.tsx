import {
  IconHome,
  IconBoxMultiple,
  IconShoppingCart,
  IconUsers,
  IconDiscount,
  IconMail,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Trang chủ",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Quản lý sản phẩm",
    icon: IconBoxMultiple,
    href: "/ui-components/product",
  },
  {
    id: uniqueId(),
    title: "Quản lý đơn hàng",
    icon: IconShoppingCart,
    href: "/ui-components/invoice",
  },
  {
    id: uniqueId(),
    title: "Khách hàng",
    icon: IconUsers,
    href: "/ui-components/customer",
  },
  {
    id: uniqueId(),
    title: "Khuyến mãi",
    icon: IconDiscount,
    href: "/ui-components/promotion",
  },
  {
    id: uniqueId(),
    title: "Hộp thư liên hệ",
    icon: IconMail,
    href: "/ui-components/contact",
  },
  {
    id: uniqueId(),
    title: "Quản lý nhân viên",
    icon: IconUser,
    href: "/ui-components/user",
  },

];

export default Menuitems;
