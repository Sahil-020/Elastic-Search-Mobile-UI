import React, { Component } from "react";
import Downshift from "downshift";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { setBasketFormInput, setToken } from "../actions/index";
import { debounce } from "lodash";
import { basketBaseUrl, ApiKey, ApiBaseUrl } from "../../utils/constants";
import GetAuthToken from "../Api/Authenticate";

const mapStateToProps = (state) => {
  return {
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
  };
};

class ContactSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      customerSelected: props.basketInputObj.customer,
      contactUpdating: props.basketInputObj.contact.DisplayName || "",
    };

    this.fetchContacts = this.fetchContacts.bind(this);
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

      if (pair[0] === "Contact") {
        let value = pair[1].replace(/"/g, "");
        // this.inputOnChange(pair[1]);
        // this.setState({ customerName: pair[1] });
        this.props.setBasketFormInput({
          contact: { DisplayName: value },
        });
        let res = await this.fetchContacts(value);
        console.log({ res });
        if (res.length !== 0) {
          this.props.setBasketFormInput({ contact: res[0] });
        }

        // this.setState({ showBasketModal: pair[1] === "true" && true });
        // document.location.reload(true);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.basketInputs !== nextProps.basketInputObj) {
      this.setState({
        contactUpdating: nextProps.basketInputObj.contact.DisplayName,
        customerSelected: nextProps.basketInputObj.customer,
      });
    }
  }

  inputOnChange(value) {
    this.setState({
      contactUpdating: value,
    });
    this.onChangeDebounced(value);
  }
  async onChangeDebounced(val) {
    this.setState({
      contactUpdating: val,
    });
    var respo = await this.fetchContacts(val);
    this.setState({ contacts: respo });
  }

  downshiftOnChange(selected) {
    // console.log("Contact Selected: ", selected);
    if (selected) {
      this.props.setBasketFormInput({ contact: selected });
      this.setState({
        contactUpdating: selected.DisplayName,
      });
    }
  }

  async fetchContacts(val) {
    // console.log("contact val: ", val);
    var custobj = this.state.customerSelected;
    var token = this.props.tokenState.token;
    var custId;
    if (custobj.CustomerId) {
      custId = custobj.CustomerId;
    } else {
      custId = null;
    }
    var payload = {
      data: {
        defaults: {
          baseURL: basketBaseUrl,
          token: token,
        },
        inputs: {
          CustomerID: { value: custId },
          Contact: { value: val },
        },
      },
    };
    var response = await axios.post(ApiBaseUrl + "contact", payload, {
      headers: {
        "x-api-key": ApiKey,
      },
    });
    if (
      response.data &&
      response.data.statusCode === 200 &&
      JSON.parse(JSON.parse(response.data.body).Contacts.value)
    ) {
      // console.log(
      //   "Contact Response: ",
      //   JSON.parse(JSON.parse(response.data.body).Contacts.value)
      // );
      return JSON.parse(JSON.parse(response.data.body).Contacts.value);
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
    let { contactUpdating, contacts } = this.state;
    return (
      <Downshift
        onChange={this.downshiftOnChange}
        itemToString={(item) => (item ? item.DisplayName : "")}
        inputValue={contactUpdating ? contactUpdating : ""}
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
              Contact:
            </label>
            <div className="input__dropdown__container">
              <div className="input__container">
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  required
                  {...getInputProps({
                    placeholder: "Contact Quicksearch",
                    onChange: (e) => {
                      this.inputOnChange(e.target.value, selectedItem);
                      if (e.target.value === "") {
                        clearSelection();
                        this.setState({
                          contactUpdating: "",
                        });
                        this.props.setBasketFormInput({ contact: {} });
                      }
                    },
                  })}
                />
                <span className="form-control-feedback">
                  <img
                    src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/customer-search.png"
                    alt="contact search"
                  />
                </span>
              </div>
              {isOpen ? (
                <ul className="downshift-dropdown">
                  {contacts
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.DisplayName.toLowerCase().includes(
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
                        {item.DisplayName}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactSearch);
