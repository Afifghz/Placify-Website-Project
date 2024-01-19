import React from 'react';

const Button = (props) => {
    const { children} = props;
    return (
        <button className='w-full bg-[#302768] rounded-md p-3 text-white subtitle'>
            {children}
        </button>
    );
};

export default Button;
