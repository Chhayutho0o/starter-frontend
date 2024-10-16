"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import "../../styles/ErrorServer.css";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("customPage");
  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env == "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container">
        <div className="error-500">
          <h2>Whooos!!!</h2>
          <div className="page-500">
            <p>500</p>
            <span>{t("errorServer")}</span>
          </div>
          <p>{t("somethingWhenWrong")}</p>
          <Link href="/" className="go-back">
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
