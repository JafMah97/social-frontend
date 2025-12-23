"use client";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useCurrentLang } from "@/hooks/useCurrentLang";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { CustomCalendar } from "./custom-calendar";

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  className?: string;
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
}: FormDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);
  const lang = useCurrentLang();
  const locale = lang === "ar" ? ar : enUS;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const dateValue = field.value ? new Date(field.value) : undefined;
        const isValidDate =
          dateValue instanceof Date && !isNaN(dateValue.getTime());

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={name}
                  className={className ?? "w-48 justify-between font-normal"}
                  aria-invalid={fieldState.invalid}
                >
                  {isValidDate
                    ? format(dateValue, "PPP", { locale })
                    : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <CustomCalendar
                lang={lang}
                  locale={locale}
                  mode="single"
                  selected={isValidDate ? dateValue : undefined}
                  captionLayout="dropdown"
                  onSelect={(d) => {
                    field.onChange(d ? d.toISOString() : null);
                    setOpen(false);
                  }}
                  disabled={(d) => d > new Date()}
                  startMonth={new Date(1900, 0)}
                  endMonth={new Date(2025, 0)}
                />
              </PopoverContent>
            </Popover>

            <div className="min-h-4">
              {fieldState.invalid && (
                <FieldError className="text-xs" errors={[fieldState.error]} />
              )}
            </div>
          </Field>
        );
      }}
    />
  );
}
