import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Header = (props) => {
    const title = props.title ? `${props.title}` : '';
    const navigate = useNavigate();

    let icon = null;
    if (props.title === 'Letter Creation') {
        icon = <FontAwesomeIcon icon={faUser} className="sign-out-icon" />;
    } else if (props.title === 'User Register') {
        icon = <FontAwesomeIcon icon={faEnvelope} className="sign-out-icon" />;
    }

    const handleIconClick = () => {
        if (props.title === 'Letter Creation') {
            navigate('/user');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="header">
            {title}
            <a className='icon' onClick={handleIconClick} >
                {icon}
            </a>
        </div>
    );
};

export default Header;
