import { View, Text } from 'react-native';
export default function Learn() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
      <Text style={{ fontSize:24, fontWeight:'700' }}>Learn</Text>
      <Text style={{ opacity:0.8, textAlign:'center', marginTop:12 }}>
        Educational content and resources will be available here.
      </Text>
    </View>
  );
}