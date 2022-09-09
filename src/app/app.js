import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserEditPage from "./components/page/editUserPage/";

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" exact component={Users} />
                <Route path="/users/:userId/edit" component={UserEditPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
