import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import "../style/register.css";
import Terminos from "../components/terminos";
import leftArrow from "../icons/Vector (1).png";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, seterror] = useState(null);

  const register = async (values) => {
    const { id_usuario, name, email_uni, password } = values;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        id_usuario: id_usuario,
        name: name,
        email_uni: email_uni,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/registro",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        const data = await response.json();
        seterror(data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="register">
      <Formik
        initialValues={{
          id_usuario: "",
          name: "",
          email_uni: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Requerido";
          }
          /************************* */
          if (!values.email_uni) {
            errors.email_uni = "Requerido";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_uni)
          ) {
            errors.email_uni = "Email inválido";
          }

          /***********************************/
          if (!values.password) {
            errors.password = "Requerido";
          } else if (
            !/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/.test(values.password)
          ) {
            errors.password = "La contraseña debe tener un numero minimo";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            register(values);
            setSubmitting(true);
            resetForm();
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            autoComplete="off"
            className="form-register"
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
              className="efecto3"
            >
              <Link to="/">
                <img style={{ width: "20px" }} src={leftArrow} />
              </Link>
              <h2 className="title-y">Crear Cuenta</h2>
            </div>
            <section className="section-i">
              <section className="input-sections e2">
                <h3>Ingrese Pin o Token:</h3>
                <p style={{fontSize:'12px'}} >(entre 6 y 8 dígitos sin repetirse y desordenados)</p>
                <input
                  className={`input-x ${
                    errors.id_usuario && touched.id_usuario ? "invalidC" : ""
                  }`}
                  type="password"
                  name="id_usuario"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id_usuario}
                />
                <p
                  style={{
                    color: "red",
                    height: "12px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {errors.id_usuario && touched.id_usuario && errors.id_usuario}
                </p>
              </section>
              <section className="input-sections e1">
                <h3>Correo electronico:</h3>
                <input
                  className={`input-x ${
                    errors.email_uni && touched.email_uni ? "invalidD" : ""
                  }`}
                  type="text"
                  name="email_uni"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email_uni}
                />
                <p
                  style={{
                    color: "red",
                    height: "12px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {errors.email_uni && touched.email_uni && errors.email_uni}
                </p>
              </section>
              <section className="input-sections e2">
                <h3>Nombre de Usuario:</h3>
                <input
                  className={`input-x ${
                    errors.name && touched.name ? "invalidE" : ""
                  }`}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <p
                  style={{
                    color: "red",
                    height: "12px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {errors.name && touched.name && errors.name}
                </p>
              </section>
              <section className="input-sections efecto3">
                <h3>Contraseña:</h3>
                <input
                  className={`input-x ${
                    errors.password && touched.password ? "invalidF" : ""
                  }`}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p
                  style={{
                    color: "red",
                    height: "12px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {errors.password && touched.password && errors.password}
                </p>
              </section>
            </section>
            <section
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                alignItems: "center",
              }}
            >
              {" "}
              <Terminos />
            </section>
            <button className="e4" type="submit" disabled={isSubmitting}>
              Iniciar Secion
            </button>
            {error && <Alert severity="error">{error}</Alert>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
