import { Heading, HStack, Text, VStack } from "native-base";
import React from "react";

const HistoryCard: React.FC = () => {
  return (
    <HStack
      w="full"
      bg="gray.600"
      px={5}
      py={4}
      mb={3}
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5}>
        <Heading color="white" fontSize="md" textTransform="capitalize">
          Costas
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada Frontal
        </Text>
      </VStack>
      <Text color="gray.200" fontSize="md">
        08:56
      </Text>
    </HStack>
  );
};

export default HistoryCard;
