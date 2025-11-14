import { useState, useMemo } from 'react'
import { Activity, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { getGrowthData, interpolatePercentile } from '@/data/growthData'
import { zScoreToPercentile, calculateZScore } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts'
import type { Sex, GrowthChartType, GrowthStandard } from '@/types'

export default function GrowthChartExplorer() {
  const [sex, setSex] = useState<Sex>('male')
  const [chartType, setChartType] = useState<GrowthChartType>('height')
  const [standard, setStandard] = useState<GrowthStandard>('WHO')
  const [ageMonths, setAgeMonths] = useState<number>(12)
  const [measurementValue, setMeasurementValue] = useState<number>(75.7)
  const [showPlot, setShowPlot] = useState(false)

  // Get growth chart data
  const growthData = useMemo(() => {
    // Only use height and weight for now
    const validType = chartType === 'height' || chartType === 'weight' ? chartType : 'height'
    return getGrowthData(validType, sex, standard)
  }, [chartType, sex, standard])

  // Format data for recharts
  const chartData = useMemo(() => {
    return growthData.map(point => ({
      age: point.age,
      'P3': point.percentile3,
      'P10': point.percentile10,
      'P25': point.percentile25,
      'P50': point.percentile50,
      'P75': point.percentile75,
      'P90': point.percentile90,
      'P97': point.percentile97,
    }))
  }, [growthData])

  // Calculate percentile for entered value
  const calculatedPercentile = useMemo(() => {
    if (!measurementValue || !ageMonths) return null

    // Get the median and estimate standard deviation
    const p50 = interpolatePercentile(growthData, ageMonths, 'percentile50')
    const p10 = interpolatePercentile(growthData, ageMonths, 'percentile10')
    const p90 = interpolatePercentile(growthData, ageMonths, 'percentile90')

    // Approximate SD from percentile spread
    const sd = (p90 - p10) / 2.56 // 1.28 SD on each side for 10th-90th percentile

    const zScore = calculateZScore(measurementValue, p50, sd)
    const percentile = zScoreToPercentile(zScore)

    return {
      percentile: percentile.toFixed(1),
      zScore: zScore.toFixed(2),
      interpretation: getInterpretation(percentile),
    }
  }, [measurementValue, ageMonths, growthData])

  function getInterpretation(percentile: number): string {
    if (percentile < 3) {
      return 'Below 3rd percentile - consider evaluation for short stature'
    } else if (percentile < 10) {
      return 'Between 3rd-10th percentile - monitor growth velocity'
    } else if (percentile >= 10 && percentile < 90) {
      return 'Normal growth range'
    } else if (percentile >= 90 && percentile < 97) {
      return 'Between 90th-97th percentile - upper normal range'
    } else {
      return 'Above 97th percentile - consider evaluation for tall stature'
    }
  }

  const unit = chartType === 'weight' ? 'kg' : 'cm'
  const chartLabel = chartType === 'height' ? 'Length/Height' : 'Weight'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          Growth Chart Explorer
        </h1>
        <p className="text-muted-foreground">
          Interactive WHO/CDC growth charts with percentile and z-score calculations
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Growth Chart Basics</CardTitle>
              <CardDescription className="mt-2">
                <ul className="space-y-1 text-sm">
                  <li>• <strong>WHO charts</strong> (0-24 mo): Based on breastfed infants from diverse populations</li>
                  <li>• <strong>CDC charts</strong> (2-20 yrs): Based on US reference population</li>
                  <li>• <strong>Percentiles</strong>: Percentage of children below this value</li>
                  <li>• <strong>Z-score</strong>: Standard deviations from mean (0 = 50th percentile)</li>
                  <li>• <strong>Red flags</strong>: &lt;3rd percentile, &gt;97th percentile, or crossing 2 major percentile lines</li>
                </ul>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Parameters</CardTitle>
          <CardDescription>Select chart type and enter measurements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chartType">Measurement Type</Label>
              <Select
                id="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value as GrowthChartType)}
              >
                <option value="height">Length/Height</option>
                <option value="weight">Weight</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="standard">Standard</Label>
              <Select
                id="standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value as GrowthStandard)}
              >
                <option value="WHO">WHO (0-5 years)</option>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (months)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="60"
                value={ageMonths}
                onChange={(e) => setAgeMonths(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="measurement">Measurement ({unit})</Label>
              <Input
                id="measurement"
                type="number"
                step="0.1"
                value={measurementValue}
                onChange={(e) => setMeasurementValue(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button
                onClick={() => setShowPlot(true)}
                className="w-full"
              >
                Plot on Chart
              </Button>
            </div>
          </div>

          {calculatedPercentile && (
            <div className="p-4 bg-secondary rounded-lg space-y-2">
              <h3 className="font-semibold">Results:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Percentile</p>
                  <p className="text-2xl font-bold text-primary">{calculatedPercentile.percentile}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Z-Score</p>
                  <p className="text-2xl font-bold">{calculatedPercentile.zScore}</p>
                </div>
                <div className="md:col-span-1">
                  <p className="text-muted-foreground">Interpretation</p>
                  <p className="font-medium">{calculatedPercentile.interpretation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Growth Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>{chartLabel}-for-Age - {sex === 'male' ? 'Boys' : 'Girls'} ({standard})</CardTitle>
          <CardDescription>
            Birth to 5 years (percentiles)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="age"
                label={{ value: 'Age (months)', position: 'insideBottom', offset: -5 }}
                className="text-foreground"
              />
              <YAxis
                label={{ value: `${chartLabel} (${unit})`, angle: -90, position: 'insideLeft' }}
                className="text-foreground"
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="P3" stroke="#ef4444" strokeWidth={1} dot={false} name="3rd" />
              <Line type="monotone" dataKey="P10" stroke="#f97316" strokeWidth={1} dot={false} name="10th" />
              <Line type="monotone" dataKey="P25" stroke="#eab308" strokeWidth={1} dot={false} name="25th" />
              <Line type="monotone" dataKey="P50" stroke="#22c55e" strokeWidth={2} dot={false} name="50th (Median)" />
              <Line type="monotone" dataKey="P75" stroke="#eab308" strokeWidth={1} dot={false} name="75th" />
              <Line type="monotone" dataKey="P90" stroke="#f97316" strokeWidth={1} dot={false} name="90th" />
              <Line type="monotone" dataKey="P97" stroke="#ef4444" strokeWidth={1} dot={false} name="97th" />
              {showPlot && ageMonths >= 0 && ageMonths <= 60 && (
                <ReferenceDot
                  x={ageMonths}
                  y={measurementValue}
                  r={6}
                  fill="#3b82f6"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  label={{ value: 'Your measurement', position: 'top' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">When to Use WHO vs CDC Charts</h4>
            <p className="text-muted-foreground">
              WHO charts (0-2 years) represent optimal growth for breastfed infants and are recommended by AAP.
              CDC charts (2-20 years) are reference data from the US population.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Growth Velocity Matters</h4>
            <p className="text-muted-foreground">
              A single measurement is less important than the growth pattern over time. Crossing 2 major percentile
              lines (upward or downward) warrants evaluation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Measurement Accuracy</h4>
            <p className="text-muted-foreground">
              Infants &lt;24 months: measure length (supine). Children ≥24 months: measure height (standing).
              Use calibrated equipment and proper technique.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
