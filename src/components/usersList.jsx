import User from "./user";
import Users from "./users";
import { useParams } from "react-router-dom";
import React from "react";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <User id={userId} /> : <Users />}</>; // Это две разные страниы, и их надо разделять через router 
};

export default UsersList;
