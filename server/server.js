const express=require('express');
const app=express();

const PORT=4000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Working");
});

app.listen(PORT,()=>console.log("Server is Listning"));