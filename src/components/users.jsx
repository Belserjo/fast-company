import React, {useState} from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (usersId) => {
        setUsers(users.filter(u => u._id !== usersId))
    };
    const renderPhrase = (number) => {
        number = Math.abs(number)
        if (number) {
            return [2, 3, 4].includes(number)
                ?
                `${number} человека тусанут с тобой сегодня`
                :
                `${number} человек тусанет с тобой сегодня`
        } else {
            return 'Никто с тобой не тусанет'
        }


        // let num = number % 10;
        // if (number > 10 && number < 20)  return number + ' человек тусанет с тобой сегодня'
        // if (num > 1 && num < 5) return number + ' человека тусанут с тобой сегодня'
        // if (num === 1) return number + ' человек тусанет с тобой сегодня'
        // if (number === 0) return 'Никто с тобой не тусанет'
        // return number + ' человек тусанет с тобой сегодня'
    }

    return (
        <>
            <h2>
               <span className={users.length ? 'badge bg-primary' : 'badge bg-danger'}>
                  {renderPhrase(users.length)}
               </span>
            </h2>
            {users.length
                ?
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item) =>
                        <tr key={item._id}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.qualities.map(qualityItem =>
                                    <span key={qualityItem._id} className={'me-1 badge bg-' + qualityItem.color}>
                            {qualityItem.name}
                        </span>)
                                }
                            </td>
                            <td>
                                {item.profession.name}
                            </td>
                            <td>
                                {item.completedMeetings}
                            </td>
                            <td>
                                {item.rate}/5
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className='btn btn-danger'>
                                    delete
                                </button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>
                :
                null
            }
        </>
    );
};

export default Users;