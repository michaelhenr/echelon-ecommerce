# Echelon Society E-commerce Platform

A premium e-commerce platform for Echelon Society, featuring a multi-role system for clients, advertisers, brand owners, and administrators.

## Features

### 🏠 Landing Page
- Clean, modern design with 4 main entry points
- Client browsing, Advertiser campaigns, Brand submissions, Product submissions
- Admin access via logo click (5 times) + password "333"

### 👥 Client Interface
- **Home Page**: Brand story, social impact, premium product showcase
- **About Page**: Company history, mission, values, and social impact
- **Products Page**: Search and filter functionality
- **AI Chatbot**: Built-in customer support with intelligent responses

### 🎯 Advertiser Dashboard
- Campaign creation with budget and scheduling
- Target audience selection
- Ad content management
- Performance tracking

### 🏪 Brand Owner Portal
- Brand submission and management
- Product catalog management
- Sales analytics
- Order tracking

### 📦 Product Submission
- Individual product submissions
- Brand association
- Detailed specifications
- Image uploads

### 👑 Admin Panel
- Comprehensive analytics dashboard
- User management
- Order management
- Ad approval system
- Excel export functionality
- Real-time statistics

### 🤖 AI Chatbot
- Intelligent customer support
- Product information
- Shipping details
- Brand information
- Order assistance

## Technology Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: CSS3, Custom Components
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form
- **State Management**: React Query
- **SEO**: React Helmet Async

## Deployment on Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)

### Steps

1. **Install Dependencies**
   ```bash
   cd echelon-ecommerce-frontendsrc
   npm install
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_URL=your_backend_api_url
VITE_APP_NAME=Echelon Society
```

## Project Structure

```
echelon-ecommerce-frontendsrc/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ChatBot.js
│   └── Backgrounds.js
├── pages/              # Page components
│   ├── LandingPage.js
│   ├── Home.js
│   ├── About.js
│   ├── BrandSubmission.js
│   ├── ProductSubmission.js
│   ├── AdvertiserPage.js
│   ├── AdminPanel.js
│   └── ThankYou.js
├── styles/             # CSS files
│   ├── global.css
│   ├── landing.css
│   ├── about.css
│   ├── submission.css
│   ├── admin.css
│   ├── chatbot.css
│   └── thankyou.css
├── contexts/           # React contexts
├── App.js             # Main app component
├── package.json
├── vercel.json        # Vercel configuration
└── README.md
```

## Key Features Implemented

### ✅ Landing Page with 4 Options
- Client browsing interface
- Advertiser campaign creation
- Brand owner submissions
- Product submissions

### ✅ Admin Panel Access
- Logo click 5 times + password "333"
- Comprehensive dashboard
- Analytics and statistics
- Excel export functionality

### ✅ AI Chatbot
- Intelligent responses
- Product information
- Shipping details
- Customer support

### ✅ Brand Information Integration
- Echelon Society history (2017)
- Social impact (50% profits donated)
- Premium fashion positioning
- "A Higher Standard" tagline

### ✅ Thank You Page
- 10% discount offer for email subscribers
- Social impact messaging
- Order tracking information

### ✅ Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interfaces

## Shipping Logic
- Cairo & Alexandria: 70 EGP
- Other cities: 100 EGP
- Free shipping over 500 EGP

## Social Impact
- 50% of profits donated to charity
- Supporting the less fortunate
- Community-focused mission
- Established 2017

## Contact Information
- Domain: echelonsociety.store
- Email: support@echelonsociety.store
- Phone: +20 123 456 7890

## Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## License
MIT License - Echelon Society Team
