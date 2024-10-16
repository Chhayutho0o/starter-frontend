"use client";

import React from "react";
import { FieldProps } from "formik";
import { useTranslations } from "next-intl";
import { Input, InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CustomInput = ({ field, form: { errors, touched }, ...props }: FieldProps) => {
  const isErorr = !!(errors[field.name] && touched[field.name]);
  return <Input isError={isErorr} {...field} {...props} />;
};

export const CustomTextArea = ({ field, form: {}, ...props }: FieldProps) => {
  return <Textarea {...field} {...props} />;
};

interface CustomSelectProps extends FieldProps {
  options: {
    value: string;
    label: string;
  }[];
  haveColor: boolean;
  placeholder?: string;
}

export const CustomSelect = ({ options, field, form: { setFieldValue }, ...props }: CustomSelectProps) => {
  const t = useTranslations("placeholder");
  return (
    <Select {...field} {...props} value={field.value} onValueChange={(value: any) => setFieldValue(field.name, value)}>
      <SelectTrigger>
        <SelectValue placeholder={props?.placeholder || t("select")} />
      </SelectTrigger>
      <SelectContent
        ref={(ref: any) => {
          if (!ref) return;
          ref.ontouchend = (e: any) => e.preventDefault();
        }}>
        {options.length ? (
          options.map(item => (
            <SelectItem key={item.value} value={item.value}>
              <span>{item.label}</span>
            </SelectItem>
          ))
        ) : (
          <SelectValue placeholder={t("empty")} />
        )}
      </SelectContent>
    </Select>
  );
};

type PasswordInputProps = InputProps & FieldProps;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, form, field, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
        form.handleSubmit();
      }
    };
    return (
      <div className={cn("relative", className)}>
        <Input
          type={showPassword ? "text" : "password"}
          className="pr-10"
          ref={ref}
          onKeyDown={handleKeyDown}
          {...field}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={props?.disabled}
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
