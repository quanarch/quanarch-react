import { navigation } from '../../core';

export const navigationService = {
  setNavigator(navigate: (path: string) => void): void {
    navigation.setNavigator(navigate);
  },

  navigate(path: string): void {
    navigation.navigate(path);
  },
};
