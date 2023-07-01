const fs = require("node:fs/promises");


//takes 20 sec for i < 1000000 and takes 45 MB RAM max
(async ()=>{
    console.time("writeMany");

    const fileHandle=await fs.open("test.txt","w");

    for (let i=1;i<1000000;i++){
       await fileHandle.write(` ${i} `);
    }



    console.timeEnd("writeMany");
})()
