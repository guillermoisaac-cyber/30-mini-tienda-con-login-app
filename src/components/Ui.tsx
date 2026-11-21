import React from 'react';import {Text,TouchableOpacity,View,StyleSheet,ActivityIndicator} from 'react-native';
export const colors={primary:'#6D4AFF',ink:'#1C2140',muted:'#68708A',bg:'#F7F7FC',border:'#E6E5F1'};
export function Button({title,onPress,disabled=false,secondary=false,label}:{title:string;onPress:()=>void;disabled?:boolean;secondary?:boolean;label?:string}){return <TouchableOpacity accessibilityRole="button" accessibilityLabel={label||title} disabled={disabled} onPress={onPress} style={[styles.btn,secondary&&styles.secondary,disabled&&{opacity:.45}]}><Text style={[styles.btnText,secondary&&{color:colors.primary}]}>{title}</Text></TouchableOpacity>}
export function ScreenTitle({children}:{children:React.ReactNode}){return <Text style={styles.title}>{children}</Text>}
export function Price({cents}:{cents:number}){return <Text style={{color:colors.primary,fontWeight:'800',fontSize:17}}>${(cents/100).toLocaleString('es-CO',{minimumFractionDigits:2})}</Text>}
export function Loading(){return <View style={{padding:30}}><ActivityIndicator color={colors.primary}/></View>}
const styles=StyleSheet.create({btn:{backgroundColor:colors.primary,padding:14,borderRadius:14,alignItems:'center',marginVertical:5},secondary:{backgroundColor:'#EDEAFF'},btnText:{color:'white',fontWeight:'700',fontSize:15},title:{fontSize:28,fontWeight:'900',color:colors.ink,marginBottom:14}});
