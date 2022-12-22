import React from "react";
import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import Input from "@components/Input";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import Button from "@components/Button";

const SignUp: React.FC = () => {
  return (
    <VStack flex={1} bg="gray.700" px={10} pb={16}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
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
        <Heading color="gray.100" fontSize="xl" fontFamily="body" mb={6}>
          Crie sua conta
        </Heading>

        <Input
          placeholder="E-mail"
          mt={4}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input placeholder="Name" />

        <Input placeholder="Senha" type="password" secureTextEntry />

        <Button title="Criar e acessar" />
      </Center>

      <Center mt={8}>
        <Button title="Voltar para o login" variant={"outline"} mt={24} />
      </Center>
    </VStack>
  );
};

export default SignUp;
