// Storage config for Cloudinary / AWS S3 or Local Asset Storage
export const storageConfig = {
  provider: process.env.STORAGE_PROVIDER || 'local',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'lunawear',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: 'lunawear/products'
  },
  s3: {
    bucket: process.env.AWS_S3_BUCKET || 'lunawear-assets',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  },
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  maxFileSizeMB: 5
};
