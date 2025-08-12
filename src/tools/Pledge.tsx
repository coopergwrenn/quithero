import { View, Text } from 'react-native';
import Button from '~/design/components/Button';
import Card from '~/design/components/Card';
import { useTheme } from '~/design/theme';
import { useProfile } from '~/state/profile';

export default function Pledge({ onDone }: { onDone: () => void }) {
  const t = useTheme();
  const { profile } = useProfile();
  return (
    <View style={{ gap: 12 }}>
      <Card>
        <Text style={{ color: t.colors.text, fontSize: 18, fontWeight: '700' }}>Today's pledge</Text>
        <Text style={{ color: t.colors.subtext, marginTop: 8 }}>
          I choose not to vape today{profile.quitDateISO ? ` (Quit date: ${new Date(profile.quitDateISO).toLocaleDateString()})` : ''}.
        </Text>
      </Card>
      <Button title="Commit" onPress={onDone} />
    </View>
  );
}