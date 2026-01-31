# Portfolio Website

A modern, responsive one-page portfolio website built with React and Vite.

## Features

- 🏠 **Home Section** - Eye-catching hero section with call-to-action buttons
- 💼 **Projects Section** - Showcase your work with project cards
- 🏆 **Awards Section** - Display your achievements and recognition
- 🛠️ **Tech Stack Carousel** - Interactive carousel showing your technologies
- 📧 **Footer** - Contact information and social links
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## Customization

### Update Your Information

1. **Home Section** (`src/components/Home.jsx`):
   - Change your name in the title
   - Update your role/subtitle
   - Modify the description

2. **Projects** (`src/components/Projects.jsx`):
   - Edit the projects array with your own projects
   - Update titles, descriptions, technologies, and links

3. **Awards** (`src/components/Awards.jsx`):
   - Add your own awards and achievements
   - Update titles, organizations, years, and descriptions

4. **Tech Stack** (`src/components/TechStack.jsx`):
   - Modify the technologies array
   - Change icons and descriptions

5. **Footer** (`src/components/Footer.jsx`):
   - Update contact information (email, phone, location)
   - Add your social media links

### Styling

Each component has its own CSS file for easy customization:
- `Home.css` - Home section styles
- `Projects.css` - Projects section styles
- `Awards.css` - Awards section styles
- `TechStack.css` - Tech stack carousel styles
- `Footer.css` - Footer styles

## Technologies Used

- React 18
- Vite
- CSS3 with responsive design
- Smooth scrolling navigation

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## License

This project is open source and available for personal use.

