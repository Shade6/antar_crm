exports.create_user = async(req,res)=>{
    try {
        res.json({message:'user creation successfully',data:'vidhul'})

    } catch (error) {
        res.json({message:error.message,statusCode:500})
    }
}