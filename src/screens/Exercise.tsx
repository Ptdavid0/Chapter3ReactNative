import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepsSvg from "@assets/repetitions.svg";
import Button from "@components/Button";

const Exercise: React.FC = () => {
  const { goBack } = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    goBack();
  };
  return (
    <VStack flex={1}>
      <VStack pt={12} bg="gray.600" px={8}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
            mt={2}
          />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={8}
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Remada unilateral
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text
              color="gray.200"
              fontSize="xs"
              textTransform="capitalize"
              ml={1}
            >
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            alt="Exercicio"
            source={{
              uri: "https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg",
            }}
            w={"full"}
            h={80}
            mb={3}
            rounded="lg"
            resizeMode="cover"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Exercise;
