import { Apple, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const nutritionData = [
  {
    ageRange: '0-6 months',
    calories: '108 kcal/kg/day',
    protein: '2.2 g/kg/day',
    growthImpact: 'Rapid growth phase - breast milk or formula provides complete nutrition',
  },
  {
    ageRange: '6-12 months',
    calories: '98 kcal/kg/day',
    protein: '1.6 g/kg/day',
    growthImpact: 'Introduction of solids, continued rapid growth',
  },
  {
    ageRange: '1-3 years',
    calories: '1000-1400 kcal/day',
    protein: '13 g/day',
    growthImpact: 'Slower growth velocity, establishing eating patterns',
  },
  {
    ageRange: '4-8 years',
    calories: '1400-2000 kcal/day',
    protein: '19 g/day',
    growthImpact: 'Steady prepubertal growth, building nutritional foundations',
  },
  {
    ageRange: '9-13 years',
    calories: '2000-2600 kcal/day',
    protein: '34 g/day',
    growthImpact: 'Pubertal growth spurt, increased nutrient demands',
  },
]

const malnutritionPatterns = [
  {
    type: 'Protein-Energy Malnutrition (Marasmus)',
    growthEffect: 'Proportional weight and height deficit',
    features: ['Severe wasting', 'Loss of subcutaneous fat', 'Muscle atrophy', 'Alert but weak'],
    intervention: 'Gradual refeeding with balanced macronutrients',
  },
  {
    type: 'Kwashiorkor',
    growthEffect: 'Weight deficit more than height deficit',
    features: ['Edema', 'Fatty liver', 'Skin changes', 'Hair changes', 'Apathy'],
    intervention: 'Protein repletion with careful fluid management',
  },
  {
    type: 'Micronutrient Deficiencies',
    growthEffect: 'Variable based on specific deficiency',
    features: ['Zinc: poor linear growth, delayed puberty', 'Vitamin D: rickets, bone pain', 'Iron: anemia, fatigue'],
    intervention: 'Targeted supplementation and dietary counseling',
  },
  {
    type: 'Chronic Disease-Related Malnutrition',
    growthEffect: 'Progressive growth faltering despite adequate intake',
    features: ['IBD, celiac, cystic fibrosis', 'Malabsorption', 'Increased energy needs', 'Inflammation'],
    intervention: 'Treat underlying disease, nutritional optimization',
  },
]

export default function NutritionModule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Apple className="h-8 w-8 text-primary" />
          Nutrition & Growth
        </h1>
        <p className="text-muted-foreground">
          Understand nutritional requirements and malnutrition patterns affecting growth
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Nutrition and Growth</CardTitle>
              <CardDescription className="mt-2">
                Adequate nutrition is fundamental for normal growth. Malnutrition is the most common cause
                of growth failure worldwide. Even in developed countries, inadequate intake, malabsorption,
                or increased losses can impair growth.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Nutritional Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Age-Based Nutritional Requirements</CardTitle>
          <CardDescription>Approximate daily needs for normal growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nutritionData.map((data, idx) => (
              <div key={idx} className="p-4 bg-secondary rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{data.ageRange}</h4>
                  <div className="text-right text-sm">
                    <p className="text-primary font-medium">{data.calories}</p>
                    <p className="text-muted-foreground">{data.protein}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{data.growthImpact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Malnutrition Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Malnutrition Patterns</CardTitle>
          <CardDescription>Types, features, and growth effects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {malnutritionPatterns.map((pattern, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-2">{pattern.type}</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Growth Effect:</p>
                    <p className="text-sm">{pattern.growthEffect}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Intervention:</p>
                    <p className="text-sm">{pattern.intervention}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Clinical Features:</p>
                  <ul className="text-sm space-y-1">
                    {pattern.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Weight vs Height Deficit</h4>
            <p className="text-muted-foreground">
              Acute malnutrition affects weight first (wasting). Chronic malnutrition affects both weight
              and height (stunting). Weight-for-height identifies acute malnutrition; height-for-age identifies
              chronic malnutrition.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Catch-Up Growth</h4>
            <p className="text-muted-foreground">
              After nutritional rehabilitation, children show accelerated growth velocity (catch-up growth).
              This is most effective when intervention occurs early and before puberty.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Micronutrients Matter</h4>
            <p className="text-muted-foreground">
              Zinc, iron, vitamin D, and vitamin A are critical for growth. Even with adequate calories,
              micronutrient deficiencies can impair linear growth and development.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
