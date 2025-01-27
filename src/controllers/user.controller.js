import {asyncHandler} from '../utils/asyncHandler';
import {ApiError} from '../utils/apiError';
import {User} from '../models/user.model';
import {uploadcloudinary} from '../utils/cloudinary';
import {Apiresponse} from '../utils/Apiresponse';


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User registered successfully'});
});



const {fullname,email,username,password}=req.body 

if(fullname ===""){
    throw new ApiError(400,"fullname is required")

   const existedUser= User.findOne({
        $or: [{email}, {email}]
    })
    if(existingUser){
        throw new ApiError(400,"User already exists")
    }   
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLoaclPath=req.files?.cover[0]?.path;

    if(!avatarLocalPath){
       throw new ApiError(400,"avatar is required")
    }
    const avatar =await uploadcloudinary(avatarLocalPath)
    const coverImage = await uploadcloudinary(coverImageLoaclPath)

    if(!avatar || !coverImage){
        throw new ApiError(500,"Error uploading image")
    }
    const user= await User.create({
        fullname,
        avatar: avatar.url, 
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase() 
    })
    const createdUser= await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Error creating user")
    }

    return res.status(201).json(new Apiresponse(201,createdUser,"User created successfully"))
}

export {registerUser};