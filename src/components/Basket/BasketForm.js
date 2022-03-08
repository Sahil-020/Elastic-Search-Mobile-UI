import React from "react";
import { Modal } from "react-bootstrap";

export default function BasketForm(props) {
  let { show, handleShowBasketForm } = props;
  const onModalHide = () => {
    handleShowBasketForm(false);
  };
  return (
    <Modal
      animation={false}
      autoFocus={false}
      enforceFocus={false}
      className="basket_form_modal"
      centered="true"
      size="lg"
      show={show}
      onHide={() => onModalHide()}
      //   {...handlers}
    >
      <Modal.Header closeButton>Create new list</Modal.Header>
      <Modal.Body>
        <div className="form_field_wrapper">
          <label>Title</label>
          <input></input>
        </div>
      </Modal.Body>
    </Modal>
  );
}
