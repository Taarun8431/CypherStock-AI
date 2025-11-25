
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

const passwordInput = document.getElementById('password');
if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;
        
        let strength = 0;
        let label = 'Weak';
        let color = '#ef4444';
        
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 15;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 10;
        
        if (strength >= 75) {
            label = 'Strong';
            color = '#10b981';
        } else if (strength >= 50) {
            label = 'Medium';
            color = '#f59e0b';
        }
        
        strengthBar.style.width = strength + '%';
        strengthBar.style.background = color;
        strengthText.textContent = `Password strength: ${label}`;
        strengthText.style.color = color;
    });
}

const signinForm = document.getElementById('signinForm');
if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        const submitButton = signinForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            console.log('Sign in attempt:', { email, password, remember });
            
            localStorage.setItem('user', JSON.stringify({
                email: email,
                name: email.split('@')[0],
                authenticated: true
            }));
            
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const dmatAccount = document.getElementById('dmatAccount').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate terms
        if (!terms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        // Show loading state
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            console.log('Sign up attempt:', { 
                firstName, 
                lastName, 
                email, 
                phone, 
                password, 
                dmatAccount 
            });
            
            // Store user data (in real app, this would come from backend)
            localStorage.setItem('user', JSON.stringify({
                email: email,
                name: `${firstName} ${lastName}`,
                phone: phone,
                dmatAccount: dmatAccount,
                authenticated: true
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Google Sign In
function signInWithGoogle() {
    console.log('Google Sign In initiated');
    
    // In a real application, this would integrate with Google OAuth
    // For demo purposes, we'll simulate a successful login
    
    // Show loading
    alert('Redirecting to Google Sign In...');
    
    setTimeout(() => {
        // Simulate successful Google auth
        localStorage.setItem('user', JSON.stringify({
            email: 'user@gmail.com',
            name: 'Google User',
            authenticated: true,
            provider: 'google'
        }));
        
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Google Sign Up
function signUpWithGoogle() {
    console.log('Google Sign Up initiated');
    
    // Show loading
    alert('Redirecting to Google Sign Up...');
    
    setTimeout(() => {
        // Simulate successful Google auth
        localStorage.setItem('user', JSON.stringify({
            email: 'newuser@gmail.com',
            name: 'New Google User',
            authenticated: true,
            provider: 'google'
        }));
        
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Form validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#ef4444';
        } else {
            e.target.style.borderColor = '';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
        // Remove non-numeric characters except + and spaces
        e.target.value = e.target.value.replace(/[^\d+\s]/g, '');
    });
});

// Real-time validation for confirm password
const confirmPasswordInput = document.getElementById('confirmPassword');
if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', (e) => {
        const password = document.getElementById('password').value;
        const confirmPassword = e.target.value;
        
        if (confirmPassword && password !== confirmPassword) {
            e.target.style.borderColor = '#ef4444';
        } else {
            e.target.style.borderColor = '';
        }
    });
}
