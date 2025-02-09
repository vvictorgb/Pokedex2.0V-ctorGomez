import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Pokedex</h1>
      <p>Explora el mundo Pokémon.</p>
      <Link to="/pokedex">
        <button>Ver Pokémon</button>
      </Link>
    </div>
  );
};

export default Home;
