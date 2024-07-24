import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import './CreatePost.css';
import * as Yup from 'yup';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [successMessage, setSuccessMessage] = useState('');
    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .matches(/^[a-zA-Z ]*$/, "Only characters are allowed")
            .required("Title is required"),
        postText: Yup.string().required("Post cannot be empty"),
        username: Yup.string().required("Username is required")
    });

    const onSubmit = (data, { resetForm }) => {
        Axios.post("http://localhost:3010/Posts", data)
            .then(async (res) => {
                setSuccessMessage('Post successfully created!');
                resetForm(); // Optional: Clear the form fields after successful submission
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                    }, 1500); // Clear message after 1.5 seconds
            })
            .catch((error) => {
                setSuccessMessage('Failed to create post.');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
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
                    <label htmlFor="title">Title</label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        id="title"
                        name="title"
                        placeholder="Enter Title"
                        className="form-input"
                    />

                    <label htmlFor="postText">Post</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field
                        id="postText"
                        name="postText"
                        placeholder="Write Post"
                        as="textarea"
                        className="form-input"
                    />

                    <label htmlFor="username">Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        id="username"
                        name="username"
                        placeholder="Enter Name"
                        className="form-input"
                    />

                    <div className="button-container">
                        <button type="submit">Create Post</button>
                    </div>

                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;
