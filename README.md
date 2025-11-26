# Product Management System

A modern React application for managing products with authentication, built with Vite and styled with Tailwind CSS + DaisyUI.

## Features

- 🔐 User authentication and authorization
- 📦 Complete CRUD operations for products
- 🎨 Modern UI with Tailwind CSS and DaisyUI
- 🚀 Fast development with Vite and HMR
- 📱 Responsive design
- 🔔 Toast notifications with React Toastify
- 💬 Beautiful alerts with SweetAlert2
- 🧭 Client-side routing with React Router

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Notifications:** React Toastify + SweetAlert2
- **Icons:** React Icons
- **Linting:** ESLint 9

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Input.jsx
│   ├── Navbar.jsx
│   └── TableData.jsx
├── context/         # React Context providers
│   └── AuthContext.jsx
├── router/          # Application routing
│   └── AppRouter.jsx
├── services/        # API service layer
│   ├── authService.js
│   └── productosService.js
├── views/           # Page components
│   ├── CreateProductView.jsx
│   ├── HomeView.jsx
│   ├── LoginView.jsx
│   ├── ProductDetailView.jsx
│   └── UpdateProductView.jsx
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-uribe-marcos-leidy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
VITE_API_URL=your_api_url_here
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_backend_api_url
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and not licensed for public use.

## Author

Leidy Uribe Marcos
