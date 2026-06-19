import { memo } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

type FormInputProps = {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
  maxLength?: number;
};

function FormInput({
  label,
  error,
  registration,
  type = "text",
  placeholder,
  maxLength,
}: FormInputProps) {
  return (
    <div>
      <label className="form-label">{label}</label>

      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...registration}
      />

      {error && (
        <p className="text-danger small mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default memo(FormInput);