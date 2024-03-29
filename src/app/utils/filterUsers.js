export function filterUsers(data, searchQuery, selectedProf, currentUserId) {
    const filteredUsers = searchQuery
        ? data.filter((user) => {
              return (
                  user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
                  -1
              );
          })
        : selectedProf
        ? data.filter((user) => {
              return user.profession === selectedProf._id;
          })
        : data;
    return filteredUsers.filter((u) => {
        return u._id !== currentUserId;
    });
}
