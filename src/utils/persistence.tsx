import AsyncStorage from '@react-native-async-storage/async-storage';
// Handel to save cart data when app go in background or kill mode.
export const saveState = async (state) => {
  try {
    await AsyncStorage.setItem('APP_STATE', JSON.stringify(state));
  } catch (e) {}
};

// Handel to load data in cart when use return to app after from the background or kill mode.
export const loadState = async () => {
  try {
    const data = await AsyncStorage.getItem('APP_STATE');
    return data ? JSON.parse(data) : undefined;
  } catch (e) {
    return undefined;
  }
};