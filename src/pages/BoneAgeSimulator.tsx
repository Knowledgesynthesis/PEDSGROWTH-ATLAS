import { useState, useMemo } from 'react'
import { Bone, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const skeletalMarkers = [
  { name: 'Distal radius epiphysis', ageRange: '9-12 months', significance: 'Early ossification marker' },
  { name: 'Proximal phalanges epiphyses', ageRange: '1-3 years', significance: 'Hand development' },
  { name: 'Metacarpal epiphyses', ageRange: '2-4 years', significance: 'Mid-hand maturity' },
  { name: 'Adductor sesamoid', ageRange: '13-15 years (girls), 15-17 years (boys)', significance: 'Puberty marker' },
  { name: 'Distal phalangeal fusion', ageRange: '15-18 years', significance: 'Near-complete skeletal maturity' },
]

export default function BoneAgeSimulator() {
  const [chronologicalAge, setChronologicalAge] = useState<number>(10)
  const [boneAge, setBoneAge] = useState<number>(9)
  const [currentHeight, setCurrentHeight] = useState<number>(135)
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [method, setMethod] = useState<'greulich-pyle' | 'tanner-whitehouse'>('greulich-pyle')

  // Simplified predicted adult height calculation
  const predictedAdultHeight = useMemo(() => {
    if (!boneAge || !currentHeight) return null

    // This is a simplified approximation
    // Real calculations use complex bone age standards
    const remainingGrowth = boneAge < 14 ? (14 - boneAge) * 5 : 0
    const pubertalGrowth = boneAge < 11 ? 25 : boneAge < 13 ? 15 : 5

    const predicted = currentHeight + remainingGrowth + pubertalGrowth

    return predicted
  }, [boneAge, currentHeight])

  const ageDiscrepancy = useMemo(() => {
    const diff = boneAge - chronologicalAge
    if (Math.abs(diff) < 1) {
      return { status: 'normal', message: 'Bone age matches chronological age', color: 'text-green-500' }
    } else if (diff < -2) {
      return {
        status: 'delayed',
        message: `Bone age delayed by ${Math.abs(diff).toFixed(1)} years. Consider constitutional delay, GH deficiency, or hypothyroidism.`,
        color: 'text-orange-500',
      }
    } else if (diff < 0) {
      return {
        status: 'mild-delay',
        message: `Bone age mildly delayed by ${Math.abs(diff).toFixed(1)} years. May be constitutional variation.`,
        color: 'text-yellow-500',
      }
    } else if (diff > 2) {
      return {
        status: 'advanced',
        message: `Bone age advanced by ${diff.toFixed(1)} years. Consider precocious puberty, obesity, or excess androgen exposure.`,
        color: 'text-red-500',
      }
    } else {
      return {
        status: 'mild-advance',
        message: `Bone age mildly advanced by ${diff.toFixed(1)} years. May be familial or nutritional.`,
        color: 'text-blue-500',
      }
    }
  }, [boneAge, chronologicalAge])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Bone className="h-8 w-8 text-primary" />
          Bone Age Simulator
        </h1>
        <p className="text-muted-foreground">
          Learn bone age interpretation and predicted adult height calculations
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Bone Age Fundamentals</CardTitle>
              <CardDescription className="mt-2">
                <p className="mb-2">
                  <strong>Bone age</strong> reflects skeletal maturity based on radiographic appearance of
                  growth plate ossification, typically assessed via left hand/wrist X-ray.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Greulich-Pyle:</strong> Atlas-based comparison method (most common)</li>
                  <li>• <strong>Tanner-Whitehouse:</strong> Scoring individual bone maturity stages</li>
                  <li>• Normal variation: ±2 years from chronological age</li>
                  <li>• Delayed: Constitutional growth delay, GH deficiency, hypothyroidism</li>
                  <li>• Advanced: Precocious puberty, obesity, androgen excess</li>
                </ul>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bone Age Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Bone Age Assessment</CardTitle>
          <CardDescription>Enter assessment parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="method">Assessment Method</Label>
              <Select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value as 'greulich-pyle' | 'tanner-whitehouse')}
              >
                <option value="greulich-pyle">Greulich-Pyle</option>
                <option value="tanner-whitehouse">Tanner-Whitehouse</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value as 'male' | 'female')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chronAge">Chronological Age (years)</Label>
              <Input
                id="chronAge"
                type="number"
                step="0.1"
                value={chronologicalAge}
                onChange={(e) => setChronologicalAge(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="boneAge">Bone Age (years)</Label>
              <Input
                id="boneAge"
                type="number"
                step="0.1"
                value={boneAge}
                onChange={(e) => setBoneAge(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Current Height (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={currentHeight}
                onChange={(e) => setCurrentHeight(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Bone Age Interpretation</h3>
              <div className={`${ageDiscrepancy.color} font-medium`}>
                {ageDiscrepancy.message}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Discrepancy: {(boneAge - chronologicalAge).toFixed(1)} years
              </p>
            </div>

            {predictedAdultHeight && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-semibold mb-2">Predicted Adult Height</h3>
                <p className="text-3xl font-bold text-primary">
                  {predictedAdultHeight.toFixed(1)} cm
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  ({(predictedAdultHeight / 2.54 / 12).toFixed(1)} feet or {Math.floor(predictedAdultHeight / 2.54 % 12)} inches)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: This is a simplified educational calculation. Clinical predictions use validated methods
                  (Bayley-Pinneau, Roche-Wainer-Thissen).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skeletal Maturity Markers */}
      <Card>
        <CardHeader>
          <CardTitle>Key Skeletal Maturity Markers</CardTitle>
          <CardDescription>Important ossification centers in hand/wrist assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skeletalMarkers.map((marker, idx) => (
              <div key={idx} className="p-3 bg-secondary rounded-lg">
                <h4 className="font-semibold text-sm">{marker.name}</h4>
                <p className="text-sm text-muted-foreground">Age: {marker.ageRange}</p>
                <p className="text-sm">{marker.significance}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Constitutional Growth Delay</h4>
            <p className="text-muted-foreground">
              Delayed bone age with normal growth velocity. Bone age better predicts adult height than chronological age.
              These children have delayed puberty but reach normal adult height.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">GH Deficiency</h4>
            <p className="text-muted-foreground">
              Delayed bone age (often &gt;2 years) with decreased growth velocity. The delay is proportional to
              the duration and severity of GH deficiency.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Precocious Puberty</h4>
            <p className="text-muted-foreground">
              Advanced bone age leads to early growth spurt but premature growth plate fusion, resulting in
              short final adult height despite tall stature in childhood.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Familial Short Stature</h4>
            <p className="text-muted-foreground">
              Bone age matches chronological age. Normal growth velocity. Short stature is genetic and
              consistent with mid-parental height.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
