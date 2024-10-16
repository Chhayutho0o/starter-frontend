import { getProfile } from "@/actions/auth";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const { data } = await getProfile();
  if (isEmpty(data)) notFound();

  return children;
}
