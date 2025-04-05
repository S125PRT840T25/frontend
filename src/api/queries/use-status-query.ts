import api from '@api';
import { API_PATHS } from '@api-paths';
import { UploadFileModel } from '@slices';
import { useQueries, useQuery } from '@tanstack/react-query';

const fetchTaskStatus = async (taskId: string) => {
  const response = await api.get(`${API_PATHS.GET_STATUS}${taskId}`);
  return response.data;
};

export const useTaskStatuses = (files: UploadFileModel[]) => {
  return useQueries({
    queries: files.map((file) => ({
      queryKey: ['taskStatus', file.taskId],
      queryFn: () => fetchTaskStatus(file.taskId),
      enabled: (!!file.taskId && file.status != 'Success'),
      refetchInterval: (data: any) => (data?.state?.data?.status === 'Pending' ? 3000 : false),
    })),
  });
};