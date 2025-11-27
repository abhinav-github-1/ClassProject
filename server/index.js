const express=require('express');
const app=express();
const port=4005;

//use() is used for middlewares -> 3 parameters ()
app.use(express.json());

const students=[{id:"1",name:"Ashish",class:"CSE-V-B"}]

app.get("/",(req,res)=>{
    try{
        res.json(200).json({message:"fetch all students successfully",data:students})
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch",Error: error.message})
    }
})

app.get("/:id",(req,res)=>{
    try{
        const id=req.params.id;
        const student=students.find(s=>s.id==id);
        if(!student){
            return res.status(404).json({message:"student not found"});
        }
        res.status(200).json({message:"student found",student});   
    }
    catch(error){
        res.status(500).json({message:"Failed to search student",Error: error.message})
    }
})

app.post("/add",(req,res)=>{
    try{
        const newStudent={
            id: students.length+1,
            // name: request.body.name,
            // class: req.body.class
            ...req.body,
        }
        students.push(newStudent);
        res.status(201).json({message:"student created successfully",newStudent})
    }
    catch(error){
        res.status(500).json({message:"Failed to create student",Error: error.message})
    }
})

app.put("/edit/:id",(req,res)=>{
    try{
        const id=req.params.id;
        const index=students.findIndex(s=>s.id==id);
        if(index==-1){
            return res.status(404).json({message:`${id} student not found`})
        }
        students[index]={
            ...students[index],
            ...req.body
        }
        res.status(200).json({message:`${id} id student updated`,...req.body})
    }
    catch(error){
        res.status(500).json({message:"Failed to update student",Error: error.message})
    }
})

app.delete("/delete/:id",(req,res)=>{
    try{
const id=req.params.id;
const index=students.findIndex(s=>s.id==id);
if(index==-1)
{
    return res.status(404).json({message:`${id} id student not found`});
}
students.splice(index,1);
res.status(200).json({message:`${id} id student deleted successfully`})
    }
    catch(error){
        res.status(500).json({message:"Failed to delete student",Error: error.message})
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})