
import "./Login.css";
import { ReactElement } from "react";
import { auth, googleAuth } from "./firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { login } from "./features/user_slice";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function Login(): ReactElement {

    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    function signIn(): void {

        signInWithPopup(auth, googleAuth).then(function (cred: UserCredential): void {

            dispatch(login({
                name: cred.user.displayName,
                email: cred.user.email,
                photoURL: cred.user.photoURL
            }))
        }).catch(function (error) { alert(error.message) });

        navigate("/");
    }

    return (
        <div className="Login">

            <img alt="drawn-gmail-login-logo" src="https://img.icons8.com/plasticine/1000/000000/gmail-new.png" />

            <button onClick={signIn}>Login</button>
        </div>
    );
}


