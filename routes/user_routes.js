var express= require("express");
var exe=require("./db");
var mail=require("./send_mail");
var router = express.Router();


router.get("/", async function(req,res)
{
    var intro=await exe(`SELECT * FROM introduction`);
    var edu=await exe(`SELECT * FROM qualification`);
    var skills=await exe(`SELECT * FROM skill`);
    var projects=await exe(`SELECT * FROM projects`);

    var obj={"intro":intro[0],"edu":edu,"skills":skills,"projects":projects};

    res.render("user/home.ejs",obj);

});

router.post("/save_contact_details",async function(req,res) 
{
    var d=req.body;
   var str=`
    <h1>Portfolio Update <br></h1>
    Name:${d.name}<br>
    Email:${d.email}<br>
    Message:<i>${d.message}<i><br>
         
    `;
    var data= await mail(str);
    
res.send(req.body);



    
});


module.exports=router;