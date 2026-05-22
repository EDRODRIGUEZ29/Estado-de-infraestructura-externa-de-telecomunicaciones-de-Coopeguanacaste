class Dashboard {
    constructor() {
        this.data = {
            clientes: [],
            cajas: [],
            naps: []
        };
        this.refreshInterval = null;
        this.init();
    }

    init() {
        // Esperar a que DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        mapManager.initMaps();
        chartManager.initCharts();
        this.startAutoRefresh();
        this.loadData();
    }

    async loadData() {
        if (!configManager.config.apiToken) {
            console.warn('Token no configurado');
            return;
        }

        try {
            // Cargar datos de la API
            const [clientesRes, cajasRes, napsRes] = await Promise.all([
                apiClient.getClients(),
                apiClient.getBoxes(),
                apiClient.getNaps()
            ]);

            this.data.clientes = clientesRes.data || clientesRes || [];
            this.data.cajas = cajasRes.data || cajasRes || [];
            this.data.naps = napsRes.data || napsRes || [];

            this.updateUI();
            this.updateLastUpdate();
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }

    updateUI() {
        // Actualizar estadísticas
        document.getElementById('totalClientes').textContent = this.data.clientes.length;
        document.getElementById('totalCajas').textContent = this.data.cajas.length;
        document.getElementById('totalNaps').textContent = this.data.naps.length;

        if (this.data.cajas.length > 0) {
            const avgOcupacion = this.data.cajas.reduce((sum, c) => sum + (c.ocupacion || 0), 0) / this.data.cajas.length;
            document.getElementById('avgOcupacion').textContent = Math.round(avgOcupacion) + '%';
        }

        // Actualizar mapas
        mapManager.clearMarkers();
        mapManager.addClienteMarkers(this.data.clientes);
        mapManager.addCajaMarkers(this.data.cajas);

        // Actualizar gráficos
        chartManager.updateOcupacionChart(this.data.cajas);
        chartManager.updatePuertosChart(this.data.cajas);
        chartManager.updateNapsChart(this.data.naps);
        chartManager.updateDistribucionChart(this.data.cajas);
    }

    updateLastUpdate() {
        const now = new Date();
        const time = now.toLocaleTimeString('es-ES');
        document.getElementById('lastUpdate').textContent = time;
    }

    startAutoRefresh() {
        // Limpiar intervalo anterior si existe
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        const interval = configManager.config.refreshInterval * 1000;
        this.refreshInterval = setInterval(() => this.loadData(), interval);
    }
}

const app = new Dashboard();