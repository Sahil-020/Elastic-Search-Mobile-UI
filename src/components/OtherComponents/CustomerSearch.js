import React, { Component } from "react";
import Downshift from "downshift";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { setBasketFormInput, setToken } from "../actions/index";
import { debounce } from "lodash";
import GetAuthToken from "../Api/Authenticate";
import { basketBaseUrl, ApiKey, ApiBaseUrl } from "../../utils/constants";

const mapStateToProps = (state) => {
  return {
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
  };
};

class CustomerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      customerName: props.basketInputObj.customer.Customer || "",
    };

    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.downshiftOnChange = this.downshiftOnChange.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 700);
  }

  async componentDidMount() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    // console.log({ queryString });
    for (let pair of queryString.entries()) {
      // console.log({ pair });
      // console.log("Key is: " + pair[0]);
      // console.log("Value is: " + pair[1]);

      if (pair[0] === "Customer") {
        let value = pair[1].replace(/"/g, "");
        // this.inputOnChange(pair[1]);
        // this.setState({ customerName: pair[1] });
        this.props.setBasketFormInput({
          customer: { Customer: value },
        });
        let res = await this.fetchCustomers(value);
        console.log({ res });
        if (res.length !== 0) {
          this.props.setBasketFormInput({ customer: res[0] });
        }

        // this.setState({ showBasketModal: pair[1] === "true" && true });
        // document.location.reload(true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.basketInputs !== nextProps.basketInputObj) {
      this.setState({
        customerName: nextProps.basketInputObj.customer.Customer,
      });
    }
  }

  inputOnChange(value) {
    this.setState({
      customerName: value,
    });
    this.onChangeDebounced(value);
  }
  async onChangeDebounced(val) {
    this.setState({
      customerName: val,
    });
    var respo = await this.fetchCustomers(val);
    this.setState({ customers: respo });
  }
  downshiftOnChange(selected) {
    // console.log("customer selected: ", selected);
    if (selected) {
      this.props.setBasketFormInput({ customer: selected });
      this.setState({
        customerName: selected.Customer,
      });
    }
  }

  async fetchCustomers(val) {
    // console.log("basketBaseUrl : ", basketBaseUrl);
    let token = this.props.tokenState.token;
    var payload = {
      data: {
        defaults: {
          baseURL: basketBaseUrl,
          token: token,
        },
        inputs: {
          Customer: {
            value: val,
          },
        },
      },
    };
    var response = await axios.post(ApiBaseUrl + "customers", payload, {
      headers: {
        "x-api-key": ApiKey,
      },
    });
    if (
      response.data &&
      response.data.statusCode === 200 &&
      JSON.parse(JSON.parse(response.data.body).Customers.value)
    ) {
      return JSON.parse(JSON.parse(response.data.body).Customers.value);
    } else if (JSON.parse(response.data.body).errorCode === 401) {
      let token = await GetAuthToken();
      if (token) {
        this.props.setToken(token.access_token);
        await this.onChangeDebounced(val);
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  render() {
    let { customerName, customers } = this.state;
    return (
      <Downshift
        onChange={this.downshiftOnChange}
        itemToString={(item) => (item ? item.Customer : "")}
        inputValue={customerName ? customerName : ""}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          clearSelection,
        }) => (
          <div className="basket__input customer__input form-group has-feedback form_field_wrapper">
            <label className="control-label" htmlFor="customer">
              Customer:
            </label>
            <div className="input__dropdown__container">
              <div className="input__container">
                <input
                  type="text"
                  className="form-control"
                  id="customer"
                  required
                  {...getInputProps({
                    placeholder: "Customer Quicksearch",
                    onChange: (e) => {
                      this.inputOnChange(e.target.value, selectedItem);
                      if (e.target.value === "") {
                        this.props.setBasketFormInput({ customer: {} });
                        clearSelection();
                        this.setState({
                          customerName: "",
                        });
                      }
                    },
                  })}
                />
                <span className="form-control-feedback">
                  <img
                    src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/customer-search.png"
                    alt="customer search"
                  />
                </span>
              </div>
              {isOpen ? (
                <ul className="downshift-dropdown">
                  {customers
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.Customer.toLowerCase().includes(
                          inputValue.toLowerCase()
                        )
                    )
                    .slice(0, 20)
                    .map((item, index) => (
                      <li
                        className="dropdown-item"
                        {...getItemProps({ key: index, index, item })}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        }}
                      >
                        {item.Customer}
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setBasketFormInput,
      setToken,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);
