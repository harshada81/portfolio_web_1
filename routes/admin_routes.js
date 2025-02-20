var express= require("express");
var exe = require("./db");
var router= express.Router();

router.get("/",function(req,res){
    res.render("admin/home.ejs");

});

router.get("/introduction", async function(req,res){
    var data= await exe(`SELECT * FROM introduction`);
    var obj={"intro":data[0]};
    res.render("admin/introduction.ejs",obj);

});

router.post("/save_introduction", async function(req,res){

    if(req.files)
    {
        if(req.files.user_photo)
        {
            var user_photo = new Date().getTime()+req.files.user_photo.name;
            req.files.user_photo.mv("public/"+user_photo);
            var sql=`UPDATE introduction SET user_photo='${user_photo}'WHERE intro_id=1 `;
            var data = await exe(sql);
        }
        
        if(req.files.resume)
        {
            var resume = new Date().getTime()+req.files.resume.name;
            req.files.resume.mv("public/"+resume);
            var sql=`UPDATE introduction SET resume='${resume}'
            WHERE intro_id=1`;
            var data= await exe(sql);

        }
        }




    var d= req.body;
    var sql=`UPDATE introduction SET

    user_name ='${d.user_name}',
    tag_line ='${d.tag_line}',
    user_mobile='${d.user_mobile}',
    user_email='${d.user_email}',
    linkedin_link='${d.linkedin_link}',
    instagram_link='${d.instagram_link}',
   facebook_link = '${d.facebook_link}',
    twitter_link ='${d.twitter_link}',
    about_details ='${d.about_details}'
    WHERE 
    intro_id=1
    
    `;
var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/introduction");

});






router.get("/education", async function(req,res)
{
    var data=await exe (`SELECT * FROM qualification`);
     var obj={"list":data};
   res.render("admin/education.ejs",obj);
});

router.post("/save_education", async function(req,res)
{
    var d=req.body;
    var sql=`INSERT INTO qualification(qualification_name,university, passing_year,percentage)
    VALUES('${d.qualification}','${d.university}', '${d.passing_year}',
     '${d.percentage}')`;
     var data=await exe(sql);
// res.send(data);
res.redirect("/admin/education");
});

router.get("/edit_education/:id", async function (req, res) {
    var id = req.params.id;
    var data = await exe(`SELECT * FROM qualification WHERE qualification_id = ${id}`);
    res.render("admin/edit_education.ejs", { qualification: data[0] });
  });
  
  router.post("/edit_education/:id", async function (req, res) {
    var id = req.params.id;
    var d = req.body;
    var sql = `UPDATE qualification 
               SET qualification_name = '${d.qualification}', 
                   university = '${d.university}', 
                   passing_year = '${d.passing_year}', 
                   percentage = '${d.percentage}' 
               WHERE qualification_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/education");
  });
  
  // Delete Education
  router.get("/delete_education/:id", async function (req, res) {
    var id = req.params.id;
    var sql = `DELETE FROM qualification WHERE qualification_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/education");
  });




router.get("/skills", async function(req,res)
{

    var data= await exe(`SELECT * FROM skill`)
    res.render("admin/skills.ejs",{"skills":data});

});




router.post("/save_skills", async function(req,res)
{
    var skill_image='';
    if(req.files)
        {
            if(req.files.skill_image)
            {
                var skill_image = new Date().getTime()+req.files.skill_image.name;
                req.files.skill_image.mv("public/"+skill_image);
                
            }
        
            }
            var sql=`INSERT INTO skill(skill_image,skill_title)
            VALUES('${skill_image}','${req.body.skill_title}')`;


// res.send(req.files);
var data= await exe(sql);
res.redirect("/admin/skills");
});


// Edit Skill
router.get("/edit_skill/:id", async function (req, res) {
    var id = req.params.id;
    var data = await exe(`SELECT * FROM skill WHERE skill_id = ${id}`);
    res.render("admin/edit_skill.ejs", { skill: data[0] });
});

router.post("/edit_skill/:id", async function (req, res) {
    var id = req.params.id;
    var d = req.body;

    var skill_image = d.existing_skill_image;
    if (req.files && req.files.skill_image) {
        skill_image = new Date().getTime() + req.files.skill_image.name;
        req.files.skill_image.mv("public/" + skill_image);
    }

    var sql = `UPDATE skill 
               SET skill_image = '${skill_image}', 
                   skill_title = '${d.skill_title}' 
               WHERE skill_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/skills");
});

// Delete Skill
router.get("/delete_skill/:id", async function (req, res) {
    var id = req.params.id;
    var sql = `DELETE FROM skill WHERE skill_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/skills");
});














router.get("/projects", async function(req,res){
    var data= await exe(`SELECT * FROM projects`);
    res.render("admin/projects.ejs",{"projects":data});

});

router.post("/save_projects", async function(req,res){

    var project_photo='';
    if(req.files)
        {
            if(req.files.project_photo)
            {
                var project_photo = new Date().getTime()+req.files.project_photo.name;
                req.files.project_photo.mv("public/"+project_photo);
                
            }
        
           }
            // var d=req.body;
            var sql=`INSERT INTO projects(project_photo,project_title)
            VALUES('${project_photo}','${req.body.project_title}')`;
        

// res.send(req.files);
var data= await exe(sql);
res.redirect("/admin/projects");
        });
        // Edit Project
router.get("/edit_project/:id", async function (req, res) {
    var id = req.params.id;
    var data = await exe(`SELECT * FROM projects WHERE project_id = ${id}`);
    res.render("admin/edit_project.ejs", { project: data[0] });
});

router.post("/edit_project/:id", async function (req, res) {
    var id = req.params.id;
    var d = req.body;

    var project_photo = d.existing_project_photo;
    if (req.files && req.files.project_photo) {
        project_photo = new Date().getTime() + req.files.project_photo.name;
        req.files.project_photo.mv("public/" + project_photo);
    }

    var sql = `UPDATE projects 
               SET project_photo = '${project_photo}', 
                   project_title = '${d.project_title}', 
                   project_details = '${d.project_details}', 
                   github_link = '${d.github_link}' 
               WHERE project_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/projects");
});

// Delete Project
router.get("/delete_project/:id", async function (req, res) {
    var id = req.params.id;
    var sql = `DELETE FROM projects WHERE project_id = ${id}`;
    await exe(sql);
    res.redirect("/admin/projects");
});




    



module.exports=router;










// CREATE TABLE introduction(
//     intro_id INT PRIMARY KEY AUTO_INCREMENT,
//     user_name VARCHAR(100),
//     tag_line VARCHAR(200),
//     user_mobile VARCHAR(10),
//     user_email VARCHAR(100),
//     linkedin_link VARCHAR(200),
//     instagram_link VARCHAR(200),
//     facebook_link VARCHAR(200),
//     twitter_link VARCHAR(200),
//     about_details TEXT,
//     user_photo TEXT,
//     resume TEXT

// )




// CREATE TABLE qualification(
//     qualification_id INT PRIMARY KEY AUTO_INCREMENT,
//     qualification_name VARCHAR (100),
//     university  VARCHAR (100), 
//     passing_year  INT,
//     percentage    VARCHAR (100)

// )

// CREATE TABLE skill (skill_id INT PRIMARY KEY AUTO_INCREMENT,
//     skill_image Text,
//     skill_title VARCHAR(200)
// )

// CREATE TABLE projects(
//     project_id INT PRIMARY KEY AUTO_INCREMENT,
//     project_photo Text,
//     project_title VARCHAR(200),
//     project_details VARCHAR(200),
//     github_link VARCHAR(200)


// )