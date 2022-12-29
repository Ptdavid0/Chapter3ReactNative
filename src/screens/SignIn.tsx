import React from "react";
import { VStack, Image, Text, Center, Heading } from "native-base";
import Input from "@components/Input";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigate("SignUp");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSignIn = ({ email, password }: FormData) => {
    console.log(email, password);
  };

  return (
    <VStack flex={1} px={10} pb={16}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        defaultSource={BackgroundImg}
        resizeMode="center"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm" fontWeight="bold">
          Treine sua mente e seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
          Acesse sua conta
        </Heading>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              mt={4}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              errorMessages={errors.email?.message}
              value={value}
            />
          )}
          name="email"
          rules={{ required: "Informe o e-mail" }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={onChange}
              errorMessages={errors.password?.message}
              value={value}
            />
          )}
          name="password"
          rules={{ required: "Informe a senha" }}
          defaultValue=""
        />

        <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />
      </Center>

      <Text
        color="gray.100"
        fontSize="sm"
        textAlign="center"
        mt={32}
        mb={3}
        fontFamily="body"
      >
        Ainda não tem tem acesso ?{" "}
      </Text>
      <Button
        title="Criar conta"
        variant={"outline"}
        onPress={handleNewAccount}
      />
    </VStack>
  );
};

export default SignIn;
