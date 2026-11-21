import {eraseSession,readSession,saveSession} from '@/src/services/session';
const base=process.env.EXPO_PUBLIC_API_URL||'';
let onExpired:()=>void=()=>{};
export function registerSessionExpired(callback:()=>void){onExpired=callback}
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
async function raw(
  path: string,
  init: RequestInit = {},
  token?: string
) {
  const isHttps = base.startsWith('https://');

  const isLocalDev =
    __DEV__ &&
    base === 'http://192.168.1.194:3000';

  if (!isHttps && !isLocalDev) {
    throw new Error('Configura EXPO_PUBLIC_API_URL con HTTPS');
  }

  return fetch(`${base}${path}`, {
    ...init,
    headers: {
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}
async function parse<T>(r:Response):Promise<T>{const data=await r.json().catch(()=>({error:'Respuesta inválida'}));if(!r.ok)throw new ApiError(r.status,data.error||'Error de conexión');return data as T}
export async function publicPost<T>(path:string,payload:unknown){return parse<T>(await raw(path,{method:'POST',body:JSON.stringify(payload)}))}
let refreshing:Promise<string>|null=null;
async function refreshOnce(){if(!refreshing)refreshing=(async()=>{const session=await readSession();if(!session)throw Error('Sin sesión');const data=await publicPost<{token:string;refreshToken:string}>('/api/auth/refresh',{refreshToken:session.refreshToken});await saveSession(data.token,data.refreshToken);return data.token})().finally(()=>{refreshing=null});return refreshing}
export async function request<T>(path:string,init:RequestInit={}){const session=await readSession();if(!session)throw new ApiError(401,'Debes iniciar sesión');let r=await raw(path,init,session.token);if(r.status===401){try{const token=await refreshOnce();r=await raw(path,init,token)}catch{await eraseSession();onExpired();throw new ApiError(401,'Tu sesión terminó')}}if(r.status===401){await eraseSession();onExpired()}return parse<T>(r)}
