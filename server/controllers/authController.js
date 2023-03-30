import User from '../model/user.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log(password.length, 'len');
        if (!fullname || !email || password.length < 5) {
            console.log('test');
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const newUser = new User({
            fullname,
            email,
            password: passwordHash,
        });
        const user = await newUser.save();
        
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log("User does not exist")
        if (!user) return res.status(400).json({ error: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials! Try again" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const UpdateProfile = async (req, res) => {
    try {
        console.log(req.body);
        const { fullname, email, phone, userId} = req.body;
        console.log(email);
          await User.findByIdAndUpdate({ _id: userId},{
            $set:{
              fullname:fullname,
              email:email,
              phone:phone,
            }
          });
  
          const userdb = await User.findOne({ email: email})
  
          res.status(200).send({message:"Success",status:200,user:userdb})
        } catch (err) {
          const errors = handleErrors(err);
          res.json({errors, created: false})
        }


};

export const UpdateImage=async(req,res)=>{
    try{
        console.log("image controller"+req.params.id)
        const id =req.params.id;
       await User.updateOne({_id:id},{$set:{picturePath:req.file.filename}})
     
       const userData = await User.findOne({_id:id})
        return res.json(userData) 
     
     }catch(err){
         console.log(err.message)
     }
     
}


