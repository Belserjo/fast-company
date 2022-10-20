import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
function ProtectedRoute({ component: Component, children, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                if (
                    props.match.path === "/users/:userId/edit" &&
                    currentUser._id !== props.match.params.userId
                ) {
                    return <Redirect to={`/users/${currentUser._id}/edit`} />;
                }

                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    match: PropTypes.object,
    path: PropTypes.string
};

export default ProtectedRoute;
