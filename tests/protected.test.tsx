import React from 'react';import {render,waitFor} from '@testing-library/react-native';
const mockReplace=jest.fn();
jest.mock('expo-router',()=>({Tabs:({children}:any)=>children,Redirect:({href}:{href:string})=>{mockReplace(href);return null}}));
jest.mock('../src/services/AuthContext',()=>({useAuth:()=>({logged:false,ready:true})}));
import Layout from '../app/(tabs)/_layout';
test('ruta protegida redirige a login sin sesión',async()=>{render(<Layout/>);await waitFor(()=>expect(mockReplace).toHaveBeenCalledWith('/login'))});
