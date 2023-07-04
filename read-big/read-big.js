const fs=require("node:fs/promises");

// (async()=>{

//     const fileHandleRead=await fs.open("test.txt","r");
//     const stream=fileHandleRead.createReadStream({highWaterMark:64*1024});
  
//     stream.on("data",(chunk)=>{console.log(chunk)})
// })()

(async()=>{

    const fileHandleRead=await fs.open("test.txt","r");
    const fileHandleWrite=await fs.open("dest.txt","w");

    const streamRead=fileHandleRead.createReadStream();
    const streamWrite=fileHandleWrite.createWriteStream();

    streamRead.on("data",(chunk)=>{
        streamWrite.write(chunk)

    })

})()