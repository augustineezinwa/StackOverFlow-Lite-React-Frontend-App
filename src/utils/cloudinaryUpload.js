/**
 * Compress image to WebP and upload to Cloudinary.
 * Used by PhotoUploadField and RichTextEditor inline images.
 */

export function compressToWebP(file, options = {}) {
  const maxWidth = options.maxWidth || 1600;
  const maxHeight = options.maxHeight || 1600;
  const quality = options.quality != null ? options.quality : 0.78;

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

        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Unable to optimize this image.'))),
          'image/webp',
          quality
        );
      };
      image.onerror = () => reject(new Error('Unable to read this image.'));
      image.src = fileReader.result;
    };
    fileReader.onerror = () => reject(new Error('Unable to process this file.'));
    fileReader.readAsDataURL(file);
  });
}

export function uploadToCloudinary(blob, fileName) {
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

export function compressAndUpload(file) {
  return compressToWebP(file).then(blob => uploadToCloudinary(blob, file.name));
}
