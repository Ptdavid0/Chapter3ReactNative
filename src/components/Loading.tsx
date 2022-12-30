import React from "react";
import { Spinner, Center } from "native-base";

const Loading: React.FC = () => {
  return (
    <Center flex={1}>
      <Spinner accessibilityLabel="Loading fonts" color="green.500" />
    </Center>
  );
};

export default Loading;
