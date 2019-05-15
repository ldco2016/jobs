import Expo, { Notifications } from "expo";
import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { Icon } from "react-native-elements";

import registerForNotifications from "./services/push_notifications";
import store from "./store";

import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";

const MainNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator(
          {
            map: MapScreen,
            deck: DeckScreen,
            review: {
              screen: createStackNavigator({
                review: ReviewScreen,
                settings: SettingsScreen
              }),
              navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                  return <Icon name="favorite" size={30} color={tintColor} />;
                }
              }
            }
          },
          {
            tabBarPosition: "bottom",
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          }
        )
      }
    },
    {
      navigationOptions: {
        tabBar: { visible: false }
      }
    }
  )
);

export default class App extends Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const {
        data: { text },
        origin
      } = notification;

      if (origin === "received" && text) {
        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <IntlProvider locale="en">
            <MainNavigator />
          </IntlProvider>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
