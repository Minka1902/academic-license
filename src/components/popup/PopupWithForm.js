import { Link } from 'react-router-dom';
import * as React from 'react';

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, isValid, handleSwitchPopup, buttonText, isOpen, onClose, isCloseButton = true } = props;

	// ! Switching between popups
	const handleLinkClick = (evt) => {
		onClose && onClose();
		handleSwitchPopup(evt);
	}

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__content">
				{isCloseButton ? <button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button> : <></>}
				<h2 className={`popup__title${isCloseButton ? '' : '_no-close'}`}>{title}</h2>
				<form onSubmit={onSubmit} className={`popup__form form-${name}`} name={name}>
					{children}
					<button type="submit" onClick={onSubmit} className={`popup__button${isValid ? '' : '_invalid'}`}>
						{buttonText}
					</button>
					{linkText ? <h3 className="popup__link-text">or <Link onClick={handleLinkClick} to={name === 'login' ? "/get-my-key" : "/login"} className="popup__link">{linkText}</Link> </h3> : <></>}
				</form>
			</div>
		</div>
	);
}
