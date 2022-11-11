import React, { useEffect } from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserEditPage from "./components/page/editUserPage/";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import UserProvider from "./hooks/useUsers";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div className="container">
            <AuthProvider>
                <NavBar />

                <UserProvider>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <ProtectedRoute
                            path="/users/:userId?"
                            exact
                            component={Users}
                        />
                        <ProtectedRoute
                            path="/users/:userId/edit"
                            component={UserEditPage}
                        />
                        <Route path="/logout" component={LogOut} />

                        <Redirect to="/" />
                    </Switch>
                </UserProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
