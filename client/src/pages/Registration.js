import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Axios from 'axios';
import './Registration.css';

function Registration() {
    const [successMessage, setSuccessMessage] = useState('');

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required").min(3).max(15),
        password: Yup.string().required("Password is required").min(5).max(16)
    });

    const onSubmit = (data, { resetForm }) => {
        Axios.post("http://localhost:3010/auth", data)
        .then((res)=>{
            setSuccessMessage("Registration Successful!");
            resetForm();
            setTimeout(()=> setSuccessMessage(''), 3000);
        })
        .catch((err)=>{
            setSuccessMessage("Registration Failed");
            setTimeout(()=>setSuccessMessage(''), 3000);
        });
    };

    return (
        <div className="create-post-container">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="create-post-form">
                    <label htmlFor="username">Username</label>
                    <ErrorMessage name="username" component="span" className="error-message" />
                    <Field
                        id="username"
                        name="username"
                        placeholder="Enter Username"
                        className="form-input"
                    />

                    <label htmlFor="password">Password</label>
                    <ErrorMessage name="password" component="span" className="error-message" />
                    <Field
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        className="form-input"
                    />

                    <div className="button-container">
                        <button type="submit">Register</button>
                    </div>

                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}
                </Form>
            </Formik>
        </div>
    )
}

export default Registration;
