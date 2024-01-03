import React from 'react';
import './styles.css';
import { ErrorMessage, useField } from 'formik';
const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='inputWrap'>
      {meta.touched && meta.error && (
        <div className='inputError'>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )}

      <input
        className={meta.touched && meta.error ? 'errorBorder' : ''}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
};

export default LoginInput;
