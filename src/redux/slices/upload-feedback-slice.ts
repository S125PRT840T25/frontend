import API_BASE_URL from '@api-paths';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UploadFileModel = {
    id?: number;
    fileName: string;
    taskId: string;
    displayText?: string;
    status?: string;
    downloadUrl?: string;
    downloadButtonText?: string;
}

interface UploadFeedbackState {
  files: Array<UploadFileModel>;
}

const initialState: UploadFeedbackState = {
  files: [],
};

const uploadFeedbackSlice = createSlice({
  name: 'uploadFeedback',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<UploadFileModel>) => {
      const newFile: UploadFileModel = {
        id: state.files.length + 1, 
        fileName: action.payload.fileName,
        taskId: action.payload.taskId,
        displayText: action.payload.displayText,
        downloadButtonText: 'Download'
      };
      state.files.push(newFile);
    },
    removeFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    setFileTaskId: (state, action: PayloadAction<{ fileId: number, taskId: string }>) => {
      const { fileId, taskId } = action.payload;
      const file = state.files.find(file => file.id === fileId);
      if (file) {
        file.taskId = taskId;
      }
    },
    setFileDisplayText: (state, action: PayloadAction<{ taskId: string, displayText: string }>) => {
      const { taskId, displayText } = action.payload;
      const file = state.files.find(file => file.taskId === taskId);
      if (file) {
        file.displayText = displayText;
      }
    },
    setDownloadReady: (state, action: PayloadAction<{ taskId: string, displayText: string, status: string, downloadUrl: string }>) => {
      const { taskId, displayText, status, downloadUrl } = action.payload;
      const file = state.files.find(file => file.taskId === taskId);
      if (file) {
        const baseUrl = API_BASE_URL.replace(/\/api$/, "");  
        file.displayText = displayText;
        file.status = status;
        file.downloadUrl = baseUrl + downloadUrl;
      }
    },
    setDownloadButtonText: (state, action: PayloadAction<{downloadUrl: string, displayText: string}>) => {      
      const file = state.files.find(file => file.downloadUrl == action.payload.downloadUrl);
      if (file) {
        file.downloadButtonText = action.payload.displayText;
      }
    },
  },
});

export const { addFile, removeFile, setFileTaskId, setFileDisplayText, setDownloadReady, setDownloadButtonText } = uploadFeedbackSlice.actions;
export default uploadFeedbackSlice.reducer;

