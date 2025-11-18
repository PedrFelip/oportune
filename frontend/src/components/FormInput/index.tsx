/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { forwardRef } from "react";
import { useMask } from "@react-input/mask";

type InputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "children"
>;

type FormInputProps = {
  id: string;
  label: string;
  className?: string;
  mask?: string;
  replacement?: Record<string, RegExp>;
  error?: string;
} & InputAttributes;

const DEFAULT_REPLACEMENT = { _: /\d/ };

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { id, label, className, mask, replacement, type = "text", ...props },
    forwardedRef
  ) => {
    const inputRef = useMask({
      mask: mask,
      replacement: replacement || DEFAULT_REPLACEMENT,
      showMask: !!mask,
    });

    return (
      <div className="mb-3">
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-[#c4d3e6]"
        >
          {label}
        </label>

        <input
          id={id}
          type={type}
          className={
            className ||
            "w-full px-4 py-2 rounded-lg border border-white/10 bg-[rgba(196,211,230,0.02)] text-white text-base transition-all focus:outline-none focus:border-[#2474e4] focus:ring-2 focus:ring-[#2474e4]/30"
          }
          ref={(node) => {
            if (mask && inputRef) {
              // @ts-ignore
              if (typeof inputRef === "function") inputRef(node);
              // @ts-ignore
              else if (inputRef) inputRef.current = node;
            }

            if (forwardedRef) {
              if (typeof forwardedRef === "function") {
                forwardedRef(node);
              } else {
                forwardedRef.current = node;
              }
            }
          }}
          {...props}
        />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
