import { View, Text, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Card from '~/design/components/Card';
import Button from '~/design/components/Button';
import Badge from '~/design/components/Badge';
import { useTheme } from '~/design/theme';
import { computeOutcome } from '~/logic/plan';
import { fmtCurrency, fmtDateShort, levelLabel } from '~/utils/format';
import { useProfile } from '~/state/profile';
import { useEntitlements } from '~/state/entitlements';
import { usePlan } from '~/state/plan';
import { getMockOnboardingData } from '~/store/onboarding';

export default function Paywall() {
  const t = useTheme();
  const { payload } = useLocalSearchParams<{ payload?: string }>();
  const { profile, setQuitDate, setSpendPerWeek } = useProfile();
  const { isPro, mockPurchase } = useEntitlements();
  const { setOutcome } = usePlan();
  
  // Parse inputs from payload or use mock data
  let inputs: any = null;
  try { 
    if (payload) {
      const parsed = JSON.parse(decodeURIComponent(String(payload)));
      inputs = parsed.inputs || {};
    }
  } catch {}
  
  if (!inputs) inputs = getMockOnboardingData();
  
  const outcome = computeOutcome(inputs);
  const dependence = outcome.dependence;
  const plan = outcome.plan;

  const levelColors = {
    low: t.colors.success,
    moderate: t.colors.warning,
    high: '#FF6B35',
    very_high: t.colors.danger
  };

  function adoptQuitDate() {
    // Save the complete outcome
    const planSummary = {
      quitDateISO: plan.quitDateISO,
      pillars: plan.keyDrivers,
      day0Script: plan.methodReason,
      first72hChecklist: plan.firstSteps
    };
    
    const outcomeSnapshot = {
      dependence,
      plan: planSummary,
      inputs
    };
    
    setOutcome(outcomeSnapshot);
    setQuitDate(plan.quitDateISO);
    if (!profile.spendPerWeekUSD) setSpendPerWeek(dependence.estSpendPerWeekUSD);
    
    router.push('/(app)/(tabs)/dashboard');
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 120, paddingHorizontal: 24, paddingBottom: 40, gap: 20 }}>
        <Badge label="Personalized plan ready" />
        
        {/* Results Header */}
        <Card style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ 
              width: 12, 
              height: 12, 
              borderRadius: 6, 
              backgroundColor: levelColors[dependence.level] 
            }} />
            <Text style={{ 
              color: t.colors.text, 
              fontSize: 20, 
              fontWeight: '800' 
            }}>
              {levelLabel(dependence.level)}
            </Text>
          </View>

          {/* Rationale bullets */}
          <View style={{ gap: 8 }}>
            {dependence.rationale.map((reason, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ color: t.colors.accent, fontSize: 16, marginTop: 2 }}>•</Text>
                <Text style={{ color: t.colors.subtext, fontSize: 14, flex: 1 }}>
                  {reason}
                </Text>
              </View>
            ))}
          </View>

          {/* Key stats */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginTop: 8,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: t.colors.border
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: t.colors.text, fontSize: 18, fontWeight: '700' }}>
                {fmtCurrency(plan.yearlySpendUSD)}
              </Text>
              <Text style={{ color: t.colors.subtext, fontSize: 12 }}>
                Yearly spend
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: t.colors.text, fontSize: 18, fontWeight: '700' }}>
                {fmtDateShort(plan.quitDateISO)}
              </Text>
              <Text style={{ color: t.colors.subtext, fontSize: 12 }}>
                Quit date
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: t.colors.text, fontSize: 18, fontWeight: '700' }}>
                {plan.method === 'gradual' ? 'Gradual' : 'Direct'}
              </Text>
              <Text style={{ color: t.colors.subtext, fontSize: 12 }}>
                Method
              </Text>
            </View>
          </View>
          
          <Button title="Use this date" onPress={adoptQuitDate} />
        </Card>

        {/* Subscription options */}
        <Card style={{ gap: 12 }}>
          <Text style={{ 
            color: t.colors.text, 
            fontSize: 18, 
            fontWeight: '700',
            marginBottom: 4
          }}>
            Get your personalized quit plan
          </Text>
          
          <Button 
            title={isPro ? "You're Pro" : "Continue (Monthly) - $9.99"}
            onPress={() => router.push('/(app)/(tabs)/dashboard')}
          />
          <Button 
            title={isPro ? "Manage" : "Best Value (Annual) - $59.99"}
            style={{ backgroundColor: t.colors.accentDark }}
            onPress={() => {
              if (!isPro) mockPurchase();
              router.push('/(app)/(tabs)/dashboard');
            }}
          />
          <Button 
            title="Lifetime - $149.99" 
            style={{ backgroundColor: '#111827' }}
            onPress={() => router.push('/(app)/(tabs)/dashboard')}
          />
        </Card>

        <Button
          title="Try a tool first"
          variant="ghost"
          onPress={() => router.push('/(app)/(tabs)/tools')}
        />
      </ScrollView>
    </View>
  );
}