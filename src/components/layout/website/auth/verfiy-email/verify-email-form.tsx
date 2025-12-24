"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useTranslation } from "@/providers/translation-provider";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentLang } from "@/hooks/useCurrentLang";
import { Spinner } from "@/components/ui/spinner";
import ResendButton from "./resend-button";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";
import { useResendVerifyCode, useVerifyEmailWithCode } from "@/hooks/api-hooks/auth/auth-hooks";

interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
  email: string;
}

export default function VerifyEmailCode({
  children,
  className,
  email,
  ...props
}: Props) {
  const dict = useTranslation().verifyEmailPage;
  if (!email) {
    throw Error("email not Found");
  }
  const router = useRouter();
  const [error, setError] = useState("");
  const lang = useCurrentLang();
  const queryClient = useQueryClient();

  useCurrentLoggedUser();

  // Zod schema for OTP (exactly 6 digits)
  const otpSchema = z.object({
    code: z
      .string(dict.fields.otp.invalid)
      .min(6, dict.fields.otp.invalid)
      .max(6, dict.fields.otp.invalid)
      .regex(/^\d{6}$/, dict.fields.otp.invalid),
  });

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const { mutate, isPending } = useVerifyEmailWithCode({
    onSuccess: async () => {
      setError("");
      toast.success(dict.toast.success);
      await queryClient.invalidateQueries({
        queryKey: ["currentLoggedUser"],
      });

      router.push(`/${lang}/feeds`);
    },
    onError: (err) => {
      toast.error(dict.toast.error);
      setError(
        err.error.message +
          `${err.error.code ? " (Code:" + err.error.code + ")" : ""}`
      );
    },
  });

  const { mutate: resendMutate } = useResendVerifyCode({
    onSuccess: () => {
      setError("");
      toast.success(dict.toast.successResend);
    },
    onError: (err) => {
      toast.error(dict.toast.errorResend);
      setError(
        err.error.message +
          `${err.error.code ? " (Code:" + err.error.code + ")" : ""}`
      );
    },
  });

  function onSubmit(data: z.infer<typeof otpSchema>) {
    mutate({ code: data.code, email: email });
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen w-full px-4",
        className
      )}
      {...props}
    >
      <Card className="relative z-20 overflow-hidden w-full max-w-lg mx-2 bg-background">
        {/* Wavy SVG background */}
        <svg
          className="absolute w-[1230px] right-0 top-0 lg:-top-15 xl:-top-22 z-10 transform scale-x-[-1] pointer-events-none select-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#614afc"
            fillOpacity="1"
            d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>

        <CardHeader className="flex flex-col items-center text-center relative z-20">
          {children}
          <CardTitle className="text-2xl md:text-4xl">{dict.title}</CardTitle>
          <CardDescription className="text-foreground">
            {dict.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full relative z-20 mt-8">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="otp" className="sr-only">
                        {dict.fields.otp.label}
                      </FieldLabel>

                      {/* Single input replacing the shadcn OTP slots */}
                      <div className="flex justify-center">
                        <Input
                          id="otp"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength={6}
                          {...field}
                          onChange={(e) => {
                            // keep only digits and limit to 6 chars
                            const digits = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);
                            field.onChange(digits);
                          }}
                          value={field.value}
                          className="w-[18rem] max-w-full sm:w-80 text-center font-mono text-lg sm:text-2xl tracking-widest py-7 px-4 rounded-md border bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary transition"
                          placeholder="● ● ● ● ● ●"
                          aria-invalid={fieldState.invalid ? "true" : "false"}
                        />
                      </div>

                      <div className="min-h-4 text-center mt-2">
                        {fieldState.error && (
                          <FieldError
                            className="text-xs"
                            errors={[fieldState.error]}
                          />
                        )}
                      </div>

                      <FieldDescription className="text-center mt-2">
                        {dict.fields.otp.hint}
                      </FieldDescription>
                    </Field>
                  </div>
                )}
              />
              <div className="min-h-4">
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>

              <Button disabled={isPending} className="cursor-pointer">
                {isPending ? <Spinner /> : <span>{dict.actions.submit}</span>}
              </Button>

              <FieldDescription className="text-center mt-3">
                {dict.actions.resendPrompt}{" "}
                <ResendButton
                  label={dict.actions.resend}
                  cooldownSeconds={60}
                  className="text-primary underline disabled:opacity-50"
                  onClick={() => {
                    resendMutate({ email });
                    console.log("Resend clicked for:", email);
                  }}
                />
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
