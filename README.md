# Echelon Ecommerce - Complete Project Documentation

## Project Overview

Echelon Ecommerce is a comprehensive e-commerce platform built for the Software Construction and Testing course (Winter 2025). The project demonstrates modern software engineering practices, clean code principles, SOLID principles, and comprehensive testing strategies.

## Architecture

The project follows a **Layered Architecture** pattern with the following layers:

- **Presentation Layer**: React.js frontend with declarative programming
- **Business Logic Layer**: Node.js/Express.js backend with imperative programming
- **Data Access Layer**: MongoDB with Mongoose ODM
- **External Services Layer**: Payment gateways, email services, etc.

## Technology Stack

### Frontend
- **React.js 18** - Declarative UI components
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations
- **React Helmet Async** - SEO management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting
- **Multer** - File uploads

### Testing
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Supertest** - API testing
- **Cypress** - End-to-end testing

## User Roles

The system supports four distinct user roles:

1. **Clients** - Browse, search, and purchase products
2. **Brand Owners** - Upload and manage product inventory
3. **Advertisers** - Create and manage advertising campaigns
4. **Admins** - Manage users, approve transactions, and oversee the system

## Functional Requirements (FRs)

### FR1: Product Management (Brand Owners)
- Upload and edit product details (name, description, price, images)
- Manage inventory levels
- Track product performance

### FR2: Advertisement Management (Advertisers)
- Upload and schedule ads (banners, videos, popups)
- Target specific audiences
- Track ad performance metrics

### FR3: Product Discovery (Clients)
- Browse and search products with filters
- Filter by category, price range, brand
- Sort by various criteria

### FR4: Secure Checkout (Clients)
- Add products to cart
- Complete secure payment process
- Order tracking and history

### FR5: User Management (Admins)
- Approve user registrations
- Manage user accounts and permissions
- Handle user bans and restrictions

### FR6: Transaction Oversight (Admins)
- Monitor and approve transactions
- Handle disputes and refunds
- Generate financial reports

## Non-Functional Requirements (NFRs)

### NFR1: Scalability
- Handle at least 1,000 concurrent users
- Horizontal scaling capabilities
- Database optimization

### NFR2: Performance
- Response times under 2 seconds
- Optimized database queries
- Efficient caching strategies

### NFR3: Security
- HTTPS encryption
- JWT authentication
- Input validation and sanitization
- Rate limiting and security headers

### NFR4: Compatibility
- Cross-browser support
- Mobile responsive design
- Progressive Web App features

### NFR5: Test Coverage
- Minimum 95% code coverage
- Unit, integration, and E2E tests
- Test-driven development practices

### NFR6: Reliability
- 99% uptime target
- Automatic backups
- Error handling and logging

## Design Patterns Implemented

### 1. MVC (Model-View-Controller)
- **Models**: Mongoose schemas for data structure
- **Views**: React components for UI
- **Controllers**: Express route handlers for business logic

### 2. Singleton Pattern
- Database connection management
- Configuration object
- Logger instances

### 3. Factory Pattern
- User role creation
- Product category management
- Ad type creation

### 4. Observer Pattern
- Real-time notifications
- Event-driven architecture
- State management

## Programming Paradigms

### Declarative Programming (Frontend)
- React components describe what the UI should look like
- Functional components with hooks
- Declarative routing with React Router
- Declarative styling with CSS-in-JS

### Imperative Programming (Backend)
- Step-by-step request processing
- Explicit control flow in controllers
- Direct database operations
- Procedural error handling

## Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Utility function testing
- Model validation testing
- Authentication logic testing

### Integration Testing
- API endpoint testing
- Database integration testing
- Authentication flow testing
- Payment processing testing

### End-to-End Testing
- Complete user workflows
- Cross-browser testing
- Mobile device testing
- Performance testing

## Security Implementation

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Session management

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Infrastructure Security
- HTTPS enforcement
- Security headers with Helmet
- Rate limiting
- CORS configuration

## Deployment Configuration

### Environment Variables
```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/echelon_ecommerce

# Security
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

### Docker Configuration
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Production Deployment
- **Backend**: Deploy to Heroku/Railway/DigitalOcean
- **Frontend**: Deploy to Vercel/Netlify
- **Database**: MongoDB Atlas
- **CDN**: CloudFlare for static assets

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 5+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
cd echelon_ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   cd echelon-ecommerce-backend
   npm install
```

3. **Install frontend dependencies**
```bash
cd ../echelon-ecommerce-frontendsrc
npm install
```

4. **Set up environment variables**
```bash
# Copy example environment file
   cp env.example .env
# Edit .env with your configuration
```

5. **Start MongoDB**
```bash
mongod
```

6. **Start the backend server**
```bash
cd echelon-ecommerce-backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd echelon-ecommerce-frontendsrc
   npm run dev
   ```

### Running Tests

```bash
# Backend tests
cd echelon-ecommerce-backend
npm test

# Frontend tests
cd echelon-ecommerce-frontendsrc
npm test

# E2E tests
npm run cypress:run
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Brand Owner)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### User Endpoints
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user (Admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item
- `DELETE /api/cart/items/:productId` - Remove from cart

## Demo Accounts

For testing purposes, the following demo accounts are available:

- **Admin**: admin@echelon.com / admin123
- **Brand Owner**: brand@echelon.com / brand123
- **Advertiser**: advertiser@echelon.com / ad123
- **Client**: client@echelon.com / client123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Course Information

**Course**: Software Construction and Testing  
**Instructor**: Dr. Ahmed Maghawry  
**Teaching Assistants**: Nadeen Serag, Menna Singergy  
**Semester**: Winter 2025  
**Team**: Echelon Development Team

## Acknowledgments

- React.js community for excellent documentation
- Express.js team for the robust web framework
- MongoDB team for the flexible database solution
- All open-source contributors whose packages made this project possible

---

*Built with ❤️ for Software Construction and Testing Course*