# InfluencerConnect - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure MongoDB
1. Create a `.env` file in the `backend` folder
2. Add your MongoDB connection string:
```
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/influencerconnect
PORT=5000
```

### Step 3: Seed the Database
```bash
npm run seed
```

### Step 4: Start Backend Server
```bash
npm run dev
```
✅ Backend running at: http://localhost:5000

---

### Step 5: Install Frontend Dependencies
Open a **new terminal** and run:
```bash
cd client
npm install
```

### Step 6: Start Frontend
```bash
npm run dev
```
✅ Frontend running at: http://localhost:3000

---

## 🎯 Test Accounts

### Brand Accounts
| Email | Password |
|-------|----------|
| collabs@pixelwave.com | brand123 |
| marketing@urbanthread.in | brand123 |

### Creator Accounts
| Email | Password |
|-------|----------|
| aarav.mehta.influencer@example.com | password123 |
| sara.khan.style@example.com | password123 |

---

## ✅ What to Test

### As a Brand:
1. Login → View Dashboard
2. Click "Discover Creators"
3. Apply filters (Platform, Niche, etc.)
4. View a creator's full profile
5. Unlock contact details (uses 1 credit)

### As a Creator:
1. Login → View Dashboard
2. See your analytics and profile views
3. Click "Boost Profile" to appear first in searches
4. Check which brands viewed your profile

---

## 🔧 Common Issues

### MongoDB Connection Error
- Check your MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Verify username/password in connection string
- Ensure database name is correct

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will auto-increment to 3001, 3002, etc.

### Module Not Found
- Run `npm install` in both backend and client folders
- Delete `node_modules` and run `npm install` again

---

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints
- Customize Tailwind styles
- Add more features!

---

**Need help?** Check console logs or create an issue in the repository.

Happy building! 🎉
