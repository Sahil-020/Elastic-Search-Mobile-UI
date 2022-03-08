import React, { Component } from "react";
import Header from "./Header";
import JewelryMain from "./Jewelry/JewelryMain";
import { Switch, Route, Redirect } from "react-router-dom";
import SingleItem from "./Basket/SingleItem";
import DiamondMain from "./Diamond/DiamondMain";
import GemstoneMain from "./Gemstone/GemstoneMain";
import ScrollToTop from "react-scroll-to-top";
import Arrow from "../assets/icons/arrow-151-24.png";

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
        <ScrollToTop component={<img src={Arrow}></img>} smooth />
        <Header
          showBackButton={this.state.showBackButton}
          handleBackButton={this.handleBackButton}
        />
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
            exact
            path="/DiamondSerial"
            render={(props) => (
              <DiamondMain
                {...props}
                handleBackButton={this.handleBackButton}
              />
            )}
          />
          <Route
            exact
            path="/GemstoneSerial"
            render={(props) => (
              <GemstoneMain
                {...props}
                handleBackButton={this.handleBackButton}
              />
            )}
          />
          {/*} <Route
            path={[
              "/JewelrySerial/:id",
              "/DiamondSerial/:id",
              "/GemstoneSerial/:id",
            ]}
            render={(props) => <SingleItem {...props} />}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default Index;
