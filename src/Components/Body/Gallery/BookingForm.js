import React from "react";
import '../../../StyleSheets/gradient.css';
import { Formik } from "formik";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const mapStateToProps = state => {
    return {
        email: state.state.email,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        category: state.state.selectedCategory,
    }
}

const BookingForm = props => {
    const navigate = useNavigate();
    const clickNavigate = () => {
        navigate('/auth');
    }
    if (!props.token) return (
        <div>
            <h3 className="text-danger text-center display-6 mb-3">Login to Book this room</h3>
            <div className="d-flex justify-content-center mb-5">
                <button onClick={clickNavigate} className="btn btn-outline-secondary">Login/Register</button>
            </div>
        </div>
    );

    return (
        <div className="p-3 myBGT">
            <h3 className="display-5 fw-bold text-center text-info text-shadow">Your Booking information</h3>
            <p className="text-center fs-4 text-white my-3">Your Email: {props.email}</p>
            <Formik
                initialValues={{ name: "", phone: "" }}
                validate={values => {
                    const errors = {};
                    if (values.name.length < 3) errors.name = "name can't be that short";
                    if (values.phone < 60000000) errors.phone = "Enter valid phone number";
                    return errors;
                }}
                onSubmit={values => {
                    const bookingObj = {
                        email: props.email,
                        name: values.name,
                        phone: values.phone,
                        userId: props.userId,
                        category: props.category,
                        imageId: props.picId,
                    }
                    props.addBooking(bookingObj);
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
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit} className="col-12">
                            <label className="form-label">Your Name</label>
                            <input className="form-control mb-3"
                                name="name"
                                type="text"
                                placeholder="name..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <span className="text-center">{errors.name && touched.name && errors.name}</span><br />
                            <label className="form-label">Phone number</label>
                            <input className="form-control mb-3"
                                name="phone"
                                type="number"
                                placeholder="888-88888-888-888"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <span className="text-center">{errors.phone && touched.phone && errors.phone}</span>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-info rounded-pill px-5 py-2 fw-bold fs-6" type="submit" disabled={isSubmitting}>
                                    Book
                                </button>
                            </div>
                        </form></div>
                )}
            </Formik>
        </div>
    );
}

export default connect(mapStateToProps)(BookingForm);