import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          {type === "password" ? (
            <InputGroup>
              <InputGroupInput
                {...field}
                id={name}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={className ?? "bg-foreground/10"}
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  variant="ghost"
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
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={className ?? "bg-foreground/10"}
              aria-invalid={fieldState.invalid}
            />
          )}

          <div className="min-h-5">
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </div>
        </Field>
      )}
    />
  );
}
