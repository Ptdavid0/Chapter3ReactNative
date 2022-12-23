import React from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import Input from "@components/Input";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

const signUpSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  name: yup.string().required("Nome obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password"), null], "Senhas não conferem"),
});

const SignUp: React.FC = () => {
  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleGoBack = () => {
    goBack();
  };

  const handleSignUp = (data: FormData) => {
    console.log(data);
  };

  return (
    <ScrollView>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        defaultSource={BackgroundImg}
        resizeMode="center"
        position="absolute"
      />
      <VStack flex={1} px={10} pb={16}>
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontWeight="bold">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" fontFamily="body" mb={6}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessages={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                errorMessages={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                type="password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessages={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                type="password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessages={errors.password_confirmation?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Center mt={8}>
          <Button
            title="Voltar para o login"
            variant={"outline"}
            mt={20}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignUp;
