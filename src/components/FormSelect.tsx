import { memo } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

type SelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  options: SelectOption[];
  placeholder?: string;
};

function FormSelect({
  label,
  error,
  registration,
  options,
  placeholder,
}: FormSelectProps) {
  return (
    <div>
      <label className="form-label">{label}</label>

      <select
        className="form-select"
        {...registration}
      >
        {placeholder && (
            <option value="" disabled>
                {placeholder}
            </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-danger small mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default memo(FormSelect);