# SpamTrie Sentinel

An advanced spam detection application built with modern web technologies. This project implements efficient spam detection using trie data structures and provides a user-friendly interface for managing spam detection rules.

## Features

- Real-time spam detection using trie data structures
- Modern, responsive UI built with React and shadcn-ui
- Type-safe development with TypeScript
- Efficient build system with Vite
- Beautiful styling with Tailwind CSS

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query
- React Router DOM
- Zod for validation

## Getting Started

### Prerequisites

- Node.js >=18.19.0 <19.0.0
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dols30/spamtrie-sentinel.git
cd spamtrie-sentinel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utility functions and shared logic
├── pages/         # Page components
├── styles/        # Global styles
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
