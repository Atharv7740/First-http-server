//Creating http server
//Using express library

const express=require('express');
const app=new express();

users=[
    {
        Name:"Atharv",
        Kidneys:[{healthy:false},{healthy:true}]
    }

]
app.use(express.json());

app.get('/',(req,res)=>{
    
    const atharvKidney=users[0].Kidneys;
    const noOfkidneys=atharvKidney.length;
    let noOfHealthyKidney=0;
    for(let i=0; i<atharvKidney.length;i++){
        if(atharvKidney[i].healthy){
            noOfHealthyKidney+=1;
        }
    }
    const noOfUnhealthyKidney=noOfkidneys-noOfHealthyKidney;
    res.json(
        {
            "Total kidneys": noOfkidneys,
            "Healthy kidneys": noOfHealthyKidney,
            "Unhealthy kidneys":noOfUnhealthyKidney
        }
    )
    

})

app.post('/',(req,res)=>{
    const healthy=req.body.healthy;
    if(healthy){
        users[0].Kidneys.push({
            healthy: true});
    }
    else{
        users[0].Kidneys.push({
            healthy : false
        })
    }
    res.json({
        mssg: "done"
    })
})


app.put('/',(req,res)=>{
    const atharvKidney=users[0].Kidneys;
    for(let i=0;i<atharvKidney.length;i++){
        if(atharvKidney[i].healthy==false){
            atharvKidney[i].healthy=true;
        }
    }
    res.json({
        mssg: "All unHealthy kidney replaced with healthy kidney"
    })

})
app.delete('/',(req,res)=>{
    const atharvKidney=users[0].Kidneys;
    const kidneyDelete=req.body.kidneyDelete;
    if(kidneyDelete){
        for(let i=atharvKidney.length-1;i>=0; i--){
            if(atharvKidney[i].healthy==true){
                atharvKidney.splice(i,1);
            }

        }
    }
    else{
        for(let i=atharvKidney.length-1;i>=0; i--){
            if(atharvKidney[i].healthy==false){
                atharvKidney.splice(i,1);
            }

        }
    
    }

    res.json({
         mssg: `Deleted ${kidneyDelete?"Healthy kidney":"Unhealthy Kidney"}`
    })



    
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
