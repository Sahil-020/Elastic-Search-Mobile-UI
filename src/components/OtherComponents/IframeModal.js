import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleIframeModal } from "../actions/index";

class IframeModal extends Component {
  constructor(props) {
    super(props);
    this.onModalHide = this.onModalHide.bind(this);
  }

  onModalHide() {
    this.props.toggleIframeModal({
      show: false,
      url: "",
      editorial: "",
    });
  }

  render() {
    // console.log("Iframe options: ", this.props.payload);
    let { url, show, editorial } = this.props.payload;
    if (!url) {
      // return null;
      if (!editorial) {
        return null;
      }
    }
    return (
      <div className="modal-container">
        <Modal
          animation={false}
          autoFocus={false}
          enforceFocus={false}
          className="iframeModal"
          centered="true"
          size="lg"
          show={show}
          onHide={() => this.onModalHide()}
        >
          <Modal.Header closeButton className="modal-header-con" />
          <Modal.Body>
            {url ? <iframe title={url} src={url} frameBorder="0" /> : ""}
            {editorial ? (
              <iframe
                src={`https://iframe.videodelivery.net/${editorial}`}
                style={{ border: "none" }}
                height="720"
                width="1280"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen="true"
              />
            ) : (
              ""
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.iframeModal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleIframeModal,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(IframeModal);
