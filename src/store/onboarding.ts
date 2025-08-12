// Simple in-memory store for onboarding data
// Later: replace with AsyncStorage or similar

let onboardingData: Record<string, any> = {};

export function setOnboardingData(key: string, value: any) {
  onboardingData[key] = value;
}

export function getOnboardingData(key?: string) {
  return key ? onboardingData[key] : { ...onboardingData };
}

export function clearOnboardingData() {
  onboardingData = {};
}

// Mock data for testing the paywall
export function getMockOnboardingData(): Record<string, any> {
  return {
    wake_latency: 'min5',
    nic_strength: 'salt50',
    consumption_proxy: 'lt_day',
    pods_per_week: 8,
    puffs_per_day: '200_400',
    night_wake: 'sometimes',
    refrain_restricted: 'hard',
    attempts: 'two_three',
    spend_week: 60,
    reasons: ['health', 'money', 'control'],
  };
}