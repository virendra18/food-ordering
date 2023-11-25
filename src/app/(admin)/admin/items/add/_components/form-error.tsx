import React from "react";
import { FieldErrors } from "react-hook-form";

import type { AdminAddItemsInputs } from "./add-item-form";
interface FormErrorTypes {
  //   errors: FieldErrors<AdminAddItemsInputs>;
  errors: any;
  errorEmitter: string;
  errorType: string;
  errorMessage: string;
  className?: string;
}
const FormError = ({
  errors,
  errorEmitter,
  errorType,
  errorMessage,
  className: additionalStyles,
}: FormErrorTypes) => {
  return (
    <>
      {errors[errorEmitter] && errors[errorEmitter]?.type === errorType && (
        <span
          className={`bg-red-600 px-4 py-1 w-fit rounded-lg block ${additionalStyles}`}
        >
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default FormError;
