import HomeHeader from "@components/HomeHeader";
import { Center, VStack } from "native-base";
import React from "react";

const Home: React.FC = () => {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  );
};

export default Home;
