import React, { Fragment } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ component: Component, ...rest }) => {

    const location = useLocation();
    const { error, user, isAuthenticated, loading } = useSelector(state => state.auth);

    // return isAuthenticated 
    // ? <Outlet />
    // : <Navigate to="/login" replace state={{ from: location }} />;

    return (
        <Fragment>
            {loading && (
                <React.Fragment
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Navigate to='/login' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute