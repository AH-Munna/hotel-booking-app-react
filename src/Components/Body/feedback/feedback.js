import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import axios from 'axios';
import { useState } from "react";
import { Alert } from 'reactstrap';

const mapStateToProps = state => {
    return {
        email: state.state.email,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}

const FeedBack = props => {
    const [alertShow, setAlertShow] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("");

    const onDismiss = () => {
        setAlertShow(false);
    }
    const navigate = useNavigate();
    if (!props.email) navigate("/logout");
    document.title = "Feedback";
    return (
        <div>
            <Alert className="shadow" color={alertType} isOpen={alertShow} toggle={onDismiss}>
                {alertMsg}
            </Alert>
            <h1 className="display-4 text-center text-info my-3 fw-bold">Send your Feedback of the Gallery</h1>
            <p className="text-center display-5 text-success my-3">Your Email: {props.email}</p>
            <Formik
                initialValues={{ feedback: "" }}
                validate={values => {
                    const errors = {};
                    if (values.feedback.length < 5) errors.feedback = "at least few more words";
                    return errors;
                }}
                onSubmit={values => {
                    const feedbackObj = {
                        email: props.email,
                        message: values.feedback,
                        userId: props.userId,
                    }
                    axios.post('https://photo-gallery-ah-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json?auth=' + props.token, feedbackObj)
                        .then(response => {
                            setAlertMsg("Thank you. Your Feedback has been successfully recieved.");
                            setAlertShow(true);
                            setAlertType("success");
                        }).catch(error => {
                            setAlertMsg(error.message);
                            setAlertShow(true);
                            setAlertType("danger");
                        });
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
                        <form onSubmit={handleSubmit} className="col-md-6">
                            <textarea className="form-control mb-3"
                                name="feedback"
                                rows={7}
                                placeholder="your thoughts..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.feedback}
                            />
                            <span className="text-center text-danger">{errors.feedback && touched.feedback && errors.feedback}</span>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-info rounded-pill px-3 py-2 fw-bold fs-6" type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </form></div>
                )}
            </Formik>
        </div >
    );
}

export default connect(mapStateToProps)(FeedBack);