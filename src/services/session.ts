import * as SecureStore from 'expo-secure-store';
const K1='mini_tienda_id_token',K2='mini_tienda_refresh_token';
export async function saveSession(token:string,refreshToken:string){await SecureStore.setItemAsync(K1,token);await SecureStore.setItemAsync(K2,refreshToken)}
export async function readSession(){const [token,refreshToken]=await Promise.all([SecureStore.getItemAsync(K1),SecureStore.getItemAsync(K2)]);return token&&refreshToken?{token,refreshToken}:null}
export async function eraseSession(){await SecureStore.deleteItemAsync(K1);await SecureStore.deleteItemAsync(K2)}
