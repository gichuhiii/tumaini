# Tumaini - Cervical Cancer Screening Platform

![Tumaini Logo](public/tumAIni%20logo-no%20bg.png)

> Empowering women's health through early detection and compassionate care.

## 🌟 About Tumaini

Tumaini is a comprehensive cervical cancer screening platform that connects patients with healthcare providers, making early detection accessible, affordable, and effective for every woman. Our mission is to bridge the gap between women and healthcare services through technology and compassionate care.

## ✨ Features

### 🏥 For Patients
- **Risk Assessment**: Comprehensive questionnaire to evaluate screening needs
- **Cost Calculator**: Transparent cost estimation for screening procedures
- **Provider Connection**: Direct access to healthcare providers
- **Personalized Recommendations**: AI-powered screening suggestions
- **Profile Management**: Secure personal health information storage

### 👩‍⚕️ For Healthcare Providers
- **Patient Management**: Track and manage patient records
- **Screening Scheduler**: Organize and schedule screening appointments
- **Inventory Management**: Monitor medical supplies and equipment
- **Reports & Analytics**: Comprehensive data insights and trends
- **Cost Estimator**: Professional cost calculation tools

### 🎯 Platform Highlights
- **Early Detection**: 95% early detection rate through advanced screening tools
- **Community Support**: Connect with other women on similar health journeys
- **Compassionate Care**: Healthcare providers who understand your needs
- **Accessible Design**: User-friendly interface for all users

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tumaini-frontend.git
   cd tumaini-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🏗️ Project Structure

```
tumaini-frontend/
├── public/                 # Static assets
│   ├── tumAIni logo-no bg.png
│   └── uterus-bg.gif
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── DefaultLayout.tsx
│   │   ├── PatientLayout.tsx
│   │   └── ui/
│   ├── context/           # React context providers
│   │   └── AuthContext.tsx
│   ├── lib/              # Utility functions
│   │   ├── useScrollFadeIn.ts
│   │   └── utils.ts
│   ├── pages/            # Application pages
│   │   ├── LandingPage.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── PatientRisk.tsx
│   │   ├── PatientCost.tsx
│   │   ├── PatientProfile.tsx
│   │   ├── AdminProfile.tsx
│   │   └── ... (other pages)
│   ├── store/            # Redux store configuration
│   │   ├── store.ts
│   │   ├── authSlice.ts
│   │   ├── authThunks.ts
│   │   └── hooks.ts
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── package.json
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: Sonner toast notifications
- **Authentication**: JWT-based authentication with localStorage

## 🔐 Authentication & Authorization

The platform supports two user roles:

### 👤 Patient Role
- Access to risk assessment tools
- Cost calculator functionality
- Personal profile management
- Screening recommendations

### 👩‍⚕️ Admin Role
- Patient record management
- Screening scheduler
- Inventory status monitoring
- Reports and analytics
- Cost estimation tools

## 🌐 API Integration

The application integrates with the Tumaini backend API:

- **Base URL**: `https://tumaini.astralyngroup.com`
- **Authentication**: JWT token-based
- **Endpoints**:
  - `POST /login` - User authentication
  - `POST /register` - User registration
  - Additional endpoints for patient and admin functionality

## 🎯 Key Features

### Landing Page
- **Interactive Design**: Beautiful, responsive landing page
- **Smooth Navigation**: Scroll-based navigation with smooth transitions
- **Call-to-Action**: Clear pathways for user registration and login
- **Information Architecture**: Comprehensive sections explaining the platform

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant design principles
- **Performance**: Optimized for fast loading and smooth interactions
- **User-Friendly**: Intuitive navigation and clear information hierarchy

## 🚀 Deployment

### Vercel Deployment
The project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Environment Variables
Create a `.env` file for local development:

```env
VITE_API_BASE_URL=https://tumaini.astralyngroup.com
```

## 🤝 Contributing

We welcome contributions to Tumaini! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write clean, readable code
- Add appropriate comments and documentation

## 📊 Statistics

- **Early Detection Rate**: 95%
- **Women Screened**: 10,000+
- **Healthcare Partners**: 50+
- **Platform Users**: Growing community of patients and providers

## 🏥 Mission

Tumaini is committed to:
- **Early Detection**: Making cervical cancer screening accessible
- **Compassionate Care**: Connecting patients with understanding healthcare providers
- **Community Support**: Building a supportive network for women's health
- **Education**: Providing comprehensive information about cervical cancer screening

## 📞 Contact

For questions, support, or collaboration opportunities:

- **Email**: info@tumaini.com
- **Website**: https://tumaini.com
- **Location**: Nairobi, Kenya

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Healthcare providers and partners
- Women who share their stories and experiences
- Development team and contributors
- Medical professionals who guide our platform development

---

**Tumaini** - Empowering women's health through early detection and compassionate care. 🌸
