import express from "express";
import {getUsers,UnblockUser,BlockUser} from '../controllers/adminController.js'

const route=express.Router();

route.get('/home',getUsers)
route.post('/blockuser/:id',BlockUser)
route.post('/unblockuser/:id',UnblockUser)

export default route;