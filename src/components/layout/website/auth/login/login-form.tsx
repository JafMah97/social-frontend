"use client";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fmt, isRTL } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useTranslation } from "@/providers/translation-provider";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/api-hooks/auth/useLogin";
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";
interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export function LoginForm({ children, className, lang, ...props }: Props) {
  const dict = useTranslation().loginPage;
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
          <svg
            className={`absolute ${
              isRTL(lang)
                ? "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] right-0 top-0 lg:-top-15 xl:-top-22"
                : "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] left-0 top-0 lg:-top-15 xl:-top-22"
            } z-10 ${
              !isRTL(lang) ? "transform scale-x-[1]" : "transform scale-x-[-1]"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#614afc"
              fillOpacity="1"
              d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
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
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">
                        {dict.fields.email.label}
                      </FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder={dict.fields.email.placeholder}
                        className="bg-foreground/10"
                        aria-invalid={fieldState.invalid}
                      />
                      <div className="min-h-5">
                        {fieldState.invalid && (
                          <FieldError
                            className="text-xs"
                            errors={[fieldState.error]}
                          />
                        )}
                      </div>
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">
                        {dict.fields.password.label}
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="bg-foreground/10"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align={"inline-end"}>
                          <Button
                          type="button"
                            variant={"ghost"}
                            onClick={(e) => {
                              e.preventDefault();
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeClosed className="w-5 h-5" />
                            )}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>

                      <div className="w-full flex flex-row justify-between">
                        <div className="min-h-5">
                          {fieldState.invalid && (
                            <FieldError
                              className="text-xs"
                              errors={[fieldState.error]}
                            />
                          )}
                        </div>
                        <Link
                          href={`/${lang}/auth/forgot-password`}
                          className="hover:text-primary underline text-xs text-end text-muted-foreground"
                        >
                          {dict.actions.forgotPassword}
                        </Link>
                      </div>
                    </Field>
                  )}
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
