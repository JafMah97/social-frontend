import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  className,
  rows = 4,
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            className={className}
            rows={rows}
            aria-invalid={fieldState.invalid}
          />
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
