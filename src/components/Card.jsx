import { useState } from "react";
import { useEffect } from "react";
import "../styles/Card.css";

export function Card({id}) {

    const [pkmnData, setPkmnData] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

                if (!response.ok) {
                    throw new Error("Error status: " + response.status);
                }

                const data = await response.json();

                setPkmnData({name: data.name, img: data.sprites.front_default});
            }
            catch(error) {
                console.log(error.message);
            }
        }
        getData();
    }, [])

    return (
        <li className="card">
            <figure>
                <img src={pkmnData.img} alt={pkmnData.name} />
                <figcaption>{pkmnData.name}</figcaption>
            </figure>
        </li>
    )
}