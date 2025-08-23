const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Configure storage for direct upload from server to Cloudinary
const storage = new CloudinaryStorage({
cloudinary,
params: async (req, file) => ({
folder: 'portfolio_projects',
resource_type: 'image',
allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
transformation: [{ quality: 'auto', fetch_format: 'auto' }],
}),
});


const upload = multer({ storage });


module.exports = { cloudinary, upload };