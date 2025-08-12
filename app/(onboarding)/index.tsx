import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '~/design/theme';
import BackgroundGlow from '~/design/components/BackgroundGlow';
import Card from '~/design/components/Card';
import Button from '~/design/components/Button';
import Badge from '~/design/components/Badge';
import CheckItem from '~/design/components/CheckItem';

export default function Landing() {
  const t = useTheme();

  return (
    <View style={{ flex:1, backgroundColor:t.colors.bg }}>
      <BackgroundGlow />
      
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        {/* Brand + tagline */}
        <View style={{ gap:6, alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ color:t.colors.text, fontSize:32, fontWeight:'800', textAlign: 'center' }}>QuitVape</Text>
          <Text style={{ color:t.colors.subtext, textAlign: 'center', fontSize: 16 }}>A plan to quit vaping that actually sticks.</Text>
        </View>

        {/* Trust strip */}
        <View style={{ flexDirection:'row', gap:8, marginBottom:32, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Badge label="Private" />
          <Badge label="Takes < 90s" />
          <Badge label="No account needed" />
        </View>

        {/* Hero card */}
        <Card style={{ padding:24, gap:16, marginBottom: 24 }}>
          <Text style={{ color:t.colors.text, fontSize:24, fontWeight:'800', textAlign: 'center' }}>Build your plan</Text>
          <Text style={{ color:t.colors.subtext, textAlign: 'center', lineHeight: 22 }}>
            Personalized steps, not lectures. We'll ask a few quick questions and tailor your Day 0 game plan.
          </Text>

          <View style={{ gap:12, marginVertical: 8 }}>
            <CheckItem text="Tap-first onboarding (no walls of text)" />
            <CheckItem text="Personalized quit date and savings estimate" />
            <CheckItem text="One free tool taste before you commit" />
          </View>

          <Button title="Start in under 90 seconds" onPress={() => router.push('/(onboarding)/quiz')} style={{ marginTop:8 }} />
          <Pressable onPress={() => router.push('/(app)/(tabs)/tools')}>
            <Text style={{ color:t.colors.subtext, textAlign:'center', textDecorationLine:'underline', marginTop:8 }}>
              I just want to try a tool
            </Text>
          </Pressable>
        </Card>

        {/* Secondary reassurance */}
        <View style={{ gap:8, alignItems: 'center' }}>
          <Text style={{ color:t.colors.text, fontWeight:'700', textAlign: 'center' }}>What you'll see next</Text>
          <Text style={{ color:t.colors.subtext, textAlign: 'center', lineHeight: 20 }}>
            Your dependence level with the "why", your estimated savings, and a suggested quit date—shown above the paywall.
          </Text>
        </View>
      </View>
    </View>
  );
}