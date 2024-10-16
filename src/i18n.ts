import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["cn", "en", "ja"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
