"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationsPausedIcon from "@mui/icons-material/NotificationsPaused";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ApiIcon from "@mui/icons-material/Api";

const links = [
  { name: "Zod validation", href: "/", icon: NotificationsPausedIcon },
  {
    name: "Yup validation",
    href: "/yup",
    icon: CurrencyYenIcon,
  },
  { name: "React Hook Form", href: "/rhf", icon: ChecklistIcon },
  { name: "RHF & Controller", href: "/rhfctrl", icon: ChecklistRtlIcon },
  {
    name: "RHF backend validated",
    href: "/rhfbackend",
    icon: ApiIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-700 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "border border-solid border-green-700 text-green-700":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
