import * as yup from "yup";

export const loginSchema = (t: any) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validations.invalid", { attribute: t("attributes.email") }))
      .required(t("validations.required", { attribute: t("attributes.email") })),
    password: yup
      .string()
      .required(t("validations.required", { attribute: t("attributes.password") }))
      .min(8, t("validations.min_char", { attribute: t("attributes.password"), min: 8 })),
  });
};

export const registerSchema = (t: any) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validations.invalid", { attribute: t("attributes.email") }))
      .required(t("validations.required", { attribute: t("attributes.email") })),
    password: yup
      .string()
      .required(t("validations.required", { attribute: t("attributes.password") }))
      .min(8, t("validations.min_char", { attribute: t("attributes.password"), min: 8 })),
    password_confirmation: yup
      .string()
      .required(t("validations.required", { attribute: t("attributes.password_confirmation") }))
      .oneOf(
        [yup.ref("password")],
        t("validations.not_match", {
          attribute1: t("attributes.password_confirmation"),
          attribute2: t("attributes.password"),
        }),
      ),
  });
};
