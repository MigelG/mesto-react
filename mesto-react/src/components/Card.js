function Card(props) {

    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <article className="place">
            <button type="button" className="button place__delete-button"></button>
            <div className="place__image-container">
                <img onClick={handleClick} className="place__image" src={props.link} alt={props.name} />
            </div>
            <div className="place__caption">
                <h2 className="place__title">{props.name}</h2>
                <div>
                    <button type="button" className="button place__like-button"></button>
                    <p className="place__like-score">{props.likes}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;