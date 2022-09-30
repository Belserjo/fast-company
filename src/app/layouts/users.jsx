import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <UserProvider>
            {userId ? <UserPage id={userId} /> : <UsersListPage />}
        </UserProvider>
    );
};

export default Users;
