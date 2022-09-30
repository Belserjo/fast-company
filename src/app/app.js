import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserEditPage from "./components/page/editUserPage/";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import UserProvider from "./hooks/useUsers";
import { QualityProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <UserProvider>
                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/" exact component={Main} />
                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/users/:userId?"
                                exact
                                component={Users}
                            />
                            <Route
                                path="/users/:userId/edit"
                                component={UserEditPage}
                            />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </UserProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
