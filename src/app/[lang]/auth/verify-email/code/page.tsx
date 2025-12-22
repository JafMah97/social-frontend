import Logo from "@/components/layout/header/logo";
import VerifyEmailCode from "@/components/layout/website/auth/verfiy-email/verify-email-form";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ email: string }>;
}) {
  const lang = (await params).lang;
  const dict = (await getDictionary(lang)).logo;
  const email = (await searchParams).email;
  return (
    <div className="home-image h-fit">
      <div className="bg-background/40 backdrop-blur-md h-fit">
        <div className=" flex flex-col items-center justify-start gap-6 py-2">
          <div className="flex mx-2 w-full flex-col gap-6">
            <VerifyEmailCode lang={lang} email={email}>
              <Logo dict={dict} lang={lang} colorInverted />
            </VerifyEmailCode>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <InputOTP maxLength={6} id="otp" required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <Button type="submit">Verify</Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
