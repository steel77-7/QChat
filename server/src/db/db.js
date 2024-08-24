import mongoose from "mongoose";

 const connectToDb = async()=>{ 
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/Qchat`)
        console.log('Connection to the Data base established');
    } catch (error) {
        console.log( 'Erorr while connecting to the data base' , error);
        process.exit(1)
    }
}

export default connectToDb


