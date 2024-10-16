"use client";
import React from "react";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldProps } from "formik";

type PasswordInputProps = InputProps & FieldProps;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, form: { errors, touched, handleSubmit }, field, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isErorr = !!(errors[field.name] && touched[field.name]);
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    return (
      <div className={cn("relative", className)}>
        <Input
          type={showPassword ? "text" : "password"}
          className="pr-10"
          ref={ref}
          isError={isErorr}
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
          {showPassword ? (
            <EyeOff className={cn("size-5", isErorr && "text-red-400")} />
          ) : (
            <Eye className={cn("size-5", isErorr && "text-red-400")} />
          )}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
