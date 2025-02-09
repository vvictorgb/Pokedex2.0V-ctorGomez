import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import '../styles/Header.css';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        <header>
            {isAuthenticated && <img src={user.picture} alt={user.name} />}
            <h1>POKEDEX</h1>
            
            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/pokedex">Pokédex</Link>
            </nav>

            {isAuthenticated ? (
                <button className="btnLogout" onClick={() => logout()}> LOGOUT </button>
            ) : (
                <LoginButton />
            )}
        </header>
    );
};

export default Header;
