document.addEventListener('DOMContentLoaded', function () {
    const vendorSession = JSON.parse(localStorage.getItem('vendorSession'));
    if (vendorSession) {
        // optional redirect
        // window.location.href = '../vender/products/vendorproducts.html';
    }
});

// 🔁 Toggle
function toggleForms(event) {
    event.preventDefault();
    document.getElementById('login-form').classList.toggle('active');
    document.getElementById('signup-form').classList.toggle('active');
}


// 🔐 LOGIN (API BASED)
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // 🔥 API CALL
    let res = await fetch(`http://localhost:3000/vendors?email=${email}`);
    let data = await res.json();

    if (data.length === 0) {
        alert('Vendor not found');
        return;
    }

    let vendor = data[0];

    if (vendor.password !== password) {
        alert('Wrong password');
        return;
    }

    // ✅ SESSION
    localStorage.setItem('vendorSession', JSON.stringify(vendor));

    alert('Login successful!');
    window.location.href = '../vender/products/vendorproducts.html';
}


// 📝 SIGNUP (API BASED)
async function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const shopName = document.getElementById('signup-shopname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const address = document.getElementById('signup-address').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!name || !shopName || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // 🔥 CHECK DUPLICATE FROM API
    let checkRes = await fetch(`http://localhost:3000/vendors?email=${email}`);
    let existing = await checkRes.json();

    if (existing.length > 0) {
        alert('Email already registered');
        return;
    }

    // ✅ NEW VENDOR
    let newVendor = {
        id: Date.now().toString(),
        name,
        shopName,
        email,
        phone,
        address,
        password,
        createdAt: new Date().toISOString(),
        products: []
    };

    // 🔥 SAVE TO DB.JSON
    await fetch("http://localhost:3000/vendors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newVendor)
    });

    // ✅ SESSION SET
    localStorage.setItem("vendorSession", JSON.stringify(newVendor));

    alert("Signup successful ✅");

    window.location.href = '../vender/products/vendorproducts.html';
}