import { useState, useMemo } from 'react'
import { TrendingUp, Info, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { calculateGrowthVelocity, calculateMidParentalHeight } from '@/lib/utils'

export default function VelocityCalculator() {
  const [height1, setHeight1] = useState<number>(75.7)
  const [date1, setDate1] = useState<string>('2023-01-01')
  const [height2, setHeight2] = useState<number>(82.5)
  const [date2, setDate2] = useState<string>('2024-01-01')
  const [childAge, setChildAge] = useState<number>(2) // in years
  const [sex, setSex] = useState<'male' | 'female'>('male')

  // Mid-parental height calculator
  const [fatherHeight, setFatherHeight] = useState<number>(175)
  const [motherHeight, setMotherHeight] = useState<number>(162)

  const velocity = useMemo(() => {
    if (!height1 || !height2 || !date1 || !date2) return null

    const d1 = new Date(date1)
    const d2 = new Date(date2)

    if (d2 <= d1) return null

    const vel = calculateGrowthVelocity(height1, height2, d1, d2)
    return vel
  }, [height1, height2, date1, date2])

  const midParentalHeight = useMemo(() => {
    if (!fatherHeight || !motherHeight) return null
    return calculateMidParentalHeight(fatherHeight, motherHeight, sex)
  }, [fatherHeight, motherHeight, sex])

  const velocityInterpretation = useMemo(() => {
    if (!velocity || !childAge) return null

    // Normal growth velocity reference values (approximate)
    const normalVelocity: Record<number, { min: number; max: number }> = {
      0: { min: 23, max: 27 }, // 0-1 year
      1: { min: 11, max: 14 }, // 1-2 years
      2: { min: 8, max: 10 },  // 2-3 years
      3: { min: 7, max: 9 },   // 3-4 years
      4: { min: 6, max: 8 },   // 4-5 years
      5: { min: 5, max: 7 },   // 5-6 years
      6: { min: 5, max: 7 },   // 6-7 years
      7: { min: 5, max: 6 },   // 7-8 years
      8: { min: 5, max: 6 },   // 8-9 years
      9: { min: 5, max: 6 },   // 9-10 years
      10: { min: 5, max: 6 },  // 10-11 years
    }

    const ageGroup = Math.floor(childAge)
    const expected = normalVelocity[ageGroup] || { min: 5, max: 6 }

    if (velocity < expected.min - 2) {
      return {
        status: 'concerning',
        message: `Velocity of ${velocity.toFixed(1)} cm/year is significantly below expected (${expected.min}-${expected.max} cm/year). Consider evaluation for growth failure.`,
        color: 'text-red-500',
      }
    } else if (velocity < expected.min) {
      return {
        status: 'low',
        message: `Velocity of ${velocity.toFixed(1)} cm/year is below expected range (${expected.min}-${expected.max} cm/year). Monitor closely.`,
        color: 'text-orange-500',
      }
    } else if (velocity >= expected.min && velocity <= expected.max) {
      return {
        status: 'normal',
        message: `Velocity of ${velocity.toFixed(1)} cm/year is within normal range (${expected.min}-${expected.max} cm/year).`,
        color: 'text-green-500',
      }
    } else {
      return {
        status: 'high',
        message: `Velocity of ${velocity.toFixed(1)} cm/year is above expected range (${expected.min}-${expected.max} cm/year). Consider evaluation if sustained.`,
        color: 'text-blue-500',
      }
    }
  }, [velocity, childAge])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Growth Velocity Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate and interpret linear growth velocity with clinical context
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Growth Velocity Essentials</CardTitle>
              <CardDescription className="mt-2 space-y-2">
                <p><strong>Growth velocity</strong> is the rate of linear growth over time, expressed as cm/year.</p>
                <ul className="space-y-1 text-sm mt-2">
                  <li>• Most rapid in infancy: ~25 cm/year in first year</li>
                  <li>• Preschool: ~5-7 cm/year (ages 3-5)</li>
                  <li>• Prepubertal: ~5-6 cm/year</li>
                  <li>• Pubertal growth spurt: up to 8-12 cm/year</li>
                  <li>• Velocity &lt;4 cm/year after age 3 suggests growth disorder</li>
                </ul>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Velocity Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Calculate Growth Velocity</CardTitle>
          <CardDescription>Enter two height measurements and dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Measurement */}
            <div className="space-y-4 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold">First Measurement</h3>
              <div className="space-y-2">
                <Label htmlFor="date1">Date</Label>
                <Input
                  id="date1"
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height1">Height (cm)</Label>
                <Input
                  id="height1"
                  type="number"
                  step="0.1"
                  value={height1}
                  onChange={(e) => setHeight1(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Second Measurement */}
            <div className="space-y-4 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold">Second Measurement</h3>
              <div className="space-y-2">
                <Label htmlFor="date2">Date</Label>
                <Input
                  id="date2"
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height2">Height (cm)</Label>
                <Input
                  id="height2"
                  type="number"
                  step="0.1"
                  value={height2}
                  onChange={(e) => setHeight2(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Child's Age (years)</Label>
              <Input
                id="age"
                type="number"
                step="0.1"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <select
                id="sex"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={sex}
                onChange={(e) => setSex(e.target.value as 'male' | 'female')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {velocity !== null && velocity > 0 && (
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
              <h3 className="text-2xl font-bold">Growth Velocity: {velocity.toFixed(2)} cm/year</h3>
              {velocityInterpretation && (
                <div className={`flex items-start gap-2 ${velocityInterpretation.color}`}>
                  {velocityInterpretation.status === 'concerning' && (
                    <AlertTriangle className="h-5 w-5 mt-0.5" />
                  )}
                  {velocityInterpretation.status === 'low' && (
                    <Info className="h-5 w-5 mt-0.5" />
                  )}
                  <p className="font-medium">{velocityInterpretation.message}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mid-Parental Height */}
      <Card>
        <CardHeader>
          <CardTitle>Target/Mid-Parental Height</CardTitle>
          <CardDescription>
            Estimate genetic growth potential based on parental heights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fatherHeight">Father's Height (cm)</Label>
              <Input
                id="fatherHeight"
                type="number"
                step="0.1"
                value={fatherHeight}
                onChange={(e) => setFatherHeight(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherHeight">Mother's Height (cm)</Label>
              <Input
                id="motherHeight"
                type="number"
                step="0.1"
                value={motherHeight}
                onChange={(e) => setMotherHeight(Number(e.target.value))}
              />
            </div>
          </div>

          {midParentalHeight && (
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Mid-Parental Height for {sex === 'male' ? 'Boys' : 'Girls'}</h3>
              <p className="text-3xl font-bold text-primary">{midParentalHeight.toFixed(1)} cm</p>
              <p className="text-sm text-muted-foreground mt-2">
                Expected range: ±8.5 cm ({(midParentalHeight - 8.5).toFixed(1)} - {(midParentalHeight + 8.5).toFixed(1)} cm)
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Formula: {sex === 'male'
                  ? '(Father\'s height + Mother\'s height + 13) ÷ 2'
                  : '(Father\'s height + Mother\'s height - 13) ÷ 2'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Measurement Interval</h4>
            <p className="text-muted-foreground">
              Measure at least 6 months apart for accurate velocity calculation. Shorter intervals magnify measurement error.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Constitutional Growth Delay</h4>
            <p className="text-muted-foreground">
              Children with constitutional delay have normal velocity but delayed bone age and late puberty. They eventually reach target height.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Pathologic vs Familial Short Stature</h4>
            <p className="text-muted-foreground">
              Familial short stature: normal velocity, normal bone age, final height matches mid-parental height.
              Pathologic: decreased velocity (&lt;4 cm/year), may have advanced or delayed bone age.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">When to Refer</h4>
            <p className="text-muted-foreground">
              Consider endocrine referral for: velocity &lt;4 cm/year after age 3, height &lt;3rd percentile with poor velocity,
              or crossing down 2 major percentile lines.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
