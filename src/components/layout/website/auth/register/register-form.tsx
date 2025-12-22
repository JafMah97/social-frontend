"use client";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { fmt } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useTranslation } from "@/providers/translation-provider";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/api-hooks/auth/useRegister";
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import { FormInput } from "../../../custom/form-input";
import { useQueryClient } from "@tanstack/react-query";
import BiggerWave from "../../home/svgs/bigger-wave";

interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export function RegisterForm({ children, className, lang, ...props }: Props) {
  const dict = useTranslation().registerPage;
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const registerSchema = z
    .object({
      email: z
        .email(dict.schemaErrors.email.invalid)
        .min(5, fmt(dict.schemaErrors.email.min, { min: 5 }))
        .max(32, fmt(dict.schemaErrors.email.max, { max: 32 })),
      password: z
        .string()
        .min(8, fmt(dict.schemaErrors.password.min, { min: 8 }))
        .max(50, fmt(dict.schemaErrors.password.max, { max: 50 })),
      confirmPassword: z
        .string()
        .min(8, fmt(dict.schemaErrors.password.min, { min: 8 }))
        .max(50, fmt(dict.schemaErrors.password.max, { max: 50 })),
      fullName: z
        .string()
        .min(4, fmt(dict.schemaErrors.fullName.min, { min: 4 }))
        .max(50, fmt(dict.schemaErrors.fullName.max, { max: 50 })),
      username: z
        .string()
        .min(4, fmt(dict.schemaErrors.userName.min, { min: 4 }))
        .max(50, fmt(dict.schemaErrors.userName.max, { max: 50 }))
        .regex(/^[a-zA-Z0-9_]+$/, dict.schemaErrors.userName.invalid),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: dict.schemaErrors.confirmPassword,
    });

  const { mutate, isPending } = useRegister({
    onSuccess: async () => {
      setError("");
      toast.success(dict.toast.success);
      await queryClient.invalidateQueries({
        queryKey: ["currentLoggedUser"],
      });

      router.push(`/${lang}/user/upload-images`);
    },
    onError: (err) => {
      toast.error(dict.toast.error);
      setError(
        err.error.message +
          `${err.error.code ? " (Code:" + err.error.code + ")" : ""}`
      );
    },
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullName: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = data;
    mutate(payload);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-background m-2 rounded-2xl">
        <Card className="px-0 md:p-6 pt-4 md:pt-10 relative z-20 overflow-hidden bg-primary/10">
          <BiggerWave lang={lang}/>
          <CardHeader className="flex flex-row w-full justify-between relative z-20">
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              {children}
              <CardTitle className="text-2xl md:text-4xl">
                {dict.title}
              </CardTitle>
              <CardDescription className="text-foreground">
                {dict.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="w-full relative z-20 mt-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-1">
                {/* Email */}
                <FormInput<z.infer<typeof registerSchema>>
                  name="email"
                  control={form.control}
                  label={dict.fields.email.label}
                  placeholder={dict.fields.email.placeholder}
                />

                <div className="flex flex-col md:flex-row md:gap-3">
                  {/* Full Name */}
                  <FormInput<z.infer<typeof registerSchema>>
                    name="fullName"
                    control={form.control}
                    label={dict.fields.fullName.label}
                    placeholder={dict.fields.fullName.placeholder}
                    type="text"
                  />

                  {/* User Name */}
                  <FormInput<z.infer<typeof registerSchema>>
                    name="username"
                    control={form.control}
                    label={dict.fields.userName.label}
                    placeholder={dict.fields.userName.placeholder}
                    type="text"
                  />
                </div>

                <div className="flex flex-col md:flex-row md:gap-3">
                  {/* Password */}
                  <FormInput<z.infer<typeof registerSchema>>
                    name="password"
                    control={form.control}
                    label={dict.fields.password.label}
                    placeholder={"********"}
                    type="password"
                  />

                  {/* Confirm Password */}
                  <FormInput<z.infer<typeof registerSchema>>
                    name="confirmPassword"
                    control={form.control}
                    label={dict.fields.confirmPassword.label}
                    placeholder={"********"}
                    type="password"
                  />
                </div>

                {/* Submit */}
                <Field>
                  <div className="min-h-4">
                    {error && (
                      <p className="text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}
                  </div>
                  <Button disabled={isPending} className="cursor-pointer">
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <span>{dict.actions.submit}</span>
                    )}
                  </Button>
                  <FieldDescription className="text-center">
                    {dict.actions.alreadyHave}{" "}
                    <Link href={`/${lang}/auth/login`}>
                      {dict.actions.signIn}
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
