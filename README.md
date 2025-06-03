# Shop Manager

A modern web application for managing multiple shops with user authentication and a sleek dashboard interface.

### ⚠️ Deployment Notice

Due to backend deployment issues, the backend server could not be integrated with the frontend in the deployed environment. The free-tier hosting does not support sub-domain features, which prevents enabling sub-domain-based API access for the frontend deployment. 

**Recommendation:**  
To fully evaluate the application, please run both the frontend and backend locally. All task requirements are demonstrated in the provided video.

[Demo Video](https://www.loom.com/share/7719ec085cad42f6a9320e26828e4035?sid=f78112d3-15f1-4d33-afd0-d9623b0b5cd9)

## Live Demo

You can access the deployed frontend public here:  
[shop-manager (Frontend Only)](https://shop-manager-auth.netlify.app/)

> **Note:** The live demo is frontend-only due to sub-domain limitations. For full functionality, please run both frontend and backend locally as described below.

## Features

### 🔐 Authentication
- **User Registration**: Create accounts with username, password and shops
- **Secure Login**: JWT-based authentication with session management
- **Password Requirements**: Enforced security with minimum 8 characters, numbers, and special characters
- **Shop Management**: Users can register with multiple shops (minimum 3 required)
- **Profile Management**: View and manage user profile information

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Built with shadcn/ui component library
- **Interactive Dashboard**: Clean and intuitive user interface
- **Toast Notifications**: User-friendly feedback for all actions

### 🏗️ Technical Features
- **Redux State Management**: Centralized state with Redux Toolkit
- **RTK Query**: Efficient data fetching and caching
- **TypeScript**: Type-safe development experience
- **Vite**: Fast development and build tooling
- **React Router**: Client-side routing

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Lucide React** - Icons

### Backend (Custom API)
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **Cookie-based sessions** - Session management
- **Input validation** - Request validation middleware

## API Documentation

This section provides an overview of the available API endpoints for authentication in the Shop Manager application.

### Base URL
```
http://localhost:3000/api/v1/auth
```

### Authentication Endpoints

#### POST /auth/signup
Registers a new user account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)",
  "shopNames": ["string"] // Array of shop names (minimum 3)
}
```

**Responses:**
- `201 Created`: User registered successfully
- `400 Bad Request`: Missing or invalid fields
- `409 Conflict`: Username/shops already in use

#### POST /auth/login
Authenticates a user with provided credentials.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Responses:**
- `200 OK`: Returns authentication success message with user data and token
- `401 Unauthorized`: Invalid credentials

#### GET /auth/me
Retrieves the profile information of the currently authenticated user.

**Request Headers:**
- `Cookie: token=<jwt-token>`

**Responses:**
- `200 OK`: Returns user profile data
- `401 Unauthorized`: User not authenticated

#### POST /auth/logout
Logs out the currently authenticated user by invalidating their session or token.

**Request Headers:**
- `Cookie: token=<jwt-token>`

**Responses:**
- `200 OK`: Logout successful
- `401 Unauthorized`: User not authenticated

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/RuhulAmin3/shop-manager
   cd shop-manager/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update the API base URL in `src/store/api/authApi.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:3000/api/v1/auth'; // for local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup
Ensure your Express.js backend is running with the authentication routes configured as documented above.

1. **Go to the Server**
   ```bash
   git clone https://github.com/RuhulAmin3/shop-manager
   cd shop-manager/server
   ```

2. **Convert .env.example into .env**
 
3. **Install dependencies**
   ```bash
   npm install

4. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

    ```
    Client 
        src/
        ├── components/           # React components
        │   ├── ui/              # shadcn/ui components
        │   ├── Dashboard.tsx    # Main dashboard component
        │   ├── SigninForm.tsx   # Login form component
        │   └── SignupForm.tsx   # Registration form component
        ├── pages/               # Page components
        │   ├── Dashboard.tsx    # Dashboard page
        │   ├── Signin.tsx       # Login page
        │   └── Signup.tsx       # Registration page
        ├── store/               # Redux store
        │   ├── api/            # RTK Query API definitions
        │   ├── slices/         # Redux slices
        │   ├── hooks.ts        # Typed Redux hooks
        │   └── index.ts        # Store configuration
        ├── hooks/              # Custom React hooks
        ├── lib/                # Utility functions
        └── App.tsx             # Main application component
    Server
        src/
        ├── prisma/     
        ├── app/           
        │   ├── middlewares/            
        │   ├── modules/    
        │   ├── routes/  
        ├── config/               
        └── App.ts            
        └── server.ts            


## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

