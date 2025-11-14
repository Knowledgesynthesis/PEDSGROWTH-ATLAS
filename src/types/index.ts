// Growth Chart Types
export interface GrowthDataPoint {
  age: number // in months
  percentile3: number
  percentile5: number
  percentile10: number
  percentile25: number
  percentile50: number
  percentile75: number
  percentile90: number
  percentile95: number
  percentile97: number
}

export type GrowthChartType = 'weight' | 'height' | 'head-circumference' | 'bmi'
export type GrowthStandard = 'WHO' | 'CDC'
export type Sex = 'male' | 'female'

export interface GrowthMeasurement {
  date: Date
  ageMonths: number
  value: number
  type: GrowthChartType
}

// Bone Age Types
export interface BoneAgeAssessment {
  chronologicalAge: number // in years
  boneAge: number // in years
  method: 'greulich-pyle' | 'tanner-whitehouse'
  predictedAdultHeight?: number
}

export interface SkeletalMarker {
  name: string
  description: string
  ageRange: { min: number; max: number }
  significance: string
}

// Endocrine Types
export interface EndocrineAxis {
  name: string
  components: string[]
  hormones: string[]
  effects: string[]
}

export interface EndocrineTest {
  name: string
  normalRange: { min: number; max: number; unit: string }
  interpretation: string
  indications: string[]
}

// Genetics Types
export interface GeneticCondition {
  name: string
  inheritance: string
  features: string[]
  growthPattern: string
  diagnosis: string[]
  management: string[]
}

// Case Types
export interface ClinicalCase {
  id: string
  title: string
  presentation: string
  age: number
  sex: Sex
  growthData: GrowthMeasurement[]
  boneAge?: BoneAgeAssessment
  labs?: Record<string, { value: number; unit: string }>
  physicalExam?: string[]
  questions: CaseQuestion[]
  diagnosis: string
  explanation: string
  learningPoints: string[]
}

export interface CaseQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  stage: number
}

// Assessment Types
export interface AssessmentQuestion {
  id: string
  type: 'mcq' | 'calculation' | 'interpretation'
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  references?: string[]
}

// Nutrition Types
export interface NutritionProfile {
  ageMonths: number
  caloricRequirement: number // kcal/day
  proteinRequirement: number // g/day
  growthImpact: string
}

export interface MalnutritionPattern {
  type: string
  growthEffect: string
  clinicalFeatures: string[]
  treatment: string[]
}

// Glossary Types
export interface GlossaryEntry {
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
  clinicalSignificance?: string
}
