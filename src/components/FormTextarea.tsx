import { memo } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

type FormTextareaProps = {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  rows?: number;
};

function FormTextarea({
  label,
  error,
  registration,
  placeholder,
  rows = 3,
}: FormTextareaProps) {
  return (
    <div>
      <label className="form-label">{label}</label>

      <textarea
        className="form-control"
        rows={rows}
        placeholder={placeholder}
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

export default memo(FormTextarea);