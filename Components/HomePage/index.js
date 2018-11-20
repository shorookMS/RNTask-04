import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import * as actionCreators from "../../store/actions/authActions";

// NativeBase Components
import { Container } from "native-base";

// Style
import styles from "./styles";

// Actions
import { getCoffeeShops } from "../../store/actions/coffeeActions";

// Navigation
import Nav from "../Navigation";

class HomePage extends Component {
  componentDidMount() {
    const { coffeeshops } = this.props.coffee;
    if (!coffeeshops) {
      this.props.getCoffeeShops();
      this.props.checkForExpiredToken();
    }
  }

  render() {
    return (
      <Container style={styles.transparent}>
        <Nav />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  coffee: state.coffee
});

const mapActionsToProps = dispatch => ({
  getCoffeeShops: () => dispatch(getCoffeeShops()),
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomePage);
