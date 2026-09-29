/**
 * Recycle2Earn - Core Constants & Data Definitions
 * Prototype Data Store & Config for MSTC Points Ecosystem
 */

// Waste Categories with configured prototype rates (MSTC Points per kg)
const WASTE_CATEGORIES = [
    {
        id: "plastic",
        name: "Plastic",
        rate: 10,
        unit: "kg",
        icon: "♻️",
        color: "#39d98a",
        description: "Bottles, containers, wraps and rigid recyclable plastics",
        co2Factor: 1.5, // kg CO2 saved per kg
        energyFactor: 5.6 // kWh saved per kg
    },
    {
        id: "paper",
        name: "Paper & Cardboard",
        rate: 5,
        unit: "kg",
        icon: "📦",
        color: "#62dce4",
        description: "Newspapers, cartons, books, magazines and cardboard boxes",
        co2Factor: 0.9,
        energyFactor: 4.0
    },
    {
        id: "metal",
        name: "Metal",
        rate: 15,
        unit: "kg",
        icon: "⚙️",
        color: "#f5a623",
        description: "Aluminium cans, iron, steel, brass and copper scrap",
        co2Factor: 4.2,
        energyFactor: 14.0
    },
    {
        id: "glass",
        name: "Glass",
        rate: 7,
        unit: "kg",
        icon: "🍾",
        color: "#a27bf6",
        description: "Beverage bottles, glass containers and jars",
        co2Factor: 0.3,
        energyFactor: 1.2
    },
    {
        id: "ewaste",
        name: "E-waste",
        rate: 25,
        unit: "kg",
        icon: "💻",
        color: "#22d9ff",
        description: "Old smartphones, laptops, cables, PCBs and electronics",
        co2Factor: 3.8,
        energyFactor: 18.5
    },
    {
        id: "batteries",
        name: "Batteries",
        rate: 30,
        unit: "kg",
        icon: "🔋",
        color: "#ff5e7e",
        description: "Lithium-ion, lead-acid, AA/AAA and rechargeable batteries",
        co2Factor: 5.1,
        energyFactor: 22.0
    },
    {
        id: "textiles",
        name: "Clothes & Textiles",
        rate: 8,
        unit: "kg",
        icon: "👕",
        color: "#e880e8",
        description: "Used garments, wearable clothes, beddings and fabrics",
        co2Factor: 3.2,
        energyFactor: 7.8
    },
    {
        id: "oil",
        name: "Used Cooking Oil",
        rate: 12,
        unit: "kg",
        icon: "🛢️",
        color: "#e5c05d",
        description: "Used edible kitchen oil collected in sealed canisters for biodiesel",
        co2Factor: 2.8,
        energyFactor: 9.1
    },
    {
        id: "organic",
        name: "Organic Waste",
        rate: 3,
        unit: "kg",
        icon: "🌱",
        color: "#5fd38d",
        description: "Raw fruit/vegetable peels, garden cuttings and compostables",
        co2Factor: 0.5,
        energyFactor: 0.8
    }
];

// Verified Collection Centers
const COLLECTION_CENTERS = [
    {
        id: "MSTC-BLR-001",
        name: "GreenCycle Hub Bengaluru",
        city: "Bengaluru",
        address: "100 Feet Rd, Indiranagar, Bengaluru, KA 560038",
        phone: "+91 80 2520 8891",
        status: "Verified & Active",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.9,
        totalCollected: "4,820 kg",
        acceptedCategories: ["Plastic", "Metal", "E-waste", "Paper & Cardboard", "Batteries", "Glass"]
    },
    {
        id: "MSTC-BLR-002",
        name: "Koramangala Eco Recovery Depot",
        city: "Bengaluru",
        address: "5th Block, Koramangala, Bengaluru, KA 560095",
        phone: "+91 80 4125 3300",
        status: "Verified & Active",
        hours: "7:30 AM - 8:30 PM",
        rating: 4.8,
        totalCollected: "3,150 kg",
        acceptedCategories: ["Plastic", "Paper & Cardboard", "Metal", "Clothes & Textiles", "Organic Waste"]
    },
    {
        id: "MSTC-MYS-001",
        name: "Mysuru Heritage Recyclers",
        city: "Mysuru",
        address: "Vijayanagar 2nd Stage, Mysuru, KA 570017",
        phone: "+91 821 241 5590",
        status: "Verified & Active",
        hours: "8:30 AM - 7:30 PM",
        rating: 4.9,
        totalCollected: "2,410 kg",
        acceptedCategories: ["Metal", "Glass", "Plastic", "Used Cooking Oil", "E-waste"]
    },
    {
        id: "MSTC-HSN-001",
        name: "MSTC Eco Centre Hassan",
        city: "Hassan",
        address: "BM Road, Hassan Industrial Area, KA 573201",
        phone: "+91 8172 268 411",
        status: "Verified & Active",
        hours: "9:00 AM - 7:00 PM",
        rating: 4.7,
        totalCollected: "1,980 kg",
        acceptedCategories: ["Plastic", "Paper & Cardboard", "Metal", "Batteries", "Organic Waste"]
    },
    {
        id: "MSTC-MUM-001",
        name: "Mumbai Circular Depot BKC",
        city: "Mumbai",
        address: "G-Block, Bandra Kurla Complex, Mumbai, MH 400051",
        phone: "+91 22 6650 1120",
        status: "Verified & Active",
        hours: "8:00 AM - 9:00 PM",
        rating: 4.9,
        totalCollected: "6,740 kg",
        acceptedCategories: ["Plastic", "E-waste", "Metal", "Paper & Cardboard", "Clothes & Textiles", "Batteries"]
    },
    {
        id: "MSTC-DEL-001",
        name: "Delhi Green Rail Station Hub",
        city: "New Delhi",
        address: "Connaught Place Outer Circle, New Delhi, DL 110001",
        phone: "+91 11 2341 9901",
        status: "Verified & Active",
        hours: "8:00 AM - 8:00 PM",
        rating: 4.8,
        totalCollected: "5,320 kg",
        acceptedCategories: ["Plastic", "Metal", "E-waste", "Glass", "Used Cooking Oil"]
    },
    {
        id: "MSTC-HYD-001",
        name: "Cyberabad Eco Exchange Hub",
        city: "Hyderabad",
        address: "HITEC City Phase 2, Madhapur, Hyderabad, TS 500081",
        phone: "+91 40 4433 2211",
        status: "Verified & Active",
        hours: "8:30 AM - 8:30 PM",
        rating: 4.9,
        totalCollected: "3,890 kg",
        acceptedCategories: ["E-waste", "Batteries", "Plastic", "Paper & Cardboard", "Metal"]
    }
];

// Predefined Achievement Badges
const ACHIEVEMENTS_LIST = [
    {
        id: "first_drop",
        title: "First Step to Green",
        icon: "🌱",
        description: "Completed your first verified recycling deposit.",
        pointsBonus: 50,
        requirement: "1 transaction"
    },
    {
        id: "eco_starter",
        title: "Eco Champion (10 kg)",
        icon: "🥉",
        description: "Recycled over 10 kg of materials in total.",
        pointsBonus: 100,
        requirement: "10 kg waste"
    },
    {
        id: "century_club",
        title: "MSTC Century (1000 Pts)",
        icon: "🪙",
        description: "Earned a cumulative total of 1,000+ MSTC Points.",
        pointsBonus: 150,
        requirement: "1,000 MSTC"
    },
    {
        id: "metal_master",
        title: "Heavy Metal Hero",
        icon: "⚙️",
        description: "Recycled 5 kg or more of metallic scrap.",
        pointsBonus: 120,
        requirement: "5 kg Metal"
    },
    {
        id: "ewaste_guardian",
        title: "E-Waste Guardian",
        icon: "💻",
        description: "Safely diverted hazardous electronic devices from landfills.",
        pointsBonus: 200,
        requirement: "E-waste deposit"
    },
    {
        id: "streak_pro",
        title: "Consistency Master",
        icon: "🔥",
        description: "Maintained a 5-day active recycling engagement streak.",
        pointsBonus: 150,
        requirement: "5 day streak"
    },
    {
        id: "half_century_kg",
        title: "Planet Defender (50 kg)",
        icon: "🏆",
        description: "Recycled over 50 kg of cumulative waste materials.",
        pointsBonus: 300,
        requirement: "50 kg waste"
    }
];

// Recharge Plans Sample Data
const RECHARGE_PLANS = {
    mobile: [
        { id: "mob_20", name: "Talktime & SMS Booster", amount: 20, points: 200, validity: "28 Days", data: "1 GB" },
        { id: "mob_50", name: "Popular Daily 1.5GB/Day", amount: 50, points: 500, validity: "7 Days", data: "10.5 GB" },
        { id: "mob_100", name: "Unlimited Calling + 2GB/Day", amount: 100, points: 1000, validity: "14 Days", data: "28 GB" },
        { id: "mob_240", name: "Mega Monthly Saver", amount: 240, points: 2400, validity: "28 Days", data: "56 GB" },
        { id: "mob_499", name: "All-Rounder 3-Month Plan", amount: 499, points: 4990, validity: "84 Days", data: "168 GB" }
    ],
    data: [
        { id: "data_19", name: "Emergency 1GB Add-on", amount: 19, points: 190, validity: "Base Plan", data: "1 GB" },
        { id: "data_29", name: "Work From Home 2GB Pack", amount: 29, points: 290, validity: "1 Day", data: "2 GB" },
        { id: "data_65", name: "Weekly 6GB Top-up", amount: 65, points: 650, validity: "Base Plan", data: "6 GB" },
        { id: "data_120", name: "High Speed 12GB Data Pack", amount: 120, points: 1200, validity: "30 Days", data: "12 GB" }
    ],
    dth: [
        { id: "dth_100", name: "Hindi / Regional Value Pack", amount: 100, points: 1000, validity: "1 Month", channels: "120+ Channels" },
        { id: "dth_200", name: "Sports & Movies HD Combo", amount: 200, points: 2000, validity: "1 Month", channels: "210+ Channels" },
        { id: "dth_350", name: "Family Mega HD Annual Pack", amount: 350, points: 3500, validity: "1 Month", channels: "320+ Channels" }
    ]
};

// Rewards / Vouchers Catalog
const VOUCHERS_CATALOG = [
    {
        id: "vouch_amz_100",
        brand: "Amazon Pay",
        title: "₹100 Amazon Pay Gift Voucher",
        points: 1000,
        value: 100,
        category: "Shopping",
        icon: "🛍️",
        tag: "Bestseller"
    },
    {
        id: "vouch_flp_100",
        brand: "Flipkart",
        title: "₹100 Flipkart Shopping E-Card",
        points: 1000,
        value: 100,
        category: "Shopping",
        icon: "🛒",
        tag: "Popular"
    },
    {
        id: "vouch_swg_50",
        brand: "Swiggy",
        title: "₹50 Swiggy Gourmet Discount Code",
        points: 500,
        value: 50,
        category: "Food",
        icon: "🍔",
        tag: "Instant Delivery"
    },
    {
        id: "vouch_zom_100",
        brand: "Zomato",
        title: "₹100 Zomato Dining & Delivery",
        points: 1000,
        value: 100,
        category: "Food",
        icon: "🍕",
        tag: "Food & Dining"
    },
    {
        id: "vouch_dec_250",
        brand: "Decathlon",
        title: "₹250 Decathlon Sports Voucher",
        points: 2500,
        value: 250,
        category: "Sports",
        icon: "🚴",
        tag: "Eco Partner"
    },
    {
        id: "vouch_payout_100",
        brand: "Direct Bank / UPI",
        title: "₹100 Direct UPI Reward Payout",
        points: 1000,
        value: 100,
        category: "Cashback",
        icon: "💳",
        tag: "Min. 1000 MSTC"
    }
];

// Leaderboard Mock Dataset
const LEADERBOARD_USERS = [
    { rank: 1, name: "Dr. Ananya Ray", city: "Bengaluru", totalKg: 142.8, points: 2890, badge: "🌱 Planet Hero" },
    { rank: 2, name: "Kavitha Sundaram", city: "Mysuru", totalKg: 118.4, points: 2410, badge: "⚡ Eco Master" },
    { rank: 3, name: "Rohan Varma", city: "Mumbai", totalKg: 95.0, points: 1980, badge: "📦 Zero Waste" },
    { rank: 4, name: "Vikram Malhotra", city: "New Delhi", totalKg: 82.2, points: 1640, badge: "♻️ Recycler" },
    { rank: 5, name: "Arjun Sharma", city: "Bengaluru", totalKg: 48.5, points: 1250, badge: "🔥 Active Streak", isCurrent: true },
    { rank: 6, name: "Pooja Hegde", city: "Hassan", totalKg: 41.0, points: 890, badge: "⭐ Eco Friend" },
    { rank: 7, name: "Siddharth Das", city: "Hyderabad", totalKg: 36.5, points: 750, badge: "⭐ Green Novice" }
];

// Helper Functions
function calculateMSTCPoints(wasteCategoryId, weightKg) {
    const category = WASTE_CATEGORIES.find(c => c.id === wasteCategoryId || c.name.toLowerCase() === wasteCategoryId.toLowerCase());
    if (!category || isNaN(weightKg) || weightKg <= 0) return 0;
    return Math.round(weightKg * category.rate);
}

function pointsToRewardValue(points) {
    if (isNaN(points) || points <= 0) return 0;
    // 100 MSTC Points = ₹10 -> rewardValue = points / 10
    return (points / 10).toFixed(2);
}

function rewardValueToPoints(amountInRupees) {
    if (isNaN(amountInRupees) || amountInRupees <= 0) return 0;
    return Math.round(amountInRupees * 10);
}

// Export to window
if (typeof window !== "undefined") {
    window.WASTE_CATEGORIES = WASTE_CATEGORIES;
    window.COLLECTION_CENTERS = COLLECTION_CENTERS;
    window.ACHIEVEMENTS_LIST = ACHIEVEMENTS_LIST;
    window.RECHARGE_PLANS = RECHARGE_PLANS;
    window.VOUCHERS_CATALOG = VOUCHERS_CATALOG;
    window.LEADERBOARD_USERS = LEADERBOARD_USERS;
    window.calculateMSTCPoints = calculateMSTCPoints;
    window.pointsToRewardValue = pointsToRewardValue;
    window.rewardValueToPoints = rewardValueToPoints;
}