import api from '@api';
import { API_PATHS } from '@api-paths';
import { useMutation } from '@tanstack/react-query';

const uploadFeedback = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(API_PATHS.UPLOAD, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const useUploadFeedback = () => {
  return useMutation({ mutationFn: uploadFeedback });
};