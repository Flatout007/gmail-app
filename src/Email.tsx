import "./Email.css";
import MessageBox from "./MessageBox";
import EmailItem from "./EmailItem";
import { ReactElement, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { DocumentData, query, orderBy, onSnapshot, QuerySnapshot, Query, Timestamp } from "firebase/firestore";
import { emailCollection } from "./firebase";

function Email(): ReactElement {

  const status: boolean = useSelector(function (state: RootState): boolean { return state.mail.status });
  const [emails, getEmails] = useState<Array<DocumentData>>([]);

  function handleTime(time: Timestamp): string {

    const t: string[] = new Date(time?.seconds * 1000).toUTCString().split(" ");
    let formattedTime: string[] = [];

    for (let i: number = 0; i < t.length; i++) {

      if (i === 3)
        break;

      formattedTime[formattedTime.length] = t[i];
    }

    return formattedTime.slice(1).reverse().join(" ");
  }

  useEffect(function (): void {

    const collection: Query = query(emailCollection, orderBy("timestamp", "desc"));

    onSnapshot(collection, function (snapshot: QuerySnapshot): void {
      getEmails(snapshot.docs.map(function (ele: DocumentData) { return ele; }));
    });
  }, []);

  const emailItems: Array<ReactElement> = emails.map(function (ele: DocumentData): ReactElement {

    const { message, to, subject, timestamp } = ele.data();
    const id: string = ele.id;

    return (<EmailItem message={message}
      to={to} subject={subject} id={id} key={id} timestamp={handleTime(timestamp)}></EmailItem>);
  });

  return (
    <div className="Email">
      <div className="email_settings_container">
      </div>

      <div className="email_settings_main">

        {status && <MessageBox></MessageBox>}

        <div className="email_settings_main_container_A">
          <div></div>
          <div></div>
        </div>
        <div className="email_settings_main_container_B">
          <div></div>
        </div>
        <div className="email_settings_main_container_C">
          <div></div>
        </div>
      </div>

      <div className="email_filters"></div>

      <div className="email_grid">

        {emails && emailItems}

      </div>
    </div>
  );
}

export default Email;
