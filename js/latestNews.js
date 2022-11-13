let url = "http://localhost:3000/news/";
let newsform = document.getElementById("newsform");
let updateform=document.getElementById("updateform");

updateform.addEventListener("submit", (e) => {
    e.preventDefault();
    updateNews();
});

newsform.addEventListener("submit", (e) => {
  e.preventDefault();
  addNews();
});

showAll("del_menu");
showAll("mnu_fr_cntnt");

function addNews() {
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let designation = document.getElementById("designation").value;
  let department = document.getElementById("department").value;

  let data = {
    title: title,
    desc: desc,
    sourceOfInfo: {
      name: name,
      email: email,
      designation: designation,
      department: department,
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

    alert("News Added!!");
}

function deleteNews() {
  let del_menu = document.getElementById("del_menu").value;

  fetch(url + del_menu, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function showAll(id) {
  let select = document.getElementById(id);

  fetch(url).then((res) => {
    select.innerHTML = "";

    let option = document.createElement("option");
    option.value = "";
    option.innerHTML = "Select News";
    select.appendChild(option);
    res.json().then((data) => {
      data.forEach((news) => {
        let option = document.createElement("option");
        option.value = news._id;
        option.innerHTML = news.title;
        select.appendChild(option);
      });
    });
  });
}

function placeNews() {
  let select = document.getElementById("mnu_fr_cntnt").value;
   
  fetch(url+select, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: { id: select },
  }).then((res) => {
    res.json().then((data) => {
      document.getElementById("updatetitle").value = data.title;
      document.getElementById("updatedesc").value = data.desc;
      document.getElementById("updatename").value = data.sourceOfInfo.name;
      document.getElementById("updateemail").value = data.sourceOfInfo.email;
      document.getElementById("updatedesignation").value =
        data.sourceOfInfo.designation;
      document.getElementById("updatedepartment").value =
        data.sourceOfInfo.department;
    });
  });
}

function updateNews() {
    let title = document.getElementById("updatetitle").value;
    let desc = document.getElementById("updatedesc").value;
    
    let name = document.getElementById("updatename").value;
    let email = document.getElementById("updateemail").value;
    let designation = document.getElementById("updatedesignation").value;
    let department = document.getElementById("updatedepartment").value;
    
    let data = {
        title: title,
        desc: desc,
        sourceOfInfo: {
        name: name,
        email: email,
        designation: designation,
        department: department,
        },
    };
    
    let select = document.getElementById("mnu_fr_cntnt").value;
    
    fetch(url + select, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    alert("News Updated!!");

    document.getElementById("updatetitle").value = "";
    document.getElementById("updatedesc").value = "";
    document.getElementById("updatename").value = "";
    document.getElementById("updateemail").value = "";
    document.getElementById("updatedesignation").value = "";
    document.getElementById("updatedepartment").value = "";

}