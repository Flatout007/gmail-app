import "./MessageBox.css";
import { useForm, FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeComposeMessage } from "./features/mail_slice";
import { EmailObject } from "./app/store";
import { addDoc, serverTimestamp } from "firebase/firestore"
import { emailCollection } from "./firebase";
import { ReactElement } from "react";
import { Dispatch } from "redux";

function MessageBox(): ReactElement {

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const dispatch: Dispatch = useDispatch();

  function onSubmit(formData: FieldValues): void {

    const email: EmailObject = {
      "to": formData.to,
      "subject": formData.subject,
      "message": formData.message,
      "timestamp": serverTimestamp()
    }

    /**
     * @asynchronous function 
    */
    addDoc(emailCollection, email);

    dispatch(closeComposeMessage(null));
  }

  return (
    <div className="MessageBox">
      <div className="new_message"><p>New Message</p>
        <div className="message__box_icons">
          <div></div>
          <div></div>
          <div onClick={function (): void { dispatch(closeComposeMessage(null)) }}></div>
        </div>
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>

        <p>To</p>

        <input
          {...register("to", { required: true })}
          name="to"
          className="message__box_input_to"
          type="email">
        </input>

        <input
          {...register("subject")}
          name="subject"
          placeholder="Subject"
          className="message__box_input_subject"
          type="text">
        </input>

        <textarea
          {...register("message", { required: true })}
          name="message"
          rows={4}
          cols={10}>
        </textarea>

        {/* {Errors component here} */}

        <div className="arrow">
          <li></li>
        </div>

        <button>
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageBox;
