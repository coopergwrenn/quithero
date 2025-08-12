import { View, Text } from 'react-native';
export default function Community() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
      <Text style={{ fontSize:24, fontWeight:'700' }}>Community</Text>
      <Text style={{ opacity:0.8, textAlign:'center', marginTop:12 }}>
        Community features (stub) will be implemented here.
      </Text>
    </View>
  );
}