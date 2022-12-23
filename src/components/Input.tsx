import React from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessages?: string | null;
};

const Input: React.FC<Props> = ({
  errorMessages = null,
  isInvalid,
  ...rest
}) => {
  const invalid = !!errorMessages || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
          bg: "gray.700",
        }}
        _focus={{
          borderWidth: 1,
          borderColor: "green.500",
          bg: "gray.700",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage
        _text={{
          color: "red.500",
        }}
      >
        {errorMessages}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default Input;
