import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from "react";

function App() {

  //Функция закрытия попапа при нажатии на бэк
  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  //Состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsBigImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsBigImagePopupOpen(false);
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isBigImagePopupOpen) {

      //Функция закрытия попапа на Esc
      function handleEsc(event) {
        if (event.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc)

      return () => {
        document.removeEventListener("keydown", handleEsc)
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isBigImagePopupOpen])

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImagePopup={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          button="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onPopupClick={handlePopupClick}>
          <input id="name" type="text" name="name" placeholder="Введите имя"
            className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
          <span id="name-error" className="popup__error"></span>
          <input id="about" type="text" name="about" placeholder="Род деятельности"
            className="popup__input popup__input_type_job" required minLength="2" maxLength="200" />
          <span id="about-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add"
          title="Новое место"
          button="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onPopupClick={handlePopupClick}>
          <input id="placeName" type="text" name="name" placeholder="Название"
            className="popup__input popup__input_type_place" required minLength="2" maxLength="30" />
          <span id="placeName-error" className="popup__error"></span>
          <input id="link" type="url" name="link" placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link" required />
          <span id="link-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          button="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onPopupClick={handlePopupClick}>
          <input id="avatar" type="url" name="avatar" placeholder="Введите ссылку"
            className="popup__input popup__input_type_avatar" required />
          <span id="avatar-error" className="popup__error"></span>
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isBigImagePopupOpen}
          onPopupClick={handlePopupClick} />
      </div>
    </div>
  );
}

export default App;