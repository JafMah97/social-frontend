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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { isRTL } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";
import { useTranslation } from "@/providers/translation-provider";

interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export function ResetPasswordForm({ children, className, lang, ...props }: Props) {
  const dict = useTranslation().resetPasswordPage;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-background m-2 rounded-2xl">
        <Card className="px-0 md:p-6 py-4 md:py-10 relative z-20 overflow-hidden bg-primary/10">
          <svg
            className={`absolute  ${
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
                {dict.description}{" "}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="w-full relative z-20 mt-8">
            <form>
              <FieldGroup>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="new-password">
                      {dict.fields.newPassword.label}
                    </FieldLabel>
                    <Input
                      className="bg-foreground/10"
                      id="new-password"
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
                <Field>
                  <Button type="submit" className="cursor-pointer">{dict.actions.submit}</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
