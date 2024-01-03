import React from "react"
import "./styles.css"
import { useMediaQuery } from "react-responsive"
import { ErrorMessage, useField } from "formik"
const RegisterInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const view1 = useMediaQuery({ query: "(min-width: 539px)" })

  return (
    <div className="inputWrapReg">
      {meta.touched && meta.error && (
        <div className="inputError">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "errorBorder" : ""}
        style={{
          width: `${
            view1 && (field.name === "first_name" || field.name === "last_name")
              ? "100%"
              : view1 && (field.name === "email" || field.name === "password")
              ? "370px"
              : "300px"
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  )
}

export default RegisterInput
