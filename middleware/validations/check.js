const checkEmty = (Model)=>{
    return async (req,res,next)=>{
      const {id}=req.params;
      const model = await Model.findOne({
          where:{
              id,
          }
      })
      if(model){
          next();
      }
      else{
          res.send("Object is emty");
      }
  }
  }
  
  module.exports={
      checkEmty,
  }