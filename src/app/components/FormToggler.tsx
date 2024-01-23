"use client";
import React from "react";

type FormTogglerProps = {
  formToggler: boolean;
  setFormToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormToggler: React.FC<FormTogglerProps> = (props) => {
  const { formToggler, setFormToggler } = props;

  return (
    <div className="flex justify-center mt-14">
      <button
        className="w-96 h-24 rounded-3xl bg-green-500 text-white text-2xl border border-green-500 hover:bg-custom-dark2 hover:border-white"
        onClick={() => setFormToggler(!formToggler)}
      >
        Add Asset
      </button>
    </div>
  );
};

export default FormToggler;
