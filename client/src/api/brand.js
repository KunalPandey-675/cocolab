import api from './index';

export const getBrandById = async (id) => {
  const response = await api.get(`/brands/${id}`);
  return response.data;
};

export const unlockCreatorContact = async (brandId, creatorId) => {
  const response = await api.post(`/brands/${brandId}/unlock/${creatorId}`);
  return response.data;
};
