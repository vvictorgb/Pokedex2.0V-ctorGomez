import { useEffect, useState } from "react";
import "../styles/Card.css";
import axios from "axios";

export default function Card({ pokemon }) {
    const [pokemonData, setPokemon] = useState({});
    const [pokemonSprite, setSprite] = useState("");

    const getData = async () => {
        const res = await axios.get(pokemon.url);  
        setPokemon(res.data);  
        setSprite(res.data.sprites.front_default); 
    };

    useEffect(() => {
        getData();
    }, [pokemon.url]); 

    return (
        <div className="card-Card">
            <h1 className="pokemonName-Card">{pokemonData.id}. {pokemonData.name}</h1>
            <div className="imageContainer-Card">
                <img className="pokemonImage" src={pokemonSprite} alt={pokemonData.name} />
            </div>

            <div className="stats-Card">
                <p><strong>Ability:</strong> {pokemonData.abilities ? pokemonData.abilities[0].ability.name : 'N/A'}</p>
                <p><strong>Hidden Ability:</strong> {pokemonData.abilities && pokemonData.abilities[1] ? pokemonData.abilities[1].ability.name : 'N/A'}</p>
                <p><strong>Weight:</strong> {pokemonData.weight} kg</p>
                <p><strong>Height:</strong> {pokemonData.height} m</p>
            </div>
        </div>
    );
}
