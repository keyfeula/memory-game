import "../styles/Card.css";

export function Card({name, img, onClick}) {

    return (
        <li 
            className="card" 
            onClick={onClick}
            tabIndex={0}
            role="button"
        >
            <figure>
                <img src={img} alt={name} />
                <figcaption>{name}</figcaption>
            </figure>
        </li>
    )
}