# Morocco Travel Experience Platform

A stunning, modern web application for discovering and planning trips to Morocco. This platform showcases authentic Moroccan destinations, provides AI-powered trip planning, and features a community-driven database of places to visit.

## ✨ Features

### 🏛️ Core Features
- **Destinations Discovery**: Explore 12+ major Moroccan cities with detailed information, best times to visit, and highlights
- **Places Database**: Browse hotels, restaurants, activities, and attractions with detailed information and ratings
- **AI Trip Planner**: Generate personalized multi-day itineraries based on your preferences, budget, and travel style
- **Nearby Places**: Discover places within 5km radius using advanced distance calculations
- **Community Contributions**: Users can submit their favorite places for admin review
- **Admin Dashboard**: Comprehensive moderation system for reviewing and managing community submissions

### 🎨 Design Features
- Authentic Moroccan aesthetic with terracotta primary colors
- Elegant Playfair Display serif typography
- Fully responsive design (mobile-first approach)
- Smooth animations and hover effects
- Beautiful image galleries with optimized loading
- Semantic design tokens for consistent theming

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## 📦 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── admin/                    # Admin dashboard
│   ├── community/                # Community submission form
│   ├── destinations/             # Destinations listing & detail pages
│   │   └── [slug]/              # Dynamic city pages
│   ├── places/                   # Places detail pages
│   │   └── [id]/                # Dynamic place pages
│   ├── plan-trip/               # AI trip planner
│   ├── layout.tsx               # Root layout with fonts
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles & design tokens
│
├── components/                   # Reusable React components
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Site footer
│   └── ui/                      # shadcn/ui components
│
├── lib/                         # Utility functions & data
│   ├── data/
│   │   ├── destinations.ts     # Destinations data
│   │   ├── places.ts           # Places data
│   │   └── submissions.ts      # Mock submissions data
│   └── utils.ts                # Utility functions (cn, etc.)
│
└── public/                      # Static assets (images)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd morocco-travel-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured destinations, and stats |
| `/about` | About page with mission, story, and values |
| `/destinations` | Browse all destinations with filtering |
| `/destinations/[slug]` | Individual city detail pages |
| `/places/[id]` | Individual place detail pages with nearby places |
| `/plan-trip` | AI-powered trip planner with multi-step form |
| `/community` | Community submission form for new places |
| `/admin` | Admin dashboard for managing submissions |

## 🎨 Design Tokens

The application uses semantic design tokens defined in `globals.css`:

```css
--color-primary: 203 39% 44%        /* Terracotta */
--color-primary-foreground: 0 0% 100%
--color-background: 0 0% 100%
--color-foreground: 222 84% 5%
--color-muted: 210 40% 96%
--color-accent: 210 40% 96%
--radius: 0.5rem
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy with one click

### Environment Variables

Currently, the application uses mock data and doesn't require environment variables. When connecting to the backend API, add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🔄 Connecting to Backend

To connect this front-end to the Express.js backend:

1. Update API calls to use `NEXT_PUBLIC_API_URL` environment variable
2. Replace mock data imports with API fetch calls
3. Add error handling and loading states
4. Implement authentication flow for admin dashboard

Example API integration:

```typescript
// Before (mock data)
import { destinations } from '@/lib/data/destinations'

// After (API integration)
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`)
const destinations = await res.json()
```

## 🎯 Key Features Details

### AI Trip Planner
- Multi-step form with validation
- Collects: destinations, duration, traveler type, budget, interests, pace
- Generates day-by-day itineraries with timed activities
- Personalized recommendations based on user preferences

### Nearby Places
- Calculates distances using Haversine formula
- Shows places within 5km radius
- Sorted by distance from current location
- Includes all place types (hotels, restaurants, activities)

### Admin Dashboard
- Tab-based interface (Pending, Approved, Rejected)
- Statistics cards showing submission counts
- Review modal with approve/reject actions
- Status management with timestamps

## 🤝 Contributing

This is a demonstration project. For production use:
1. Connect to the Express.js backend API
2. Implement proper authentication
3. Add error boundaries and loading states
4. Set up analytics and monitoring
5. Optimize images and implement lazy loading
6. Add end-to-end testing

## 📝 License

This project is created for demonstration purposes.

## 🙏 Acknowledgments

- Images generated for demonstration purposes
- Design inspired by authentic Moroccan aesthetics
- Built with modern web development best practices

---

**Built with ❤️ for travelers discovering Morocco**
