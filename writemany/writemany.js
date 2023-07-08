// const fs = require("node:fs/promises");


//takes 20 sec for i < 1000000 and takes 45 MB RAM max
// (async ()=>{
//     console.time("writeMany");

//     const fileHandle=await fs.open("test.txt","w");

//     for (let i=1;i<1000000;i++){
//        await fileHandle.write(` ${i} `);
//     }



//     console.timeEnd("writeMany");
// })()



//Now we will optimise our code
// const fs=require("node:fs");//callback version
// (async()=>{

//     console.time("callback benchmark");

    
//         fs.open("test.txt","w",(err,fd)=>{

//             for(let i=1;i<=1000000;i++){

//                 const buff= Buffer.from(` ${i}`,"utf-8")

//                 fs.writeSync(fd,buff)
//             }

            

//         })
    


//     console.timeEnd("callback benchmark");

// })()
//this code with node-fs callback module with writeSync takes time = 201 ms  for i < 1000000 ms  with RAM of only 21 MB

//Same code with node-fs callback module with write takes time = 201 ms  for i < 1000000 ms  with RAM of  500 MB
//even witha async await in node-fs writeSync



//using buffer to improve performance from 22sec to 20 sec(RAm jusage is same)
// const fs=require("node:fs/promises");
// (async()=>{

//     console.time("benchmark with stream");

//     const openfile=await fs.open("test.txt","w");

    

//     for(let i=1;i<1000000;i++){

//         const buff=Buffer.from(` ${i}`,"utf-8")
//         await openfile.write(buff);

//     }


//     console.timeEnd("benchmark with stream");

// })()




//now we will use Streams+Buffer to spped the process much more faster
// const fs=require("node:fs/promises");
// (async()=>{

//     console.time("benchmark with stream");

//     const openfile=await fs.open("test.txt","w");

//     const stream=openfile.createWriteStream();


    

//     for(let i=1;i<1000000;i++){

        
//         // await openfile.write(buff);
//         stream.write(` ${i}`)

//     }


//     console.timeEnd("benchmark with stream");

// })()
//is 10 times faster with 288ms time and using a ram of 200   MB




//Now we will fix our Stream Code for less Memory Usage
// const fs=require("node:fs/promises");
// (async()=>{

//     console.time("benchmark with stream");

//     const openfile=await fs.open("test.txt","w");

//     const stream=openfile.createWriteStream();

//     console.log(stream.writableHighWaterMark);
//     console.log(stream.writableLength);

//     stream.write("heyyy");

//     console.log(stream.writableLength);


    

//     for(let i=1;i<1000000;i++){

        
//         // await openfile.write(buff);
//         stream.write(` ${i}`)

//     }


//     console.timeEnd("benchmark with stream");

// })()


// const fs=require("node:fs/promises");
// (async()=>{

//     console.time("benchmark with stream");

//     const openfile=await fs.open("test.txt","w");

//     const stream=openfile.createWriteStream();

//     //8 bits=1byte
//     //1000 bytes=1kb
//     //1000 kb=1mb

//     console.log(stream.writableLength);

//     const buff=Buffer.alloc(16383,10);
//     console.log(buff);
//     console.log(stream.write(buff));
//     console.log(stream.writableLength);

//     console.log(stream.write(Buffer.alloc(1,"a")));
//     console.log(stream.writableLength);

//     console.log(stream.write(Buffer.alloc(1,"a")));
//     console.log(stream.writableLength);

    

//     stream.on("drain",()=>{console.log("ready to drain the internal buffer");
//                            console.log(stream.write(Buffer.alloc(1,"a")))});
    
   

//     // setInterval(()=>{},1000)
    

//     console.timeEnd("benchmark with stream");

//     // openfile.close()

// })()




//now will add drain function
//this code is like the mechanism of stream
const fs=require("node:fs/promises");
(async()=>{

    console.time("benchmark with stream");

    const openfile=await fs.open("test.txt","w");

    const stream=openfile.createWriteStream();

    let i=0;

    const numberOfWrites=1000000000;

    const writeMany=()=>{
        while(i<numberOfWrites-1){
                    const buff=Buffer.from(` ${i} `,"utf-8");

                    if(i===numberOfWrites-1){
                       return stream.end(buff)
                    }

                    if(!stream.write(buff)){
                        break;
                    }

                i++;

            }
    }

    writeMany();

    stream.on("drain",()=>{writeMany();//console.log("Draining")
        })

    // setInterval(()=>{},1000)
    
    stream.on("finish",()=>{
        console.timeEnd("benchmark with stream");
        openfile.close();
    })

    stream.on("close",()=>{console.log("closed")})

    // openfile.close()

})()
