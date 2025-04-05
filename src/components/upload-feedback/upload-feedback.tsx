import { useDispatch, useSelector } from 'react-redux';
import './upload-feedback.css';
import { RootState } from '@store';
import { addFile, removeFile, setDownloadReady, UploadFileModel } from '@slices';
import { useDropzone } from 'react-dropzone';
import { useUploadFeedback } from '@api-mutations';
import { useTaskStatuses } from '@api-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export function UploadFeedback(): any {
    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.uploadFeedbackState.files);
    const [isUploading, setIsUploading] = useState(false);

    const { mutateAsync: uploadFeedback, status: uploadStatus } = useUploadFeedback();
    const taskStatuses = useTaskStatuses(files);

    const onDrop = (acceptedFiles: File[]) => {        
        if(files != null && files.length >= 5){
            toast.error("A maximum of 5 files is allowed.", {
                position: 'bottom-right',
                autoClose: 5000, 
                hideProgressBar: false,
                closeOnClick: true,
            });
            return;
        }
        
        setIsUploading(true);

        acceptedFiles.forEach(file => {
            if (file.type !== 'text/csv') {                
                toast.error("Only CSV files are allowed.", {
                    position: 'bottom-right',
                    autoClose: 5000, 
                    hideProgressBar: false,
                    closeOnClick: true,
                });
                return;
            }
            
            uploadFeedback(file).then((data) => {
                const taskId = data.task_id;
                // After file upload, dispatch the file details to the Redux store
                const fileDetails: UploadFileModel = {fileName: file.name, taskId: taskId, displayText: (!taskId? data.error : ' is processing.')}
                dispatch(addFile(fileDetails));
            }).catch((error) => {
                toast.error("Error uploading file.", {
                    position: 'bottom-right',
                    autoClose: 5000, 
                    hideProgressBar: false,
                    closeOnClick: true,
                });
            })
            .finally(() => {
                setIsUploading(false);  // End upload process
            });
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        //accept: {'text/csv': ['.csv']}, //commented to display a message to the user
        multiple: false, // Limit to one file at a time
        disabled: isUploading
    });

    const handleDownload = (downloadUrl: string) => {     
        window.open(downloadUrl, '_blank');          
    };
    
    useEffect(() => {
        taskStatuses.forEach((taskQuery) => {
          if (taskQuery.data?.status === 'Success') {
            const taskId = taskQuery.data?.task_id;
            dispatch(setDownloadReady({
              taskId: taskId,
              displayText: '',
              status: taskQuery.data?.status,
              downloadUrl: taskQuery.data?.download_url,
            }));
          }
        });
      }, [taskStatuses, dispatch]);

    return (
        <div className="upload-feedback-container">            
            <div className={`drop-zone upload-area ${isDragActive ? ' active' : ''}`} {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={faCloudArrowUp} className='upload-icon' /> 
                <p>Drag & Drop a CSV file here, or click to select</p>
            </div>
            <ListGroup>
                {files.map((file: any) => (
                    <ListGroupItem
                    key={file.id}
                    className="d-flex justify-content-between align-items-center mb-2 p-3 file-item">
                    <span>
                        <strong>{file.fileName}</strong> {file.displayText}
                    </span>
                    <div>                        
                        {file.status === 'Success' && (
                            <div>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleDownload(file.downloadUrl)}
                                >
                                    {file.downloadButtonText}
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => dispatch(removeFile(file.id))}
                                    >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                    </ListGroupItem>
                ))}
                </ListGroup>
            <ToastContainer />
        </div>
    );
}