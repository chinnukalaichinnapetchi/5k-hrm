import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-reanimated';
import DrawerNavigation from "./DrawerNavigation";
import Login from "../Login";
import Dashboard from "../Dashboard"

// Navigators
const Stack = createNativeStackNavigator();


export default function RouteNavigation() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <StatusBar
    //     barStyle="dark-content"
    //     backgroundColor="transparent"
    //     translucent={true}
    //   />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
  );
}


