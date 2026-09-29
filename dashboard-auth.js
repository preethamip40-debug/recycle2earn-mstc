import { supabase } from "./supabase-client.js";

const loginPath = "../login.html";

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function countStreak(records) {
    const days = new Set(
        records
            .filter(record => record.status === "verified")
            .map(record => new Date(record.created_at).toISOString().slice(0, 10))
    );
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let streak = 0;
    for (let offset = 0; offset < 366; offset += 1) {
        const day = new Date(today);
        day.setUTCDate(today.getUTCDate() - offset);
        if (!days.has(day.toISOString().slice(0, 10))) break;
        streak += 1;
    }
    return streak;
}

function renderTransactions(records, rewards) {
    const table = document.getElementById("transactionTable");
    if (!table) return;

    const entries = [
        ...records.map(record => ({
            description: record.waste_type,
            weight: `${Number(record.weight_kg).toFixed(2)} KG`,
            points: Number(record.reward_points || 0),
            status: record.status,
            createdAt: record.created_at
        })),
        ...rewards.map(reward => ({
            description: reward.description,
            weight: "-",
            points: reward.type === "redeemed" ? -Number(reward.points) : Number(reward.points),
            status: reward.status,
            createdAt: reward.created_at
        }))
    ].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)).slice(0, 5);

    table.replaceChildren();
    if (!entries.length) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.textContent = "No transactions yet.";
        row.appendChild(cell);
        table.appendChild(row);
        return;
    }

    entries.forEach(entry => {
        const row = document.createElement("tr");
        [entry.description, entry.weight, `${entry.points > 0 ? "+" : ""}${entry.points} MSTC`, entry.status].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

async function loadDashboard() {
    if (!supabase) {
        window.location.replace(`${loginPath}?setup=supabase`);
        return;
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
        window.location.replace(loginPath);
        return;
    }

    const user = sessionData.session.user;
    const [profileResult, recordsResult, rewardsResult] = await Promise.all([
        supabase
            .from("profiles")
            .select("full_name, phone")
            .eq("id", user.id)
            .maybeSingle(),
        supabase
            .from("recycling_records")
            .select("waste_type, weight_kg, reward_points, status, created_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false }),
        supabase
            .from("rewards")
            .select("type, description, points, status, created_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
    ]);

    const records = recordsResult.data || [];
    const rewards = rewardsResult.data || [];
    const confirmedRewards = rewards.filter(reward => reward.status === "confirmed");
    const balance = confirmedRewards.reduce((total, reward) => {
        return total + (reward.type === "redeemed" ? -Number(reward.points) : Number(reward.points));
    }, 0);
    const verifiedWaste = records
        .filter(record => record.status === "verified")
        .reduce((total, record) => total + Number(record.weight_kg), 0);
    const profile = profileResult.data;
    const displayName = profile?.full_name || user.user_metadata?.full_name || user.email || "Member";

    setText("userName", displayName);
    setText("userID", `Account: ${user.id.slice(0, 8).toUpperCase()}`);
    setText("points", balance.toLocaleString());
    setText("rewardValue", `₹${(balance / 10).toFixed(2)}`);
    setText("totalWaste", `${verifiedWaste.toFixed(2)} KG`);
    setText("streak", `${countStreak(records)} DAYS`);
    renderTransactions(records, rewards);

    const failedResult = [profileResult, recordsResult, rewardsResult].find(result => result.error);
    if (failedResult) {
        console.error("Dashboard data query failed:", failedResult.error.message);
        setText("userID", "Signed in · Run the Supabase schema to load account data.");
    }
}

window.logout = async function logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Sign out failed:", error.message);
        return;
    }
    window.location.assign(loginPath);
};

loadDashboard().catch(error => {
    console.error("Dashboard initialization failed:", error);
    window.location.replace(loginPath);
});
