function ImagePopup() {
    return (
        <div className="popup popup_type_big-image">
            <div className="popup__container popup__container_type_big-image">
                <button type="button" className="button popup__close-button popup__close-button_type_big-image"></button>
                <img className="popup__image" src="#" alt="" />
                <p className="popup__caption"></p>
            </div>
        </div>
    );
}

export default ImagePopup;