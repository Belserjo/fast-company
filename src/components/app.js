import React from "react";
import NavBar from "./navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Login from "./login";
import UsersList from "./usersList";

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
            </Switch>
        </div>
    );
};

export default App;
