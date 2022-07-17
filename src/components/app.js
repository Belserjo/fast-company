import React, {useState} from 'react';
import api from '../api'
import Users from "./users";
import SearchStatus from "./searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(prevState =>
            prevState.filter((user) => user._id !== userId)
        );
    }

    const handleToggleBookMark = (id) => {
        setUsers(prevState =>
            prevState.map((user) => {
                if (id === user._id) {
                    user = {...user}
                    user.bookmark = !user.bookmark
                }
                return user;
            }))

    }
    return (
        <div className=' '>
            <SearchStatus length={users.length}/>
            <Users
                users={users}
                onDelete={handleDelete}
                onBookMark={handleToggleBookMark}
            />
        </div>
    );
};

export default App;