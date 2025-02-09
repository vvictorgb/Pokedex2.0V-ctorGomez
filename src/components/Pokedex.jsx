import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/Pokedex.css';
import axios from 'axios';
import Card from './Card';

const Pokedex = () => {
    const { isAuthenticated } = useAuth0();
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [searchedPokemon, setSearchedPokemon] = useState(null);  
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");  

    const getData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
            setPokemons(res.data.results); 
        } catch (error) {
            setErrorMessage("No se pudieron cargar los Pokémon.");
        }
        setLoading(false);
    };

    const searchPokemon = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setErrorMessage("");

        const searchTermLower = searchTerm.toLowerCase().trim();  

        console.log("Buscando Pokémon:", searchTermLower);

        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTermLower}`);
            console.log("Datos del Pokémon:", res.data);
            setSearchedPokemon(res.data);  
        } catch (error) {
            console.log("Error al buscar el Pokémon:", error);
            setSearchedPokemon(null);
            setErrorMessage("Pokémon no encontrado. Intenta de nuevo.");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            getData(); 
        }
    }, [isAuthenticated]);

    return (
        <main className="container-Card">
            {isAuthenticated ? (
                <>
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="Buscar un Pokémon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}  
                        />
                        <button onClick={searchPokemon}>Buscar</button>
                    </div>

                    <div className="cardContainer">
                        {searchedPokemon ? (
                            <Card key={searchedPokemon.id} pokemon={searchedPokemon} />
                        ) : (
                            pokemons.map((element, index) => (
                                <Card key={index} pokemon={element} />
                            ))
                        )}
                    </div>
                </>
            ) : (
                <p>⚠️ Debes iniciar sesión para ver la Pokédex.</p>
            )}
        </main>
    );
};

export default Pokedex;
