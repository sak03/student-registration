import React, { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from "primereact/utils";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import './register.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const registerFormik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",

      mobile: "",
      dob: "",
      password: "",

      class: "",
      rollNo: "",

      birthPlace: "",
      address: "",
    },
    validate: (data) => {
      let errors = {};

      // ===== row first =======
      if (!data.fname) {
        errors.fname = "Please enter first name.";
      }
      if (!data.lname) {
        errors.lname = "Please enter last name.";
      }
      if (!data.email) {
        errors.email = "Please enter email id.";
      }

      if (!data.mobile) {
        errors.mobile = "Please enter mobile no.";
      }
      if (!data.dob) {
        errors.dob = "Please select date of birth";
      }
      if (!data.password) {
        errors.password = "Please enter password";
      }

      if (!data.address) {
        errors.address = "Please ender address";
      }
      // console.log("formikError", errors);
      return errors;
    },
    onSubmit: (data) => {
      // console.log("formikData", data)
      studentRgister(data);
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
  const studentRgister = async (data) => {
    setLoading(true);
    const postData = {
      name: data.fname + " " + data.lname,
      email: data.email,
      phone: data.mobile,
      address: data.address,
      class: data.class,
      rollNo: data.rollNo,
      dateOfBirth: data.dob,
      password: data.password
    }
    // console.log("postData", postData)
    await axios
      .post(`http://localhost:8000/students`, postData,
        {
          headers: {
            // Authorization: userInfo.token,
            "Content-Type": "application/json",
          },
        })
      .then((res) => {
        const dt = res.data;
        // console.log("blogs===>", dt);
        if (dt) {
          showRegisterMessage('success');
          setTimeout(() => {
            navigate('./login')
            registerFormik.resetForm();
          }, 2000)
          setLoading(false)
        } else {
          showRegisterMessage('error');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
  }

  // === show success message ==== ===
  const showRegisterMessage = (severity) => {
    toast.current.show({
      severity: severity == 'success' ? 'success' : 'error',
      summary: severity === 'success' ? "Registered" : "Oops",
      detail: severity === 'success' ?
        'Students has been successfully registered' : "Something went wrong",
      life: 3000
    });
  }


  return (
    <div className="row mt-3">
      <Toast ref={toast} />
      <form onSubmit={registerFormik.handleSubmit}>
        <div className='form-demo card p-2 mx-5'>
          <div className="d-flex justify-content-between my-2 mx-4">
            <p className="text-primary">Student's registration form</p>
            <div className="d-flex mr-1 align-items-center">
            </div>
          </div>
          <div className="row mt-2">
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="fname"
                  value={registerFormik.values.fname}
                  onChange={registerFormik.handleChange}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("fname"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="fname">First name<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("fname")}
            </div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="lname"
                  value={registerFormik.values.lname}
                  onChange={registerFormik.handleChange}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("lname"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="lname">Last name<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("lname")}
            </div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
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
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="mobile"
                  // inputId="integeronly"
                  value={registerFormik.values.mobile}
                  // onValueChange={registerFormik.handleChange}
                  onChange={(e) => {
                    registerFormik.handleChange(e);
                    const val = e?.target?.value?.replace(/[^\d]/g, "");
                    // console.log("numVal",  val)
                    registerFormik.setFieldValue('mobile', val);
                  }}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("mobile"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                  size={10}
                  tabIndex
                />
                <label htmlFor="mobile">Mobile No.<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("mobile")}
            </div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
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
            <div className=" col-sm-12 col-md-4 col-lg-4 mt-4">
              <span className="p-float-label">
                <Calendar
                  id="dob"
                  value={registerFormik.values.dob}
                  onChange={registerFormik.handleChange}
                  dateFormat="d M, yy"
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("dob"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="dob">DOB<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("dob")}
            </div>
            <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="class"
                  value={registerFormik.values.class}
                  onChange={registerFormik.handleChange}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("class"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="class">Class<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("class")}
            </div>
            <div className=" col-sm-12 col-md-4 col-lg-4 mt-4">
              <span className="p-float-label">
                <InputText
                  id="rollNo"
                  value={registerFormik.values.rollNo}
                  onChange={registerFormik.handleChange}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("rollNo"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="rollNo">Roll No.<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("rollNo")}
            </div>
            <div className=" col-sm-12 col-md-8 col-lg-8 mt-4">
              <span className="p-float-label">
                <InputText
                  id="address"
                  value={registerFormik.values.address}
                  onChange={registerFormik.handleChange}
                  className={
                    (classNames({
                      "p-invalid": isRegisterFieldValid("address"),
                    }),
                      "p-inputtext-sm w-100 borderClass")
                  }
                />
                <label htmlFor="address">Address<span className='text-danger'>*</span></label>
              </span>
              {getRegisterErrorMessage("address")}
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-end my-3 mx-4">
            <Button
              label="Register"
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
  )
}

export default Register
