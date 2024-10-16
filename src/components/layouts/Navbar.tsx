"use client";

import React from "react";
import { AuthDialog } from "./AuthDialog";
import { UserButton } from "./UserButton";
import { Button } from "../ui/button";
import { Link, usePathname } from "@/hooks/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "../commons/Logo";
import { cn } from "@/lib/utils";

export const Navbar = ({ profile }: { profile: ProfileType }) => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <Link href={"/"}>
        <Logo className="h-8" />
      </Link>
      {profile ? (
        <div className="flex justify-between gap-6 sm:w-3/4 w-full">
          <div className="sm:hidden block" />
          <div className="sm:flex hidden">
            <Button asChild variant={"link"} className={cn(pathname === "/app-name" && "underline")}>
              <Link href={"/app-name"}>{t("titles.app-name")}</Link>
            </Button>
            <Button asChild variant={"link"} className={cn(pathname === "/contact" && "underline")}>
              <Link href={"/contact"}>{t("titles.contact")}</Link>
            </Button>
            <Button asChild variant={"link"} className={cn(pathname === "/others" && "underline")}>
              <Link href={"/others"}>{t("titles.others")}</Link>
            </Button>
          </div>
          <UserButton profile={profile} />
        </div>
      ) : (
        <AuthDialog />
      )}
    </nav>
  );
};
