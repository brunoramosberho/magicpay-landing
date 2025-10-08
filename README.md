# MagicPay Landing Page

A beautiful, modern landing page for MagicPay built with Next.js, TypeScript, and shadcn/ui components.

## 🚀 Features

- **Modern Design**: Clean, professional landing page with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode Ready**: Built-in dark mode support with shadcn/ui theming
- **shadcn/ui Components**: Utilizes the complete shadcn/ui component library
- **TypeScript**: Full type safety with TypeScript
- **Tailwind CSS**: Modern utility-first CSS framework
- **Next.js 15**: Latest Next.js with App Router and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📦 Installed Components

The following shadcn/ui components are pre-installed and ready to use:

- Button
- Card
- Input
- Badge
- Separator
- Avatar
- Dropdown Menu
- Sheet
- Dialog
- Tabs

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors & Theming

The project uses shadcn/ui's theming system. You can customize colors in `src/app/globals.css`:

- Light mode variables in `:root`
- Dark mode variables in `.dark`

### Adding New Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

### Layout Sections

The landing page includes these main sections:

1. **Navigation Bar** - Sticky header with logo and navigation links
2. **Hero Section** - Main value proposition with CTA buttons
3. **Features Section** - Three-column feature showcase
4. **Stats Section** - Key metrics and numbers
5. **CTA Section** - Email signup with gradient background
6. **Footer** - Links and company information

## 🔧 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Landing page component
├── components/
│   └── ui/              # shadcn/ui components
└── lib/
    └── utils.ts         # Utility functions
```

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Performance

- Built with Next.js 15 and Turbopack for fast development
- Optimized images and fonts
- CSS-in-JS with zero runtime overhead
- Tree-shaken components for minimal bundle size

## 🤝 Contributing

Feel free to customize and extend this landing page for your needs!

---

Built with ❤️ using [shadcn/ui](https://ui.shadcn.com)