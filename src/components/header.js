import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import $ from "jquery";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNavLinks = this.handleNavLinks.bind(this);
  }

  handleNavLinks(e) {
    $(".navbar-nav").children().removeClass("active");
    // console.log("Selected value: ", value);
    e.target.className = "nav-link active";
  }

  render() {
    let { toggleBasket } = this.props;
    return (
      <div className="header">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png"
                // height="40px"
                // width="120px"
              ></img>
              <div className="basket_button">
                <img
                  src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/open-basket.png"
                  onClick={() => toggleBasket(true)}
                ></img>
              </div>
            </Navbar.Brand>
            <Nav>
              <Nav.Link
                className="active"
                onClick={(e) => this.handleNavLinks(e)}
              >
                Jewelry Serial
              </Nav.Link>
              <Nav.Link onClick={(e) => this.handleNavLinks(e)}>
                JewelryStyle
              </Nav.Link>
              <Nav.Link onClick={(e) => this.handleNavLinks(e)}>
                Diamond
              </Nav.Link>
              <Nav.Link onClick={(e) => this.handleNavLinks(e)}>
                Gemstone
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
