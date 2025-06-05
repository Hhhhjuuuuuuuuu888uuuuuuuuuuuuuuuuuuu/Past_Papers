import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyADwD8GeL2vJeLkSyp-ZlTuxNP4h0TjI6c",
    authDomain: "past-question-papers.firebaseapp.com",
    projectId: "past-question-papers",
    storageBucket: "past-question-papers.appspot.com",
    messagingSenderId: "813804356697",
    appId: "1:813804356697:web:a7a820f205559262fcdd48",
    measurementId: "G-6PDV1J39MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function checkAdminRole(email) {
    console.log("Checking admin role for:", email);
    
    const q = query(collection(db, "admins"), where("email", "==", email.toLowerCase()));
    const adminDocs = await getDocs(q);

    if (!adminDocs.empty) {
        console.log("✅ Admin exists in Firestore!");
        return true;
    } else {
        console.error("❌ Admin email not found in Firestore OR blocked by Firestore rules.");
        return false;
    }
}


// Event listeners for toggling forms
document.getElementById("showStudentForm").addEventListener("click", () => {
    document.getElementById("studentSignUp").classList.remove("hidden");
    document.getElementById("studentLogin").classList.remove("hidden");
    document.getElementById("adminLogin").classList.add("hidden");
});

document.getElementById("showAdminForm").addEventListener("click", () => {
    document.getElementById("adminLogin").classList.remove("hidden");
    document.getElementById("studentSignUp").classList.add("hidden");
    document.getElementById("studentLogin").classList.add("hidden");
});

// Student Sign-Up
document.getElementById("signUpBtn").addEventListener("click", async () => {
    let email = document.getElementById("signUpEmail").value.trim();
    let password = document.getElementById("signUpPassword").value.trim();
    let message = document.getElementById("signUpMessage");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        let user = userCredential.user;

        await setDoc(doc(db, "students", user.uid), { 
            email: user.email, 
            joinedAt: new Date().toISOString() 
        });

        message.innerHTML = "✅ Sign-up successful!";
        message.style.color = "green";
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
    } catch (error) {
        message.innerHTML = error.message;
        message.style.color = "red";
        console.error("Sign-up error:", error);
    }
});

// Student Login
document.getElementById("loginBtn").addEventListener("click", async () => {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        message.innerHTML = "✅ Login successful!";
        message.style.color = "green";
        setTimeout(() => { window.location.href = "student.html"; }, 1500);
    } catch (error) {
        message.innerHTML = error.message;
        message.style.color = "red";
        console.error("Student login error:", error);
    }
});

// Password Reset Functionality
document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
    let email = document.getElementById("loginEmail").value.trim();
    let message = document.getElementById("loginMessage");

    if (!email) {
        message.innerHTML = "❌ Please enter your email.";
        message.style.color = "red";
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        message.innerHTML = "✅ Password reset email sent. Check your inbox!";
        message.style.color = "green";
    } catch (error) {
        message.innerHTML = `❌ ${error.message}`;
        message.style.color = "red";
        console.error("Password reset error:", error);
    }
});

// Admin Login & Role Verification
document.getElementById("adminLoginBtn").addEventListener("click", async () => {
    let email = document.getElementById("adminEmail").value.trim().toLowerCase();
    let password = document.getElementById("adminPassword").value.trim();
    let message = document.getElementById("adminLoginMessage");

    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        const isAdmin = await checkAdminRole(email);

        if (isAdmin) {
            message.innerHTML = "✅ Admin login successful!";
            message.style.color = "green";
            setTimeout(() => { window.location.href = "admin.html"; }, 1500);
        } else {
            message.innerHTML = "❌ Your email is not registered as an admin!";
            message.style.color = "red";
            await signOut(auth);
        }
    } catch (error) {
        message.innerHTML = error.message;
        message.style.color = "red";
        console.error("Admin login error:", error);
    }
});
