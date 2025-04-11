import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = {
    // Transaction endpoints
    async getTransactions(params = {}) {
        const response = await axios.get(`${API_BASE_URL}/transactions/`, { params });
        return response.data;
    },

    async getTransactionSummary() {
        const response = await axios.get(`${API_BASE_URL}/transactions/summary/`);
        return response.data;
    },

    // Dashboard endpoints
    async getDashboardAnalytics(startDate, endDate) {
        const params = {
            start_date: startDate,
            end_date: endDate
        };
        const response = await axios.get(`${API_BASE_URL}/dashboard/analytics/`, { params });
        return response.data;
    },

    // Helper function to format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
};

export default api; 