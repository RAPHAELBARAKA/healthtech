const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
.then(() =>{
    console.log("connected");
})
.catch(() => {
    console.log('failed');
})


const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true},

    password:{
                type:String,
                required:true},
                    
     passOtp:{ type:String

                    } ,
                    
     role: {
               type: String,
                            enum: ['user', 'admin'], // Add admin role
                            default: 'user'
                        },      
                    
})

const collection=mongoose.model("collection", newSchema)
module.exports=collection
