import mongoose from "mongoose";

async function main(){
    mongoose.connect('mongodb://localhost:27017/dbuser')
    console.log("Conectou ao MongoDB com mongoose")
}

try{
    main();
}catch(error){
    console.log("Aconteceu o seguinte erro ao tentar conectar ao Banco de Dados: => " + error)
}

export default mongoose;
