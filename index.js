// implement your API here
//begin
const server=require('./data/seeds/server');

const port=5000;
server.listen(port,()=>{
    console.log(`Server listening port${port}`)
})