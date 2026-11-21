jest.mock('expo-secure-store',()=>{const mem=new Map<string,string>();return {setItemAsync:jest.fn(async(k:string,v:string)=>{mem.set(k,v)}),getItemAsync:jest.fn(async(k:string)=>mem.get(k)||null),deleteItemAsync:jest.fn(async(k:string)=>{mem.delete(k)})}});
import {saveSession,readSession,eraseSession} from '../src/services/session';
test('guardar, leer y borrar tokens en SecureStore',async()=>{await saveSession('id-token','refresh-token');expect(await readSession()).toEqual({token:'id-token',refreshToken:'refresh-token'});await eraseSession();expect(await readSession()).toBeNull()});
