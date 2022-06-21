import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth.js';
import LogOut from '../Auth/logout.js';
import { connect } from 'react-redux';
import Gallery from './Gallery/Gallery.js';
import GalleryCategory from './Gallery/GalleryCategory.js';
import Empty from '../Auth/empty.js';

const mapStateToProps = state => {
    return {
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}

const Body = props => {
    let authRoute = null;
    if (props.token && props.userId) {
        authRoute = <Route exact path="/logout" element={<LogOut />} />
    } else {
        authRoute = <Route exact path="/auth" element={<Auth />} />
    }
    return (
        <div className='py-4'>
            <Routes>
                {authRoute}
                <Route exact path="/gallery" element={<Gallery />} />
                <Route exact path="/empty" element={<Empty />} />
                <Route exact path="/gallery-category" element={<GalleryCategory />} />
                <Route exact path="/" element={<Navigate replace to="/gallery-category" />} />
                <Route path="*" element={<Navigate to="/gallery-category" replace />} />
            </Routes>
        </div>
    );
}

export default connect(mapStateToProps)(Body);