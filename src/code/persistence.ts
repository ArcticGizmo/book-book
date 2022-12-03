import { Preferences } from '@capacitor/preferences';

export const writeToStore = async (key: string, data: any) => {
  await Preferences.set({ key, value: JSON.stringify(data.value) });
};

export const loadFromStore = async <T>(key: string): Promise<T | undefined> => {
  const data = await Preferences.get({ key });

  if (data.value == null) {
    return undefined;
  }
  try {
    return JSON.parse(data.value);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
