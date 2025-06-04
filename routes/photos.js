const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const Photo = require('../model/PhotoModel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photos')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/new', upload.single('photo'), async (req, res) => {
    try {
        const userId = req.body.user_id;
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'Missing user_id' });
        }
        const newPhoto = new Photo({
            user_id: userId,
            file_name: req.file.filename,
        });
        await newPhoto.save();
        res.status(200).json({ message: 'Upload success', photo: newPhoto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

router.get('/get', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Khong co userId' });
        }

        const photoListTmp = await Photo.find({ user_id: userId });

        const photoList = photoListTmp.map(photo => ({
            _id: photo._id,
            url: `http://localhost:8081/photos/${photo.file_name}`, // Đường dẫn tới file ảnh
            date_time: photo.date_time
        }));

        res.json(photoList);
    } catch (e) {
        console.log("Lỗi getPhoto: ", e);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
});


module.exports = router