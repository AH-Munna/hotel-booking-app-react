import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, CardImg } from "reactstrap";
import '../../../StyleSheets/ItemMenu.css';
import { connect } from "react-redux";
import ModalPic from "./ModalPic";
import { addComment, asyncFetchComments } from "../../../redux/ActionCreator";
import { CardImgOverlay, CardBody, CardTitle, CardText } from "reactstrap";

const mapStateToProps = state => {
    return {
        images: state.state.images,
        category: state.state.selectedCategory,
        bookings: state.state.comments,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addBooking: bookingObj => dispatchEvent(addComment(bookingObj)),
        fetchComment: () => dispatchEvent(asyncFetchComments()),
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPic: null,
            modalToggle: false,
            show: false,
            setShow: false,
        }
    }
    onPicSelect = pic => {
        this.setState({
            selectedPic: pic,
        });
        this.modalHandler();
    }
    modalHandler = () => {
        this.setState({
            modalToggle: !this.state.modalToggle,
        })
    }
    componentDidMount() {
        this.props.fetchComment();
    }

    render() {
        document.title = "Rooms";

        const bookingCheck = imgObj => {
            if (!imgObj) return null;
            let name = null;
            for (let booking in this.props.bookings) {
                if (this.props.bookings[booking].imageId === imgObj.id && this.props.category === this.props.bookings[booking].category) {
                    name = this.props.bookings[booking].name;
                    break;
                }
            }
            return name;
        }

        let galleryRender = null;
        if (this.props.images) {
            galleryRender = this.props.images.map(imgObj => {
                const bookedUser = bookingCheck(imgObj);
                return (
                    <Col md={6} className="my-cards text-center" key={imgObj.id}>
                        <Card onClick={() => this.onPicSelect(imgObj)} className="my-5 p-1 shadow" style={{ cursor: "pointer" }}>
                            <CardBody>
                                <CardImg
                                    width="100%"
                                    alt={imgObj.name}
                                    src={imgObj.image}
                                />
                            </CardBody>
                            <CardImgOverlay className="text-white fs-4">
                                <CardTitle
                                    className="shadow bg-dark bg-opacity-50 m-1">{imgObj.name}
                                </CardTitle>
                            </CardImgOverlay>
                            {!bookedUser ? <CardText className="text-success fw-b fs-5 pb-3">Price: {imgObj.price}</CardText> :
                                <CardText className="text-danger fw-b fs-5 pb-3">Booked</CardText>}
                        </Card>
                    </Col>
                );
            });
        }
        // galleryRender = [...galleryRender, ...galleryRender, ...galleryRender];
        const bookedUser = bookingCheck(this.state.selectedPic)
        return (
            <>
                <ModalPic
                    modalToggle={this.state.modalToggle}
                    modalHandler={this.modalHandler}
                    pic={this.state.selectedPic}
                    bookingCheck={bookedUser}
                    addBooking={this.props.addBooking}
                />
                <Row>
                    {galleryRender}
                </Row>
            </>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);