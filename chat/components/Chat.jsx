import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import {db} from '../firebase';
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore';
import SendMessage from "./SendMessage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Chat = () => {
    const [message, setMessage] = useState([]);
    const scroll = useRef();
    const firstLoad = useRef(true); // nueva referencia para controlar el scroll
    const [user] = useAuthState(auth);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let messages = []
            querySnapshot.forEach(doc => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessage(messages);
        });

        // Si es el primer renderizado, espera un poco para asegurarte de que todos los mensajes se carguen
        if (firstLoad.current) {
            setTimeout(() => {
                scroll.current.scrollIntoView({ behavior: "smooth" });
            }, 1000);
            firstLoad.current = false;
        } else {
            scroll.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => unsubscribe();
    }, []);

    return (
        <>
            <section className="chat-content" ref={scroll}>
                {user && message && message.map(item => (
                    <Message
                        key={item.id}
                        message={item}
                    />
                ))}
                {user && <SendMessage scroll={scroll} />}
            </section>
        </>
    );
};

export default Chat;
