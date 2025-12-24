"use client";
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
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";

import { FormInput } from "@/components/layout/custom/form-input";
import { FormTextarea } from "@/components/layout/custom/form-textarea";
import BiggerWave from "../../home/svgs/bigger-wave";
import { FormSelect } from "@/components/layout/custom/form-select";
import { FormDatePicker } from "@/components/layout/custom/form-data-picker";
import { Spinner } from "@/components/ui/spinner";
import { useCompleteYourProfile } from "@/hooks/api-hooks/user/user-hooks";

interface Props extends React.ComponentProps<"div"> {
  lang: Lang;
  children?: React.ReactNode;
}

export default function CompleteProfileForm({
  children,
  className,
  lang,
  ...props
}: Props) {
  const dict = useTranslation().completeProfilePage;
  const [error, setError] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useCompleteYourProfile({
    onSuccess: () => {
      toast.success(dict.toast.success);
      router.push(`/${lang}/feeds`);
    },
    onError: (err) => {
      toast.error(dict.toast.error);
      setError(err?.error?.message ?? dict.toast.error);
    },
  });

  const completeProfileSchema = z.object({
    bio: z
      .string()
      .max(500, fmt(dict.schemaErrors.bio.max, { max: 500 }))
      .optional(),

    website: z
      .url(dict.schemaErrors.website.invalid)
      .max(100, fmt(dict.schemaErrors.website.max, { max: 100 }))
      .optional()
      .or(z.literal("")),

    location: z
      .string()
      .max(100, fmt(dict.schemaErrors.location.max, { max: 100 }))
      .optional(),

    gender: z
      .enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"], {
        message: dict.schemaErrors.gender.invalid,
      })
      .optional(),

    dateOfBirth: z.iso
      .datetime()
      .optional()
      .nullable()
      .refine(
        (val) => {
          if (!val) return true;
          const dob = new Date(val);
          if (isNaN(dob.getTime())) return false;

          const now = new Date();
          const ageDiffMs = now.getTime() - dob.getTime();
          const ageDate = new Date(ageDiffMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return age >= 18 && age <= 100;
        },
        {
          message: dict.schemaErrors.dateOfBirth.invalid,
        }
      ),
  });

  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      bio: "",
      website: "",
      location: "",
      gender: undefined,
      dateOfBirth: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof completeProfileSchema>) {
    mutate(data);
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="bg-background m-2 rounded-2xl">
        <Card className="px-0 md:p-6 py-4 md:py-5 relative z-20 overflow-hidden bg-primary/10">
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
          <CardContent className="w-full relative z-20 mt-10">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-1">
                {/* Bio */}
                <FormTextarea
                  name="bio"
                  control={form.control}
                  label={dict.fields.bio.label}
                  placeholder={dict.fields.bio.placeholder}
                  className="min-h-[60px]"
                />

                <div className="flex flex-row gap-2">
                  {/* Website */}
                  <FormInput
                    name="website"
                    control={form.control}
                    label={dict.fields.website.label}
                    placeholder={dict.fields.website.placeholder}
                  />

                  {/* Location */}
                  <FormInput
                    name="location"
                    control={form.control}
                    label={dict.fields.location.label}
                    placeholder={dict.fields.location.placeholder}
                    type="text"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  {/* Gender */}
                  <FormSelect
                    name="gender"
                    control={form.control}
                    label={dict.fields.gender.label}
                    placeholder={dict.fields.gender.placeholder}
                    lang={lang}
                    options={[
                      { value: "MALE", label: dict.fields.gender.options.male },
                      {
                        value: "FEMALE",
                        label: dict.fields.gender.options.female,
                      },
                      {
                        value: "OTHER",
                        label: dict.fields.gender.options.other,
                      },
                      {
                        value: "PREFER_NOT_TO_SAY",
                        label: dict.fields.gender.options.preferNotToSay,
                      },
                    ]}
                  />

                  {/* Date of Birth */}
                  <FormDatePicker
                    name="dateOfBirth"
                    control={form.control}
                    label={dict.fields.dateOfBirth.label}
                    placeholder={dict.fields.dateOfBirth.placeholder}
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
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Spinner />
                    ) : (
                      <span>{dict.actions.submit}</span>
                    )}
                  </Button>
                  <FieldDescription className="text-center">
                    {dict.actions.skip}{" "}
                    <Link href={`/${lang}/feeds`}>{dict.actions.skipLink}</Link>
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
