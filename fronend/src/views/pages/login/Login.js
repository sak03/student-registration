import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import logo from "../../../assets/images/AceScan_logo.png";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { loginMode } from '../../../redux/action'
import { userLoginInfo } from '../../../redux/loginInfoAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// import {setLoginUserInfo} from '../../../redux/actions/loginAction'
import './login.css'
import axios from "axios";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
export let userMode;
export let userModeValue;


const Login = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = "Please enter username or email.";
      }
      if (!data.password) {
        errors.password = "Please enter password.";
      }

      return errors;
    },
    onSubmit: (data) => {
      // console.log("formikData", data);
      studentLogin(data);
    },
  });
  const isLoginFormFieldValid = (name) =>
    !!(loginFormik.touched[name] && loginFormik.errors[name]);
  const getLoginFormErrorMessage = (name) => {
    return (
      isLoginFormFieldValid(name) && (
        <small className="p-error">{loginFormik.errors[name]}</small>
      )
    );
  };

  // get all staff data from API Server
  const studentLogin = async (data) => {
    setLoading(true)
    const postData = {
      email: data.email,
      password: data.password
    }
    await axios
      .post(`http://localhost:8000/students/login`, postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (res) => {
          const dt = res.data;
          if (res.data.email !== undefined) {
            navigate("/dashboard");
            dispatch(userLoginInfo(dt))
            // console.log("resData", res.data)
          } else {
            showLoginMessage('error')
          }
          setLoading(false)
        },
        (err) => {
          console.log(err);
          setLoading(false)
        }
      );
  };

  // === show success message ==== ===
  const showLoginMessage = (severity) => {
    toast.current.show({
      severity: severity == 'success' ? 'success' : 'error',
      summary: severity === 'success' ? "Logged In" : "Oops",
      detail: severity === 'success' ?
        'Student has been successfully logged in' : "Email id or password doesnot matched ",
      life: 3000
    });
  }

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <Toast ref={toast} />
        <CContainer>
          <CRow className="justify-content-center border-0">
            <div className="card p-4 col-lg-4 border-0 shadow-lg">
              <div className="row">
                <form onSubmit={loginFormik.handleSubmit}>
                  <div className=" col-sm-12 col-md-4 col-lg-12 mt-4">
                    <span className="p-float-label">
                      <InputText
                        id="email"
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                        className={
                          (classNames({
                            "p-invalid": isLoginFormFieldValid("email"),
                          }),
                            "p-inputtext-sm w-100 borderClass")
                        }
                      />
                      <label htmlFor="email">Username</label>
                    </span>
                    {getLoginFormErrorMessage("email")}
                  </div>
                  <div className=" col-sm-12 col-md-12 col-lg-12 mt-4">
                    <span className="p-float-label">
                      <Password
                        id="password"
                        inputId="password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        className={
                          (classNames({
                            "p-invalid": isLoginFormFieldValid("password"),
                          }),
                            "p-inputtext-sm w-100 borderClass")
                        }
                        toggleMask
                        feedback={false}
                      />
                      <label htmlFor="password">Password</label>
                    </span>
                    {getLoginFormErrorMessage("password")}
                  </div>
                  <div className="text-right mt-2 mb-4">
                    <Link to='/forgotPassword' style={{ textDecoration: "none" }}>Forgot password?</Link>
                    {/* <span
                      className="mx-2 text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      Forgot password?
                    </span> */}
                  </div>
                  <CRow>
                    <CCol xs={12}>
                      <Button
                        label="Login"
                        type="submit"
                        color="primary"
                        className="px-4 w-100"
                        loading={loading}
                      />
                    </CCol>
                  </CRow>
                  <div className="text-right mt-3">
                    <p>
                      Don't have an account ?
                      <span className="mx-2">
                        <Link to='/register' style={{ textDecoration: "none" }}>Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
