import {Accelerometer} from 'expo-sensors';import {useEffect,useState} from 'react';
export function shakeMagnitude(x:number,y:number,z:number){return Math.sqrt(x*x+y*y+z*z)}
export function isShake(x:number,y:number,z:number){return shakeMagnitude(x,y,z)>2.5}
export function useShake(active:boolean,onShake:()=>void){const [supported,setSupported]=useState(false);useEffect(()=>{let mounted=true;Accelerometer.isAvailableAsync().then(ok=>{if(mounted)setSupported(ok)}).catch(()=>setSupported(false));return()=>{mounted=false}},[]);useEffect(()=>{if(!active||!supported)return;let last=0;const subscription=Accelerometer.addListener(({x,y,z})=>{if(isShake(x,y,z)&&Date.now()-last>2500){last=Date.now();onShake()}});return()=>subscription.remove()},[active,supported,onShake]);return supported}
