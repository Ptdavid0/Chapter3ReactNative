import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, Text, VStack } from "native-base";
import React from "react";

type HistoryCardProps = {
  data: HistoryDTO;
};

const HistoryCard: React.FC<HistoryCardProps> = ({ data }) => {
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
      <VStack mr={5} flex={1}>
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
          fontFamily="heading"
        >
          {data.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text color="gray.200" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  );
};

export default HistoryCard;
