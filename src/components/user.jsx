// import React from "react";
// import Qualitie from "./qualitie";
// import Bookmark from "./bookmark";
// import PropTypes from "prop-types";
//
// const User = ({ user, onDelete, onBookmark }) => {
//     const getUserQualities = (user) => {
//         return user.qualities.map((item) => (
//             <Qualitie key={item._id} {...item} />
//         ));
//     };
//
//     return (
//         <tr>
//             <td>{user.name}</td>
//             <td>{getUserQualities(user)}</td>
//             <td>{user.profession.name}</td>
//             <td>{user.completedMeetings}</td>
//             <td>{user.rate}/5</td>
//             <td>
//                 <Bookmark
//                     userId={user._id}
//                     isBookmarked={user.bookmark}
//                     onToogleBookmark={onBookmark}
//                 />
//             </td>
//             <td>
//                 <button
//                     className="btn btn-danger"
//                     onClick={() => onDelete(user._id)}
//                 >
//                     delete
//                 </button>
//             </td>
//         </tr>
//     );
// };
//
// User.propTypes = {
//     user: PropTypes.object,
//     onDelete: PropTypes.func.isRequired,
//     onBookmark: PropTypes.func.isRequired
// };
//
// export default User;
