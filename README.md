# PedsGrowth Atlas

**Interactive Pediatric Growth & Development Education Platform**

A comprehensive, evidence-based educational application for teaching pediatric growth assessment, designed for medical students, pediatric residents, endocrinology fellows, and practicing clinicians.

## Features

### 📊 Growth Chart Explorer
- Interactive WHO/CDC growth charts with real-time calculations
- Percentile and z-score computations
- Visual plotting of measurements
- Clinical interpretation guidance

### 📈 Growth Velocity Calculator
- Calculate growth velocity from serial measurements
- Interpret velocity patterns by age
- Mid-parental height calculator
- Age-appropriate velocity reference ranges

### 🦴 Bone Age Simulator
- Educational bone age assessment tool
- Greulich-Pyle and Tanner-Whitehouse methods
- Predicted adult height calculations
- Clinical applications and case examples

### 🔬 Endocrine Pathway Visualizer
- Interactive visualization of hormonal axes:
  - GH-IGF-1 axis
  - Thyroid axis
  - Adrenal axis
  - Sex steroid axis
- Pathophysiology of endocrine growth disorders
- Laboratory test interpretation

### 🍎 Nutrition Module
- Age-based nutritional requirements
- Malnutrition patterns and growth effects
- Micronutrient deficiencies
- Clinical management strategies

### 🧬 Genetics Explorer
- Common genetic syndromes affecting growth
- Familial growth patterns
- Dysmorphology assessment
- Diagnostic approaches

### 📝 Clinical Case Engine
- Interactive case-based learning
- Multi-stage diagnostic reasoning
- Immediate feedback and explanations
- Evidence-based learning points

### 🎓 Assessment Hub
- Knowledge testing across all topics
- Category-specific assessments
- Detailed explanations with references
- Progress tracking

### 📚 Medical Glossary
- Comprehensive terminology reference
- Searchable by term or category
- Clinical significance notes
- Related term linking

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui implementation
- **Charts**: Recharts
- **State Management**: Zustand
- **Routing**: React Router
- **PWA**: vite-plugin-pwa with Workbox
- **Offline Storage**: IndexedDB via idb

## Key Features

✅ **Mobile-First Design** - Optimized for all devices
✅ **Dark Mode** - System preference detection with manual toggle
✅ **Offline Capable** - Progressive Web App with service worker
✅ **Evidence-Based** - Aligned with WHO, CDC, AAP, and ESPE guidelines
✅ **Interactive Learning** - Hands-on tools and calculators
✅ **Clinical Context** - Real-world application emphasis
✅ **Accessibility** - WCAG 2.2 AA compliant design

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Run linting
npm run lint

# Build app
npm run build
```

## Educational Philosophy

This application follows the **ultrathink** philosophy:
- **Elegant Design** - Every interaction feels inevitable and intuitive
- **Deep Integration** - Connects growth physiology, endocrinology, nutrition, and genetics
- **Evidence-Based** - All content grounded in established clinical guidelines
- **Systematic Approach** - Teaches clinical reasoning, not just facts
- **Learner-Centered** - Adapts to different levels from students to attendings

## Evidence Base

Content is derived from:
- WHO Growth Standards (2006)
- CDC Growth Charts (2000)
- American Academy of Pediatrics (AAP) Guidelines
- European Society for Paediatric Endocrinology (ESPE) Recommendations
- Peer-reviewed medical literature

## Educational Use Only

⚠️ **Important**: This application is for educational purposes only. It is not intended for clinical decision-making. Always consult current clinical guidelines and experienced clinicians for patient care.

## License

Educational use - All Rights Reserved

## Contributing

This is an educational project. For issues or suggestions, please contact the development team.

## Acknowledgments

Built following evidence-based guidelines from:
- World Health Organization (WHO)
- Centers for Disease Control and Prevention (CDC)
- American Academy of Pediatrics (AAP)
- European Society for Paediatric Endocrinology (ESPE)

---

**PedsGrowth Atlas** - Making pediatric growth assessment accessible, comprehensive, and clinically relevant.
