class AuthManager {
    constructor() {
        this.VALID_USERNAME = 'Telecom';
        this.VALID_PASSWORD = 'Telecom#';
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        const loginForm = document.getElementById('loginForm');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Verificar si ya está autenticado
        if (sessionStorage.getItem('authenticated')) {
            this.showDashboard();
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('loginError');

        if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
            sessionStorage.setItem('authenticated', 'true');
            this.isAuthenticated = true;
            this.showDashboard();
        } else {
            errorMsg.textContent = '❌ Usuario o contraseña incorrectos';
            errorMsg.style.display = 'block';
        }
    }

    handleLogout() {
        sessionStorage.removeItem('authenticated');
        this.isAuthenticated = false;
        this.showLogin();
    }

    showDashboard() {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
    }

    showLogin() {
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('dashboardContainer').style.display = 'none';
    }

    checkAuth() {
        return sessionStorage.getItem('authenticated') === 'true';
    }
}

const auth = new AuthManager();
