import { Dna, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const geneticConditions = [
  {
    name: 'Turner Syndrome',
    karyotype: '45,X (most common)',
    inheritance: 'Chromosomal (sporadic)',
    growthPattern: 'Short stature (final height ~143 cm without GH), slow growth velocity',
    clinicalFeatures: ['Short stature', 'Webbed neck', 'Shield chest', 'Lymphedema', 'Cardiac anomalies (coarctation, bicuspid AV)', 'Gonadal dysgenesis'],
    diagnosis: ['Karyotype', 'Echocardiogram', 'Renal ultrasound'],
    management: ['GH therapy', 'Estrogen replacement for puberty', 'Cardiac surveillance', 'Endocrine follow-up'],
  },
  {
    name: 'Noonan Syndrome',
    karyotype: 'Normal (46,XX or 46,XY)',
    inheritance: 'Autosomal dominant (PTPN11, others)',
    growthPattern: 'Short stature, normal bone age initially',
    clinicalFeatures: ['Short stature', 'Webbed neck', 'Ptosis', 'Low-set ears', 'Pectus deformity', 'Pulmonary stenosis', 'Bleeding diathesis'],
    diagnosis: ['Clinical diagnosis', 'Genetic testing (PTPN11, SOS1)', 'Echocardiogram'],
    management: ['GH therapy may be beneficial', 'Cardiac management', 'Developmental support'],
  },
  {
    name: 'Prader-Willi Syndrome',
    karyotype: 'Normal',
    inheritance: 'Genomic imprinting (paternal 15q11-13 deletion)',
    growthPattern: 'Short stature, obesity, decreased growth velocity',
    clinicalFeatures: ['Neonatal hypotonia', 'Feeding difficulty → hyperphagia', 'Obesity', 'Hypogonadism', 'Developmental delay', 'Behavioral issues'],
    diagnosis: ['Methylation studies', 'Genetic testing for 15q11-13'],
    management: ['GH therapy', 'Nutritional management', 'Behavioral therapy', 'Sleep study (OSA risk)'],
  },
  {
    name: 'Achondroplasia',
    karyotype: 'Normal',
    inheritance: 'Autosomal dominant (FGFR3 mutation)',
    growthPattern: 'Disproportionate short stature (short limbs, normal trunk)',
    clinicalFeatures: ['Rhizomelic shortening', 'Frontal bossing', 'Midface hypoplasia', 'Lumbar lordosis', 'Normal intelligence'],
    diagnosis: ['Clinical diagnosis', 'FGFR3 genetic testing', 'Skeletal survey'],
    management: ['Specialized growth charts', 'Monitor for complications (spinal stenosis, hydrocephalus)', 'Orthopedic follow-up'],
  },
  {
    name: 'Russell-Silver Syndrome',
    karyotype: 'Normal (usually)',
    inheritance: 'Imprinting disorder (maternal 11p15 or maternal UPD7)',
    growthPattern: 'Severe IUGR, postnatal growth failure, asymmetry',
    clinicalFeatures: ['Triangular face', 'Body asymmetry', 'Clinodactyly', 'Feeding difficulties', 'Normal intelligence'],
    diagnosis: ['Methylation studies (11p15)', 'UPD7 testing'],
    management: ['GH therapy', 'Nutritional support', 'Monitor for hypoglycemia'],
  },
]

const familialPatterns = [
  {
    name: 'Familial Short Stature',
    features: ['Height consistent with mid-parental height', 'Normal growth velocity', 'Bone age = chronological age', 'Normal puberty timing'],
    diagnosis: 'Clinical - calculate mid-parental height',
    management: 'Reassurance, monitor growth velocity',
  },
  {
    name: 'Constitutional Growth Delay',
    features: ['Delayed growth and puberty', 'Family history of late puberty', 'Bone age < chronological age', 'Normal growth velocity for bone age'],
    diagnosis: 'Clinical + bone age assessment',
    management: 'Reassurance, may reach normal adult height',
  },
]

export default function GeneticsExplorer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Dna className="h-8 w-8 text-primary" />
          Genetics Explorer
        </h1>
        <p className="text-muted-foreground">
          Genetic and syndromic causes of growth abnormalities
        </p>
      </div>

      {/* Educational Info */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Genetic Causes of Growth Disorders</CardTitle>
              <CardDescription className="mt-2">
                Genetic conditions account for a significant proportion of growth disorders. Recognition of
                dysmorphic features and associated anomalies guides diagnosis. Many syndromic conditions
                have specific growth charts and management protocols.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Familial Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Familial Growth Patterns</CardTitle>
          <CardDescription>Normal variants - not pathologic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {familialPatterns.map((pattern, idx) => (
              <div key={idx} className="p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold mb-2">{pattern.name}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Features: </span>
                    <ul className="mt-1 space-y-1">
                      {pattern.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p><span className="font-medium">Diagnosis:</span> {pattern.diagnosis}</p>
                  <p><span className="font-medium">Management:</span> {pattern.management}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Genetic Syndromes */}
      <Card>
        <CardHeader>
          <CardTitle>Syndromic Growth Disorders</CardTitle>
          <CardDescription>Common genetic syndromes affecting growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {geneticConditions.map((condition, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="mb-3">
                  <h3 className="text-xl font-bold">{condition.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    <span>Karyotype: {condition.karyotype}</span>
                    <span>•</span>
                    <span>Inheritance: {condition.inheritance}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Growth Pattern</h4>
                    <p className="text-sm bg-secondary p-2 rounded">{condition.growthPattern}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Clinical Features</h4>
                    <ul className="text-sm space-y-1">
                      {condition.clinicalFeatures.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Diagnosis</h4>
                    <ul className="text-sm space-y-1">
                      {condition.diagnosis.map((dx, didx) => (
                        <li key={didx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{dx}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Management</h4>
                    <ul className="text-sm space-y-1">
                      {condition.management.map((mgmt, midx) => (
                        <li key={midx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{mgmt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Approach */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Approach to Genetic Growth Disorders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Dysmorphology Exam</h4>
            <p className="text-muted-foreground">
              Careful physical exam for dysmorphic features: facial features, body proportions, skeletal
              abnormalities, skin findings. Measure arm span, upper:lower segment ratio for proportionality.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Three-Generation Family History</h4>
            <p className="text-muted-foreground">
              Document heights, growth patterns, puberty timing, and any similar features in family members.
              Draw a pedigree to identify inheritance patterns.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Genetic Testing</h4>
            <p className="text-muted-foreground">
              Karyotype for Turner syndrome (all short girls). Targeted gene panels for specific syndromes.
              Consider chromosomal microarray for unexplained developmental delay with growth failure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
