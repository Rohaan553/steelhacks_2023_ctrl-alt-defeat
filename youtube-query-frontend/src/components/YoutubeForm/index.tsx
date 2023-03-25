import React, { useState, useRef } from 'react';
import { Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import './index.css';

interface Props {}

const YoutubeForm: React.FC<Props> = () => {
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [youtubeVideo, setYoutubeVideo] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(event.target.value);
    // don't set this, sometimes user mistakenly pastes something and they are in uploading
    // setYoutubeVideo(null);
  };

  const handleYoutubeVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`event.target.files: ${event.target.files}`);
    if (event.target.files && event.target.files.length > 0) {
      setYoutubeVideo(event.target.files[0]);
      setYoutubeLink('');
    } else {
      setYoutubeVideo(null);
    }
  };

  const handleCustomFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUploadProgress(0);
      setYoutubeVideo(null);
      alert('Upload completed successfully!');
    }, 3000);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (youtubeLink || youtubeVideo) {
      handleUpload();
    } else {
      alert('Please provide a YouTube link or upload a video file.');
    }
  };

  const handleUploadProgress = (event: ProgressEvent) => {
    const progress = Math.round((event.loaded / event.total) * 100);
    setUploadProgress(progress);
  };

  return (
    <div className="upload-panel">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formYoutubeLink">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control type="text" placeholder="Enter YouTube Link" value={youtubeLink} onChange={handleYoutubeLinkChange} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formYoutubeVideo">
              <Form.Label>YouTube Video</Form.Label>
              <div className="custom-file-upload" onClick={handleCustomFileUploadClick}>
                <input type="file" accept=".mp4,.mov" onChange={handleYoutubeVideoChange} ref={fileInputRef} />
                <FaUpload />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {youtubeVideo && (
          <Row>
            <Col>
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default YoutubeForm;
