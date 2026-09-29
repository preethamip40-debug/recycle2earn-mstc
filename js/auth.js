import { isSupabaseConfigured } from "./supabase-config.js";
import { supabase } from "./supabase-client.js";

const dashboardPath = "./pages/dashborad.html";

function showMessage(elementId, text, type = "error") {
    const message = document.getElementById(elementId);
    if (!message) return;

    message.textContent = text;
    message.dataset.state = type;
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");
}

function setBusy(formId, busy) {
    const button = document.querySelector(`#${formId} .auth-btn`);
    if (!button) return;

    button.disabled = busy;
    button.setAttribute("aria-busy", String(busy));
}

function getSupabaseClient(messageId) {
    if (supabase) return supabase;

    showMessage(
        messageId,
        "Supabase is not configured yet. Add your project URL and publishable key in js/supabase-config.js."
    );
    return null;
}

window.showRegister = function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
};

window.showLogin = function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
};

window.registerUser = async function registerUser() {
    const client = getSupabaseClient("registerMessage");
    if (!client) return;

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (!name || !email || !phone || !password || !confirmPassword) {
        showMessage("registerMessage", "Please complete every field.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("registerMessage", "Passwords do not match.");
        return;
    }

    if (password.length < 6) {
        showMessage("registerMessage", "Password must contain at least 6 characters.");
        return;
    }

    setBusy("registerForm", true);
    showMessage("registerMessage", "Creating your account...", "pending");

    try {
        const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    phone
                },
                emailRedirectTo: new URL("login.html", window.location.href).toString()
            }
        });

        if (error) throw error;

        if (!data.user) {
            throw new Error("Supabase did not return a user. Please try again.");
        }

        if (data.session) {
            showMessage("registerMessage", "Account created successfully. Opening your dashboard...", "success");
            window.setTimeout(() => {
                window.location.assign(dashboardPath);
            }, 700);
            return;
        }

        showMessage(
            "registerMessage",
            "Account created successfully. Check your email to confirm your address, then log in.",
            "success"
        );
        window.showLogin();
        showMessage(
            "loginMessage",
            "Confirm your email before signing in.",
            "success"
        );
    } catch (error) {
        showMessage("registerMessage", error.message || "Unable to create your account.");
    } finally {
        setBusy("registerForm", false);
    }
};

window.loginUser = async function loginUser() {
    const client = getSupabaseClient("loginMessage");
    if (!client) return;

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        showMessage("loginMessage", "Enter your email and password.");
        return;
    }

    setBusy("loginForm", true);
    showMessage("loginMessage", "Signing in...", "pending");

    try {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;

        showMessage("loginMessage", "Signed in successfully. Opening your dashboard...", "success");
        window.setTimeout(() => {
            window.location.assign(dashboardPath);
        }, 450);
    } catch (error) {
        showMessage("loginMessage", error.message || "Unable to sign in.");
    } finally {
        setBusy("loginForm", false);
    }
};

if (!isSupabaseConfigured && new URLSearchParams(window.location.search).has("setup")) {
    showMessage(
        "loginMessage",
        "Add your Supabase project URL and publishable key in js/supabase-config.js to enable sign-in."
    );
}

if (isSupabaseConfigured) {
    supabase.auth.getSession().then(({ data, error }) => {
        if (!error && data.session) {
            window.location.replace(dashboardPath);
        }
    });
}
