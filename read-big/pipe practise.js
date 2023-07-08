const fs=require("node:fs/promises");

(async()=>{

    
    const fileHandleRead=await fs.open("test2.txt","r");
    const fileHandleWrite=await fs.open("dest2.txt","w");

    const streamRead=fileHandleRead.createReadStream();
    const streamWrite=fileHandleWrite.createWriteStream();


    console.log(streamRead.readableFlowing)
    streamRead.pipe(streamWrite)

    console.log(streamRead.readableFlowing)

    streamRead.unpipe(streamWrite);

    console.log(streamRead.readableFlowing)

    streamRead.on("end",()=>{
        console.timeEnd("wtf");
    })
    
})() 