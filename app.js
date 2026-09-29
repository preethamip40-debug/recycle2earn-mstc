/**
 * Recycle2Earn + MSTC Points Platform
 * Core Application Logic & Prototype State Store (LocalStorage-based)
 */

// Storage Keys
const STORAGE_KEYS = {
    USERS: "r2e_users_v2",
    CURRENT_USER: "r2e_current_user_v2",
    TRANSACTIONS: "r2e_transactions_v2",
    BLOCKCHAIN_LEDGER: "r2e_blockchain_ledger_v2",
    CENTER_SUBMISSIONS: "r2e_center_submissions_v2",
    SETTINGS: "r2e_settings_v2"
};

// Default Sample User Seed
const DEFAULT_SAMPLE_USER = {
    id: "USR-MSTC-78291",
    name: "Arjun Sharma",
    email: "arjun@recycle2earn.org",
    phone: "+91 98765 43210",
    password: "password123",
    mstcPoints: 1250,
    rewardValue: 125.00,
    totalWaste: 48.5,
    totalEarnedPoints: 1450,
    totalRedeemedPoints: 200,
    streak: 5,
    walletAddress: "0x7F9a...3B4C",
    joinedDate: "2026-08-15",
    categoryBreakdown: {
        plastic: 18.2,
        paper: 12.0,
        metal: 8.5,
        glass: 4.0,
        ewaste: 3.5,
        batteries: 1.3,
        textiles: 1.0,
        oil: 0.0,
        organic: 0.0
    },
    achievements: ["first_drop", "eco_starter", "century_club"],
    recyclingTransactions: [
        {
            id: "TX-MSTC-88219",
            date: "Today, 10:45 AM",
            timestamp: Date.now() - 3600000 * 2,
            type: "RECYCLING",
            category: "Metal",
            weight: 2.0,
            points: 30,
            rewardValue: 3.00,
            centerName: "GreenCycle Hub Bengaluru",
            centerId: "MSTC-BLR-001",
            blockHash: "0x4e78c...d912",
            status: "Verified ✓"
        },
        {
            id: "TX-MSTC-87910",
            date: "Yesterday, 04:20 PM",
            timestamp: Date.now() - 3600000 * 24,
            type: "RECYCLING",
            category: "E-waste",
            weight: 4.0,
            points: 100,
            rewardValue: 10.00,
            centerName: "GreenCycle Hub Bengaluru",
            centerId: "MSTC-BLR-001",
            blockHash: "0x98f12...33cb",
            status: "Verified ✓"
        },
        {
            id: "TX-MSTC-86402",
            date: "Sep 25, 2026",
            timestamp: Date.now() - 3600000 * 72,
            type: "RECHARGE",
            category: "Mobile Recharge",
            description: "Airtel ₹20 Booster Pack",
            points: -200,
            rewardValue: -20.00,
            blockHash: "0xa13bc...ee45",
            status: "Successful"
        },
        {
            id: "TX-MSTC-85119",
            date: "Sep 24, 2026",
            timestamp: Date.now() - 3600000 * 96,
            type: "RECYCLING",
            category: "Paper & Cardboard",
            weight: 5.0,
            points: 25,
            rewardValue: 2.50,
            centerName: "Koramangala Eco Recovery Depot",
            centerId: "MSTC-BLR-002",
            blockHash: "0x34cc8...11ef",
            status: "Verified ✓"
        }
    ]
};

// State Store Initialisation
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        const initialUsers = [DEFAULT_SAMPLE_USER];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_SAMPLE_USER));
    }

    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(DEFAULT_SAMPLE_USER.recyclingTransactions));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CENTER_SUBMISSIONS)) {
        const mockSubmissions = [
            {
                id: "SUB-8812",
                userId: "USR-MSTC-78291",
                userName: "Arjun Sharma",
                category: "Metal",
                weight: 2.0,
                points: 30,
                centerId: "MSTC-BLR-001",
                centerName: "GreenCycle Hub Bengaluru",
                qrToken: "QR-AUTH-BLR-9872",
                status: "Pending Verification",
                timestamp: Date.now() - 1800000
            },
            {
                id: "SUB-8813",
                userId: "USR-MSTC-10492",
                userName: "Pooja Hegde",
                category: "E-waste",
                weight: 3.5,
                points: 88,
                centerId: "MSTC-BLR-001",
                centerName: "GreenCycle Hub Bengaluru",
                qrToken: "QR-AUTH-BLR-9873",
                status: "Pending Verification",
                timestamp: Date.now() - 900000
            }
        ];
        localStorage.setItem(STORAGE_KEYS.CENTER_SUBMISSIONS, JSON.stringify(mockSubmissions));
    }
}

// Global User Retrieval
function getCurrentUser() {
    try {
        const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (!userJson) return null;
        return JSON.parse(userJson);
    } catch (e) {
        console.error("Error reading current user:", e);
        return null;
    }
}

function saveCurrentUser(user) {
    if (!user) return;
    // Always compute rewardValue dynamically: 100 MSTC = ₹10 => rewardValue = points / 10
    user.rewardValue = Number((user.mstcPoints / 10).toFixed(2));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    // Also sync in users table
    const users = getAllUsers();
    const idx = users.findIndex(u => u.id === user.id || u.email === user.email);
    if (idx !== -1) {
        users[idx] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getAllUsers() {
    try {
        const list = localStorage.getItem(STORAGE_KEYS.USERS);
        return list ? JSON.parse(list) : [DEFAULT_SAMPLE_USER];
    } catch (e) {
        return [DEFAULT_SAMPLE_USER];
    }
}

function getAllTransactions() {
    const user = getCurrentUser();
    return user && user.recyclingTransactions ? user.recyclingTransactions : [];
}

// Authentication Helpers
function registerUser(name, email, phone, password) {
    const users = getAllUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        return { success: false, message: "An account with this email already exists." };
    }

    const newUser = {
        id: "USR-MSTC-" + Math.floor(10000 + Math.random() * 90000),
        name: name,
        email: email,
        phone: phone,
        password: password,
        mstcPoints: 0,
        rewardValue: 0,
        totalWaste: 0,
        totalEarnedPoints: 0,
        totalRedeemedPoints: 0,
        streak: 1,
        walletAddress: "0x" + Math.random().toString(16).substring(2, 10).toUpperCase() + "...MSTC",
        joinedDate: new Date().toISOString().split("T")[0],
        categoryBreakdown: {
            plastic: 0, paper: 0, metal: 0, glass: 0,
            ewaste: 0, batteries: 0, textiles: 0, oil: 0, organic: 0
        },
        achievements: [],
        recyclingTransactions: []
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

    return { success: true, user: newUser };
}

function loginUser(email, password) {
    const users = getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
        return { success: false, message: "Invalid email or password. Please try again." };
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user: user };
}

function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = (window.location.pathname.includes("/pages/") ? "login.html" : "pages/login.html");
}

function checkAuth(redirectIfNotAuth = true) {
    const user = getCurrentUser();
    if (!user && redirectIfNotAuth) {
        const loginUrl = window.location.pathname.includes("/pages/") ? "login.html" : "pages/login.html";
        window.location.href = loginUrl;
        return null;
    }
    return user;
}

// Recycling Flow Simulation & Point Grant
function processRecycling({ categoryId, weight, centerId }) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: "User session not found. Please log in." };

    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
        return { success: false, message: "Please enter a valid weight greater than 0 kg." };
    }

    if (parsedWeight > 500) {
        return { success: false, message: "Anti-fraud limit: Single transaction cannot exceed 500 kg. Please split or contact support." };
    }

    const category = (typeof WASTE_CATEGORIES !== "undefined" ? WASTE_CATEGORIES : []).find(c => c.id === categoryId);
    if (!category) {
        return { success: false, message: "Invalid waste category selected." };
    }

    const center = (typeof COLLECTION_CENTERS !== "undefined" ? COLLECTION_CENTERS : []).find(c => c.id === centerId) || {
        id: centerId || "MSTC-HUB-001",
        name: "Verified GreenHub Collection Point"
    };

    const pointsEarned = Math.round(parsedWeight * category.rate);
    const rewardVal = Number((pointsEarned / 10).toFixed(2));
    const txId = "TX-MSTC-" + Math.floor(10000 + Math.random() * 90000);
    const blockHash = "0x" + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join("") + "...mstc";

    // Update User Profile
    user.mstcPoints = (user.mstcPoints || 0) + pointsEarned;
    user.totalEarnedPoints = (user.totalEarnedPoints || 0) + pointsEarned;
    user.totalWaste = Number(((user.totalWaste || 0) + parsedWeight).toFixed(2));
    user.rewardValue = Number((user.mstcPoints / 10).toFixed(2));

    if (!user.categoryBreakdown) user.categoryBreakdown = {};
    user.categoryBreakdown[categoryId] = Number(((user.categoryBreakdown[categoryId] || 0) + parsedWeight).toFixed(2));

    // Achievements Check
    if (!user.achievements) user.achievements = [];
    if (!user.achievements.includes("first_drop")) user.achievements.push("first_drop");
    if (user.totalWaste >= 10 && !user.achievements.includes("eco_starter")) user.achievements.push("eco_starter");
    if (user.mstcPoints >= 1000 && !user.achievements.includes("century_club")) user.achievements.push("century_club");
    if (categoryId === "metal" && (user.categoryBreakdown.metal || 0) >= 5 && !user.achievements.includes("metal_master")) user.achievements.push("metal_master");
    if (categoryId === "ewaste" && !user.achievements.includes("ewaste_guardian")) user.achievements.push("ewaste_guardian");
    if (user.totalWaste >= 50 && !user.achievements.includes("half_century_kg")) user.achievements.push("half_century_kg");

    const newTx = {
        id: txId,
        date: "Just now (" + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ")",
        timestamp: Date.now(),
        type: "RECYCLING",
        category: category.name,
        weight: parsedWeight,
        points: pointsEarned,
        rewardValue: rewardVal,
        centerName: center.name,
        centerId: center.id,
        blockHash: blockHash,
        status: "Verified ✓"
    };

    if (!user.recyclingTransactions) user.recyclingTransactions = [];
    user.recyclingTransactions.unshift(newTx);

    saveCurrentUser(user);

    return {
        success: true,
        transaction: newTx,
        pointsEarned,
        rewardVal,
        totalBalance: user.mstcPoints,
        totalRewardValue: user.rewardValue
    };
}

// Redeem Rewards / Recharge / Pay Bills
function redeemPoints({ type, description, pointsCost, rupeesValue, extraDetails = {} }) {
    const user = getCurrentUser();
    if (!user) return { success: false, message: "User session expired. Please log in." };

    const cost = Math.round(pointsCost);
    if (user.mstcPoints < cost) {
        return {
            success: false,
            message: `Insufficient MSTC points. You have ${user.mstcPoints.toLocaleString()} MSTC, but need ${cost.toLocaleString()} MSTC.`
        };
    }

    user.mstcPoints -= cost;
    user.totalRedeemedPoints = (user.totalRedeemedPoints || 0) + cost;
    user.rewardValue = Number((user.mstcPoints / 10).toFixed(2));

    const txId = "TX-RED-" + Math.floor(10000 + Math.random() * 90000);
    const blockHash = "0x" + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join("") + "...redeem";

    const newTx = {
        id: txId,
        date: "Just now",
        timestamp: Date.now(),
        type: type, // "RECHARGE" | "BILL_PAYMENT" | "VOUCHER"
        category: type.replace("_", " "),
        description: description,
        points: -cost,
        rewardValue: -Number(rupeesValue.toFixed(2)),
        blockHash: blockHash,
        status: "Successful (Prototype)",
        details: extraDetails
    };

    if (!user.recyclingTransactions) user.recyclingTransactions = [];
    user.recyclingTransactions.unshift(newTx);

    saveCurrentUser(user);

    return {
        success: true,
        transaction: newTx,
        deductedPoints: cost,
        remainingPoints: user.mstcPoints,
        remainingRewardValue: user.rewardValue
    };
}

// Toast Notifications System
function showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const bg = type === "success" ? "linear-gradient(135deg, #123825, #081d13)" :
               type === "error" ? "linear-gradient(135deg, #3d1419, #20080b)" :
               "linear-gradient(135deg, #102d38, #07171d)";
    const border = type === "success" ? "rgba(57, 217, 138, 0.4)" :
                   type === "error" ? "rgba(255, 94, 126, 0.4)" :
                   "rgba(98, 220, 228, 0.4)";
    const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";

    toast.style.cssText = `
        min-width: 280px;
        max-width: 420px;
        padding: 14px 18px;
        background: ${bg};
        border: 1px solid ${border};
        border-radius: 14px;
        color: #f1f7f3;
        font-size: 0.9rem;
        box-shadow: 0 14px 40px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(14px);
        transform: translateY(20px);
        opacity: 0;
        transition: all 250ms ease;
        pointer-events: auto;
    `;
    toast.innerHTML = `
        <div style="
            width:24px;height:24px;border-radius:50%;
            background:${border};display:grid;place-items:center;
            font-weight:bold;font-size:0.8rem;flex-shrink:0;">
            ${icon}
        </div>
        <div style="flex:1;line-height:1.4;">${message}</div>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        toast.style.transform = "translateY(10px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Standard Dynamic Navbar & Navigation Builder
function renderNavbar(activePage = "") {
    const isSubpage = window.location.pathname.includes("/pages/");
    const base = isSubpage ? "" : "pages/";
    const root = isSubpage ? "../" : "";
    const user = getCurrentUser();

    const nav = document.querySelector(".navbar");
    if (!nav) return;

    nav.innerHTML = `
        <a href="${root}index.html" class="brand">
            <div class="brand-icon">♻</div>
            <span>Recycle<span style="color:var(--green)">2Earn</span></span>
        </a>

        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
        </button>

        <nav class="nav-links" id="mainNavLinks">
            <a href="${root}index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="${base}dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a>
            <a href="${base}recycle.html" class="${activePage === 'recycle' ? 'active' : ''}">Recycle & Earn</a>
            <a href="${base}wallet.html" class="${activePage === 'wallet' ? 'active' : ''}">Wallet</a>
            <a href="${base}recharge.html" class="${activePage === 'recharge' ? 'active' : ''}">Recharge</a>
            <a href="${base}bills.html" class="${activePage === 'bills' ? 'active' : ''}">Pay Bills</a>
            <a href="${base}rewards.html" class="${activePage === 'rewards' ? 'active' : ''}">Rewards</a>
            <a href="${base}passport.html" class="${activePage === 'passport' ? 'active' : ''}">Waste Passport</a>
            <a href="${base}centers.html" class="${activePage === 'centers' ? 'active' : ''}">Centers</a>
            <a href="${base}leaderboard.html" class="${activePage === 'leaderboard' ? 'active' : ''}">Leaderboard</a>
            <a href="${base}admin-dashboard.html" class="${activePage === 'admin' ? 'active' : ''}" style="color:var(--cyan)">Admin</a>
        </nav>

        <div class="nav-auth-actions">
            ${user ? `
                <div class="user-chip" title="Wallet: ${user.walletAddress || '0xMSTC'}">
                    <span class="user-pts">🪙 ${(user.mstcPoints || 0).toLocaleString()}</span>
                    <span class="user-val">₹${(user.rewardValue || 0).toLocaleString()}</span>
                    <button onclick="logoutUser()" class="outline-button btn-sm" style="padding:6px 12px;font-size:0.8rem;">Logout</button>
                </div>
            ` : `
                <a href="${base}login.html" class="gradient-button btn-sm">Login / Register</a>
            `}
        </div>
    `;

    // Mobile nav toggle handler
    const toggleBtn = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("mainNavLinks");
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            toggleBtn.classList.toggle("active");
        });
    }
}

// Environmental Impact Metrics Calculator
function calculateEnvironmentalImpact(user) {
    if (!user) return { co2: "0 kg", trees: "0", energy: "0 kWh", water: "0 L" };
    const breakdown = user.categoryBreakdown || {};
    let co2 = 0;
    let energy = 0;

    (typeof WASTE_CATEGORIES !== "undefined" ? WASTE_CATEGORIES : []).forEach(cat => {
        const kg = breakdown[cat.id] || 0;
        co2 += kg * (cat.co2Factor || 1.2);
        energy += kg * (cat.energyFactor || 5.0);
    });

    const treesEquivalent = (co2 / 21.7).toFixed(1); // 1 tree absorbs ~21.7 kg CO2/year
    const waterLiters = (user.totalWaste * 32.5).toFixed(0);

    return {
        co2Kg: co2.toFixed(1),
        trees: treesEquivalent,
        energyKwh: energy.toFixed(1),
        waterL: waterLiters
    };
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    initStorage();
});

// Export globally
if (typeof window !== "undefined") {
    window.STORAGE_KEYS = STORAGE_KEYS;
    window.DEFAULT_SAMPLE_USER = DEFAULT_SAMPLE_USER;
    window.initStorage = initStorage;
    window.getCurrentUser = getCurrentUser;
    window.saveCurrentUser = saveCurrentUser;
    window.getAllUsers = getAllUsers;
    window.getAllTransactions = getAllTransactions;
    window.registerUser = registerUser;
    window.loginUser = loginUser;
    window.logoutUser = logoutUser;
    window.checkAuth = checkAuth;
    window.processRecycling = processRecycling;
    window.redeemPoints = redeemPoints;
    window.showToast = showToast;
    window.renderNavbar = renderNavbar;
    window.calculateEnvironmentalImpact = calculateEnvironmentalImpact;
}
