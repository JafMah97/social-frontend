"use client";

import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { isRTL } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
  lang:Lang
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select",
  className,
  options,
  lang
}: FormSelectProps<T>) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          <Select
          
            name={field.name}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id={name}
              aria-invalid={fieldState.invalid}
              className={className ?? "min-w-[120px]"}
              dir={isRTL(lang) ? "rtl" : "ltr"}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
              position="item-aligned"
              dir={isRTL(lang) ? "rtl" : "ltr"}
            >
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="min-h-4">
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </div>
        </Field>
      )}
    />
  );
}
