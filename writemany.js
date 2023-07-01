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
const fs=require("node:fs/promises");
(async()=>{

    console.time("benchmark with stream");

    const openfile=await fs.open("test.txt","w");

    const stream=openfile.createWriteStream();


    

    for(let i=1;i<1000000;i++){

        
        // await openfile.write(buff);
        stream.write(` ${i}`)

    }


    console.timeEnd("benchmark with stream");

})()
//is 10 times faster with 288ms time and using a ram of 200   MB