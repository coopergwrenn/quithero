export type AnswerValue = string | number | boolean | string[];
export type StepType = 'info' | 'single' | 'multi' | 'number' | 'email' | 'scale';
export type Option = { value: string; label: string; };
export type Step = {
  id: string; kind: StepType; title: string; subtitle?: string;
  options?: Option[]; placeholder?: string;
  min?: number; max?: number; step?: number;
  required?: boolean; skippable?: boolean; maxChoices?: number;
  visibleIf?: (answers: Record<string, AnswerValue>) => boolean;
};
export type QuizSpec = { steps: Step[]; firstStepId: string; };

const intro: Step = {
  id: 'intro', kind: 'info',
  title: "We'll build your quit plan in under 90 seconds.",
  subtitle: 'No judgments. Just a plan that fits your life.',
};

export const quizSpec: QuizSpec = {
  firstStepId: 'intro',
  steps: [
    intro,
    { id:'goal', kind:'single', title:"What's your goal right now?",
      options:[{value:'quit',label:'Quit completely'},{value:'cut_down',label:'Cut down fast'},{value:'control',label:'Get back control'}], required:true },
    { id:'quit_window', kind:'single', title:'When do you want to stop vaping?',
      options:[{value:'asap',label:'Today'},{value:'three_days',label:'In ~3 days'},{value:'seven_days',label:'In ~7 days'},{value:'unsure',label:'Not sure yet'}], required:true },
    { id:'device', kind:'single', title:'What do you use most?',
      options:[{value:'disposable',label:'Disposable vapes'},{value:'pod',label:'Pod system (Juul, etc.)'},{value:'mod',label:'Mod/tank'},{value:'other',label:'Other'}], required:true },
    { id:'wake_latency', kind:'single', title:'How soon after waking do you first vape?',
      options:[{value:'min5',label:'Within 5 minutes'},{value:'min30',label:'5-30 minutes'},{value:'hour1',label:'30-60 minutes'},{value:'gt60',label:'After 1 hour'}], required:true },
    { id:'nic_strength', kind:'single', title:'What nicotine strength do you use?',
      options:[{value:'salt50',label:'50mg salt nic'},{value:'mid25_35',label:'25-35mg'},{value:'low3_6',label:'3-6mg'},{value:'zero',label:'0mg'},{value:'unsure',label:'Not sure'}], required:true },
    { id:'consumption_proxy', kind:'single', title:'How long does a pod/cartridge last you?',
      options:[{value:'lt_day',label:'Less than a day'},{value:'one_two_days',label:'1-2 days'},{value:'three_five_days',label:'3-5 days'},{value:'weekplus',label:'A week or more'},{value:'na',label:'Not applicable'}], required:true },
    { id:'pods_per_week', kind:'number', title:'About how many pods/cartridges per week?', min:0, max:50, placeholder:'e.g. 7' },
    { id:'puffs_per_day', kind:'single', title:'Roughly how many puffs per day?',
      options:[{value:'lt100',label:'Under 100'},{value:'100_200',label:'100-200'},{value:'200_400',label:'200-400'},{value:'gt400',label:'400+'}], required:true },
    { id:'night_wake', kind:'single', title:'Do you wake up at night to vape?',
      options:[{value:'never',label:'Never'},{value:'rarely',label:'Rarely'},{value:'sometimes',label:'Sometimes'},{value:'often',label:'Often'}], required:true },
    { id:'refrain_restricted', kind:'single', title:'How hard is it to refrain in restricted areas?',
      options:[{value:'easy',label:'Easy'},{value:'somewhat',label:'Somewhat difficult'},{value:'hard',label:'Very difficult'},{value:'impossible',label:'Nearly impossible'}], required:true },
    { id:'attempts', kind:'single', title:'How many times have you tried to quit?',
      options:[{value:'zero',label:'This is my first time'},{value:'one',label:'Once before'},{value:'two_three',label:'2-3 times'},{value:'four_plus',label:'4+ times'}], required:true },
    { id:'spend_week', kind:'number', title:'About how much do you spend per week on vaping?', min:0, max:500, placeholder:'e.g. 40' },
    { id:'reasons', kind:'multi', title:'Why do you want to quit? (Pick all that apply)',
      options:[{value:'health',label:'Health concerns'},{value:'money',label:'Save money'},{value:'control',label:'Regain control'},{value:'social',label:'Social/family pressure'},{value:'performance',label:'Athletic performance'},{value:'other',label:'Other reasons'}], maxChoices:6 },
    { id:'triggers', kind:'multi', title:'When do you vape most? (Pick top 3)',
      options:[{value:'stress',label:'When stressed'},{value:'bored',label:'When bored'},{value:'social',label:'Social situations'},{value:'driving',label:'While driving'},{value:'work',label:'At work/study'},{value:'alcohol',label:'With alcohol'},{value:'morning',label:'Morning routine'},{value:'after_meals',label:'After meals'}], maxChoices:3 },
    { id:'support', kind:'single', title:'Do you have support from friends/family?',
      options:[{value:'strong',label:'Strong support'},{value:'some',label:'Some support'},{value:'little',label:'Little support'},{value:'none',label:'No support'}], required:true },
    { id:'past_methods', kind:'multi', title:'What have you tried before? (If any)',
      options:[{value:'cold_turkey',label:'Cold turkey'},{value:'gradual',label:'Gradual reduction'},{value:'nic_gum',label:'Nicotine gum'},{value:'patches',label:'Nicotine patches'},{value:'apps',label:'Quit apps'},{value:'none',label:'Nothing yet'}], maxChoices:6, skippable:true },
    { id:'confidence', kind:'scale', title:'How confident are you about quitting this time?', min:1, max:10, required:true },
    { id:'email', kind:'email', title:'Email for your personalized plan?', placeholder:'your@email.com', skippable:true },
  ]
};

export function getNextStepId(currentId: string, answers: Record<string, AnswerValue>): string | null {
  const currentIndex = quizSpec.steps.findIndex(s => s.id === currentId);
  if (currentIndex === -1) return null;
  
  for (let i = currentIndex + 1; i < quizSpec.steps.length; i++) {
    const step = quizSpec.steps[i];
    if (!step.visibleIf || step.visibleIf(answers)) {
      return step.id;
    }
  }
  return null;
}

export function getPrevStepId(currentId: string, answers: Record<string, AnswerValue>): string | null {
  const currentIndex = quizSpec.steps.findIndex(s => s.id === currentId);
  if (currentIndex <= 0) return null;
  
  for (let i = currentIndex - 1; i >= 0; i--) {
    const step = quizSpec.steps[i];
    if (!step.visibleIf || step.visibleIf(answers)) {
      return step.id;
    }
  }
  return null;
}

export function getStepById(id: string): Step | null {
  return quizSpec.steps.find(s => s.id === id) || null;
}

export function getProgress(currentId: string, answers: Record<string, AnswerValue>): number {
  const visibleSteps = quizSpec.steps.filter(s => !s.visibleIf || s.visibleIf(answers));
  const currentIndex = visibleSteps.findIndex(s => s.id === currentId);
  return currentIndex >= 0 ? (currentIndex + 1) / visibleSteps.length : 0;
}