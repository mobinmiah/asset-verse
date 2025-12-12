import React from 'react';
import lotoImg from "../../assets/logo.png";


const Logo = () => {
    return (
        <div className='p-0 m-0 flex justify-center items-center'>
            <img className='w-20 md:w-40 p-0 m-0' src={lotoImg} alt="" />
        </div>
    );
};

export default Logo;