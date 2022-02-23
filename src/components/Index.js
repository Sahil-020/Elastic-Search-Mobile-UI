import React, { Component } from "react";
import Header from "./Header";
import JewelryMain from "./jewelry/JewelryMain";
import { ToastContainer, toast } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import SingleItem from "./jewelry/SingleItem";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackButton: false,
    };
    this.handleBackButton = this.handleBackButton.bind(this);
  }
  handleBackButton(value) {
    this.setState({ showBackButton: value });
  }

  render() {
    return (
      <div className="main_container">
        <div className="navbar_container">
          <Header
            toggleBasket={this.toggleBasket}
            handleBackButton={this.handleBackButton}
            showBackButton={this.state.showBackButton}
          />
        </div>
        <div className="content">
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <Redirect to="/JewelrySerial" />;
              }}
            />
            <Route
              exact
              path="/JewelrySerial"
              render={(props) => (
                <JewelryMain
                  {...props}
                  handleBackButton={this.handleBackButton}
                />
              )}
            />
            <Route
              path="/JewelrySerial/:id"
              render={(props) => <SingleItem {...props} />}
            />
          </Switch>
        </div>
        {/* <JewelryMain /> */}
        <ToastContainer hideProgressBar={true} />
      </div>
    );
  }
}

export default Index;
