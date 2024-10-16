"use client";

import React, { useMemo, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { CustomInput } from "../input";
import ErrorMessage from "../commons/ErrorMessage";
import { useTranslations } from "next-intl";
import { PasswordInput } from "../input/PasswordInput";
import { Link } from "@/hooks/navigation";
import { DotSeparator } from "../commons/DotSeparator";
import { Logo } from "../commons/Logo";
import { loginSchema, registerSchema } from "@/validations/auth";
import { login, register } from "@/actions/auth";
import { toast } from "sonner";
import Spinner from "../commons/Spinner";

export const AuthDialog = () => {
  const t = useTranslations();
  const [mode, setMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setTransition] = useTransition();

  const initialValues = useMemo(() => {
    const values: AuthType = {
      email: "",
      password: "",
    };

    if (!mode) {
      values.voucher_code = "";
      values.password_confirmation = "";
    }

    return values;
  }, [mode]);

  const onSubmit = (values: any, actions: FormikHelpers<AuthType>) => {
    setTransition(async () => {
      const { message, status, errors } = mode ? await login(values) : await register(values);
      if (status !== "success") {
        message ? toast.error(message) : actions.setErrors(errors);
        return;
      }

      toast.success(message);
      setIsOpen(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          {t("auth.sign_in")} / {t("auth.sign_up")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={e => e.preventDefault()}>
        <DialogHeader className="flex flex-col items-center py-4">
          <Logo className="h-10" />
        </DialogHeader>

        <Formik
          enableReinitialize
          validationSchema={mode ? loginSchema(t) : registerSchema(t)}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {() => (
            <Form className="space-y-4" autoComplete="new-password">
              {mode ? (
                <>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      name="email"
                      type="email"
                      component={CustomInput}
                      placeholder={t("attributes.email")}
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      name="password"
                      placeholder={t("attributes.password")}
                      component={PasswordInput}
                    />
                    <div className="relative">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      name="email"
                      type="email"
                      component={CustomInput}
                      placeholder={t("attributes.email")}
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      id="password"
                      name="password"
                      component={PasswordInput}
                      placeholder={t("attributes.password")}
                    />
                    <ErrorMessage name="password" />
                  </div>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      name="password_confirmation"
                      component={PasswordInput}
                      placeholder={t("attributes.password_confirmation")}
                    />
                    <ErrorMessage name="password_confirmation" />
                  </div>
                  <div className="grid gap-1">
                    <Field
                      disabled={isPending}
                      name="voucher_code"
                      type="text"
                      component={CustomInput}
                      placeholder={t("attributes.voucher_code")}
                    />
                    <ErrorMessage name="voucher_code" />
                  </div>
                </>
              )}

              <div className="w-full">
                <Button disabled={isPending} type="submit" className="w-full h-12">
                  {isPending ? <Spinner /> : mode ? t("auth.sign_in") : t("auth.sign_up")}
                </Button>
                <DotSeparator className="mt-4" />
                <div className="flex justify-between items-center">
                  <Button type="button" variant={"link"} asChild className="text-muted-foreground px-0">
                    <Link href={"/forget-password"}>{t("auth.forget_password")}</Link>
                  </Button>
                  <button className="text-sm cursor-pointer" type="button" onClick={() => setMode(!mode)}>
                    {!mode ? t("auth.have_account") : t("auth.dont_have_account")}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
