import api from './index';

export const getCreators = async (filters = {}) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const response = await api.get(`/creators?${params.toString()}`);
  return response.data;
};

export const getCreatorById = async (id) => {
  const response = await api.get(`/creators/${id}`);
  return response.data;
};

export const logProfileView = async (creatorId, brandId) => {
  const response = await api.post(`/creators/${creatorId}/view`, { brandId });
  return response.data;
};

export const boostCreatorProfile = async (creatorId) => {
  const response = await api.post(`/creators/${creatorId}/boost`);
  return response.data;
};

export const getCreatorViewStats = async (creatorId) => {
  const response = await api.get(`/creators/${creatorId}/views`);
  return response.data;
};
