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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/providers/translation-provider";
import Link from "next/link";
import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";

interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export function RegisterForm({ className, children, lang, ...props }: Props) {
  const dict = useTranslation().registerPage;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-background m-2 rounded-2xl">
        <Card className="px-0 md:p-6 py-4 md:py-10 relative z-20 overflow-hidden bg-primary/10">
          <svg
            className={`absolute top-0 ${
              isRTL(lang)
                ? "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] right-0 top-0 md:-top-6 lg:-top-18 xl:-top-24"
                : "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] left-0 top-0 md:-top-6 lg:-top-18 xl:-top-24"
            } z-10 ${
              isRTL(lang) ? "transform scale-x-[-1]" : "transform scale-x-[1]"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#614afc"
              fillOpacity="1"
              d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </svg>
          <CardHeader className="flex flex-row w-full justify-between relative z-20">
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              {children /* Logo or any custom header content */}
              <CardTitle className="text-2xl md:text-4xl">
                {dict.title}
              </CardTitle>
              <CardDescription className="text-foreground">
                {dict.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="w-full relative z-20 mt-5">
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">
                    {dict.fields.email.label}
                  </FieldLabel>
                  <Input
                    className="bg-foreground/10"
                    id="email"
                    type="email"
                    placeholder={dict.fields.email.placeholder}
                    required
                  />
                </Field>
                <Field className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">
                      {dict.fields.fullName.label}
                    </FieldLabel>
                    <Input
                      className="bg-foreground/10"
                      id="name"
                      type="text"
                      placeholder={dict.fields.fullName.placeholder}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="userName">
                      {dict.fields.userName.label}
                    </FieldLabel>
                    <Input
                      className="bg-foreground/10"
                      id="userName"
                      type="text"
                      placeholder={dict.fields.userName.placeholder}
                      required
                    />
                  </Field>
                </Field>
                <Field>
                  <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">
                        {dict.fields.password.label}
                      </FieldLabel>
                      <Input
                        className="bg-foreground/10"
                        id="password"
                        type="password"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        {dict.fields.confirmPassword.label}
                      </FieldLabel>
                      <Input
                        className="bg-foreground/10"
                        id="confirm-password"
                        type="password"
                        required
                      />
                    </Field>
                  </Field>
                </Field>
                <Field>
                  <Button type="submit">{dict.actions.submit}</Button>
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
