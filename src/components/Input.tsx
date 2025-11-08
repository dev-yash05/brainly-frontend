interface InputProps {
    ref?: any;
    placeholder: string;
}

export function Input({ref, placeholder }: InputProps) {
  return (
    <div>
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        name=""
        id=""
        className="px-4 py-2 border rounded m-2"
      />
    </div>
  );
}
