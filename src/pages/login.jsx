import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import "../style/login.css";
import leftArrow from "../icons/Vector (1).png";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Login = ({ logeado, setlogeado }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  const login = async (values) => {
    const { email_uni, password } = values;
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email_uni: email_uni,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/login",
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", values.email_uni)
        setlogeado(true);
        navigate("/home");
      } else {
        const data = await response.json();
        seterror(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <Formik
        initialValues={{ email_uni: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email_uni) {
            errors.email_uni = "Requerido";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email_uni)
          ) {
            errors.email_uni = "Email inválido";
          }
          if (!values.password) {
            errors.password = "Requerido";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            login(values);
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
            className="form-login"
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
              <h2 className="title-y">Iniciar Sesión</h2>
            </div>
            <section className="i-section">
              <section className="input-sections efecto2">
                <h3>Email o Nombre:</h3>
                <input
                  className={`input-x ${
                    errors.email_uni && touched.email_uni ? "invalidA" : ""
                  }`}
                  label="email_uni"
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
              <section className="input-sections efecto3">
                <h3>Contraseña:</h3>
                <input
                  name="password"
                  className={`input-x ${
                    errors.password && touched.password ? "invalidB" : ""
                  }`}
                  label="Password"
                  type="password"
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
            <button className="efecto4" type="submit" disabled={isSubmitting}>
              Log in
            </button>
            {error && <Alert severity="error">{error}</Alert>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
