class APIClient {
    async getClients() {
        try {
            const response = await fetch(
                `${configManager.config.apiUrl}/clients`,
                {
                    headers: {
                        'Authorization': `Bearer ${configManager.config.apiToken}`
                    }
                }
            );
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching clients:', error);
            return { data: [] };
        }
    }

    async getBoxes() {
        try {
            const response = await fetch(
                `${configManager.config.apiUrl}/boxes`,
                {
                    headers: {
                        'Authorization': `Bearer ${configManager.config.apiToken}`
                    }
                }
            );
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching boxes:', error);
            return { data: [] };
        }
    }

    async getNaps() {
        try {
            const response = await fetch(
                `${configManager.config.apiUrl}/naps`,
                {
                    headers: {
                        'Authorization': `Bearer ${configManager.config.apiToken}`
                    }
                }
            );
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching naps:', error);
            return { data: [] };
        }
    }
}

const apiClient = new APIClient();