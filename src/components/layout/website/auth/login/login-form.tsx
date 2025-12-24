"use client";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {  useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { fmt } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useTranslation } from "@/providers/translation-provider";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";
import BiggerWave from "../../home/svgs/bigger-wave";
import { FormInput } from "@/components/layout/custom/form-input";
import { useLogin } from "@/hooks/api-hooks/auth/auth-hooks";
interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export function LoginForm({ children, className, lang, ...props }: Props) {
  const dict = useTranslation().loginPage;
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const loginSchema = z.object({
    email: z
      .email(dict.schemaErrors.email.invalid)
      .min(5, fmt(dict.schemaErrors.email.min, { min: 5 }))
      .max(32, fmt(dict.schemaErrors.email.max, { max: 32 })),
    password: z
      .string()
      .min(8, fmt(dict.schemaErrors.password.min, { min: 8 }))
      .max(100, fmt(dict.schemaErrors.password.max, { max: 100 })),
  });
  
  const { mutate, isPending } = useLogin({
    onSuccess: async () => {
      setError("");
      toast.success(dict.toast.loginSuccess);
      await queryClient.invalidateQueries({ queryKey: ["currentLoggedUser"] });
      router.push(`/${lang}/`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(dict.toast.loginError);
      setError(
        err.error.message +
          `${err.error.code ? " (Code:" + err.error.code + ")" : ""}`
      );
    },
  });
  
  useCurrentLoggedUser();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  function onSubmit(data: z.infer<typeof loginSchema>) {
    mutate(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-background m-2 rounded-2xl">
        <Card className="px-0 md:p-6 py-4 md:py-10 relative z-20 overflow-hidden bg-primary/10">
          <BiggerWave lang={lang} />
          <CardHeader className="flex flex-row w-full justify-between relative z-20 ">
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
                <FormInput
                  name="email"
                  control={form.control}
                  label={dict.fields.email.label}
                  placeholder={dict.fields.email.placeholder}
                  type="email"
                />

                {/* Password */}
                <FormInput
                  name="password"
                  control={form.control}
                  label={dict.fields.password.label}
                  placeholder={"********"}
                  type="password"
                />

                {/* Submit */}
                <Field>
                  <div className="min-h-5">
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
                    {dict.actions.noAccount}{" "}
                    <Link href={`/${lang}/auth/register`}>
                      {dict.actions.register}
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
