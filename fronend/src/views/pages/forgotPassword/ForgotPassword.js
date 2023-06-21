import React, {useState, useRef } from 'react'
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { classNames } from "primereact/utils";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import './forgotPassword.css'
import axios from 'axios';


const ForgotPassword = () => {
    const toast = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const registerFormik = useFormik({
        initialValues: {

            email: "",
            password: "",
            confrmPassword: ""
        },
        validate: (data) => {
            let errors = {};

            // ===== row first =======
            if (!data.email) {
                errors.email = "Please enter email id.";
            }

            if (!data.password) {
                errors.password = "Please enter password";
            }
            if (!data.confrmPassword) {
                errors.confrmPassword = "Please re enter password";
            }
            if (data.password !== data.confrmPassword) {
                errors.confrmPassword = "Password does not matched.";
            }
            // console.log("formikError", errors);
            return errors;
        },
        onSubmit: (data) => {
            // console.log("formikData", data)
            forgotPasswordApi(data);
        },
    });
    const isRegisterFieldValid = (name) =>
        !!(registerFormik.touched[name] && registerFormik.errors[name]);
    const getRegisterErrorMessage = (name) => {
        return (
            isRegisterFieldValid(name) && (
                <small className="p-error">{registerFormik.errors[name]}</small>
            )
        );
    };


    // === register new student === ====
    const forgotPasswordApi = async (data) => {
        setLoading(true)
        const postData = {
            email: data.email,
            password: data.confrmPassword
        }
        // console.log("postData", postData)
        await axios
            .patch(`http://localhost:8000/students/forgotPassword`, postData,
                {
                    headers: {
                        // Authorization: userInfo.token,
                        "Content-Type": "application/json",
                    },
                })
            .then((res) => {
                const dt = res.data;
                // console.log("res===>", res);
                if (dt) {
                    showForgotPasswordMessage('success', "");
                    setTimeout(() => {
                        navigate('./login')
                        registerFormik.resetForm();
                    }, 2000)
                } else {
                    showForgotPasswordMessage('error', res.error);
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                showForgotPasswordMessage('error', err.response.data.error);
                setLoading(false)
            })
    }

    // === show success message ==== ===
    const showForgotPasswordMessage = (severity, errMsg) => {
        toast.current.show({
            severity: severity == 'success' ? 'success' : 'error',
            summary: severity === 'success' ? "Updated" : "Oops",
            detail: severity === 'success' ?
                'Login password been successfully Updated' : errMsg,
            life: 3000
        });
    }


    return (
        <div className='row'>
            <Toast ref={toast} />
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4"></div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
                <div className='card mt-5 p-3'>
                    <form onSubmit={registerFormik.handleSubmit}>
                        <div className='row'>
                            <div className=" col-sm-12 col-md-12 col-lg-12 mt-4">
                                <span className="p-float-label">
                                    <InputText
                                        id="email"
                                        value={registerFormik.values.email}
                                        onChange={registerFormik.handleChange}
                                        className={
                                            (classNames({
                                                "p-invalid": isRegisterFieldValid("email"),
                                            }),
                                                "p-inputtext-sm w-100 borderClass")
                                        }
                                    />
                                    <label htmlFor="email">Email Id<span className='text-danger'>*</span></label>
                                </span>
                                {getRegisterErrorMessage("email")}
                            </div>
                            <div className=" col-sm-12 col-md-12 col-lg-12 mt-4">
                                <span className="p-float-label">
                                    <Password
                                        id="password"
                                        name='password'
                                        value={registerFormik.values.password}
                                        onChange={registerFormik.handleChange}
                                        toggleMask
                                        className={
                                            (classNames({
                                                "p-invalid": isRegisterFieldValid("password"),
                                            }),
                                                "p-inputtext-sm w-100 borderClass")
                                        }
                                    />
                                    <label htmlFor="password">Password<span className='text-danger'>*</span></label>
                                </span>
                                {getRegisterErrorMessage("password")}
                            </div>
                            <div className=" col-sm-12 col-md-12 col-lg-12 mt-4">
                                <span className="p-float-label">
                                    <Password
                                        id="confrmPassword"
                                        name="confrmPassword"
                                        value={registerFormik.values.confrmPassword}
                                        onChange={registerFormik.handleChange}
                                        toggleMask
                                        className={
                                            (classNames({
                                                "p-invalid": isRegisterFieldValid("confrmPassword"),
                                            }),
                                                "p-inputtext-sm w-100 borderClass")
                                        }
                                    />
                                    <label htmlFor="confrmPassword">Confirm Password<span className='text-danger'>*</span></label>
                                </span>
                                {getRegisterErrorMessage("confrmPassword")}
                            </div>
                            <div className="modal-footer d-flex justify-content-end my-1">
                                <Button
                                    label="Resets"
                                    type="submit"
                                    className="bg-primary border-0  p-button-md  btn-color p-button-raised"
                                    loading={loading}
                                />
                                <Button
                                    onClick={() => {
                                        navigate('./login')
                                        registerFormik.resetForm();
                                    }}
                                    label={"Cancel"}
                                    style={{ marginLeft: "10px" }}
                                    className="bg-danger border-0 p-button-md p-button-raised"
                                />
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4"></div>
        </div>
    )
}

export default ForgotPassword