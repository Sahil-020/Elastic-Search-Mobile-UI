import React, { Component } from "react";
import Header from "./Header";
import JewelryMain from "./Jewelry/JewelryMain";
import { Switch, Route, Redirect } from "react-router-dom";
import SingleItem from "./SingleItemView/SingleItem";
import DiamondMain from "./Diamond/DiamondMain";
import GemstoneMain from "./Gemstone/GemstoneMain";
import ScrollToTop from "react-scroll-to-top";
import Arrow from "../assets/icons/arrow-151-24.png";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import IframeModal from "./OtherComponents/IframeModal";
import { setGroups } from "./actions";
import { bindActionCreators } from "redux";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    isLoading: state.loaderActions.isLoading,
  };
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackButton: false,
    };
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleGetGroups = this.handleGetGroups.bind(this);
  }

  async componentDidMount() {
    await this.handleGetGroups();
  }

  async handleGetGroups() {
    await axios
      .get(
        "https://kwiat.cloudflareaccess.com/cdn-cgi/access/get-identity",
        {
          headers: {
            // "content-Type": "application/json",
            // Accept: "/",
            // "Cache-Control": "no-cache",
            cookie:
              "CF_Authorization=eyJhbGciOiJSUzI1NiIsImtpZCI6IjYyMGIyZTRiYzRjZDFhNjBkNzM1NWVhZDFjMjg5YTIwYmVjZmY2Y2E1Y2Y0MDM0ZGE1MDM5Zjk3ZDYxOWFmMDYifQ.eyJhdWQiOlsiMzFhMDdmNGQ0YmE3YjAzOWE3YWYwMjI0YzU4YTE0OWI5MmEyNjAzZmY1OTk0NTBjNjE0ZWVkZjZkZWIzMTBiYiJdLCJlbWFpbCI6ImNvcnlAS3dpYXQuY29tIiwiZXhwIjoxNjUxMTkzNjk4LCJpYXQiOjE2NDg1NjU2OTgsIm5iZiI6MTY0ODU2NTY5OCwiaXNzIjoiaHR0cHM6Ly9rd2lhdC5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsInR5cGUiOiJhcHAiLCJpZGVudGl0eV9ub25jZSI6InNTc2hVejE1QzdUaUpBaWsiLCJzdWIiOiI2NjVjMGM0NC1iMTYyLTQ0NWQtYmMyMy1iMDE2YzJmYWYxYWEiLCJjb3VudHJ5IjoiVVMifQ.dTX_ePcQkZhhbyi0dlpLDXKLJ7IRFJ3Y9HuRJ6sHCIFKMwQ1G9gr0onTmJLgTUPeEGbeWySYzk2A7GZA7iz8Tnk8pDq9hkGV7vnOXGfRUP2WtXVEcGjSPpC68oz3pmxrvafG2TfnTKkNRKZCmo8coafCGc3jjO_sOxhJPv2IkgIG_pDDXE5mjVS9P18x5tHzQu0fyeqxNWpRI7NOV6OkeURqVHEfUjQk5YfTB2KgfDod6pFKF8on2Oi0ym5yxluMFKu1P-r1dSaNbzCB51_vEx7Jyql7chfwwY6K2tEpQ7hJ1guqN3I_HXYPI0NGcnr5WmMS3BlklsPTvxyqxvY7Jw",
          },
          // credentials: "same-origin",
          withCredentials: true,
        }
        //   payload
      )
      .then((res) => {
        console.log("res.data :", res.data);
        this.props.setGroups({ groups: res.data.groups });
      })
      .catch((err) => {
        console.log({ err });
      });
  }
  handleBackButton(value) {
    this.setState({ showBackButton: value });
  }

  render() {
    return (
      <LoadingOverlay active={this.props.isLoading} spinner text="Loading...">
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
          <IframeModal />
        </div>
      </LoadingOverlay>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setGroups }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
