import React, { useState, useEffect } from "react";
import api from "../api";
import Users from "./users";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    const handleToggleBookMark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (id === user._id) {
                    user = { ...user };
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };
    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onBookmark={handleToggleBookMark}
                />
            )}
        </>
    );
};

export default App;
