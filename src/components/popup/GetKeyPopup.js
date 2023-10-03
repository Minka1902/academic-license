import React from 'react';
import PopupWithForm from './PopupWithForm';
import studentApiObj from '../../utils/studentsApi';
// import emailjs from '@emailjs/browser';

export default function LoginPopup(props) {
    const { handleSwitchPopup } = props;
    const [email, setEmail] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [isEmailCorrect, setIsEmailCorrect] = React.useState(false);
    const [message, setMessage] = React.useState('');

    // ! submit
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
            studentApiObj.getStudent({ email })
                .then((data) => {
                    if (data) {
                        setMessage(`Your key is: ${data.key}`);
                    }
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                })
                .finally(() => {
                    setIsValid(false);
                })
        }
    };

    // ! Validating the email input
    const checkEmailValid = () => {
        // eslint-disable-next-line
        const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailRegExp.test(email)) {
            setIsEmailCorrect(true);
        } else {
            if (email === '') {
                setIsEmailCorrect(true);
            } else {
                setIsEmailCorrect(false);
            }
        }
    };

    // ! Validating the form
    React.useEffect(() => {
        checkEmailValid();
        if (isEmailCorrect) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        // eslint-disable-next-line
    }, [email]);

    return (
        <>
            <PopupWithForm onSubmit={handleFormSubmit} isValid={isValid} handleSwitchPopup={handleSwitchPopup} linkText='Create keys' isCloseButton={false} name="getKey" title="Get your key" isOpen={true} buttonText='Submit'>
                <h3 className='popup__input-title'>Email</h3>
                <input
                    className="popup__input"
                    placeholder="Enter email"
                    id="get-key-email-input"
                    type="email"
                    name="emailInput"
                    required
                    minLength="2"
                    maxLength="40"
                    value={email}
                    onChange={(evt) => setEmail(evt.currentTarget.value)}
                    autoComplete="off"
                />
                <p className={`popup__error-massage${isEmailCorrect ? '' : '_visible'}`}>Email incorrect</p>
                <p className='popup__input-title'>{message}</p>
            </PopupWithForm> :
        </>
    );
};
