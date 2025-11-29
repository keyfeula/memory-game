import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import './App.css';

function App() {
    const [pkmnList, setPkmnList] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const pkmnIDs = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393];

    function shuffle() {
        
    }

    useEffect(() => {
        async function getData() {
            const pkmnData = [];
            for (const id of pkmnIDs) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

                    if (!response.ok) {
                        throw new Error("Error status: " + response.status);
                    }

                    const data = await response.json();

                    pkmnData.push({id, name: data.name, img: data.sprites.front_default});
                    setPkmnList([...pkmnData]);
                }
                catch(error) {
                    console.log(error.message);
                }
            }
        }

        getData();
    }, [])

    return (
        <>
            <header>

            </header>
            <main>
                <ul className='cardList'>
                    {pkmnList.map(({name, img, id}) => <Card key={id} name={name} img={img}></Card>)}
                </ul>
            </main>
        </>
    )
}

export default App;
