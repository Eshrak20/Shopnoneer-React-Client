/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/InputField.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  isEditing: boolean;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputField = ({
  label,
  name,
  type = "text",
  isEditing,
  value,
  onChange,
  placeholder
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {isEditing ? (
        <Input
          id={name}
          name={name}
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <p className="text-sm py-2 px-3 rounded-md border border-transparent">
          {value || "Not provided"}
        </p>
      )}
    </div>
  );
};