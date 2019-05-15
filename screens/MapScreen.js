import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-elements";
import { MapView, Permissions } from "expo";
import { connect } from "react-redux";

import * as actions from "../actions";

class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Map",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="my-location" size={30} color={tintColor} />;
    }
  });

  state = {
    mapLoaded: false,
    region: {
      longitude: -97.7,
      latitude: 30,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  };

  async componentDidMount() {
    this.setState({ mapLoaded: true });
    await Permissions.askAsync(Permissions.LOCATION);
  }

  onRegionChangeComplete = region => {
    console.log(region);
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("deck");
    });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Search Jobs"
            icon={{ name: "search" }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default connect(
  null,
  actions
)(MapScreen);
