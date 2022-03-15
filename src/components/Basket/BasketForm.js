import React from "react";
import { Modal } from "react-bootstrap";
import ContactSearch from "../OtherComponents/ContactSearch";
import CustomerSearch from "../OtherComponents/CustomerSearch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBasketFormInput } from "../actions";

export default function BasketForm(props) {
  let { show, handleShowBasketForm } = props;
  let basketForm = useSelector((state) => state.basketInputChange);
  let dispatch = useDispatch();
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
          <label>Description</label>
          <textarea
            value={basketForm.desc}
            onChange={(e) =>
              dispatch(setBasketFormInput({ desc: e.target.value }))
            }
          />
        </div>
        <div className="form_field_wrapper">
          <label>Internal Notes</label>
          <textarea
            value={basketForm.internalNotes}
            onChange={(e) =>
              dispatch(setBasketFormInput({ internalNotes: e.target.value }))
            }
          />
        </div>
        <CustomerSearch />
        <ContactSearch />
        <div className="form_field_wrapper">
          <label>Occasion</label>
          <select
            name="occasion"
            id="basket_occasion"
            value={basketForm.occasion}
            onChange={(e) =>
              dispatch(setBasketFormInput({ occasion: e.target.value }))
            }
          >
            <option value="default" disabled>
              Select Occasion
            </option>
            <option value="ANNIV">Anniversary</option>
            <option value="BABY">Baby Celebration</option>
            <option value="BIRTHDAY">Birthday</option>
            <option value="ENGAGE">Engagement</option>
            <option value="HOLIDAY">Holiday</option>
            <option value="JUSTBEC">Just Because</option>
            <option value="MOTHDAY">Mothers Day</option>
            <option value="OTHER">Other Celebration</option>
            <option value="UNKNOWN">Unknown</option>
            <option value="VALDAY">Valentines Day</option>
            <option value="WEDDING">Wedding</option>
            <option value="GIFT4ANOTH">Gift for Friend</option>
            <option value="GRADUATION">Graduation</option>
            <option value="WHOLESALEPROPOSAL">Wholesale Proposal</option>
          </select>
        </div>
        <div className="form_field_wrapper">
          <button>Create</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
