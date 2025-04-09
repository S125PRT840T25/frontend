import { useDispatch, useSelector } from 'react-redux';
import './upload-feedback.css';
import { RootState } from '@store';
import { addFile, removeFile, setDownloadReady, setProcessProgress, UploadFileModel } from '@slices';
import { useDropzone } from 'react-dropzone';
import { useUploadFeedback } from '@api-mutations';
import { useTaskStatuses } from '@api-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export function UploadFeedback(): any {
    const dispatch = useDispatch();
    const files = useSelector((state: RootState) => state.uploadFeedbackState.files);
    const [isUploading, setIsUploading] = useState(false);
    const [showRemoveConfirmModel, setShowRemoveConfirmModel] = useState(false);
    const [removingFileId, setRemovingFileId] = useState<number | null>(null);

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

            const toastId = toast.info(`Uploading: ${(acceptedFiles.length > 0 ? acceptedFiles[0].name : '')}`, {
                position: 'bottom-right',
                autoClose: false, 
                hideProgressBar: true,
                closeOnClick: false,
                
            });
            
            uploadFeedback(file).then((data) => {
                const taskId = data.task_id;
                // After file upload, dispatch the file details to the Redux store
                const fileDetails: UploadFileModel = {fileName: file.name, taskId: taskId, displayText: (!taskId? data.error : 'Pending.')}
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

                setTimeout(() => {
                    toast.dismiss(toastId); 
                }, 3000);
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

    const handleRemoveConfirmClose = () => setShowRemoveConfirmModel(false);
    const handleRemoveConfirmShow = (fileId: any) => {
        setRemovingFileId(fileId);
        setShowRemoveConfirmModel(true)
    };

    const handleDelete = () => {
        if(removingFileId != null){
            dispatch(removeFile(removingFileId));
            setRemovingFileId(null);
        }            
        handleRemoveConfirmClose();
    };
        
    useEffect(() => {
        taskStatuses.forEach((taskQuery: any) => {
          if (taskQuery.data?.response?.status === 'Success') {
            const taskId = taskQuery.data.response?.download_url.split("/").pop(); //taskQuery.data?.task_id;
            dispatch(setDownloadReady({
              taskId: taskId,
              displayText: '',
              status: taskQuery.data.response?.status,
              downloadUrl: taskQuery.data.response?.download_url,
              currentProgress: 10,
              totalProgress: 10
            }));
          }
          else if(taskQuery.data?.response?.status === 'Processing' || taskQuery.data?.response?.status === 'Pending'){
            dispatch(setProcessProgress({
              taskId: taskQuery.data.taskId,
              displayText: taskQuery.data?.response?.status,
              status: taskQuery.data.response?.status,
              currentProgress: taskQuery.data.response?.current,
              totalProgress: taskQuery.data.response?.total
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
                    <span className='progress-container'>
                        <strong>{file.fileName}</strong> 
                        <progress className='progress-bar' hidden={file.totalProgress > 0 && file.currentProgress == file.totalProgress} value={file.currentProgress} max={file.totalProgress}></progress> 
                        <div>
                            {file.status == "Pending" && (<span className='ml-10'>({file.displayText?.trim()})</span>)} 
                            {file.totalProgress > 0 && file.currentProgress != file.totalProgress && (
                                <strong className='ml-10'>({((file.currentProgress / file.totalProgress) * 100).toFixed(0)}%)</strong>
                            )}
                        </div>
                    </span>
                    <div> 
                            <div>
                                {file.status === 'Success' && (
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => handleDownload(file.downloadUrl)}
                                    >
                                        {file.downloadButtonText}
                                    </Button>      
                                )}
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleRemoveConfirmShow(file.id)}
                                    >
                                    Remove
                                </Button>                          
                            </div>                        
                    </div>
                    </ListGroupItem>
                ))}
                </ListGroup>
            <ToastContainer />
            <Modal show={showRemoveConfirmModel} onHide={handleRemoveConfirmClose} size="sm" centered>
                <Modal.Header closeButton className="py-2">
                    <Modal.Title className="fs-6">Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body className="fs-6 text-center">Are you sure?</Modal.Body>
                <Modal.Footer className="d-flex justify-content-center py-2">
                    <Button variant="secondary" size="sm" onClick={handleRemoveConfirmClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}