import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          icon={{ name: "delete-forever" }}
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

const styles = {
  headerStyle: { marginTop: Platform.OS === "android" ? 24 : 0 }
};

export default connect(
  null,
  { clearLikedJobs }
)(SettingsScreen);
