import { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Button from '~/design/components/Button';
import Card from '~/design/components/Card';
import { useTheme } from '~/design/theme';

export default function Breathwork({ onDone }: { onDone: () => void }) {
  const t = useTheme();
  const cycle = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  const [i, setI] = useState(0);
  const [sec, setSec] = useState(4);
  const ref = useRef<any>(null);
  useEffect(() => { ref.current = setInterval(() => setSec(s => s>1? s-1 : (setI(k => (k+1)%4), 4)), 1000); return () => clearInterval(ref.current); }, []);
  return (
    <View style={{ gap: 12 }}>
      <Card>
        <Text style={{ color: t.colors.text, fontSize: 22, fontWeight: '800' }}>{cycle[i]}</Text>
        <Text style={{ color: t.colors.subtext, marginTop: 8 }}>{sec}s</Text>
      </Card>
      <Button title="Done" onPress={onDone} />
    </View>
  );
}