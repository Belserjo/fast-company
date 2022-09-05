import React from "react";
import NavBar from "./components/ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import Users from "./layouts/users";

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/" exact component={Users} />
                <Route path="/users/:userId?" component={UserPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
