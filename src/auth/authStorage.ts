import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const ACCOUNT_STORAGE_KEY = 'corpolibero.account';

interface StoredAccount {
  username: string;
  passwordHash: string;
}

/**
 * Login locale al solo dispositivo: nessun backend, nessun account recuperabile
 * da remoto. La password non è mai salvata in chiaro, solo il suo hash SHA-256.
 */
async function hashPassword(password: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
}

export async function getStoredAccount(): Promise<StoredAccount | null> {
  const raw = await AsyncStorage.getItem(ACCOUNT_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as StoredAccount) : null;
}

export async function hasStoredAccount(): Promise<boolean> {
  return (await getStoredAccount()) !== null;
}

export async function createAccount(username: string, password: string): Promise<void> {
  const passwordHash = await hashPassword(password);
  await AsyncStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify({ username, passwordHash }));
}

export async function verifyLogin(username: string, password: string): Promise<boolean> {
  const account = await getStoredAccount();
  if (!account) return false;
  const passwordHash = await hashPassword(password);
  return (
    account.username.trim().toLowerCase() === username.trim().toLowerCase() &&
    account.passwordHash === passwordHash
  );
}
