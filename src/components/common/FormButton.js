import React from 'react'
import PropTypes from 'prop-types';
import {Button} from 'antd';
// import PropTypes from 'prop-types';

const FormButton = ({type, size, modalOpen, label, className}) => {
    return (
        <div>
            <Button
                className={className}
                type={type}
                size={size}
                onClick={modalOpen}>
                {label}
            </Button>
        </div>
    )
}

FormButton.propTypes = {
   type: PropTypes.string, 
   size: PropTypes.string, 
   modalOpen: PropTypes.func, 
   label: PropTypes.string, 
   className: PropTypes.string, 
};

export default FormButton