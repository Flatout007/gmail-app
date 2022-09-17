import "./EmailItem.css";
import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { openMail } from "./features/mail_slice";

interface EmailItemProps {
    to: string
    subject: string
    message: string
    id: string
    key: any
    timestamp: string
};

export default function EmailItem(props: EmailItemProps): ReactElement {

    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    function showMailOnClick(): void {

        dispatch(openMail({
            to: props.to,
            subject: props.subject,
            message: props.message,
            timestamp: props.timestamp
        }));

        navigate("./mail");
    }

    return (
        <div className="EmailItem">
            
            <li>
                <div className="email__icons">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <p onClick={showMailOnClick} className="to">{props.to}</p>
            </li>
            <li onClick={showMailOnClick}>
                <p><span>{props.subject}</span>&nbsp;-&nbsp;
                    {props.message}
                </p>
            </li>
            <li onClick={showMailOnClick}>
                <p>{props.timestamp}</p>
            </li>
        </div>
    );
}
