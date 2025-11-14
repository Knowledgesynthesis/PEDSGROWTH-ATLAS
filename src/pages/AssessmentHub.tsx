import { useState } from 'react'
import { GraduationCap, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { AssessmentQuestion } from '@/types'

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    category: 'Growth Charts',
    difficulty: 'easy',
    question: 'The 50th percentile on a growth chart represents:',
    options: ['The minimum normal value', 'The maximum normal value', 'The median value', 'Two standard deviations'],
    correctAnswer: 2,
    explanation: 'The 50th percentile represents the median value - half of children are above and half are below this value.',
    references: ['WHO Growth Standards', 'CDC Growth Charts'],
  },
  {
    id: 'q2',
    type: 'mcq',
    category: 'Growth Velocity',
    difficulty: 'medium',
    question: 'Normal prepubertal growth velocity is approximately:',
    options: ['2-3 cm/year', '5-6 cm/year', '10-12 cm/year', '15-20 cm/year'],
    correctAnswer: 1,
    explanation: 'Prepubertal children (ages 4-10) typically grow 5-6 cm/year. Infants grow much faster (~25 cm in year 1), and pubertal growth spurts reach 8-12 cm/year.',
    references: ['AAP Guidelines on Growth'],
  },
  {
    id: 'q3',
    type: 'mcq',
    category: 'Bone Age',
    difficulty: 'medium',
    question: 'In constitutional growth delay, bone age is typically:',
    options: ['Advanced relative to chronological age', 'Equal to chronological age', 'Delayed relative to chronological age', 'Variable and unpredictable'],
    correctAnswer: 2,
    explanation: 'Constitutional growth delay is characterized by delayed bone age (typically 2+ years behind chronological age) with normal growth velocity for bone age and delayed puberty.',
    references: ['Greulich-Pyle Atlas'],
  },
  {
    id: 'q4',
    type: 'mcq',
    category: 'Endocrinology',
    difficulty: 'hard',
    question: 'Which of the following best distinguishes GH deficiency from constitutional growth delay?',
    options: [
      'Delayed bone age',
      'Family history of short stature',
      'Abnormal growth velocity (<4 cm/year)',
      'Short stature',
    ],
    correctAnswer: 2,
    explanation: 'Both conditions have delayed bone age and short stature. The key distinguishing feature is growth velocity: GH deficiency has pathologically low velocity (<4 cm/year after age 3), while constitutional delay has normal velocity for bone age.',
    references: ['ESPE GH Deficiency Guidelines'],
  },
  {
    id: 'q5',
    type: 'mcq',
    category: 'Genetics',
    difficulty: 'medium',
    question: 'Turner syndrome is associated with which karyotype?',
    options: ['47,XXY', '45,X', '47,XYY', '46,XX'],
    correctAnswer: 1,
    explanation: 'Turner syndrome is caused by complete or partial absence of one X chromosome (45,X is most common). It presents with short stature, gonadal dysgenesis, and various other features.',
    references: ['Turner Syndrome Guidelines'],
  },
  {
    id: 'q6',
    type: 'mcq',
    category: 'Nutrition',
    difficulty: 'easy',
    question: 'In acute malnutrition, which measurement is affected first?',
    options: ['Height', 'Weight', 'Head circumference', 'All simultaneously'],
    correctAnswer: 1,
    explanation: 'Weight is affected first in acute malnutrition (wasting). Height is affected in chronic malnutrition (stunting). This is why weight-for-height identifies acute malnutrition, while height-for-age identifies chronic malnutrition.',
    references: ['WHO Malnutrition Guidelines'],
  },
  {
    id: 'q7',
    type: 'mcq',
    category: 'Endocrinology',
    difficulty: 'hard',
    question: 'Hypothyroidism causes growth failure through which mechanism?',
    options: [
      'Direct inhibition of growth plate chondrocytes',
      'Decreased GH secretion and impaired GH action',
      'Increased cortisol levels',
      'Premature growth plate fusion',
    ],
    correctAnswer: 1,
    explanation: 'Thyroid hormone is essential for GH secretion from the pituitary and for GH action at the growth plate. Hypothyroidism impairs both, leading to growth failure with delayed bone age.',
    references: ['Thyroid and Growth Review'],
  },
  {
    id: 'q8',
    type: 'mcq',
    category: 'Growth Charts',
    difficulty: 'hard',
    question: 'A z-score of -2 on a growth chart corresponds to approximately which percentile?',
    options: ['50th percentile', '25th percentile', '3rd percentile', '10th percentile'],
    correctAnswer: 2,
    explanation: 'A z-score of -2 (two standard deviations below the mean) corresponds to approximately the 2.3rd percentile, often rounded to 3rd percentile clinically.',
    references: ['WHO Growth Standards'],
  },
]

export default function AssessmentHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const categories = ['all', ...Array.from(new Set(assessmentQuestions.map(q => q.category)))]

  const filteredQuestions = selectedCategory === 'all'
    ? assessmentQuestions
    : assessmentQuestions.filter(q => q.category === selectedCategory)

  const currentQuestion = filteredQuestions[currentQuestionIdx]

  const handleAnswer = (answerIdx: number) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answerIdx })
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIdx(0)
    setUserAnswers({})
    setShowExplanation(false)
    setQuizComplete(false)
  }

  const getScore = () => {
    let correct = 0
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) correct++
    })
    return correct
  }

  if (quizComplete) {
    const score = getScore()
    const total = filteredQuestions.length
    const percentage = (score / total) * 100

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
            <CardDescription>
              {selectedCategory === 'all' ? 'All categories' : selectedCategory}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-8 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-6xl font-bold text-primary mb-2">{percentage.toFixed(0)}%</p>
              <p className="text-xl">{score} out of {total} correct</p>
            </div>

            <div className="space-y-2">
              {filteredQuestions.map((q, idx) => {
                const userAnswer = userAnswers[q.id]
                const isCorrect = userAnswer === q.correctAnswer
                return (
                  <div key={q.id} className={`p-3 rounded-lg ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                    <p className="font-medium text-sm">
                      {idx + 1}. {q.question} {isCorrect ? '✓' : '✗'}
                    </p>
                  </div>
                )
              })}
            </div>

            <Button onClick={resetQuiz} className="w-full">
              Retake Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          Assessment Hub
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge with evidence-based questions
        </p>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <CardTitle className="text-lg">Knowledge Assessment</CardTitle>
              <CardDescription className="mt-2">
                Questions are based on WHO, CDC, AAP, and ESPE guidelines. Select a category or take
                the comprehensive assessment covering all topics.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(cat)
                  resetQuiz()
                }}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Question {currentQuestionIdx + 1} of {filteredQuestions.length}</CardTitle>
                <CardDescription>
                  {currentQuestion.category} • {currentQuestion.difficulty}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                Progress: {Object.keys(userAnswers).length}/{filteredQuestions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="font-semibold text-lg">{currentQuestion.question}</p>
            </div>

            <div className="space-y-2">
              {currentQuestion.options?.map((option, idx) => {
                const userAnswer = userAnswers[currentQuestion.id]
                const isSelected = userAnswer === idx
                const isCorrect = idx === currentQuestion.correctAnswer
                const showCorrectness = showExplanation && (isSelected || isCorrect)

                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showCorrectness
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : isSelected
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-border'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showExplanation && isCorrect && <span className="text-green-500 font-bold">✓</span>}
                      {showExplanation && isSelected && !isCorrect && <span className="text-red-500 font-bold">✗</span>}
                    </div>
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold mb-2">Explanation</h4>
                <p className="text-sm">{currentQuestion.explanation}</p>
                {currentQuestion.references && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      References: {currentQuestion.references.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {showExplanation && (
              <Button onClick={handleNext} className="w-full">
                {currentQuestionIdx < filteredQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
