import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";
import { SectionList, VStack, Text, Heading } from "native-base";
import React from "react";

const History: React.FC = () => {
  const [exercises, setExercises] = React.useState([
    { title: "2021-08-01", data: ["Remada", "Puxada"] },
    { title: "2021-08-01", data: ["Remada", "Puxada"] },
    { title: "2021-08-02", data: ["Remada", "Puxada"] },
    { title: "2021-08-02", data: ["Remada", "Puxada"] },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        renderItem={({ item }) => <HistoryCard />}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }
        }
        ListEmptyComponent={
          <Text
            color="gray.200"
            fontSize="md"
            mt={10}
            mb={3}
            textAlign="center"
          >
            Você ainda não possui exercício registrados !{"\n"} Vamos treinar ?
          </Text>
        }
        px={8}
      />
    </VStack>
  );
};

export default History;
