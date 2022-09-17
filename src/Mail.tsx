import "./Mail.css";
import { ReactElement, SyntheticEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EmailObject, RootState } from "./app/store";


function handleGoldToggleOnClick(e: SyntheticEvent): void {

  if (e.currentTarget.classList.contains("parallelogram-icon")) {
    e.currentTarget.classList.add("parallelogram-icon-gold");
    e.currentTarget.classList.remove("parallelogram-icon");
  }
  else {
    e.currentTarget.classList.add("parallelogram-icon");
    e.currentTarget.classList.remove("parallelogram-icon-gold");
  }
}


function Mail(): ReactElement {

  const navigate: NavigateFunction = useNavigate();
  const selectMail: EmailObject = useSelector(function (state: RootState): EmailObject { 
    return state.mail.selectedMail 
  });
  return (
    <div className='Mail'>
      <div className="mail__tools_container">
        <div className="mail__tools_container_A">
          <div onClick={function (): void { navigate("/") }}></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="mail__tools_container_B">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className="mail__body">
        <div className="mail__body_header">
          <h2>{selectMail?.subject}</h2>
          <div onClick={function (e: SyntheticEvent): void {
            handleGoldToggleOnClick(e);
          }}
            className="parallelogram-icon"></div>
          <p>{selectMail?.to}</p>
          <p className="mail__body_time">10pm</p>
        </div>

        <div className="mail__body_message">
          {selectMail?.message}
        </div>
      </div>
    </div>
  );
}

export default Mail;