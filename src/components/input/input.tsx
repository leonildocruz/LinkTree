import type { InputHTMLAttributes } from "react";

type IputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: IputProps) {
  return (
    <input
      className="bg-white rounded-md px-2 h-10 outline-none border-0 mb-3"
      {...props}
    />
  );
}
