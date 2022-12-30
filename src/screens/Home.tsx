import ExerciseCard from "@components/ExerciseCard";
import HomeHeader from "@components/HomeHeader";
import { FlatList, Heading, HStack, Text, VStack, useToast } from "native-base";
import React from "react";
import Group from "../components/Group";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "../service/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import Loading from "@components/Loading";

const Home: React.FC = () => {
  const [activeGroup, setActiveGroup] = React.useState("antebraço");
  const [groups, setGroups] = React.useState<string[]>([]);
  const [exercises, setExercises] = React.useState<ExerciseDTO[]>([]);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = React.useState(true);
  const toast = useToast();

  const isCurrentActiveGroup = (name: string) =>
    activeGroup.toLocaleUpperCase() === name.toLocaleUpperCase();

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigate("Exercise", { exerciseId });
  };

  React.useEffect(() => {
    fetchGroup();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchExercises();
    }, [activeGroup])
  );

  const fetchGroup = async () => {
    try {
      const { data } = await api.get(`/groups`);
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  const fetchExercises = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/bygroup/${activeGroup}`);
      setExercises(data);
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

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={isCurrentActiveGroup(item)}
            onPress={() => setActiveGroup(item)}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default Home;
