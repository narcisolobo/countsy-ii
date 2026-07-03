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
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}:</span>
      </label>
      <input
        id={name}
        className="input w-full"
        type={type}
        required
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
      />
      <div className="validator-hint">
        {error?.message ? error.message : placeholder}
      </div>
    </div>
  );
}

export default FormInput;
