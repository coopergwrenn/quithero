import { Tabs } from 'expo-router';
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown:false }}>
      <Tabs.Screen name="dashboard" options={{ title:'Dashboard' }} />
      <Tabs.Screen name="tools" options={{ title:'Tools' }} />
      <Tabs.Screen name="learn" options={{ title:'Learn' }} />
      <Tabs.Screen name="community" options={{ title:'Community' }} />
      <Tabs.Screen name="coach" options={{ title:'Coach' }} />
    </Tabs>
  );
}