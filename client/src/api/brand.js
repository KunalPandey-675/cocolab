import api from './index';

export const getBrandById = async (id) => {
  const response = await api.get(`/brands/${id}`);
  return response.data;
};

export const nlpSearchCreators = async (brandId, query) => {
  const response = await api.post(`/brands/${brandId}/nlp-search`, { query });
  return response.data;
};

export const unlockCreatorContact = async (brandId, creatorId) => {
  const response = await api.post(`/brands/${brandId}/unlock/${creatorId}`);
  return response.data;
};
