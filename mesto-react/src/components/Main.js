import { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    function onCardClick(card) {
        props.onImagePopup(card);
    }

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((res) => {
                console.log(`Что-то пошло не так: ${res.statusText}`);
            });
    }, []);

    useEffect(() => {
        api.getCardList()
            .then(data => {
                setCards(data.map((item) => ({
                    onCardClick: onCardClick,
                    likes: item.likes.length,
                    link: item.link,
                    name: item.name,
                    id: item._id
                })));
            })
            .catch((res) => {
                console.log(`Что-то пошло не так: ${res.statusText}`);
            });
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__avatar">
                    <img className="profile__img" src={userAvatar} alt="Аватарка" />
                </div>

                <div className="profile__info">
                    <h1 className="profile__username">{userName}</h1>
                    <button onClick={props.onEditProfile} type="button" className="button profile__edit-button"></button>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="button profile__add-button"></button>
            </section>

            <section className="places">
                {
                    cards.map(({ id, ...props }) => <Card key={id} {...props} />)
                }
            </section>
        </main>
    );
}

export default Main;