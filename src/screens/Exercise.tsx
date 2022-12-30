import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
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
import { useRoute } from "@react-navigation/native";
import { api } from "../service/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import Loading from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string;
};

const Exercise: React.FC = () => {
  const { goBack } = useNavigation<AppNavigatorRoutesProps>();

  const [exercise, setExercise] = React.useState<ExerciseDTO>(
    {} as ExerciseDTO
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const toast = useToast();
  const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/${exerciseId}`);
      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  const handleGoBack = () => {
    goBack();
  };

  if (isLoading || !exercise) {
    return (
      <VStack flex={1}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
            mt={16}
            ml={8}
          />
        </TouchableOpacity>
        <Loading />
      </VStack>
    );
  }

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
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text
              color="gray.200"
              fontSize="xs"
              textTransform="capitalize"
              ml={1}
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              alt="Exercicio"
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              w={"full"}
              h={80}
              mb={3}
              rounded="lg"
              resizeMode="cover"
            />
          </Box>

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
                  {exercise.series} séries
                </Text>
              </HStack>
              <HStack>
                <RepsSvg />
                <Text color="gray.200" ml={2}>
                  {exercise.repetitions} repetições
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
