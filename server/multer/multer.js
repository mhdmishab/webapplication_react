import express from 'express'
import path from 'path'
import multer from 'multer'


// Configuration for Multer
export const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `imageUpload/${file.fieldname}-${Date.now()}.${ext}`);
    }
});

// Multer Filter
export const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === 'jpeg' ||
        file.mimetype.split('/')[1] === 'png' ||
        file.mimetype.split('/')[1] === 'jpg') {
        cb(null, true);
    } else {
        cb(new Error("Not a JPEG, PNG or JPG File!!"), false);
    }
};

// Create the multer instance for all three files
export const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});