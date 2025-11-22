# Installation Instructions for InfluencerConnect

Follow these steps to get the project running on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for cloning)

---

## Step-by-Step Installation

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster (free tier is fine)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)
7. Replace `<password>` with your actual password
8. Replace `myFirstDatabase` with `influencerconnect`

Your final connection string should look like:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/influencerconnect?retryWrites=true&w=majority
```

---

### 2. Backend Setup

Open a terminal and navigate to the project folder:

```bash
cd d:\Projects\cocolab\backend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment variables:**

Edit the `backend\.env` file and add your MongoDB URI:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/influencerconnect?retryWrites=true&w=majority
```

**Seed the database with sample data:**
```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted creators
✅ Inserted brands
🎉 Database seeded successfully!
```

**Start the backend server:**
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

Keep this terminal open!

---

### 3. Frontend Setup

Open a **new terminal** (keep the backend running) and navigate to the client folder:

```bash
cd d:\Projects\cocolab\client
```

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

---

### 4. Open the Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the InfluencerConnect landing page!

---

## Test the Application

### Login as a Brand

1. Click "Get Started" or "Login"
2. Select "Brand" tab
3. Use these credentials:
   - **Email:** `collabs@pixelwave.com`
   - **Password:** `brand123`
4. You'll be redirected to the Brand Dashboard
5. Click "Discover Creators" to search for influencers

### Login as a Creator

1. Logout (top right)
2. Click "Login"
3. Select "Creator" tab
4. Use these credentials:
   - **Email:** `aarav.mehta.influencer@example.com`
   - **Password:** `password123`
5. You'll see the Creator Dashboard with analytics

---

## Common Issues & Solutions

### ❌ "Cannot connect to MongoDB"

**Solution:**
1. Check your MongoDB Atlas IP whitelist:
   - Go to Network Access in Atlas
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for testing)
2. Verify your username and password in the connection string
3. Make sure you replaced `<password>` with your actual password

### ❌ "Port 5000 already in use"

**Solution:**
Change the port in `backend\.env`:
```env
PORT=5001
```

Then update `client\.env`:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### ❌ "Module not found" errors

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### ❌ Frontend shows blank page

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Make sure backend is running
4. Verify `.env` files have correct values

---

## Production Build

### Build Frontend for Production

```bash
cd client
npm run build
```

This creates a `dist` folder with optimized static files.

### Run Backend in Production

```bash
cd backend
npm start
```

---

## Stopping the Servers

- **Frontend:** Press `Ctrl + C` in the terminal running Vite
- **Backend:** Press `Ctrl + C` in the terminal running Node

---

## Next Steps

- ✅ Explore the brand dashboard and creator search
- ✅ Test the credit system and contact unlocking
- ✅ Try boosting a creator profile
- ✅ View analytics and profile views
- ✅ Customize Tailwind styles
- ✅ Read the full [README.md](README.md)

---

**Need Help?**

Check the console logs in both terminals for error messages. Most issues are related to MongoDB connection or missing environment variables.

Happy coding! 🚀
