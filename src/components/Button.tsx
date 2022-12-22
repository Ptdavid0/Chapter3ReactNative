import React from "react";
import { Button as NativeBaseButton, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "solid" | "outline";
};

const Button: React.FC<Props> = ({ title, variant = "solid", ...rest }) => {
  return (
    <NativeBaseButton
      w="full"
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      h={14}
      rounded="sm"
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
      _focus={{ borderWidth: 1, borderColor: "green.500", bg: "gray.700" }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
};

export default Button;
