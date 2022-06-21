import { Button, Modal } from "react-bootstrap";
import '../../../StyleSheets/gradient.css';
import BookingForm from "./BookingForm";

const ModalPic = props => {
    if (!props.pic) return null;

    return (
        <Modal show={props.modalToggle} onHide={props.modalHandler}>
            <Modal.Header closeButton>
                <Modal.Title className="text-success">{props.pic.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{ width: "100%" }} src={props.pic.image} alt={props.pic.name} />
                {props.pic.desc}
                {props.bookingCheck ? <h3 className="text-center mt-4 mb-2">Already Booked by: <span className="text-danger">{props.bookingCheck}</span></h3> : <><h3 className="text-center mt-4 mb-2">Booking Available</h3>
                    <div className="text-success fw-b fs-5 pb-3 text-center my-2">For: {props.pic.price}</div>
                    <div className="my-3">{props.comments}</div></>}
            </Modal.Body>
            {props.bookingCheck ? <></> : <BookingForm picId={props.pic.id} addBooking={props.addBooking} />}
            <Modal.Footer className="myModalFooterBG shadow">
                <Button variant="outline-secondary" onClick={props.modalHandler}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ModalPic;