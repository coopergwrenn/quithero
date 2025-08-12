import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Button from '~/design/components/Button';
import Card from '~/design/components/Card';
import { useTheme } from '~/design/theme';

export default function UrgeTimer({ onDone }: { onDone: () => void }) {
  const t = useTheme();
  const [sec, setSec] = useState(300);
  const timerRef = useRef<any>(null);
  useEffect(() => { timerRef.current = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000); return () => clearInterval(timerRef.current); }, []);
  const tips = [
    { at: 300, msg: 'Set a 5-minute challenge. You can ride the wave.' },
    { at: 240, msg: 'Walk to a window or doorway.' },
    { at: 180, msg: 'Slow inhale 4, exhale 6, repeat.' },
    { at: 120, msg: 'Swap ritual: tea, gum, or straw breathing.' },
    { at: 60,  msg: 'Text someone "holding the line".' },
    { at: 0,   msg: 'Nice. Urges crest and fall. Log this as a win.' },
  ];
  const tip = tips.find(ti => sec <= ti.at) || tips[0];
  return (
    <View style={{ gap: 12 }}>
      <Card>
        <Text style={{ color: t.colors.text, fontSize: 22, fontWeight: '800' }}>{sec}s</Text>
        <Text style={{ color: t.colors.subtext, marginTop: 8 }}>{tip.msg}</Text>
      </Card>
      <Button title={sec === 0 ? 'I made it' : 'End early'} onPress={onDone} />
    </View>
  );
}