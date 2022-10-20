import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserEditPage from "./components/page/editUserPage/";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import UserProvider from "./hooks/useUsers";

const App = () => {
    return (
        <div className="container">
            <AuthProvider>
                <NavBar />

                <QualitiesProvider>
                    <ProfessionProvider>
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
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
