import './Aside.css';
import { ReactElement, SyntheticEvent, useRef } from 'react';
import { useDispatch } from "react-redux";
import { openComposeMessage } from "./features/mail_slice";
import { Dispatch } from 'redux';


function Aside(): ReactElement {

  const dispatch: Dispatch = useDispatch();
  const list = useRef<HTMLLIElement>(null);
  const queue: Array<EventTarget & Element | HTMLLIElement | null> = [];
  let state: number = 0;

  function handleEnableBlueOnClick(e: SyntheticEvent): void {

    e.currentTarget.classList.remove("grey_hover");

    if (state === 0)
      queue.push(list.current);

    if (queue[0]) {
      queue[0].classList.remove("blue");
    }

    queue.push(e?.currentTarget);

    if (queue.length > 1)
      queue.shift();

    e.currentTarget.classList.add("blue");

    state = 1;
  }

  function handleDisableGreyOnMouseEnter(e: SyntheticEvent): void {
    if (e.currentTarget.classList.contains("blue"))
      e.currentTarget.classList.remove("grey_hover");
    else
      e.currentTarget.classList.add("grey_hover");
  }

  return (
    <div className="Aside">

      <div
        onClick={function () { dispatch(openComposeMessage(null)) }}
        className='btn_compose'
        role="button"> Compose
        <div className='pencil'></div>
      </div>

      <ul className='aside__list'>

        <li className={`blue aside__list_item font-bold`}
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent): void {
            handleDisableGreyOnMouseEnter(e);
          }}
          ref={list}>
          <div className='aside__list_item_icon'></div>
          <p>Inbox</p>
          <h5>1,000</h5>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent) {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Starred</p>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent): void {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Snooze</p>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent): void {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Important</p>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent) {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Chats</p>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent): void {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent): void {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Sent</p>
        </li>

        <li className='aside__list_item'
          onClick={function (e: SyntheticEvent) {
            handleEnableBlueOnClick(e);
          }}
          onMouseEnter={function (e: SyntheticEvent) {
            handleDisableGreyOnMouseEnter(e);
          }}>
          <div className='aside__list_item_icon'></div>
          <p>Drafts</p>
        </li>
      </ul>
    </div>
  );
}

export default Aside;
