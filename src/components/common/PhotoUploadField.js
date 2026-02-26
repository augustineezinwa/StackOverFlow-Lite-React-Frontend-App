import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PhotoUploadField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      previewUrl: '',
      error: ''
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.compressToWebP = this.compressToWebP.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }

  compressToWebP(file) {
    const maxWidth = 1600;
    const maxHeight = 1600;
    const quality = 0.78;

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(image.width * ratio);
          canvas.height = Math.round(image.height * ratio);
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          if (!canvas.toBlob) {
            resolve(file);
            return;
          }

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Unable to optimize this image.'));
            }
          }, 'image/webp', quality);
        };

        image.onerror = () => reject(new Error('Unable to read this image.'));
        image.src = fileReader.result;
      };
      fileReader.onerror = () => reject(new Error('Unable to process this file.'));
      fileReader.readAsDataURL(file);
    });
  }

  uploadToCloudinary(blob, fileName) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return Promise.reject(new Error('Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.'));
    }

    const formattedName = (fileName || 'upload')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-');

    const uploadData = new FormData();
    uploadData.append('file', blob, `${formattedName}.webp`);
    uploadData.append('upload_preset', uploadPreset);
    uploadData.append('folder', 'stack-o-lite');

    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadData
    })
      .then(response => response.json())
      .then((data) => {
        if (!data.secure_url) {
          throw new Error('Image upload failed. Please try again.');
        }
        return data.secure_url;
      });
  }

  handleFileChange(event) {
    const { onUploadComplete } = this.props;
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    this.setState({ isUploading: true, error: '' });
    this.compressToWebP(file)
      .then(optimizedBlob => this.uploadToCloudinary(optimizedBlob, file.name))
      .then((imageUrl) => {
        this.setState({
          isUploading: false,
          previewUrl: imageUrl
        });
        onUploadComplete(imageUrl);
      })
      .catch((error) => {
        this.setState({
          isUploading: false,
          error: error.message || 'Image upload failed.'
        });
        onUploadComplete('');
      });
  }

  render() {
    const { label } = this.props;
    const { isUploading, previewUrl, error } = this.state;

    return (
      <div className="photo-upload-field">
        <label htmlFor="photoUpload" className="photo-upload-label"><b>{label}</b></label>
        <label className="photo-upload-trigger" htmlFor="photoUpload">
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            onChange={this.handleFileChange}
            className="photo-upload-input"
            disabled={isUploading}
          />
          <span className="photo-upload-button">
            {isUploading && 'Uploading…'}
            {!isUploading && previewUrl && 'Change photo'}
            {!isUploading && !previewUrl && 'Choose photo'}
          </span>
        </label>
        {!isUploading && !!previewUrl && (
          <div className="photo-upload-preview">
            <img src={previewUrl} alt="Uploaded preview" />
          </div>
        )}
        {!!error && <div className="photo-upload-error">{error}</div>}
      </div>
    );
  }
}

PhotoUploadField.propTypes = {
  onUploadComplete: PropTypes.func.isRequired,
  label: PropTypes.string
};

PhotoUploadField.defaultProps = {
  label: 'Upload photo (optional)'
};

export default PhotoUploadField;
