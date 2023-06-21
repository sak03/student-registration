import React, { useState, useRef, useEffect } from 'react'
import {
    FaEdit,
    FaRegTrashAlt,
    FaPencilAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,

} from "react-icons/fa";
import { useSelector } from "react-redux";
import "./dashboard.css";
import { Avatar } from 'primereact/avatar';
import { CTooltip } from '@coreui/react';
import { formatDate } from '../../../constants/constants'
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from "primereact/utils";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';


const Dasshboard = () => {
    const userInfo1 = useSelector((state) => state.userLoginInfo);
    const [userInfo, setUserInfo] = useState(userInfo1);
    const toast = useRef(null);
    const [viewMode, setViewMode] = useState(0)
    const [loading, setLoading] = useState(false);
    const statusList = [
        { name: "pending" },
        { name: "active" },
        { name: "inactive" },
    ]

    useEffect(() => {
        getStudent();
    }, [])

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
            address: "",
            status: "",
            profileImage: ""
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
            if (data.mobile.length !== 10) {
                errors.mobile = "Mobile no. must be 10 digits";
            }
            if (!data.dob) {
                errors.dob = "Please select date of birth";
            }
            if (!data.password) {
                errors.password = "Please enter password";
            }
            if (!data.status) {
                errors.status = "Please select status";
            }

            if (!data.address) {
                errors.address = "Please ender address";
            }
            // console.log("formikError", errors);
            return errors;
        },
        onSubmit: (data) => {
            console.log("formikData", data)
            studentUpdate(data);
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

    // === get student data ======
    const getStudent = async () => {

        await axios
            .get(`http://localhost:8000/students`,
                {
                    headers: {
                        // Authorization: userInfo.token,
                        "Content-Type": "application/json",
                    },
                })
            .then((res) => {
                const dt = res.data;
                const ndt = dt.filter((item) => {
                    return item.email === userInfo.email && item.phone === userInfo.phone
                })
                setUserInfo(ndt[0]);
                // console.log("blogs===>", ndt, userInfo.email, userInfo.phone);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // === register new student === ====
    const studentUpdate = async (data) => {
        setLoading(true);
        const postData = {
            name: data.fname + " " + data.lname,
            email: data.email,
            phone: data.mobile,
            address: data.address,
            class: data.class,
            rollNo: data.rollNo,
            status: data.status,
            dateOfBirth: data.dob,
            password: data.password,
            image: data.profileImage,
            createdDate: userInfo?.createdDate,
            updatedDate: new Date()
        }
        // console.log("postData", postData);
        await axios
            .put(`http://localhost:8000/students/${userInfo._id}`, postData,
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
                    showUpdateMessage('success');
                    getStudent()
                    setTimeout(() => {
                        setViewMode(0);
                        registerFormik.resetForm();
                    }, 2000)
                } else {
                    showUpdateMessage('error');
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }

    //=== studet update form ========
    const studentUpdateForm = () => {
        return (
            <form onSubmit={registerFormik.handleSubmit}>
                <div className='form-demo card p-2 mx-5'>
                    <div className="d-flex justify-content-between my-2 mx-4">
                        <p className="text-primary">Update Information</p>
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
                                    disabled={viewMode === 1 ? true : false}
                                />
                                <label htmlFor="email">Email Id<span className='text-danger'>*</span></label>
                            </span>
                            {getRegisterErrorMessage("email")}
                        </div>
                        <div className=" col-sm-12 col-md-6 col-lg-4 mt-4">
                            <span className="p-float-label">
                                <InputText
                                    id="mobile"
                                    value={registerFormik.values.mobile}
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
                                    disabled={viewMode === 1 ? true : false}
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
                        <div className=" col-sm-12 col-md-4 col-lg-4 mt-4">
                            <span className="p-float-label">
                                <Dropdown
                                    id="status"
                                    inputId="dropdown"
                                    options={statusList}
                                    value={registerFormik.values.status}
                                    onChange={registerFormik.handleChange}
                                    optionLabel="name"
                                    optionValue='name'
                                    className={
                                        (classNames({
                                            "p-invalid": isRegisterFieldValid("status"),
                                        }),
                                            "p-inputtext-sm w-100 borderClass")
                                    }
                                />
                                <label htmlFor="status">Status<span className='text-danger'>*</span></label>
                            </span>
                            {getRegisterErrorMessage("status")}
                        </div>
                        <div className=" col-sm-12 col-md-4 col-lg-4 mt-4">
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
                        <div className=" col-sm-12 col-md-8 col-lg-8 mt-4">
                            <span className='mt-3'>
                                <FileUpload
                                    id="profileImage"
                                    name="demo[]"
                                    mode="basic"
                                    url="https://primefaces.org/primereact/showcase/upload.php"
                                    accept="image/*"
                                    maxFileSize={1000000}
                                    chooseLabel="Profile image"
                                    customUpload
                                    onSelect={customBase64Uploader}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end my-3 mx-4">
                        <Button
                            label="Update"
                            type="submit"
                            className="bg-primary border-0  p-button-md  btn-color p-button-raised"
                            loading={loading}
                        />
                        <Button
                            onClick={() => {
                                setViewMode(0);
                                registerFormik.resetForm();
                            }}
                            label={"Cancel"}
                            style={{ marginLeft: "10px" }}
                            className="bg-danger border-0 p-button-md p-button-raised"
                        />
                    </div>
                </div>
            </form>
        )
    }

    // === base64 converter ============
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            registerFormik.setFieldValue("profileImage", base64data);
            // console.log(base64data);
        }
    }

    // ===  set form field values =========
    const formFields = (userInfo) => {
        // console.log("studentData", userInfo)
        // console.log("studentData", userInfo.status)
        const name = userInfo?.name?.split(" ");
        registerFormik.setFieldValue("fname", name[0]);
        registerFormik.setFieldValue("lname", name[1]);
        registerFormik.setFieldValue("email", userInfo.email);
        registerFormik.setFieldValue("mobile", userInfo.phone);
        registerFormik.setFieldValue("dob", new Date(userInfo.dateOfBirth));
        registerFormik.setFieldValue("password", userInfo.password);
        registerFormik.setFieldValue("class", userInfo.class);
        registerFormik.setFieldValue("rollNo", userInfo.rollNo);
        registerFormik.setFieldValue("address", userInfo.address);
        registerFormik.setFieldValue("status", userInfo.status);
        if (userInfo.image !== undefined) {
            registerFormik.setFieldValue("profileImage", userInfo.image);
        }
    }


    // === show success message ==== ===
    const showUpdateMessage = (severity) => {
        toast.current.show({
            severity: severity == 'success' ? 'success' : 'error',
            summary: severity === 'success' ? "Updated" : "Oops",
            detail: severity === 'success' ?
                'Students data has been successfully Updated' : "Something went wrong",
            life: 3000
        });
    }


    return (
        <div>
            <Toast ref={toast} />
            {viewMode === 1 ? studentUpdateForm() :
                <div className='card'>
                    <div className="row mx-5 mt-5">
                        <div className="col-sm-12 col-md-6 col-lg-7 d-flex">
                            <div className="d-flex">
                                <div className="mt-3 ml-2">
                                    {userInfo?.image !== undefined ? (
                                        <img
                                            src={userInfo?.image}
                                            width={125}
                                            height={125}
                                            style={{ borderRadius: "50%" }}
                                        />
                                    ) : (
                                        <Avatar
                                            label={userInfo?.name?.charAt(0)}
                                            className="mr-2"
                                            size="xlarge"
                                            shape="circle"
                                            style={{ fontSize: "4rem", width: "6rem", height: "6rem" }}
                                        />
                                    )}
                                </div>
                                <div className="mx-5 mt-3">
                                    <div style={{ marginBottom: "0.5rem" }}>
                                        <strong>
                                            {userInfo?.name}
                                        </strong>
                                    </div>
                                    <CTooltip content="Phone Number" placement="top">
                                        <p
                                            style={{ marginBottom: "0.5rem" }}
                                            className="d-flex align-items-center"
                                        >
                                            <FaPhoneAlt className="text-success" />
                                            <span>&nbsp; {userInfo?.phone}</span>
                                        </p>
                                    </CTooltip>
                                    <CTooltip content="Email Id" placement="top">
                                        <p
                                            style={{ marginBottom: "0.5rem" }}
                                            className="d-flex align-items-center"
                                        >
                                            <FaEnvelope />
                                            <span>&nbsp; {userInfo?.email}</span>
                                        </p>
                                    </CTooltip>
                                    <p className="d-flex align-items-center">
                                        <FaMapMarkerAlt className="text-danger" />
                                        <span>
                                            &nbsp;
                                            {userInfo?.address}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-5 ">
                            <div
                                className="d-flex align-items-center"
                                style={{ marginBottom: "0.5rem " }}
                            >
                                <div className="d-flex align-items-center flex-fill">
                                    <span style={{ fontSize: "1.1rem" }}><strong>Status</strong>: </span> &nbsp;
                                    <span
                                        className={userInfo?.status === "active" ? "text-success" : userInfo?.status === "inactive" ? "text-danger" : "text-warning"}
                                    >
                                        {userInfo?.status}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <CTooltip content="Update information" placement="top">
                                        <span
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setViewMode(1);
                                                formFields(userInfo);
                                            }}
                                        >
                                            <FaPencilAlt />
                                        </span>
                                    </CTooltip>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between" >
                                <span><strong>Class</strong>:&nbsp;{userInfo?.class}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-1">
                                <span><strong>Roll No.</strong>:&nbsp;{userInfo?.rollNo}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between" >
                                <span><strong>Date of Birth</strong>:&nbsp;{formatDate(new Date(userInfo?.dateOfBirth))}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between my-1" >
                                <span><strong>Date of Registration</strong> :&nbsp;{formatDate(new Date(userInfo?.createdDate))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dasshboard