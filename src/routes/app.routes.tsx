import React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";
import HistorySvg from "@assets/history.svg";

import Home from "@screens/Home";
import Profile from "@screens/Profile";
import History from "@screens/History";
import Exercise from "@screens/Exercise";

type AppRoutes = {
  Home: undefined;
  Profile: undefined;
  History: undefined;
  Exercise: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes: React.FC = () => {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingHorizontal: sizes[4],
          paddingVertical: sizes[2],
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <HomeSvg width={iconSize} height={iconSize} fill={color} />;
          },
        }}
      />
      <Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <HistorySvg width={iconSize} height={iconSize} fill={color} />
            );
          },
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <ProfileSvg width={iconSize} height={iconSize} fill={color} />
            );
          },
        }}
      />
      <Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
