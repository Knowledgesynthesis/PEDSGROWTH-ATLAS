import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { GlossaryEntry } from '@/types'

const glossaryEntries: GlossaryEntry[] = [
  {
    term: 'Bone Age',
    definition: 'A measure of skeletal maturity based on radiographic appearance of ossification centers, typically assessed using left hand and wrist X-ray.',
    category: 'Bone Age',
    relatedTerms: ['Greulich-Pyle', 'Tanner-Whitehouse', 'Skeletal Maturity'],
    clinicalSignificance: 'Helps differentiate constitutional delay from other causes of short stature and predict adult height.',
  },
  {
    term: 'Constitutional Growth Delay',
    definition: 'A variant of normal growth characterized by delayed bone age, delayed puberty, normal growth velocity for bone age, and eventual attainment of normal adult height.',
    category: 'Growth Patterns',
    relatedTerms: ['Bone Age', 'Growth Velocity', 'Familial Short Stature'],
    clinicalSignificance: 'Most common cause of short stature and delayed puberty. Reassurance is key as adult height is typically normal.',
  },
  {
    term: 'Familial Short Stature',
    definition: 'Short stature consistent with mid-parental height, with normal growth velocity and bone age equal to chronological age.',
    category: 'Growth Patterns',
    relatedTerms: ['Mid-Parental Height', 'Z-score'],
    clinicalSignificance: 'Genetic variant of normal. No treatment indicated. Final height matches family pattern.',
  },
  {
    term: 'GH (Growth Hormone)',
    definition: 'Peptide hormone secreted by anterior pituitary that stimulates growth through IGF-1 production and direct effects on metabolism.',
    category: 'Endocrinology',
    relatedTerms: ['IGF-1', 'IGFBP-3', 'GHRH'],
    clinicalSignificance: 'Deficiency causes proportionate short stature with delayed bone age. Excess causes gigantism or acromegaly.',
  },
  {
    term: 'Growth Velocity',
    definition: 'Rate of linear growth over time, expressed as cm/year. Calculated from serial height measurements.',
    category: 'Growth Charts',
    relatedTerms: ['Percentile', 'Z-score'],
    clinicalSignificance: 'More important than single measurement. Velocity <4 cm/year after age 3 suggests pathology.',
  },
  {
    term: 'Greulich-Pyle',
    definition: 'Atlas-based method for bone age assessment comparing patient\'s hand/wrist X-ray to standard images.',
    category: 'Bone Age',
    relatedTerms: ['Bone Age', 'Tanner-Whitehouse'],
    clinicalSignificance: 'Most commonly used bone age method in North America. Quick but subjective.',
  },
  {
    term: 'IGF-1 (Insulin-like Growth Factor 1)',
    definition: 'Hormone produced primarily by liver in response to GH. Mediates most growth-promoting effects of GH.',
    category: 'Endocrinology',
    relatedTerms: ['GH', 'IGFBP-3'],
    clinicalSignificance: 'Primary screening test for GH status. Age-dependent normal ranges. Low in GH deficiency, malnutrition.',
  },
  {
    term: 'Mid-Parental Height',
    definition: 'Estimated genetic height potential calculated from parental heights. Boys: (father + mother + 13)/2. Girls: (father + mother - 13)/2.',
    category: 'Growth Charts',
    relatedTerms: ['Familial Short Stature', 'Target Height'],
    clinicalSignificance: 'Helps determine if short stature is familial. Normal range is ±8.5 cm from mid-parental height.',
  },
  {
    term: 'Percentile',
    definition: 'Position of a measurement relative to reference population. 50th percentile = median; 50% above and 50% below.',
    category: 'Growth Charts',
    relatedTerms: ['Z-score', 'Growth Chart'],
    clinicalSignificance: '<3rd or >97th percentile warrants evaluation. Crossing 2 major percentile lines suggests pathology.',
  },
  {
    term: 'Tanner Stages',
    definition: 'Classification of pubertal development from 1 (prepubertal) to 5 (adult) based on breast/genital development and pubic hair.',
    category: 'Puberty',
    relatedTerms: ['Precocious Puberty', 'Delayed Puberty'],
    clinicalSignificance: 'Standardized assessment of pubertal status. Helps time bone age studies and growth predictions.',
  },
  {
    term: 'Turner Syndrome',
    definition: 'Chromosomal disorder (45,X) in females characterized by short stature, gonadal dysgenesis, and various congenital anomalies.',
    category: 'Genetics',
    relatedTerms: ['Karyotype', 'GH Therapy'],
    clinicalSignificance: 'Consider in any short girl. Requires karyotype, cardiac evaluation, and GH therapy for height optimization.',
  },
  {
    term: 'WHO Growth Charts',
    definition: 'Growth standards (0-24 months) based on breastfed infants from diverse populations representing optimal growth.',
    category: 'Growth Charts',
    relatedTerms: ['CDC Charts', 'Percentile', 'Z-score'],
    clinicalSignificance: 'Recommended by AAP for ages 0-2 years. Represents how children should grow under optimal conditions.',
  },
  {
    term: 'Z-Score',
    definition: 'Number of standard deviations from the mean. Z-score of 0 = 50th percentile, -2 ≈ 3rd percentile, +2 ≈ 97th percentile.',
    category: 'Growth Charts',
    relatedTerms: ['Percentile', 'Standard Deviation'],
    clinicalSignificance: 'Preferred for extreme values where percentiles are imprecise. Used in WHO standards.',
  },
]

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(glossaryEntries.map(e => e.category)))]

  const filteredEntries = glossaryEntries
    .filter(entry => {
      const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Glossary
        </h1>
        <p className="text-muted-foreground">
          Comprehensive pediatric growth terminology reference
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredEntries.length} of {glossaryEntries.length} terms
      </p>

      {/* Glossary Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.term}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{entry.term}</CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {entry.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>{entry.definition}</p>

              {entry.clinicalSignificance && (
                <div className="p-3 bg-secondary rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Clinical Significance</h4>
                  <p className="text-sm text-muted-foreground">{entry.clinicalSignificance}</p>
                </div>
              )}

              {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Related Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.relatedTerms.map((term) => (
                      <span
                        key={term}
                        className="text-xs bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80"
                        onClick={() => setSearchTerm(term)}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No terms found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
