import { type FormInputProps } from "@/types/FormInputProps";

function FormInput({
  type,
  placeholder,
  name,
  label,
  register,
  error,
  valueAsNumber,
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
        aria-describedby={`${name}-hint`}
        type={type}
        required
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
      />
      <div
        id={`${name}-hint`}
        className={error ? "text-ink font-semibold" : "text-ink-muted text-sm"}
      >
        {error?.message ? error.message : placeholder}
      </div>
    </div>
  );
}

export default FormInput;
