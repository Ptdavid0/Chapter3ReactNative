import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthRoutes from "./auth.routes";
import { useTheme, Box } from "native-base";
import { useAuth } from "@hooks/useAuth";
import AppRoutes from "./app.routes";
import Loading from "@components/Loading";

const Routes: React.FC = () => {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[500];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    // The box is necessary to avoid the white background on transition between screens
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};

export default Routes;
