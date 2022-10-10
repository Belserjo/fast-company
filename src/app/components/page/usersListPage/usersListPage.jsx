import React, { useState, useEffect } from "react";
import Pagination from "../../../components/common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../../components/common/groupList";
import api from "../../../api";
import SearchStatus from "../../../components/ui/searchStatus";
import UsersTable from "../../../components/ui/usersTable";
import _ from "lodash";
import Loader from "../../common/loader";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const pageSize = 8;

    const { users } = useUser();

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

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
        const filteredUsers = searchQuery
            ? users.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const filterReset = () => {
            setSelectedProf(null);
        };
        return (
            <div className="d-flex bg-dark text-white">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={filterReset}
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
                            users={userCrop}
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

export default UsersListPage;
