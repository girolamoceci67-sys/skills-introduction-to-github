import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_STORAGE_KEY = 'corpolibero.language';

export async function getStoredLanguage(): Promise<string | null> {
  return AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
}

export async function setStoredLanguage(code: string): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
}
