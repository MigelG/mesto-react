import './index.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import { useState, useEffect } from "react";

function App() {

  //Функция закрытия попапа при нажатии на бэк
  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  //Состояния попапов
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
  }

  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen) {
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
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen])

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
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

        <ImagePopup />
      </div>
    </div>
  );
}

export default App;