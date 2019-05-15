import React, { Component } from "react";
import { View, Text, Platform, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { MapView } from "expo";
import { connect } from "react-redux";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Review Jobs",
    headerRight: (
      <Button
        title="Settings"
        onPress={() => {
          navigation.navigate("settings");
        }}
      />
    ),
    style: {
      marginTop: Platform.OS === "android" ? 24 : 0
    }
  });

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const { company, post_date, apply_url, title, id } = job;

      return (
        <Card title={title} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === "android"}
              scrollEnabled={false}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company.id}</Text>
              <Text style={styles.italics}>
                {post_date.toString().replace(/\d{2}:\d{2}:\d{2}/gm, "")}
              </Text>
              <Button
                title="Apply Now!"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(apply_url)}
              />
            </View>
          </View>
        </Card>
      );
    });
  }

  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  italics: {
    fontStyle: "italic"
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
};

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
