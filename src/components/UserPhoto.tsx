import { IImageProps, Image } from "native-base";
import React from "react";

type Props = IImageProps & {
  size?: number;
};

const UserPhoto: React.FC<Props> = ({ size = 10, ...rest }) => {
  return (
    <Image
      w={size}
      h={size}
      alt="Profile Picture"
      rounded="full"
      borderColor="gray.400"
      borderWidth={2}
      {...rest}
    />
  );
};

export default UserPhoto;
