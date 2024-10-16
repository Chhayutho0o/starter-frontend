import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "cn", "ja"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
