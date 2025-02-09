import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {

    const { loginWithRedirect } = useAuth0();
    
    return (
      <div>
        <button onClick={() => loginWithRedirect()}> LOGIN </button>
      </div>
    );
}

export default LoginButton