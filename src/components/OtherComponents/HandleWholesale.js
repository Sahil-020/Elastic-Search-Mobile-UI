import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setBasketFormInput } from "../actions/index";

const mapStateToProps = (state) => {
  return {
    basketInputObj: state.basketInputChange,
  };
};

class HandleWholesale extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="show-code">
        <input
          type="checkbox"
          id="show-Wholesale"
          checked={this.props.basketInputObj.showWholesale}
          onChange={(e) =>
            this.props.setBasketFormInput({
              showWholesale: e.target.checked,
            })
          }
        />
        <label htmlFor="show-Wholesale">Show WHSL</label>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setBasketFormInput,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandleWholesale);
