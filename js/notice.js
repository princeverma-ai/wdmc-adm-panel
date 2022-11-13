let addform=document.getElementById("addform");
let url="http://localhost:3000/notice/";

showNotice('del_menu');
showNotice('mnu_fr_cntnt');

addform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let title=document.getElementById("title").value;
    let desc=document.getElementById("desc").value;
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let department=document.getElementById("department").value;
    let designation=document.getElementById("designation").value;
    let image=document.getElementById("userfile").value;

    let notice={
        title,
        desc,
        sourceOfInfo:{
            name,   
            email,
            department,
            designation
        },
        image
    };

    await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(notice)
    });

    addform.reset();

})

async function showNotice(id){
    let select=document.getElementById(id);
    select.innerHTML="";

    let option=document.createElement("option");
    option.innerText="Select Notice";
    option.value="";
    select.appendChild(option);

    await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>res.json().then((data)=>{
        data.forEach((notice)=>{
            let option=document.createElement("option");
            option.innerText=notice.title;
            option.value=notice._id;
            select.appendChild(option);
        });
    }))
}

function placeNotice(){
    let select=document.getElementById("mnu_fr_cntnt").value;

    fetch(url+select,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        params:{id:select}
        
    }).then((res)=>res.json().then((data)=>{
        let title=document.getElementById("updatetitle");
        let desc=document.getElementById("updatedesc");
        let name=document.getElementById("updatename");
        let email=document.getElementById("updateemail"); 
        let department=document.getElementById("updatedepartment");
        let designation=document.getElementById("updatedesignation");
        let image=document.getElementById("updateuserfile");

        title.value=data.title;
        desc.value=data.desc;
        name.value=data.sourceOfInfo.name;
        email.value=data.sourceOfInfo.email;
        department.value=data.sourceOfInfo.department;
        designation.value=data.sourceOfInfo.designation;
        

    })).catch((err)=>{
        console.log(err);
    })
}

function updateNotice(){
    let title=document.getElementById("updatetitle").value;
    let desc=document.getElementById("updatedesc").value;
    let name=document.getElementById("updatename").value;
    let email=document.getElementById("updateemail").value; 
    let department=document.getElementById("updatedepartment").value;
    let designation=document.getElementById("updatedesignation").value;
    let image=document.getElementById("updateuserfile").value;

    let notice={
        title,
        desc,
        sourceOfInfo:{
            name,
            email,
            department,
            designation
        },
        image
    }

    fetch(url+select,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(notice)
    });
}