import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '~/design/theme';
import ProgressBar from '~/design/components/ProgressBar';
import Button from '~/design/components/Button';
import StepRenderer from '~/onboarding/components/StepRenderer';
import { useOnboardingState } from '~/onboarding/state';

export default function Quiz() {
  const t = useTheme();
  const { step, index, total, answers, setAnswer, next, back } = useOnboardingState();
  const value = answers[step.id];

  const canContinue = (() => {
    if (step.kind === 'info') return true;
    if (step.skippable) return true;
    if (step.kind === 'single') return typeof value === 'string' && value.length > 0;
    if (step.kind === 'multi') return Array.isArray(value) && value.length > 0;
    if (step.kind === 'number') return typeof value === 'number';
    if (step.kind === 'scale') return typeof value === 'number';
    if (step.kind === 'email') return true;
    return true;
  })();

  function onAdvance() {
    if (index >= total - 1 || step.id === 'summary_gate') {
      const payload = { inputs: answers };
      router.push(`/(paywall)/paywall?payload=${encodeURIComponent(JSON.stringify(payload))}`);
      return;
    }
    next();
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Header with better spacing */}
      <View style={{ paddingHorizontal: 24, paddingTop: 80, paddingBottom: 24 }}>
        <Text style={{ color: t.colors.text, fontSize: 20, fontWeight: '800' }}>Fit it to your life</Text>
        <Text style={{ color: t.colors.subtext, marginTop: 4 }}>Assess • Plan • Save</Text>
        <View style={{ marginTop: 16 }}>
          <ProgressBar progress={Math.max(0.02, (index + 1) / total)} />
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <StepRenderer step={step} value={value} onChange={(v) => setAnswer(step.id, v)} />
      </View>

      {/* Footer */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {step.skippable && (
          <Text onPress={onAdvance} style={{ color: t.colors.subtext, textDecorationLine: 'underline', textAlign: 'center', marginBottom: 16 }}>
            Skip
          </Text>
        )}
        
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          {index > 0 && (
            <Button 
              title="Back" 
              variant="outline" 
              onPress={back}
              style={{ flex: 1 }}
            />
          )}
          <Button 
            title={step.id === 'summary_gate' || index === total - 1 ? 'See my plan' : 'Continue'} 
            onPress={onAdvance} 
            disabled={!canContinue}
            style={{ flex: index > 0 ? 2 : 1 }}
          />
        </View>
        
        <Text style={{ color: t.colors.subtext, textAlign: 'center' }}>Step {index + 1} of {total}</Text>
      </View>
    </View>
  );
}