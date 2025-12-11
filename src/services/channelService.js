import api from './api';

export const channelService = {
  getProjectChannels(projectId) {
    return api.get(`/projects/${projectId}/channels`);
  },

  createChannel(projectId, data) {
    // data: { type, credentials }
    return api.post(`/projects/${projectId}/channels`, data);
  },

  updateChannel(channelId, data) {
    // data: { credentials }
    return api.put(`/channels/${channelId}`, data);
  },

  deleteChannel(channelId) {
    return api.delete(`/channels/${channelId}`);
  }
};
