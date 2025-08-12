import { View, Text } from 'react-native';
export default function Coach() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
      <Text style={{ fontSize:24, fontWeight:'700' }}>Coach</Text>
      <Text style={{ opacity:0.8, textAlign:'center', marginTop:12 }}>
        AI Coach features (stub) will be implemented here.
      </Text>
    </View>
  );
}