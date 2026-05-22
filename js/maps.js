class MapManager {
    constructor() {
        this.mapClientes = null;
        this.mapCajas = null;
        this.markersClientes = [];
        this.markersCajas = [];
    }

    initMaps() {
        // Mapa de Clientes
        this.mapClientes = L.map('mapClientes').setView([10.2611, -85.5119], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19
        }).addTo(this.mapClientes);

        // Mapa de Cajas
        this.mapCajas = L.map('mapCajas').setView([10.2611, -85.5119], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19
        }).addTo(this.mapCajas);
    }

    clearMarkers() {
        this.markersClientes.forEach(m => m.remove());
        this.markersCajas.forEach(m => m.remove());
        this.markersClientes = [];
        this.markersCajas = [];
    }

    addClienteMarkers(clientes) {
        clientes.forEach(cliente => {
            if (cliente.latitude && cliente.longitude) {
                const marker = L.circleMarker(
                    [cliente.latitude, cliente.longitude],
                    {
                        radius: 6,
                        fillColor: '#3498db',
                        color: '#2980b9',
                        weight: 2,
                        opacity: 0.8,
                        fillOpacity: 0.7
                    }
                );
                marker.bindPopup(`<b>${cliente.name || 'Cliente'}</b><br>ID: ${cliente.id}`);
                marker.addTo(this.mapClientes);
                this.markersClientes.push(marker);
            }
        });
    }

    addCajaMarkers(cajas) {
        cajas.forEach(caja => {
            if (caja.latitude && caja.longitude) {
                const ocupacion = caja.ocupacion || 0;
                let color = '#27ae60'; // Verde
                if (ocupacion > 70) color = '#e74c3c'; // Rojo
                else if (ocupacion > 50) color = '#f39c12'; // Naranja

                const marker = L.circleMarker(
                    [caja.latitude, caja.longitude],
                    {
                        radius: 7,
                        fillColor: color,
                        color: '#222',
                        weight: 2,
                        opacity: 0.9,
                        fillOpacity: 0.8
                    }
                );
                marker.bindPopup(
                    `<b>${caja.name || 'Caja'}</b><br>` +
                    `Ocupación: ${ocupacion}%<br>` +
                    `ID: ${caja.id}`
                );
                marker.addTo(this.mapCajas);
                this.markersCajas.push(marker);
            }
        });
    }
}

const mapManager = new MapManager();