// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// Login Form Handler
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Check if user exists (in real app, this would be an API call)
        const users = getLocalStorage('users') || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store current user
            setLocalStorage('currentUser', user);
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

// Signup Form Handler
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(signupForm);
        const userData = {
            id: 'P' + Math.random().toString(36).substr(2, 5).toUpperCase(),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            chronicDiseases: formData.get('chronicDiseases'),
            medications: formData.get('medications'),
            allergies: formData.get('allergies'),
            takesTablets: formData.get('takesTablets'),
            lastCheckup: formData.get('lastCheckup'),
            exerciseFrequency: formData.get('exerciseFrequency')
        };

        // Validation
        if (!userData.fullName || !userData.email || !userData.password || !userData.confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }

        if (!validateEmail(userData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (userData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        // Save user data (in real app, this would be an API call)
        const users = getLocalStorage('users') || [];
        
        // Check if email already exists
        if (users.some(user => user.email === userData.email)) {
            alert('Email already registered');
            return;
        }

        // Add new user
        users.push(userData);
        setLocalStorage('users', users);
        
        // Set current user
        setLocalStorage('currentUser', userData);
        
        // Redirect to dashboard
        window.location.href = 'home.html';
    });
}

// Dashboard Initialization
function initializeDashboard() {
    const currentUser = getLocalStorage('currentUser');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Update user info in header
    const patientNameElement = document.getElementById('patientName');
    const patientIdElement = document.getElementById('patientId');
    
    if (patientNameElement) {
        patientNameElement.textContent = currentUser.fullName;
    }
    if (patientIdElement) {
        patientIdElement.textContent = currentUser.id;
    }

    // Initialize sections
    initializeNutritionSection();
    initializeFitnessSection();
    initializeChatbotSection();
    initializeRemindersSection();
}

// Section Initializations
function initializeNutritionSection() {
    const nutritionLog = getLocalStorage('nutritionLog') || [];
    // Add nutrition tracking functionality
}

function initializeFitnessSection() {
    const fitnessLog = getLocalStorage('fitnessLog') || [];
    // Add fitness tracking functionality
}

function initializeChatbotSection() {
    const chatMessages = getLocalStorage('chatMessages') || [];
    // Add chatbot functionality
}

function initializeRemindersSection() {
    const reminders = getLocalStorage('reminders') || [];
    // Add reminders functionality
}

// Initialize dashboard if on dashboard page
if (window.location.pathname.includes('home.html')) {
    initializeDashboard();
}

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Health tracking functions
function logMeal(mealData) {
    const nutritionLog = getLocalStorage('nutritionLog') || [];
    nutritionLog.push({
        ...mealData,
        timestamp: new Date().toISOString()
    });
    setLocalStorage('nutritionLog', nutritionLog);
}

function logExercise(exerciseData) {
    const fitnessLog = getLocalStorage('fitnessLog') || [];
    fitnessLog.push({
        ...exerciseData,
        timestamp: new Date().toISOString()
    });
    setLocalStorage('fitnessLog', fitnessLog);
}

function addReminder(reminderData) {
    const reminders = getLocalStorage('reminders') || [];
    reminders.push({
        ...reminderData,
        id: Date.now(),
        created: new Date().toISOString()
    });
    setLocalStorage('reminders', reminders);
}

// Chatbot functionality
function sendChatMessage(message) {
    const chatMessages = getLocalStorage('chatMessages') || [];
    chatMessages.push({
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString()
    });
    
    // Simple bot response (in real app, this would be more sophisticated)
    const botResponse = {
        text: 'Thank you for your message. How else can I help you?',
        sender: 'bot',
        timestamp: new Date().toISOString()
    };
    chatMessages.push(botResponse);
    
    setLocalStorage('chatMessages', chatMessages);
    return botResponse;
}
