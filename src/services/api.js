// API Service for MindGate Backend Integration

const API_BASE_URL = 'http://localhost:5000/api';

class MindGateAPI {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Make authenticated request
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData
    });
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    this.setToken(data.token);
    return data;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async getProfessionals() {
    return this.request('/auth/professionals');
  }

  // AI Chat endpoints
  async createAIChatSession(professionalId) {
    return this.request('/ai-chat/session', {
      method: 'POST',
      body: { professionalId }
    });
  }

  async sendAIMessage(conversationId, content, messageType = 'text') {
    return this.request('/ai-chat/message', {
      method: 'POST',
      body: { conversationId, content, messageType }
    });
  }

  async getAIChatHistory(conversationId) {
    return this.request(`/ai-chat/history/${conversationId}`);
  }

  async endAIChatSession(conversationId) {
    return this.request(`/ai-chat/end/${conversationId}`, {
      method: 'POST'
    });
  }

  async getAIChatSessions() {
    return this.request('/ai-chat/sessions');
  }

  // Community Chat endpoints
  async createStreamSession(title, maxParticipants = 1000) {
    return this.request('/community/session', {
      method: 'POST',
      body: { title, maxParticipants }
    });
  }

  async joinStreamSession(sessionId) {
    return this.request(`/community/join/${sessionId}`, {
      method: 'POST'
    });
  }

  async sendCommunityMessage(sessionId, content) {
    return this.request('/community/message', {
      method: 'POST',
      body: { sessionId, content }
    });
  }

  async getCommunityMessages(sessionId, limit = 100) {
    return this.request(`/community/messages/${sessionId}?limit=${limit}`);
  }

  async endStreamSession(sessionId) {
    return this.request(`/community/end/${sessionId}`, {
      method: 'POST'
    });
  }

  async getActiveStreamSessions() {
    return this.request('/community/active-sessions');
  }

  async getStreamSessionInfo(sessionId) {
    return this.request(`/community/session/${sessionId}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
const api = new MindGateAPI();
export default api;