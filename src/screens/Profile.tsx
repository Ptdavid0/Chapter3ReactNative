import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const PHOTO_SIZE = 33;

const Profile: React.FC = () => {
  const [photoIsLoading, setPhotoIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState(
    "https://github.com/ptdavid0.png"
  );

  const toast = useToast();

  const handlePickImage = async () => {
    setPhotoIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (result.canceled) return;

      if (result.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(result.assets[0].uri);

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Erro ao alterar foto",
            description: "A foto deve ter no máximo 5MB",
            duration: 5000,
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 36,
        }}
      >
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{
                uri: userPhoto,
              }}
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handlePickImage}>
            <Text
              color="green.500"
              fontSize="md"
              mt={2}
              fontWeight="bold"
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={"gray.600"} />
          <Input placeholder="E-mail" bg={"gray.600"} isDisabled />
        </Center>

        <VStack px={10} mb={9}>
          <Heading
            color="gray.200"
            fontSize="md"
            fontWeight="bold"
            mb={4}
            alignSelf="flex-start"
            mt={6}
            fontFamily="heading"
          >
            Alterar senha
          </Heading>
          <Input placeholder="Senha antiga" bg={"gray.600"} secureTextEntry />
          <Input
            placeholder="Nova senha"
            bg={"gray.600"}
            secureTextEntry
            onChangeText={setPassword}
          />
          {password && (
            <Input
              placeholder="Confirme a nova senha"
              bg={"gray.600"}
              secureTextEntry
            />
          )}

          <Button title="Alterar senha" mt={6} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
