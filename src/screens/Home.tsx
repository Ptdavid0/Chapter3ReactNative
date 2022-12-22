import ExerciseCard from "@components/ExerciseCard";
import HomeHeader from "@components/HomeHeader";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import React from "react";
import Group from "../components/Group";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const Home: React.FC = () => {
  const [activeGroup, setActiveGroup] = React.useState("costas");
  const [exercises, setExercises] = React.useState([
    "Puxada Frontal",
    "Remada lateral",
    "Remada unilateral",
    "Remada baixa",
    "Remada alta",
  ]);
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const isCurrentActiveGroup = (name: string) =>
    activeGroup.toLocaleUpperCase() === name.toLocaleUpperCase();

  const handleOpenExerciseDetails = () => {
    navigate("Exercise");
  };

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={["costas", "peito", "bíceps", "tríceps", "ombros", "pernas"]}
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
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseCard name={item} onPress={handleOpenExerciseDetails} />
          )}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};

export default Home;
