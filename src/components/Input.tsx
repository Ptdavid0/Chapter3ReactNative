import React from "react";
import { Input as NativeBaseInput, IInputProps } from "native-base";

const Input: React.FC<IInputProps> = ({ ...rest }) => {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "gray.700",
      }}
      {...rest}
    />
  );
};

export default Input;
