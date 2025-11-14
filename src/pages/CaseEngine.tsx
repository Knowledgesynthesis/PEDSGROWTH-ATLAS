import { useState } from 'react'
import { FileText, Info, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ClinicalCase } from '@/types'

const clinicalCases: ClinicalCase[] = [
  {
    id: 'case-1',
    title: 'Short Stature Evaluation',
    presentation: 'A 7-year-old boy is brought to clinic by his parents who are concerned about his height. He is the shortest child in his class.',
    age: 7,
    sex: 'male',
    growthData: [],
    physicalExam: [
      'Height: 112 cm (3rd percentile)',
      'Weight: 20 kg (15th percentile)',
      'Normal body proportions',
      'No dysmorphic features',
      'Tanner stage I',
    ],
    questions: [
      {
        id: 'q1',
        question: 'What is the FIRST step in evaluating this child?',
        options: [
          'Order GH stimulation test',
          'Obtain detailed growth history and plot growth curve',
          'Order karyotype',
          'Start GH therapy trial',
        ],
        correctAnswer: 1,
        explanation: 'The first step is always to obtain a detailed growth history, including previous measurements, to assess growth velocity. Plotting the growth curve helps determine if this is familial short stature, constitutional delay, or pathologic short stature.',
        stage: 1,
      },
      {
        id: 'q2',
        question: 'Parents\' heights: Father 170 cm, Mother 158 cm. What is the mid-parental height?',
        options: [
          '157.5 cm',
          '164 cm',
          '170.5 cm',
          '158 cm',
        ],
        correctAnswer: 2,
        explanation: 'Mid-parental height for boys = (Father\'s height + Mother\'s height + 13) ÷ 2 = (170 + 158 + 13) ÷ 2 = 170.5 cm. Expected range is ±8.5 cm (162-179 cm).',
        stage: 1,
      },
      {
        id: 'q3',
        question: 'Growth velocity has been 5 cm/year for the past 2 years. Bone age is 5 years. What is the MOST likely diagnosis?',
        options: [
          'GH deficiency',
          'Constitutional growth delay',
          'Familial short stature',
          'Turner syndrome',
        ],
        correctAnswer: 1,
        explanation: 'Constitutional growth delay presents with delayed bone age (5 vs 7 years chronological age), normal growth velocity for bone age, and family history of delayed puberty. These children eventually reach normal adult height, though delayed.',
        stage: 2,
      },
    ],
    diagnosis: 'Constitutional Growth Delay',
    explanation: 'This child has constitutional growth delay, characterized by delayed bone age with normal growth velocity and expected late puberty. The child\'s adult height prediction based on bone age is likely to be within the normal range for mid-parental height.',
    learningPoints: [
      'Always plot growth curve and calculate growth velocity',
      'Bone age helps differentiate constitutional delay from familial short stature',
      'Constitutional delay: delayed bone age, normal velocity, late puberty',
      'Familial short stature: bone age = chronological age, consistent with mid-parental height',
    ],
  },
  {
    id: 'case-2',
    title: 'Crossing Percentiles',
    presentation: 'A 4-year-old girl is noted to have crossed down from the 50th to the 10th percentile for height over the past 18 months.',
    age: 4,
    sex: 'female',
    growthData: [],
    physicalExam: [
      'Height: 98 cm (10th percentile, was 50th percentile)',
      'Weight: 15 kg (25th percentile)',
      'Appears tired, pale',
      'Dry skin, coarse hair',
      'Delayed relaxation phase of DTRs',
    ],
    labs: {
      TSH: { value: 28, unit: 'mIU/L' },
      FreeT4: { value: 0.4, unit: 'ng/dL' },
      IGF1: { value: 95, unit: 'ng/mL' },
    },
    questions: [
      {
        id: 'q1',
        question: 'Crossing down 2 major percentile lines is concerning for:',
        options: [
          'Normal growth variant',
          'Pathologic growth failure',
          'Familial short stature',
          'Constitutional growth delay',
        ],
        correctAnswer: 1,
        explanation: 'Crossing down 2 or more major percentile lines suggests pathologic growth failure and requires investigation. Normal variants (familial short stature, constitutional delay) maintain their percentile channel.',
        stage: 1,
      },
      {
        id: 'q2',
        question: 'Based on the physical exam findings and labs, what is the most likely diagnosis?',
        options: [
          'GH deficiency',
          'Hypothyroidism',
          'Malnutrition',
          'Cushing syndrome',
        ],
        correctAnswer: 1,
        explanation: 'Hypothyroidism presents with growth failure, delayed bone age, fatigue, dry skin, coarse hair, constipation, and delayed DTR relaxation. TSH is elevated and free T4 is low, confirming primary hypothyroidism.',
        stage: 2,
      },
      {
        id: 'q3',
        question: 'What is the appropriate initial management?',
        options: [
          'Refer to endocrinology and start GH therapy',
          'Start levothyroxine replacement',
          'Observe and repeat labs in 6 months',
          'Order MRI brain',
        ],
        correctAnswer: 1,
        explanation: 'Treatment is levothyroxine replacement. Thyroid hormone is necessary for normal growth and GH secretion. With adequate treatment, catch-up growth typically occurs.',
        stage: 2,
      },
    ],
    diagnosis: 'Primary Hypothyroidism',
    explanation: 'This child has acquired primary hypothyroidism, leading to growth failure. Thyroid hormone is essential for normal growth and GH secretion. Treatment with levothyroxine will restore normal growth velocity.',
    learningPoints: [
      'Crossing percentiles downward requires evaluation',
      'Hypothyroidism causes growth failure with delayed bone age',
      'TSH is the best screening test for thyroid function',
      'Thyroid replacement leads to catch-up growth',
    ],
  },
]

export default function CaseEngine() {
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleSelectCase = (caseData: ClinicalCase) => {
    setSelectedCase(caseData)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (questionId: string, answerIdx: number) => {
    setAnswers({ ...answers, [questionId]: answerIdx })
  }

  const handleNext = () => {
    if (selectedCase && currentQuestion < selectedCase.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const getScore = () => {
    if (!selectedCase) return 0
    let correct = 0
    selectedCase.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++
    })
    return correct
  }

  if (!selectedCase) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Clinical Case Engine
          </h1>
          <p className="text-muted-foreground">
            Practice diagnostic reasoning with interactive case vignettes
          </p>
        </div>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <CardTitle className="text-lg">Case-Based Learning</CardTitle>
                <CardDescription className="mt-2">
                  Work through realistic clinical scenarios to develop systematic approaches to growth disorders.
                  Each case includes history, physical exam, labs, and multi-stage diagnostic questions.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {clinicalCases.map((caseData) => (
            <Card key={caseData.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleSelectCase(caseData)}>
              <CardHeader>
                <CardTitle>{caseData.title}</CardTitle>
                <CardDescription>
                  Age: {caseData.age} years | Sex: {caseData.sex === 'male' ? 'Male' : 'Female'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{caseData.presentation}</p>
                <Button>Start Case</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = getScore()
    const total = selectedCase.questions.length

    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => setSelectedCase(null)}>
          ← Back to Cases
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Case Complete: {selectedCase.title}
            </CardTitle>
            <CardDescription>
              Score: {score}/{total} ({((score / total) * 100).toFixed(0)}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold mb-2">Diagnosis</h3>
              <p className="text-lg font-medium text-primary">{selectedCase.diagnosis}</p>
              <p className="text-sm mt-2">{selectedCase.explanation}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Learning Points</h3>
              <ul className="space-y-2">
                {selectedCase.learningPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Review Your Answers</h3>
              {selectedCase.questions.map((q, idx) => {
                const userAnswer = answers[q.id]
                const isCorrect = userAnswer === q.correctAnswer
                return (
                  <div key={q.id} className={`p-3 rounded-lg border ${isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
                    <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                    <p className="text-sm mb-1">
                      Your answer: {q.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm mb-1 text-green-600 dark:text-green-400">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{q.explanation}</p>
                  </div>
                )
              })}
            </div>

            <Button onClick={() => setSelectedCase(null)} className="w-full">
              Try Another Case
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = selectedCase.questions[currentQuestion]
  const userAnswer = answers[question.id]

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => setSelectedCase(null)}>
        ← Back to Cases
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{selectedCase.title}</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {selectedCase.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion === 0 && (
            <>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-2">Presentation</h3>
                <p>{selectedCase.presentation}</p>
              </div>

              {selectedCase.physicalExam && (
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Physical Exam</h3>
                  <ul className="space-y-1">
                    {selectedCase.physicalExam.map((finding, idx) => (
                      <li key={idx} className="text-sm">• {finding}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCase.labs && (
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold mb-2">Laboratory Results</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(selectedCase.labs).map(([test, result]) => (
                      <div key={test}>
                        <span className="font-medium">{test}:</span> {result.value} {result.unit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="p-4 border-2 border-primary rounded-lg">
            <p className="font-semibold mb-4">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, idx)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    userAnswer === idx
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {userAnswer !== undefined && (
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          <Button
            onClick={handleNext}
            disabled={userAnswer === undefined}
            className="w-full"
          >
            {currentQuestion < selectedCase.questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
