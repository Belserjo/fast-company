import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../app/utils/paginate";

const Users = ({ users, ...props }) => {
    const count = users.length;
    const pageSize = 4;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const [currentPage, setCurrentPage] = useState(1);

    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                onDelete={props.onDelete}
                                onBookmark={props.onBookmark}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                currentPage={currentPage}
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default Users;
