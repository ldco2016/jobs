import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";
import { Card, Button, Icon } from "react-native-elements";
// import Moment from "react-moment";
// import { FormattedRelative } from "react-intl";
import Swipe from "../components/Swipe";
import * as actions from "../actions";

class DeckScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Jobs",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    }
  });

  renderCard(job) {
    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === "android"}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company.id}</Text>
          <Text>
            {job.post_date.toString().replace(/\d{2}:\d{2}:\d{2}/gm, "")}
          </Text>
        </View>
        <Text>{job.description.replace(/<(?:.|\n)*?>/gm, "")}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large
          icon={{ name: "my-location" }}
          onPress={() => this.props.navigation.navigate("map")}
        />
      </Card>
    );
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likedJob(job)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.listing };
};

export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
