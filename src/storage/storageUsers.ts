import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "./StorageConfig";

export const storageUser = async (user: UserDTO) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const storageUserGet = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_STORAGE);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    throw error;
  }
};

export const storageUserRemove = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
};
