import React from 'react'
import s from "./style.module.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  error?: any;
}

const InputNumber = ({ label, type, register, error=null, ...props}: Props) => {
  return (
    <div className={s.container}>
        <div className={`${s.label} ${error ? s.labelError : ""}`}>{label}</div>
        <input type="number" className={`${s.inputContainer} ${(error ? s.errorContainer :"")}`} {...register} {...props} />
        <span className={s.error}>{error ? error : null}</span>
    </div>
  );
};

export default InputNumber;
