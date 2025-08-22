# SkillShare Platform

A modern, interactive learning platform built with React, Vite, and Supabase. SkillShare connects learners with experts through an engaging and intuitive interface.

![SkillShare Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=SkillShare+Platform)

## ✨ Features

- 🔐 Secure authentication with Supabase
- 🎨 Beautiful UI with Tailwind CSS
- 🚀 Blazing fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎨 Customizable learning paths
- 📊 Progress tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Supabase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skillshare.git
   cd skillshare/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🛠 Built With

- [React](https://reactjs.org/) - Frontend library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Backend services
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 📄 Project Structure

```
frontend/
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   ├── constants/     # Constants and configurations
│   ├── lib/           # Utility functions and helpers
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .env.example       # Example environment variables
├── index.html         # Main HTML file
└── vite.config.js     # Vite configuration
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [Supabase Documentation](https://supabase.com/docs)
