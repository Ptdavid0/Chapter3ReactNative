import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "../service/api";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

const ExerciseCard: React.FC<Props> = ({ data, ...rest }) => {
  const { name, thumb, series, repetitions } = data;
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.600"
        p={4}
        pr={4}
        rounded="md"
        alignItems="center"
        mb={3}
      >
        <Image
          alt="Exercicio"
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}` }}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <HStack flex={1} flexDirection="column">
            <Heading
              color="white"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="heading"
            >
              {name}
            </Heading>
            <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
              {series} séries x {repetitions} repetições
            </Text>
          </HStack>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
