import { View, Text, Pressable } from 'react-native';
import Card from '~/design/components/Card';
import { useTheme } from '~/design/theme';
import { useProfile } from '~/state/profile';
import { usePlan } from '~/state/plan';
import { useDailyChecklist } from '~/state/daily';
import { fmtCurrency } from '~/utils/format';

function daysBetween(a: Date, b: Date) {
  const ms = Math.floor((b.getTime() - a.getTime()) / (1000*60*60*24));
  return ms;
}

export default function Dashboard() {
  const t = useTheme();
  const { profile } = useProfile();
  const { outcome } = usePlan();
  const quit = profile.quitDateISO ? new Date(profile.quitDateISO) : null;
  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  const days = quit ? Math.max(0, daysBetween(quit, today)) : 0;
  const weekly = profile.spendPerWeekUSD ?? 0;
  const saved = quit && weekly ? (weekly/7) * days : 0;

  // Get today's checklist from the plan
  const checklist = outcome?.plan.first72hChecklist || [];
  const { isDone, toggle, doneCount, allDone } = useDailyChecklist(todayISO, checklist.length);

  return (
    <View style={{ flex:1, backgroundColor:t.colors.bg, padding:24, gap:12 }}>
      <Text style={{ color:t.colors.text, fontSize:24, fontWeight:'800' }}>Dashboard</Text>

      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>
          {quit ? (days === 0 ? 'Day 0' : `${days} day${days===1?'':'s'} vape-free`) : 'Set your quit date'}
        </Text>
        <Text style={{ color:t.colors.subtext }}>
          {quit ? `Started ${quit.toLocaleDateString()}` : 'Complete onboarding to start your streak.'}
        </Text>
      </Card>

      <Card style={{ gap:8 }}>
        <Text style={{ color:t.colors.text, fontWeight:'700' }}>Money saved</Text>
        <Text style={{ color:t.colors.subtext }}>{fmtCurrency(saved)}</Text>
      </Card>

      {checklist.length > 0 && (
        <Card style={{ gap:12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color:t.colors.text, fontWeight:'700' }}>Today's Plan</Text>
            <Text style={{ color:t.colors.subtext, fontSize: 12 }}>
              {doneCount}/{checklist.length} {allDone ? '✓' : ''}
            </Text>
          </View>
          
          <View style={{ gap: 8 }}>
            {checklist.map((item, i) => (
              <Pressable 
                key={i} 
                onPress={() => toggle(i)}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: 12,
                  paddingVertical: 8
                }}
              >
                <View style={{ 
                  width: 20, 
                  height: 20, 
                  borderRadius: 10,
                  backgroundColor: isDone(i) ? t.colors.success : 'transparent',
                  borderWidth: 2,
                  borderColor: isDone(i) ? t.colors.success : t.colors.border,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isDone(i) && (
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>✓</Text>
                  )}
                </View>
                <Text style={{ 
                  color: isDone(i) ? t.colors.subtext : t.colors.text,
                  textDecorationLine: isDone(i) ? 'line-through' : 'none',
                  flex: 1
                }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
          
          {allDone && (
            <Text style={{ 
              color: t.colors.success, 
              textAlign: 'center', 
              fontWeight: '700',
              marginTop: 8
            }}>
              Great job! You completed today's plan 🎉
            </Text>
          )}
        </Card>
      )}
    </View>
  );
}