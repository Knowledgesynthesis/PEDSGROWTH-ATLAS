import { useState } from 'react'
import { Microscope, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const endocrineAxes = [
  {
    id: 'gh-igf1',
    name: 'GH-IGF-1 Axis',
    components: ['Hypothalamus (GHRH/Somatostatin)', 'Anterior Pituitary (GH)', 'Liver (IGF-1)', 'Growth Plates'],
    hormones: ['GHRH', 'Somatostatin', 'Growth Hormone', 'IGF-1', 'IGFBP-3'],
    effects: ['Linear growth', 'Protein synthesis', 'Lipolysis', 'Insulin antagonism'],
    disorders: {
      deficiency: 'GH deficiency → decreased IGF-1 → poor linear growth, delayed bone age',
      excess: 'GH excess → gigantism (pre-pubertal) or acromegaly (post-pubertal)',
    },
    tests: [
      { name: 'IGF-1', normal: 'Age-dependent (50-500 ng/mL)', interpretation: 'Screening for GH status' },
      { name: 'IGFBP-3', normal: 'Age-dependent', interpretation: 'GH-dependent binding protein' },
      { name: 'GH stimulation test', normal: 'Peak GH >10 ng/mL', interpretation: 'Diagnose GH deficiency' },
    ],
  },
  {
    id: 'thyroid',
    name: 'Thyroid Axis',
    components: ['Hypothalamus (TRH)', 'Anterior Pituitary (TSH)', 'Thyroid Gland (T4/T3)', 'Target Tissues'],
    hormones: ['TRH', 'TSH', 'T4 (thyroxine)', 'T3 (triiodothyronine)'],
    effects: ['Metabolic rate', 'Growth and development', 'Bone maturation', 'CNS development'],
    disorders: {
      deficiency: 'Hypothyroidism → growth failure, delayed bone age, developmental delay',
      excess: 'Hyperthyroidism → accelerated growth initially, advanced bone age',
    },
    tests: [
      { name: 'TSH', normal: '0.5-5.0 mIU/L', interpretation: 'Primary screening test' },
      { name: 'Free T4', normal: '0.8-2.0 ng/dL', interpretation: 'Confirm thyroid function' },
      { name: 'Free T3', normal: '2.3-4.2 pg/mL', interpretation: 'Active thyroid hormone' },
    ],
  },
  {
    id: 'adrenal',
    name: 'Adrenal Axis',
    components: ['Hypothalamus (CRH)', 'Anterior Pituitary (ACTH)', 'Adrenal Cortex (Cortisol)', 'Target Tissues'],
    hormones: ['CRH', 'ACTH', 'Cortisol', 'DHEA', 'Androstenedione'],
    effects: ['Gluconeogenesis', 'Stress response', 'Anti-inflammatory', 'Growth modulation'],
    disorders: {
      excess: 'Cushing syndrome → growth failure despite obesity, advanced bone age, striae',
      deficiency: 'Adrenal insufficiency → hypoglycemia, poor growth, hyperpigmentation',
    },
    tests: [
      { name: 'Morning cortisol', normal: '5-25 μg/dL', interpretation: 'Baseline adrenal function' },
      { name: '24h urine free cortisol', normal: '<50 μg/24h', interpretation: 'Screen for Cushing syndrome' },
      { name: 'ACTH stimulation', normal: 'Cortisol >18-20 μg/dL', interpretation: 'Assess adrenal reserve' },
    ],
  },
  {
    id: 'sex-steroids',
    name: 'Sex Steroid Axis',
    components: ['Hypothalamus (GnRH)', 'Anterior Pituitary (LH/FSH)', 'Gonads (Estrogen/Testosterone)', 'Target Tissues'],
    hormones: ['GnRH', 'LH', 'FSH', 'Testosterone', 'Estradiol'],
    effects: ['Pubertal development', 'Secondary sexual characteristics', 'Pubertal growth spurt', 'Bone maturation'],
    disorders: {
      earlyActivation: 'Precocious puberty → advanced bone age, initial tall stature, short adult height',
      delayed: 'Delayed puberty → delayed bone age, delayed growth spurt, possible short stature',
    },
    tests: [
      { name: 'LH', normal: 'Prepubertal <0.3 mIU/mL', interpretation: 'Central puberty assessment' },
      { name: 'FSH', normal: 'Prepubertal <4 mIU/mL', interpretation: 'Gonadal function' },
      { name: 'Testosterone (M)', normal: 'Prepubertal <30 ng/dL', interpretation: 'Male puberty status' },
      { name: 'Estradiol (F)', normal: 'Prepubertal <20 pg/mL', interpretation: 'Female puberty status' },
    ],
  },
]

export default function EndocrinePathway() {
  const [selectedAxis, setSelectedAxis] = useState(endocrineAxes[0])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Microscope className="h-8 w-8 text-primary" />
          Endocrine Pathway Visualizer
        </h1>
        <p className="text-muted-foreground">
          Explore hormonal axes regulating growth and development
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Endocrine Control of Growth</CardTitle>
              <CardDescription className="mt-2">
                Growth is regulated by complex endocrine axes working in concert. Disruption at any level
                can cause growth abnormalities. Understanding these pathways is essential for diagnosing
                and managing pediatric endocrine disorders.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Axis Selection */}
      <div className="grid md:grid-cols-4 gap-4">
        {endocrineAxes.map((axis) => (
          <Button
            key={axis.id}
            variant={selectedAxis.id === axis.id ? 'default' : 'outline'}
            onClick={() => setSelectedAxis(axis)}
            className="h-auto py-4"
          >
            {axis.name}
          </Button>
        ))}
      </div>

      {/* Pathway Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedAxis.name}</CardTitle>
          <CardDescription>Hormonal pathway and clinical significance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pathway Flow */}
          <div className="space-y-4">
            <h3 className="font-semibold">Pathway Components</h3>
            <div className="grid grid-cols-1 gap-3">
              {selectedAxis.components.map((component, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 p-3 bg-secondary rounded-lg">
                    <p className="font-medium">{component}</p>
                  </div>
                  {idx < selectedAxis.components.length - 1 && (
                    <div className="text-2xl text-primary">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Hormones */}
          <div>
            <h3 className="font-semibold mb-2">Key Hormones</h3>
            <div className="flex flex-wrap gap-2">
              {selectedAxis.hormones.map((hormone, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {hormone}
                </span>
              ))}
            </div>
          </div>

          {/* Physiologic Effects */}
          <div>
            <h3 className="font-semibold mb-2">Physiologic Effects</h3>
            <ul className="space-y-1">
              {selectedAxis.effects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disorders */}
          <div className="grid md:grid-cols-2 gap-4">
            {selectedAxis.disorders.deficiency && (
              <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Deficiency/Hypofunction</h4>
                <p className="text-sm">{selectedAxis.disorders.deficiency}</p>
              </div>
            )}
            {selectedAxis.disorders.excess && (
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Excess/Hyperfunction</h4>
                <p className="text-sm">{selectedAxis.disorders.excess}</p>
              </div>
            )}
            {selectedAxis.disorders.earlyActivation && (
              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Early Activation</h4>
                <p className="text-sm">{selectedAxis.disorders.earlyActivation}</p>
              </div>
            )}
            {selectedAxis.disorders.delayed && (
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Delayed Activation</h4>
                <p className="text-sm">{selectedAxis.disorders.delayed}</p>
              </div>
            )}
          </div>

          {/* Laboratory Tests */}
          <div>
            <h3 className="font-semibold mb-3">Diagnostic Tests</h3>
            <div className="space-y-2">
              {selectedAxis.tests.map((test, idx) => (
                <div key={idx} className="p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">{test.name}</h4>
                    <span className="text-xs text-muted-foreground">{test.normal}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{test.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Multi-Axis Interactions</h4>
            <p className="text-muted-foreground">
              Growth requires coordination of multiple endocrine axes. For example, thyroid hormone is
              necessary for GH secretion and action. Sex steroids cause the pubertal growth spurt but also
              accelerate bone maturation and epiphyseal fusion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Diagnostic Approach</h4>
            <p className="text-muted-foreground">
              Start with screening tests (IGF-1, TSH, bone age). If abnormal, proceed to confirmatory tests
              (GH stimulation, free T4, etc.). Always correlate labs with clinical findings, growth patterns,
              and bone age.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
