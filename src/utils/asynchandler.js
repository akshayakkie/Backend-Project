const asyncHandler=(requesthandler)=>{
    (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>(next(err)))
    }
}


const registerUser=asyncHandler(async(req,res)=>{
    res.status(500).json({message:"User registered successfully"})
}) 

export{asyncHandler}









/*const asyncHandler=(fn)=>async(req,res,next)=>{
    try{
          await(req,res,next)
    } catch(error){
       res.status(err.code||500).json({
         success:false,
         message:err.message
       })
    }
}*/