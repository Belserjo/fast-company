import React, { useState, useEffect } from "react";
import Pagination from "../../../components/common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../../components/common/groupList";
import SearchStatus from "../../../components/ui/searchStatus";
import UsersTable from "../../../components/ui/usersTable";
import _ from "lodash";
import Loader from "../../common/loader";
import PropTypes from "prop-types";
import { filterUsers } from "../../../utils/filterUsers";
import {
    getProfession,
    getProfessionLoadingState
} from "../../../store/professions";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsers());
    const currentUserId = useSelector(getCurrentUserId());
    const professions = useSelector(getProfession());
    const professionsLoading = useSelector(getProfessionLoadingState());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const handleDelete = (userId) => {
        // setUsers((prevState) =>
        //      prevState.filter((user) => user._id !== userId)

        // );
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        // const newArray = users.map((user) => {
        //     if (id === user._id) {
        //         user = { ...user, bookmark: !user.bookmark };
        //     }
        //     return user;
        // });
        console.log("handleToggleBookMark");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);
    if (users) {
        const filteredUsers = filterUsers(
            users,
            searchQuery,
            selectedProf,
            currentUserId
        );
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex bg-dark text-white">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column py-3">
                    <SearchStatus length={count} />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        name="searchQuery"
                        placeholder="Поисковой запрос"
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onBookmark={handleToggleBookMark}
                            onDelete={handleDelete}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            currentPage={currentPage}
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};
UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
