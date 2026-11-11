import { type FormInputProps } from "@/types/FormInputProps";

function FormInput({
  type,
  placeholder,
  name,
  label,
  register,
  error,
  valueAsNumber,
  required = true,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="ui-label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <input
        id={name}
        className="ui-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-hint` : undefined}
        type={type}
        required={required}
        placeholder={placeholder}
        {...register(
          name,
          valueAsNumber
            ? {
                setValueAs: (v: string | number | null) =>
                  v === "" || v === null ? null : Number(v),
              }
            : {},
        )}
      />
      {error?.message && (
        <div
          id={`${name}-hint`}
          role="alert"
          className="text-ink font-semibold"
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

export default FormInput;
