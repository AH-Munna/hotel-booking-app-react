import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { selectCategory } from "../../../redux/ActionCreator";
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle } from "reactstrap";
import '../../../StyleSheets/ItemMenu.css';
import { useNavigate } from "react-router";

const mapStateToProps = state => {
    return {
        category: state.state.category,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        selectCategory: category => dispatchEvent(selectCategory(category))
    }
}


const GalleryCategory = props => {
    document.title = "Hotel Facilities";

    // on category click
    const navigate = useNavigate();
    const onCardClick = name => {
        props.selectCategory(name);
        navigate('/gallery');
    }

    const categoryRender = props.category.map(imgObj => {
        return (<Col md={6} className="my-cards text-center">
            <Card onClick={() => onCardClick(imgObj.name)} className="shadow my-5" style={{ cursor: "pointer" }}>
                <CardBody>
                    <CardImg
                        width="100%"
                        alt={imgObj.name}
                        src={imgObj.image}
                    />
                </CardBody>
                <CardImgOverlay className="text-white">
                    <CardTitle
                        className="shadow bg-dark bg-opacity-50 m-1 fs-1">{imgObj.name}
                    </CardTitle>
                </CardImgOverlay>
            </Card>
        </Col>);
    })

    return (
        <div className="mx-lg-5">
            <h1 className="display-3 text-danger fw-bold text-center">Hotel <strong>AH's</strong> Facilities</h1>
            <Row className="">
                {categoryRender[0]}{categoryRender[1]}
            </Row>
            <Row className="mb-lg-5">
                {categoryRender[2]}{categoryRender[3]}
            </Row>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryCategory);