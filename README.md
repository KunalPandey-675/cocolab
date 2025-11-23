# Cocolab – Two-Sided Influencer Marketplace

Cocolab is a **privacy-first, two-sided marketplace** that connects **brands** with **vetted creators** for influencer marketing campaigns. The platform features **data-driven discovery**, **credit-based contact unlocking**, and **visibility boosts** for creators.

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **JavaScript** (no TypeScript)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB Atlas** (or local MongoDB)
- **Mongoose** for ODM
- **CORS** enabled

## 📋 Features

### For Brands
- ✅ Advanced search and filter system (platform, niche, followers, engagement, location)
- ✅ View anonymous creator analytics before unlocking
- ✅ Credit-based contact unlocking (email + phone)
- ✅ Profile view tracking
- ✅ Discover boosted creators first

### For Creators
- ✅ Dashboard with platform-wise analytics
- ✅ Profile view statistics
- ✅ Visibility boost feature
- ✅ Tier-based ranking (Rising, Growth, Established)
- ✅ Track which brands viewed your profile

## 📁 Project Structure

```
cocolab/
├── backend/
│   ├── models/
│   │   ├── Creator.js
│   │   ├── Brand.js
│   │   ├── ProfileView.js
│   │   └── ContactUnlock.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── creators.js
│   │   └── brands.js
│   ├── seed/
│   │   ├── creators.json
│   │   ├── brands.json
│   │   └── seedDb.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── index.js
│   │   │   ├── auth.js
│   │   │   ├── brand.js
│   │   │   └── creator.js
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Badge.jsx
│   │   │   ├── brand/
│   │   │   │   ├── CreatorCard.jsx
│   │   │   │   └── CreatorFilters.jsx
│   │   │   └── creator/
│   │   │       ├── CreatorStats.jsx
│   │   │       └── BoostModal.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── CreatorDashboard.jsx
│   │   │   ├── BrandDashboard.jsx
│   │   │   ├── BrandDiscover.jsx
│   │   │   └── CreatorProfile.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── brandStore.js
│   │   │   ├── creatorStore.js
│   │   │   └── uiStore.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Cocolab?retryWrites=true&w=majority
PORT=5000
```

4. **Seed the database (optional but recommended):**
```bash
node seed/seedDb.js
```

This will create sample creators and brands with the following test accounts:

**Test Creators:**
- Email: `aarav.mehta.influencer@example.com` | Password: `password123`
- Email: `sara.khan.style@example.com` | Password: `password123`
- Email: `rohan.fitness@example.com` | Password: `password123`
- Email: `ananya.foodie@example.com` | Password: `password123`
- Email: `kabir.travel@example.com` | Password: `password123`

**Test Brands:**
- Email: `collabs@pixelwave.com` | Password: `brand123`
- Email: `marketing@urbanthread.in` | Password: `brand123`
- Email: `influencers@fitfuel.com` | Password: `brand123`
- Email: `partners@tastetrail.in` | Password: `brand123`

5. **Start the backend server:**
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client folder:**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment (already set):**
The `.env` file is already created with:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. **Start the development server:**
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Open the app** at `http://localhost:3000`
2. **Click "Get Started"** or navigate to login page
3. **Choose your role**: Brand or Creator
4. **Sign up or login** with test credentials

### As a Brand

1. **Dashboard**: View your credits and unlocked creators
2. **Discover Creators**: Click "Find Creators" or "Discover Creators"
3. **Apply Filters**: Use platform, niche, follower count, engagement rate, and location filters
4. **View Profiles**: Click "View Full Profile" to see detailed analytics
5. **Unlock Contact**: Use 1 credit to reveal email and phone number

### As a Creator

1. **Dashboard**: View your analytics and profile views
2. **Platform Stats**: See follower counts, engagement rates, and avg views
3. **Profile Views**: Check which brands viewed your profile
4. **Boost Profile**: Click "Boost Profile" to appear at the top of brand searches

## 🔑 Key Features Explained

### Privacy-First Contact System
- Creator contact details (email/phone) are **blurred** by default
- Brands must **spend 1 credit** to unlock contact info
- Once unlocked, contact stays visible for that brand

### Credit System
- New brands start with **10 credits**
- Each contact unlock costs **1 credit**
- Credits are tracked in the brand's dashboard

### Visibility Boost
- Creators can boost their profile
- Boosted profiles appear **at the top** of search results
- Shows a special "Boosted" badge

### Tier System
Creators are categorized into tiers:
- **Rising**: New or growing creators
- **Growth**: Mid-tier creators
- **Established**: Top-tier creators with large followings

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (brand or creator)
- `POST /api/auth/login` - Login

### Creators
- `GET /api/creators` - Get all creators (with filters)
- `GET /api/creators/:id` - Get single creator
- `POST /api/creators/:id/view` - Log profile view
- `POST /api/creators/:id/boost` - Boost creator profile
- `GET /api/creators/:id/views` - Get profile view statistics

### Brands
- `GET /api/brands/:id` - Get brand details
- `POST /api/brands/:brandId/unlock/:creatorId` - Unlock creator contact

## 🎨 Tailwind Customization

Custom utilities are defined in `client/src/index.css`:

```css
.blur-contact {
  filter: blur(4px);
  user-select: none;
}
```

Color palette is extended in `tailwind.config.js` with custom primary colors.

## 🧪 Testing the App

### Test Scenario 1: Brand Flow
1. Login as brand: `collabs@pixelwave.com` / `brand123`
2. Navigate to "Discover Creators"
3. Apply filters: Platform = Instagram, Niche = Tech
4. Click on a creator profile
5. Unlock contact using credits
6. Verify email and phone are now visible

### Test Scenario 2: Creator Flow
1. Login as creator: `aarav.mehta.influencer@example.com` / `password123`
2. View dashboard analytics
3. Check profile views
4. Click "Boost Profile"
5. Logout and login as brand to verify boosted badge appears

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_BASE_URL`
6. Deploy

## 📝 Notes

- This is a **demo/prototype** with simplified authentication
- Passwords are stored in **plain text** (use bcrypt for production)
- No real payment integration (dummy credit system)
- No email/SMS sending (just stores contact info)
- Session management uses localStorage (use JWT for production)

## 🤝 Contributing

This is an educational project. Feel free to:
- Add real authentication (JWT + bcrypt)
- Integrate payment gateway (Stripe/Razorpay)
- Add email notifications
- Implement real-time chat
- Add campaign management features

## 📄 License

MIT License - Free to use for learning and commercial projects.

---

## 🎉 You're All Set!

Start the backend server (`npm run dev` in `/backend`), start the frontend (`npm run dev` in `/client`), and open `http://localhost:3000` to see Cocolab in action!

**Questions or issues?** Check the console logs or verify your MongoDB connection string.

Happy coding! 🚀
