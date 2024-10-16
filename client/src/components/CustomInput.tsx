import { ReactNode } from "react";
import { Input } from "./ui/input";

const CustomInput = ({
  children,
  placeholder,
  type,
  value,
  changeHandler,
  name,
}: {
  children: ReactNode;
  placeholder: string;
  type: string;
  value: string | number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => {
  return (
    <div className="relative w-full">
      {children}
      <Input
        className="pl-8 bg-gray-100 border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={changeHandler}
        name={name}
      />
    </div>
  );
};

export default CustomInput;
