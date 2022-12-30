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
import { Controller, useForm } from "react-hook-form";
import React from "react";
import Input from "@components/Input";
import Button from "@components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@hooks/useAuth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../service/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  old_password: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome obrigatório"),
  password: Yup.string()
    .min(6, "No mínimo 6 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: Yup.string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais")
    .when("password", {
      is: (Field: any) => Field,
      then: Yup.string()
        .nullable()
        .transform((value) => (!!value ? value : null))
        .required("Confirmação de senha obrigatória"),
    }),
});

const Profile: React.FC = () => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [photoIsLoading, setPhotoIsLoading] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState(
    "https://github.com/ptdavid0.png"
  );
  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(schema),
  });

  const handleProfileUpdate = async (data: FormData) => {
    try {
      setIsUpdating(true);

      const userUpdated = user;

      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o perfil, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
      toast.show({
        title: "Erro ao alterar foto",
        description: "Não foi possível alterar a foto de perfil",
        duration: 5000,
        placement: "top",
        bgColor: "red.500",
      });
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

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
                bg={"gray.600"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessages={errors.name?.message}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="E-mail"
                bg={"gray.600"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isDisabled
              />
            )}
            name="email"
          />
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

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha antiga"
                bg={"gray.600"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="old_password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nova senha"
                bg={"gray.600"}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                errorMessages={errors.password?.message}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg={"gray.600"}
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                errorMessages={errors.confirm_password?.message}
              />
            )}
            name="confirm_password"
          />

          <Button
            title="Atualizar"
            mt={6}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
