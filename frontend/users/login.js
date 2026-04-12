document.addEventListener('DOMContentLoaded', function() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    const role = localStorage.getItem("role");

    if (userSession && role) {
        if (role === "user") {
            window.location.href = "food.html";
        }
        else if (role === "vendor") {
            window.location.href = "/frontend/vendor/products/products.html";
        }
        else if (role === "driver") {
            window.location.href = "/frontend/drivers/drivers.html";
        }
    }
});
function toggleForms(event) {
    event.preventDefault();
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Create session
        const userSession = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userSession', JSON.stringify(userSession));
        localStorage.setItem("role", "user");
        localStorage.setItem('userProfile', JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address || ''
        }));
        
        alert('Login successful!');
        let role = localStorage.getItem("role");

        if (role === "user") {
          window.location.href = "food.html";
        }
       else if (role === "vendor") {
          window.location.href = "../vender/products/products.html";
        }
       else if (role === "driver") {
          window.location.href = "../drivers/drivers.html";
        }
       else {
             alert("Role not found! Please go back and select User/Vendor/Driver.");
         }
    } else {
        alert('Invalid email or password. Please try again or sign up.');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login instead.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password, // In production, never store plain passwords!
        address: '',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Create session
    const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('userSession', JSON.stringify(userSession));
    localStorage.setItem("role", "user");
    localStorage.setItem('userProfile', JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: ''
    }));
    
    alert('Sign up successful! Welcome to ServiGo!');
    let role = localStorage.getItem("role");

    if (role === "user") {
      window.location.href = "food.html";
    }
    else if (role === "vendor") {
      window.location.href = "../vender/products/products.html";
    }
    else if (role === "driver") {
       window.location.href = "../drivers/drivers.html";
    
   }
}; 

      