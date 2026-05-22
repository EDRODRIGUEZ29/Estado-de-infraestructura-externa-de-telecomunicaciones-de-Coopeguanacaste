class ConfigManager {
    constructor() {
        this.config = this.loadConfig() || this.getDefaultConfig();
        this.init();
    }

    getDefaultConfig() {
        return {
            apiUrl: 'https://coopeguanacaste.ozmap.com.br:9994/api/v2',
            apiToken: '',
            refreshInterval: 300
        };
    }

    loadConfig() {
        const saved = localStorage.getItem('dashboardConfig');
        return saved ? JSON.parse(saved) : null;
    }

    saveConfig(config) {
        this.config = config;
        localStorage.setItem('dashboardConfig', JSON.stringify(config));
    }

    init() {
        const configBtn = document.getElementById('configBtn');
        const configModal = document.getElementById('configModal');
        const closeBtn = document.querySelector('.close');
        const configForm = document.getElementById('configForm');
        const testBtn = document.getElementById('testBtn');
        const loadBtn = document.getElementById('loadBtn');

        // Cargar valores guardados
        this.loadConfigToForm();

        configBtn.addEventListener('click', () => {
            configModal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            configModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === configModal) {
                configModal.style.display = 'none';
            }
        });

        configForm.addEventListener('submit', (e) => this.handleSave(e));
        testBtn.addEventListener('click', () => this.handleTest());
        loadBtn.addEventListener('click', () => this.handleLoad());
    }

    loadConfigToForm() {
        document.getElementById('apiUrl').value = this.config.apiUrl || '';
        document.getElementById('apiToken').value = this.config.apiToken || '';
        document.getElementById('refreshInterval').value = this.config.refreshInterval;
        document.getElementById('refreshDisplay').textContent = this.config.refreshInterval;
    }

    handleSave(e) {
        e.preventDefault();
        const config = {
            apiUrl: document.getElementById('apiUrl').value,
            apiToken: document.getElementById('apiToken').value,
            refreshInterval: parseInt(document.getElementById('refreshInterval').value)
        };

        this.saveConfig(config);
        this.showMessage('✅ Configuración guardada correctamente', 'success');
        document.getElementById('refreshDisplay').textContent = config.refreshInterval;
    }

    handleTest() {
        const apiUrl = document.getElementById('apiUrl').value;
        const apiToken = document.getElementById('apiToken').value;

        if (!apiUrl || !apiToken) {
            this.showMessage('❌ Completa URL y Token primero', 'error');
            return;
        }

        this.showMessage('🔄 Probando conexión...', 'info');
        
        fetch(`${apiUrl}/clients?limit=1`, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            }
        })
        .then(r => {
            if (r.ok) {
                this.showMessage('✅ Conexión exitosa', 'success');
            } else {
                this.showMessage(`❌ Error ${r.status}: ${r.statusText}`, 'error');
            }
        })
        .catch(err => {
            this.showMessage(`❌ Error de conexión: ${err.message}`, 'error');
        });
    }

    handleLoad() {
        this.showMessage('🔄 Cargando datos...', 'info');
        if (typeof app !== 'undefined') {
            app.loadData();
        }
    }

    showMessage(text, type) {
        const msg = document.getElementById('configMessage');
        msg.textContent = text;
        msg.className = `message ${type}`;
    }
}

const configManager = new ConfigManager();
