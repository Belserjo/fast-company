import React from "react";
import NavBar from "./navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Login from "./login";
// import UsersPage from "./usersPage";
import UserPage from "./userPage";
import Users from "./users";

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/" exact component={Users} />
                <Route path="/users/:userId?" component={UserPage} />
            </Switch>
        </div>
    );
};

export default App;
