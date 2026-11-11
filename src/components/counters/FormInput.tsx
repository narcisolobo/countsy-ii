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
      <label className="text-sm font-medium" htmlFor={name}>
        <span className="capitalize">{label}:</span>
      </label>
      <input
        id={name}
        className="ui-input"
        type={type}
        required
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
      />
      <div className="text-ink-muted text-sm">
        {error?.message ? error.message : placeholder}
      </div>
    </div>
  );
}

export default FormInput;
