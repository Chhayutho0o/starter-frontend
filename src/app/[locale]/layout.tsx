import React from "react";
import { getProfile } from "@/actions/auth";
import { Navbar } from "@/components/layouts/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { ProgressBarProvider } from "@/providers";
import { getMessages } from "next-intl/server";
import ToasterProvider from "@/components/ui/toast-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = await getProfile();
  const messges = await getMessages();

  return (
    <NextIntlClientProvider messages={messges}>
      <ProgressBarProvider>
        <div className="min-h-screen">
          <div className="flex w-full h-full">
            <div className="w-full">
              <div className="mx-auto max-w-screen-2xl h-full">
                <Navbar profile={data} />
                <main className="h-full py-8 px-6 flex flex-col">{children}</main>
              </div>
            </div>
          </div>
        </div>
      </ProgressBarProvider>
      <ToasterProvider />
    </NextIntlClientProvider>
  );
}
