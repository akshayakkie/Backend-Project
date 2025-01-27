import mongoose ,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from bcrypt; 

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:string,//cloudanary url
            required:true
        },
        coverImage:{
            type:string,
        },
        watchHistory:[
        {
         type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
       password:{
        type:string,
        required:[true,'password is required']
       },
       refreshToken:{
        type:string,
        
       }
    },{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(this.isModified("password")) return next();
     this.password= await bcrypt.hash(this.password,10);
     next();
})

userSchema.methods.ispasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
            id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.in.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.in.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)