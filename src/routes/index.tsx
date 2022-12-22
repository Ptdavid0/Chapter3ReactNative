import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthRoutes from "./auth.routes";
import { useTheme, Box } from "native-base";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[500];

  return (
    // The box is necessary to avoid the white background on transition between screens
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
