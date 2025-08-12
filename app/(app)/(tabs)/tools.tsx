import { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import Card from '~/design/components/Card';
import Button from '~/design/components/Button';
import { useTheme } from '~/design/theme';
import { useEntitlements } from '~/state/entitlements';
import { useToolsState } from '~/state/tools';
import Panic from '~/tools/Panic';
import UrgeTimer from '~/tools/UrgeTimer';
import Breathwork from '~/tools/Breathwork';
import Pledge from '~/tools/Pledge';

type Screen = 'menu'|'panic'|'urge'|'breath'|'pledge';

export default function Tools() {
  const t = useTheme();
  const { isPro } = useEntitlements();
  const { tools } = useToolsState();
  const [screen, setScreen] = useState<Screen>('menu');

  function ensureAccess(start: () => void) {
    if (!isPro && tools.panicPreviewUsed) {
      router.push('/(paywall)/paywall');
      return;
    }
    start();
  }

  if (screen === 'panic') return <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24 }}><Panic onDone={() => setScreen('menu')} /></View>;
  if (screen === 'urge') return <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24 }}><UrgeTimer onDone={() => setScreen('menu')} /></View>;
  if (screen === 'breath') return <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24 }}><Breathwork onDone={() => setScreen('menu')} /></View>;
  if (screen === 'pledge') return <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24 }}><Pledge onDone={() => setScreen('menu')} /></View>;

  return (
    <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24, gap:12 }}>
      <Text style={{ color:t.colors.text, fontSize:24, fontWeight:'800' }}>Tools</Text>
      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>Panic Button</Text>
        <Text style={{ color:t.colors.subtext }}>60-second grounding. Non-Pro gets one free run.</Text>
        <Button title="Start" onPress={() => ensureAccess(() => setScreen('panic'))} />
      </Card>
      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>Urge Wave Timer</Text>
        <Text style={{ color:t.colors.subtext }}>Ride the 5-minute wave with checkpoints.</Text>
        <Button title="Start" onPress={() => setScreen('urge')} />
      </Card>
      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>Breathwork</Text>
        <Text style={{ color:t.colors.subtext }}>Box breathing for 1–3 minutes.</Text>
        <Button title="Start" onPress={() => setScreen('breath')} />
      </Card>
      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>Daily Pledge</Text>
        <Text style={{ color:t.colors.subtext }}>Commit for today, one day at a time.</Text>
        <Button title="Start" onPress={() => setScreen('pledge')} />
      </Card>
    </View>
  );
}