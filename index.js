// implement your API here
//begin
const server=require('./data/seeds/server');

const PORT= process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`Server listening port${PORT}`)
})