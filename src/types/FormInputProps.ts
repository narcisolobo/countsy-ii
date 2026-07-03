import { type FieldError, type UseFormRegister } from "react-hook-form";
import { type CounterFormValues } from "@/lib/counter-schema";

export type FormInputProps = {
  type: string;
  placeholder: string | undefined;
  name: "title" | "goal" | "value";
  label: string;
  register: UseFormRegister<CounterFormValues>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};
