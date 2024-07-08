
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, sendPasswordResetEmail} from 'firebase/auth'
import { useContext } from 'react';

export const session = () => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    .then(()=>{
        return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error)=>{
        const errorCode = error.code;
        const erroMessage = error.message;
    });
    return (
        <>
            <label>Email:{{email}}
            </label>
        </>
    )
}
