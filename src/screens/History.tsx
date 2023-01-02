import HistoryCard from "@components/HistoryCard";
import ScreenHeader from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";
import { SectionList, VStack, Text, Heading, useToast } from "native-base";
import React from "react";
import { api } from "../service/api";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@components/Loading";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useAuth } from "@hooks/useAuth";

const History: React.FC = () => {
  const [exercises, setExercises] = React.useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const toast = useToast();
  const { refreshedToken } = useAuth();

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/history`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico de exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [refreshedToken])
  );

  if (isLoading || !exercises) {
    return <Loading />;
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        renderItem={({ item }) => <HistoryCard data={item} />}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            mt={10}
            mb={3}
            fontFamily="heading"
          >
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
