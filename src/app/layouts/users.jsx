import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import ProtectedRoute from "../components/common/protectedRoute";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return (
        <ProtectedRoute>
            {userId ? <UserPage userId={userId} /> : <UsersListPage />}
        </ProtectedRoute>
    );
};

export default Users;
