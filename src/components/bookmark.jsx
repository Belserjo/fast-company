import React from 'react';

const BookMark = ({isBookMarked, ...props}) => {
    return (
        <button
            className='btn '
            onClick={() => {
                props.onToogleBookmark(props.userId)
            }}
        >
            <i className={`bi bi-${isBookMarked ? 'heart-fill' : 'heart'}`}>

            </i>

        </button>
    );
};

export default BookMark;