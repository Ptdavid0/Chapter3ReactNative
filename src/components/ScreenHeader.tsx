import { Center, Heading } from "native-base";
import React from "react";

type Props = {
  title: string;
};

const ScreenHeader: React.FC<Props> = ({ title }) => {
  return (
    <Center bg="gray.600" pb={8} pt={16}>
      <Heading color="gray.100" fontSize="xl" pt={2} fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
};

export default ScreenHeader;
