import { View } from 'react-native';
import { useTheme } from '~/design/theme';

export default function BackgroundGlow() {
  const t = useTheme();
  return (
    <View pointerEvents="none" style={{ position:'absolute', inset:0, zIndex:0 }}>
      <View style={{
        position:'absolute', top:-120, left:-80, width:260, height:260, borderRadius:260,
        backgroundColor:t.colors.accent, opacity:0.18, transform:[{rotate:'15deg'}]
      }} />
      <View style={{
        position:'absolute', top:120, right:-60, width:220, height:220, borderRadius:220,
        backgroundColor:t.colors.accentDark, opacity:0.14
      }} />
      <View style={{
        position:'absolute', bottom:-100, left:40, width:300, height:300, borderRadius:300,
        backgroundColor:'#0ea5e9', opacity:0.10
      }} />
    </View>
  );
}