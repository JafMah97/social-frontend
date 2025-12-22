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
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FormInput } from "@/components/layout/custom/form-input";
import { FormTextarea } from "@/components/layout/custom/form-textarea";
import BiggerWave from "../../home/svgs/bigger-wave";

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
  type Gender = z.infer<typeof completeProfileSchema>["gender"];

  const completeProfileSchema = z.object({
    bio: z
      .string()
      .max(500, fmt(dict.schemaErrors.bio.max, { max: 500 }))
      .optional(),
    website: z
      .string()
      .url(dict.schemaErrors.website.invalid)
      .max(100, fmt(dict.schemaErrors.website.max, { max: 100 }))
      .optional()
      .or(z.literal("")),
    location: z
      .string()
      .max(100, fmt(dict.schemaErrors.location.max, { max: 100 }))
      .optional(),
    gender: z
      .enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"])
      .refine(
        (val) => ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"].includes(val),
        {
          message: dict.schemaErrors.gender.invalid,
        }
      )
      .optional(),

    dateOfBirth: z
      .date()
      .max(new Date(), dict.schemaErrors.dateOfBirth.future)
      .optional()
      .nullable(),
  });

  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      bio: "",
      website: "",
      location: "",
      gender: undefined,
      dateOfBirth: null,
    },
  });

  function onSubmit(data: z.infer<typeof completeProfileSchema>) {
    console.log("Complete Profile Data:", data);
    // TODO: Add API call here
    toast.success(dict.toast.success);
    router.push(`/${lang}/`);
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
                <Field>
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium mb-1 block"
                  >
                    {dict.fields.bio.label}
                  </label>
                  <FormTextarea
                    name="bio"
                    control={form.control}
                    placeholder={dict.fields.bio.placeholder}
                    className="min-h-[60px]"
                  />
                  {form.formState.errors.bio && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.bio.message}
                    </p>
                  )}
                </Field>
                <div className="flex flex-row gap-2">
                  {/* Website */}
                  <FormInput
                    name="website"
                    control={form.control}
                    label={dict.fields.website.label}
                    placeholder={dict.fields.website.placeholder}
                    type="url"
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
                  <Field>
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium mb-1 block"
                    >
                      {dict.fields.gender.label}
                    </label>
                    <Select
                      value={form.watch("gender") || ""}
                      onValueChange={(value) =>
                        form.setValue("gender", value as Gender)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={dict.fields.gender.placeholder}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">
                          {dict.fields.gender.options.male}
                        </SelectItem>
                        <SelectItem value="FEMALE">
                          {dict.fields.gender.options.female}
                        </SelectItem>
                        <SelectItem value="OTHER">
                          {dict.fields.gender.options.other}
                        </SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          {dict.fields.gender.options.preferNotToSay}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.gender && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.gender.message}
                      </p>
                    )}
                  </Field>

                  {/* Date of Birth */}
                  <Field>
                    <label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium mb-1 block"
                    >
                      {dict.fields.dateOfBirth.label}
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch("dateOfBirth") &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("dateOfBirth") ? (
                            format(form.watch("dateOfBirth")!, "PPP")
                          ) : (
                            <span>{dict.fields.dateOfBirth.placeholder}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.watch("dateOfBirth") || undefined}
                          onSelect={(date) =>
                            form.setValue("dateOfBirth", date || null)
                          }
                          disabled={(date) => date > new Date()}
                          autoFocus
                          captionLayout="dropdown"
                          startMonth={new Date(1900, 0)}
                          endMonth={new Date(2025, 0)}
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </Field>
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
                  <Button type="submit" className="cursor-pointer">
                    <span>{dict.actions.submit}</span>
                  </Button>
                  <FieldDescription className="text-center">
                    {dict.actions.skip}{" "}
                    <Link href={`/${lang}/`}>{dict.actions.skipLink}</Link>
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
