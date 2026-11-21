import {Redirect} from 'expo-router';import {Loading} from '@/src/components/Ui';import {useAuth} from '@/src/services/AuthContext';
export default function Index(){const {logged,ready}=useAuth();if(!ready)return <Loading/>;return <Redirect href={logged?'/(tabs)':'/login'}/>}
