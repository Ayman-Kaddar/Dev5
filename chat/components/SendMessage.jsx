import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from '../firebase';
import Picker from 'emoji-picker-react';

const SendMessage = ({ scroll }) => {
    const [input, setInput] = useState('');
    const [open, setOpen] = useState('close');

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, displayName, } = auth.currentUser;
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            timestamp: serverTimestamp()
        })
        setInput('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    const emoji = () => {
        setOpen('open');
    }
    const closeEmoji = () => {
        setOpen('close');
    }
    const onEmojiClick = (event, emojiObject) => {
        setInput(`${input}${emojiObject.emoji}`)
    };

    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, [scroll]);

    return (
        <form onSubmit={sendMessage}>
            <button
                type="button"
                className="btn-emoji"
                onClick={emoji}>
                <i className="fa-solid fa-face-laugh-squint"></i>
            </button>
            <div className={open}>
                <button
                    className="close-emoji"
                    onClick={closeEmoji}
                    type="button">
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <Picker onEmojiClick={onEmojiClick} />
            </div>

            <input type="text"
                placeholder="Introduzca su mensaje aquí"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button type="submit">Enviar <i className="fa-solid fa-paper-plane"></i></button>
            <div ref={scroll}></div>
        </form>
    );
}

export default SendMessage;
