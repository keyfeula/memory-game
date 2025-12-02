import "../styles/Card.css";

export function Card({name, img, id, onClick, onKeyDown}) {

    return (
        <li 
            className="card"
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={0}
            role="button"
            id={id}
        >
            <figure>
                <img src={img} alt={name} />
                <figcaption>{name}</figcaption>
            </figure>
        </li>
    )
}