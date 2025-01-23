// This file contains the class for handling errors in the API
class Apierror extends Error{
    constructor(
    statusCode,
    message='something went wrong',
    errors=[],
    stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.error=errors

        if(stack){
            this.stack=stack
    }else{
        Error.captureStackTrace(this,this.constructor)
    }
}
} 

export {Apierror}