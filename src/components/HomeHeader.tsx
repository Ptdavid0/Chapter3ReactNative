import { Heading, HStack, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import UserPhoto from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

const HomeHeader: React.FC = () => {
  const { user, signOut } = useAuth();

  const userPhoto = user.avatar ? { uri: user.avatar } : defaultUserPhotoImg;

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto size={16} source={userPhoto} mr={4} />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Ola,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
};

export default HomeHeader;
