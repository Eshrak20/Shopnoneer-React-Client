import React from 'react';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className='text-center my-10'>
            <h2 className='text-3xl'>{heading}</h2>
            <p className='text-teal-600'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;
