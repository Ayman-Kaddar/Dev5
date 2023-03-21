import SignIn from '../components/SignIn'
import LogOut from '../components/LogOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const User = () => {
    const [user] = useAuthState(auth);

    // const photo = user ? user.photoURL : "/userImage.png";
    const name = user ? user.displayName : "Nombre del usuario";
    return (
        <div className='right-side'>
            <h1>Chat Tiempo Real</h1>
            <article className='card-user'>
                {/* <img src={photo} alt="user default" /> */}
                <p>{name}</p>
                {user ? <LogOut /> : <SignIn />}
            </article>
        </div>
    );
}

export default User;