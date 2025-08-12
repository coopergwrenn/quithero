import { View, Text } from 'react-native';
import { useTheme } from '~/design/theme';

export default function CheckItem({ text }: { text: string }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection:'row', alignItems:'center', gap:10 }}>
      <View style={{ width:10, height:10, borderRadius:999, backgroundColor:t.colors.success }} />
      <Text style={{ color:t.colors.subtext }}>{text}</Text>
    </View>
  );
}