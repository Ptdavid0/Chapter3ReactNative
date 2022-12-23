import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import UserPhoto from "./UserPhoto";
import { TouchableOpacity } from "react-native";

const HomeHeader: React.FC = () => {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        size={16}
        source={{
          uri: "https://github.com/ptdavid0.png",
        }}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Ola,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Pedro
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
