import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '~/design/theme'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

function Root() {
  const t = useTheme();
  return (
    <View style={{ flex:1, backgroundColor: t.colors.bg }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
export default function RootLayout(){
  useFrameworkReady(); return <Root />; }