import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '~/design/theme';
import { Step, AnswerValue } from '../spec';
import Button from '~/design/components/Button';
import PillChoice from '~/design/components/PillChoice';
import Card from '~/design/components/Card';

type Props = {
  step: Step;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
};

export default function StepRenderer({ step, value, onChange, onNext, onBack, canGoBack, canGoNext }: Props) {
  const t = useTheme();

  if (step.kind === 'info') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <Card style={{ padding: 32, alignItems: 'center', gap: 16 }}>
          <Text style={[t.type.h2, { color: t.colors.text, marginBottom: 8, textAlign: 'center' }]}>{step.title}</Text>
          {step.subtitle && (
            <Text style={[t.type.body, { color: t.colors.subtext, textAlign: 'center', lineHeight: 22 }]}>{step.subtitle}</Text>
          )}
        </Card>
      </View>
    );
  }

  if (step.kind === 'single') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <View style={{ gap: 24 }}>
          <View>
          <Text style={[t.type.h2, { color: t.colors.text }]}>{step.title}</Text>
          {step.subtitle && (
            <Text style={[t.type.body, { color: t.colors.subtext, marginTop: 8 }]}>{step.subtitle}</Text>
          )}
          </View>
          
          <View>
            <PillChoice
              options={step.options || []}
              value={value as string}
              onChange={(v) => onChange(v as string)}
            />
          </View>
        </View>
      </View>
    );
  }

  if (step.kind === 'multi') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <View style={{ gap: 24 }}>
          <View>
          <Text style={[t.type.h2, { color: t.colors.text }]}>{step.title}</Text>
          {step.subtitle && (
            <Text style={[t.type.body, { color: t.colors.subtext, marginTop: 8 }]}>{step.subtitle}</Text>
          )}
          </View>
          
          <View>
            <PillChoice
              options={step.options || []}
              value={value as string[]}
              onChange={(v) => onChange(v as string[])}
              multi={true}
              max={step.maxChoices}
            />
          </View>
        </View>
      </View>
    );
  }

  if (step.kind === 'number') {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ gap: 24 }}>
            <View>
              <Text style={[t.type.h2, { color: t.colors.text }]}>{step.title}</Text>
              {step.subtitle && (
                <Text style={[t.type.body, { color: t.colors.subtext, marginTop: 8 }]}>{step.subtitle}</Text>
              )}
            </View>
            
            <View>
              <TextInput
                style={[styles.input(t)]}
                value={value ? String(value) : ''}
                onChangeText={(text) => {
                  const num = parseFloat(text);
                  onChange(isNaN(num) ? 0 : num);
                }}
                placeholder={step.placeholder}
                placeholderTextColor={t.colors.subtext}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={true}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (step.kind === 'email') {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ gap: 24 }}>
            <View>
              <Text style={[t.type.h2, { color: t.colors.text }]}>{step.title}</Text>
              {step.subtitle && (
                <Text style={[t.type.body, { color: t.colors.subtext, marginTop: 8 }]}>{step.subtitle}</Text>
              )}
            </View>
            
            <View>
              <TextInput
                style={[styles.input(t)]}
                value={value ? String(value) : ''}
                onChangeText={(text) => onChange(text)}
                placeholder={step.placeholder}
                placeholderTextColor={t.colors.subtext}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={true}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (step.kind === 'scale') {
    const scaleValue = typeof value === 'number' ? value : (step.min || 1);
    const options = [];
    for (let i = step.min || 1; i <= (step.max || 10); i++) {
      options.push({ value: String(i), label: String(i) });
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <View style={{ gap: 24 }}>
          <View>
          <Text style={[t.type.h2, { color: t.colors.text }]}>{step.title}</Text>
          {step.subtitle && (
            <Text style={[t.type.body, { color: t.colors.subtext, marginTop: 8 }]}>{step.subtitle}</Text>
          )}
          </View>
          
          <View>
            <PillChoice
              options={options}
              value={String(scaleValue)}
              onChange={(v) => onChange(parseInt(v as string))}
            />
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  input: (t: ReturnType<typeof useTheme>) => ({
    backgroundColor: t.colors.card,
    borderRadius: t.radii.lg,
    borderWidth: 1,
    borderColor: t.colors.border,
    padding: 16,
    fontSize: 16,
    color: t.colors.text,
  }),
});