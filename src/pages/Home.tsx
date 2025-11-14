import { Link } from 'react-router-dom'
import {
  Activity,
  TrendingUp,
  Bone,
  Microscope,
  Apple,
  Dna,
  FileText,
  GraduationCap,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'Growth Charts',
    description: 'Interactive WHO/CDC growth chart explorer with percentiles and z-scores',
    icon: Activity,
    href: '/growth-charts',
    color: 'text-blue-500',
  },
  {
    title: 'Velocity Calculator',
    description: 'Calculate and interpret growth velocity with clinical context',
    icon: TrendingUp,
    href: '/velocity',
    color: 'text-green-500',
  },
  {
    title: 'Bone Age Simulator',
    description: 'Learn bone age interpretation and predicted adult height',
    icon: Bone,
    href: '/bone-age',
    color: 'text-purple-500',
  },
  {
    title: 'Endocrine Pathways',
    description: 'Visualize GH-IGF-1, thyroid, and adrenal axes in growth',
    icon: Microscope,
    href: '/endocrine',
    color: 'text-red-500',
  },
  {
    title: 'Nutrition Module',
    description: 'Understand nutritional impact on growth and development',
    icon: Apple,
    href: '/nutrition',
    color: 'text-orange-500',
  },
  {
    title: 'Genetics Explorer',
    description: 'Explore genetic and syndromic growth conditions',
    icon: Dna,
    href: '/genetics',
    color: 'text-indigo-500',
  },
  {
    title: 'Clinical Cases',
    description: 'Practice with case-based diagnostic reasoning',
    icon: FileText,
    href: '/cases',
    color: 'text-cyan-500',
  },
  {
    title: 'Assessment Hub',
    description: 'Test your knowledge with questions and vignettes',
    icon: GraduationCap,
    href: '/assessment',
    color: 'text-pink-500',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Activity className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold tracking-tight">
            PedsGrowth Atlas
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master pediatric growth assessment through an integrated approach to
          growth charts, bone age, endocrine evaluation, nutrition, and genetics
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link to="/growth-charts">
            <Button size="lg" className="gap-2">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/cases">
            <Button size="lg" variant="outline" className="gap-2">
              Practice Cases
              <FileText className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Learning Outcomes */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Learning Outcomes</CardTitle>
          </div>
          <CardDescription>
            What you'll master with PedsGrowth Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Accurately interpret WHO and CDC growth charts with percentiles and z-scores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Calculate and analyze growth velocity patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Evaluate bone age using standardized methods</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Understand endocrine causes of growth abnormalities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Assess nutritional factors affecting growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Recognize genetic and syndromic growth patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Apply systematic diagnostic approaches to growth disorders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Integrate physiology, endocrinology, nutrition, and genetics</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Interactive Learning Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} to={feature.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <Icon className={`h-8 w-8 ${feature.color} mb-2`} />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Target Learners */}
      <Card>
        <CardHeader>
          <CardTitle>Designed For</CardTitle>
          <CardDescription>
            Evidence-based education for all levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="font-semibold">Medical Students</p>
              <p className="text-sm text-muted-foreground mt-1">MS3-MS4</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="font-semibold">Pediatrics Residents</p>
              <p className="text-sm text-muted-foreground mt-1">PGY 1-3</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="font-semibold">Endocrine Fellows</p>
              <p className="text-sm text-muted-foreground mt-1">Subspecialty</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary">
              <p className="font-semibold">Attendings</p>
              <p className="text-sm text-muted-foreground mt-1">Continuing Ed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Disclaimer */}
      <Card className="bg-muted/50 border-muted">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Educational Use Only:</strong> This platform uses synthetic cases and
            evidence-based content from WHO, CDC, AAP, and ESPE guidelines. Not intended
            for clinical decision-making. Always consult current clinical guidelines and
            experienced clinicians for patient care.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
