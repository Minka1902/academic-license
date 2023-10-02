import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentResourceContext from '../../contexts/CurrentResourceContext';

export default function AddSourcePopup(props) {
    const currentResource = React.useContext(CurrentResourceContext);
    const { linkText, isOpen, handleSwitchPopup, onSubmit, isLoggedIn, onClose, buttonText = 'Submit', popupTitle } = props;
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [isUrlCorrect, setIsUrlCorrect] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);

    // ! submit
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
            onSubmit({ name, url });
            setIsValid(false);
        }
    };

    React.useEffect(() => {
        const urlRegex = /^www\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
        const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?$/;
        const privateUrlRegex = /^[\w-]+(\.[\w-]+)+$/;
        if (name) {
            if (urlRegex.test(url) || ipRegex.test(url) || privateUrlRegex.test(url)) {
                setIsUrlCorrect(true);
                setIsValid(true);
            } else {
                setIsUrlCorrect(false);
                setIsValid(false);
            }
        }
    }, [name, url]);

    // ! Resetting the popup when closing
    React.useEffect(() => {
        if (popupTitle === 'Add source') {
            setIsUrlCorrect(true);
            setName('');
            setUrl('');
        } else {
            if (currentResource) {
                setIsValid(true);
                setName(currentResource.name);
                setUrl(currentResource.url);
            }
        }
    }, [isOpen]);           //eslint-disable-line

    return (
        <>
            <PopupWithForm onSubmit={handleSubmit} isValid={isValid} handleSwitchPopup={handleSwitchPopup} linkText={isLoggedIn ? 'Sign out' : linkText} name="add-source" title={popupTitle} isOpen={isOpen} onClose={onClose} buttonText={buttonText}>
                {isLoggedIn ?
                    <>
                        <h3 className='popup__input-title'>Source name</h3>
                        <input
                            className="popup__input"
                            placeholder="Enter name"
                            id="source-name-input"
                            type="text"
                            name="nameInput"
                            required
                            minLength="2"
                            maxLength="40"
                            value={name}
                            onChange={(evt) => setName(evt.currentTarget.value)}
                            autoComplete="off"
                        />
                        <h3 className='popup__input-title'>Url</h3>
                        <input
                            className="popup__input"
                            placeholder="Enter url"
                            id="source-url-input"
                            type="text"
                            name="urlInput"
                            required
                            minLength="8"
                            maxLength="200"
                            value={url}
                            onChange={(evt) => setUrl(evt.currentTarget.value)}
                        />
                        <p className={`popup__error-massage${isUrlCorrect ? '' : '_visible'}`}>Please enter valid URL.</p>
                    </>
                    :
                    <h2 className="popup__content_other">Please sign in.</h2>}
            </PopupWithForm>
        </>
    );
}