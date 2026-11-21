import React,{createContext,useContext,useEffect,useState} from 'react';import {registerSessionExpired} from '@/src/api/client';import {readSession,eraseSession,saveSession} from './session';
type AuthState={logged:boolean;ready:boolean;signIn:(token:string,refresh:string)=>Promise<void>;signOut:()=>Promise<void>};
const C=createContext<AuthState>({logged:false,ready:false,signIn:async()=>{},signOut:async()=>{}});
export function AuthProvider({children}:{children:React.ReactNode}){const [logged,setLogged]=useState(false),[ready,setReady]=useState(false);useEffect(()=>{readSession().then(v=>setLogged(!!v)).finally(()=>setReady(true));registerSessionExpired(()=>setLogged(false));return()=>registerSessionExpired(()=>{})},[]);return <C.Provider value={{logged,ready,signIn:async(t,r)=>{await saveSession(t,r);setLogged(true)},signOut:async()=>{await eraseSession();setLogged(false)}}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);
