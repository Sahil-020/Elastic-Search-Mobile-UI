import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { CSVDownloader, jsonToCSV } from "react-papaparse";

class DiamondExportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { show, hide, handleDiamondExport, showPreviewModal } = this.props;
    return (
      <Modal
        animation={false}
        autoFocus={false}
        enforceFocus={false}
        className="show-diamond-export-modal"
        centered="true"
        size="sm"
        show={show}
        onHide={() => hide(false)}
      >
        {/* <LoadingOverlay active={isLoading} spinner text="Loading..."> */}
        <Modal.Header closeButton> Diamond Export Option </Modal.Header>
        <Modal.Body>
          <div className="export-option">
            <ul>
              {/* <li onClick={this.handleDiamondExport}>
                    Export Diamonds Items
                  </li> */}
              <CSVDownloader
                className="csv-link"
                data={() => handleDiamondExport("")}
                type="button"
                filename="Basket_Items"
                ref={this.csvLink}
                bom={true}
                config={{}}
              >
                Export Diamonds Items
              </CSVDownloader>
              <li onClick={() => handleDiamondExport("email")}>Email</li>
            </ul>
          </div>
          {/* <CSVLink
                className="csv-link"
                data={this.state.diamondcsvData}
                headers={diamondDataHeaderExport}
                target="_blank"
                filename={`Kwiat-Diamonds-Export-${this.getCurrentDate()}.csv`}
                ref={this.diamondcsvLink}
              /> */}
        </Modal.Body>
        {/* </LoadingOverlay> */}
      </Modal>
    );
  }
}

export default DiamondExportModal;
