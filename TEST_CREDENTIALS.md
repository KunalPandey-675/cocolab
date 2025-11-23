# Test Credentials & Sample Data

This file contains all test accounts and sample data for Cocolab.

---

## 🏢 Brand Test Accounts

All brand accounts start with **10 credits**.

| Company Name | Email | Password | Industry | Location | Credits |
|--------------|-------|----------|----------|----------|---------|
| PixelWave Electronics | collabs@pixelwave.com | brand123 | Consumer Electronics | Bengaluru, India | 10 |
| UrbanThread Apparel | marketing@urbanthread.in | brand123 | Fashion | Mumbai, India | 5 |
| FitFuel Nutrition | influencers@fitfuel.com | brand123 | Health & Fitness | New Delhi, India | 8 |
| TasteTrail Foods | partners@tastetrail.in | brand123 | Food & Beverage | Delhi NCR, India | 3 |

---

## 🎨 Creator Test Accounts

| Name | Email | Password | Niche | Location | Tier | Boosted |
|------|-------|----------|-------|----------|------|---------|
| Aarav Mehta | aarav.mehta.influencer@example.com | password123 | Tech | Bengaluru, India | Growth | ✅ Yes |
| Sara Khan | sara.khan.style@example.com | password123 | Fashion | Mumbai, India | Established | ❌ No |
| Rohan Verma | rohan.fitness@example.com | password123 | Fitness | New Delhi, India | Rising | ✅ Yes |
| Ananya Sharma | ananya.foodie@example.com | password123 | Food | Delhi NCR, India | Growth | ❌ No |
| Kabir Singh | kabir.travel@example.com | password123 | Travel | Jaipur, India | Rising | ❌ No |

---

## 📊 Creator Platform Details

### Aarav Mehta (Tech Creator)
- **Instagram:** @aarav.tech
  - Followers: 85,000
  - Avg Views: 32,000
  - Engagement: 5.2%
- **YouTube:** AaravTech
  - Followers: 42,000
  - Avg Views: 28,000
  - Engagement: 4.1%

### Sara Khan (Fashion Creator)
- **Instagram:** @sara.styles
  - Followers: 120,000
  - Avg Views: 60,000
  - Engagement: 6.0%
- **TikTok:** @sara.styles
  - Followers: 95,000
  - Avg Views: 50,000
  - Engagement: 7.5%

### Rohan Verma (Fitness Creator)
- **Instagram:** @rohan.fit
  - Followers: 38,000
  - Avg Views: 12,000
  - Engagement: 4.8%
- **YouTube:** RohanFit
  - Followers: 22,000
  - Avg Views: 15,000
  - Engagement: 4.3%

### Ananya Sharma (Food Creator)
- **Instagram:** @ananya.eats
  - Followers: 52,000
  - Avg Views: 18,000
  - Engagement: 5.6%
- **TikTok:** @ananya.eats
  - Followers: 61,000
  - Avg Views: 21,000
  - Engagement: 6.2%

### Kabir Singh (Travel Creator)
- **Instagram:** @kabir.travels
  - Followers: 27,000
  - Avg Views: 9,000
  - Engagement: 5.0%
- **YouTube:** KabirTravels
  - Followers: 18,000
  - Avg Views: 11,000
  - Engagement: 4.7%

---

## 🧪 Testing Scenarios

### Scenario 1: Brand Discovers Creator
1. Login as: `collabs@pixelwave.com` / `brand123`
2. Navigate to "Discover Creators"
3. Apply filter: Platform = Instagram, Niche = Tech
4. You should see **Aarav Mehta** at the top (boosted)
5. Click "View Full Profile"
6. Click "Unlock Contact (1 Credit)"
7. Verify email and phone are now visible
8. Check credits reduced from 10 to 9

### Scenario 2: Creator Views Dashboard
1. Login as: `aarav.mehta.influencer@example.com` / `password123`
2. View platform analytics (Instagram + YouTube)
3. Check profile views count
4. See which brands viewed your profile
5. Note the "Profile Boosted" badge

### Scenario 3: Boost Creator Profile
1. Login as: `rohan.fitness@example.com` / `password123`
2. Click "Boost Profile" button
3. Read the boost modal benefits
4. Click "Boost Now"
5. Logout and login as brand
6. Search for Fitness creators
7. Verify Rohan appears at the top with "Boosted" badge

### Scenario 4: Filter Creators
1. Login as any brand
2. Go to "Discover Creators"
3. Click "Filters"
4. Apply multiple filters:
   - Platform: Instagram
   - Niche: Fashion
   - Min Followers: 50000
   - Min Engagement: 5.0
5. You should see **Sara Khan** (120K followers, 6% engagement)

### Scenario 5: Multiple Unlocks
1. Login as: `marketing@urbanthread.in` / `brand123` (5 credits)
2. Unlock Sara Khan's contact (4 credits remaining)
3. Unlock Ananya Sharma's contact (3 credits remaining)
4. Try to unlock 3 more creators
5. On the 4th unlock, you should get "Insufficient credits" error

---

## 📞 Sample Contact Information

All creators have contact info that can be unlocked:

| Creator | Email | Phone |
|---------|-------|-------|
| Aarav Mehta | aarav.mehta.influencer@example.com | +91-9876543210 |
| Sara Khan | sara.khan.style@example.com | +91-9123456780 |
| Rohan Verma | rohan.fitness@example.com | +91-9012345678 |
| Ananya Sharma | ananya.foodie@example.com | +91-9988776655 |
| Kabir Singh | kabir.travel@example.com | +91-9090909090 |

---

## 🎯 Quick Test Commands

### Login as Brand (PixelWave)
```
Email: collabs@pixelwave.com
Password: brand123
```

### Login as Creator (Aarav - Tech)
```
Email: aarav.mehta.influencer@example.com
Password: password123
```

### Login as Creator (Sara - Fashion)
```
Email: sara.khan.style@example.com
Password: password123
```

---

## 🔄 Reset Database

To reset all data back to original state:

```bash
cd backend
npm run seed
```

This will:
- Delete all existing data
- Re-create all test accounts
- Reset credits to default values
- Reset boost status

---

## 📝 Notes

- All passwords are stored in **plain text** (demo only!)
- Credits don't auto-replenish (manual reset via seed)
- Boosted status persists until manual reset
- Profile views accumulate (reset via seed)

---

**Ready to test?** Use these credentials to explore all features of Cocolab! 🚀
