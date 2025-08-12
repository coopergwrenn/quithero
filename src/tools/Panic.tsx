import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Button from '~/design/components/Button';
import Card from '~/design/components/Card';
import { useTheme } from '~/design/theme';
import { useToolsState } from '~/state/tools';

export default function Panic({ onDone }: { onDone: () => void }) {
  const t = useTheme();
  const { markPanicUsed } = useToolsState();
  const [sec, setSec] = useState(60);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => { if (sec === 0) markPanicUsed(); }, [sec]);

  const checkpoints = [
    { t: 60, msg: 'Grounding: name 5 things you see.' },
    { t: 45, msg: 'Breathe 4-4-4-4. In… hold… out… hold.' },
    { t: 30, msg: 'Sip water. Stretch your hands.' },
    { t: 15, msg: 'The urge is a wave. You\'re already over the peak.' },
  ];
  const current = checkpoints.find(c => c.t >= sec) || checkpoints[checkpoints.length - 1];

  return (
    <View style={{ gap: 12 }}>
      <Card>
        <Text style={{ color: t.colors.text, fontSize: 22, fontWeight: '800' }}>{sec}s</Text>
        <Text style={{ color: t.colors.subtext, marginTop: 8 }}>{current.msg}</Text>
      </Card>
      <Button title={sec === 0 ? "I'm okay" : 'End early'} onPress={onDone} />
    </View>
  );
}