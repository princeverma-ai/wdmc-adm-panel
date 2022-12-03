const obj = {
  Administration: [
    "ABOUT US",
    "LEADERSHIP",
    "GOVERNING BODIES",
    "CELLS",
    "COMMITTEES",
  ],
  Acadmeics: [
    "DEPARTMENTS",
    "CENTERS",
    "ACADEMIC SYSTEM",
    "ACADEMIC SERVICES",
    "ACADEMIC FACILITIES",
    "PROGRAMMES OF STUDY",
    "CONVOCATION",
    "OTHER LINKS",
  ],
  Admissions: [
    "PROSPECTIVE STUDENTS",
    "ANTI RAGGING",
    "JOIN NITJ",
    "INSTITUTE PROSPECTS",
  ],
  Research: [
    "Research @NITJ",
    "INCUBATION @NITJ",
    "CONSULTANCY @NITJ",
    "UPCOMING EVENTS",
  ],
  Alumni: [],
  LifeatNITJ: [
    "CLUB & SOCITIES",
    "SCHOLARSHIPS",
    "LEADERSHIP",
    "GOVERNING BODIES",
    "CELLS",
    "COMMITIES",
  ],
};

let url = "http://localhost:3000/navbar";

function showTable() {
  let menu= document.getElementById("menu").value;
  let submenu = document.getElementById("submenu").value;
  if(menu.value==="" || submenu.value===""){
    alert("Please select the menu and submenu");
    return;
  }

  fetch(url, {
    method: "GET",
  }).then((res) => {
    res.json().then((data) => {
      let idx = -1;


      for (let i = 0; i < data[`${menu}`].length; i++) {
        if (data[`${menu}`][i][0] === submenu) {
          idx = i;
          break;
        }
      }

      if (idx === -1) {
        alert('Please select submenu and menu');
        return;
      }

      for (let i = 2; i < data[`${menu}`][idx].length; i++) {
        let body=document.getElementById("tablebody");
        body.innerHTML="";
        let option = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");
        let col3 = document.createElement("td");

        col1.innerHTML = i-1;
        col2.innerHTML = data[`${menu}`][idx][i]["name"];
        col3.innerHTML = data[`${menu}`][idx][i]["link"];

        option.appendChild(col1);
        option.appendChild(col2);
        option.appendChild(col3);

        body.appendChild(option);
      }
    });
  });

}

function getsub() {
  let menu = document.getElementById("menu");

  let submenu = document.getElementById("submenu");
  submenu.innerHTML = "";
  let option = document.createElement("option");
  option.value = "";
  option.innerHTML = "Select the Submenu of the link";
  submenu.appendChild(option);

  if (menu.value != "") {
    let arr = obj[menu.value];
    for (var i in arr) {
      let option = document.createElement("option");
      option.value = arr[i];
      option.innerHTML = arr[i];
      submenu.appendChild(option);
    }
  }

}

function showAll() {
  let menu = document.getElementById("menu").value;
  let submenu = document.getElementById("submenu").value;
  let del = document.getElementById("del_menu");
  del.innerHTML="";

  let option = document.createElement("option");
  option.value = "";
  option.innerHTML = "Select the link to delete";

  if(menu==="" || submenu===""){
    alert("Please select the menu and submenu");
    return;
  }

  fetch(url, {
    method: "GET",
  }).then((res) => {
    res.json().then((data) => {
      let idx = -1;

      for (let i = 0; i < data[`${menu}`].length; i++) {
        if (data[`${menu}`][i][0] === submenu) {
          idx = i;
          break;
        }
      }

      if (idx === -1) {
        alert('Please select submenu and menu');
        return;
      }

      for (let i = 2; i < data[`${menu}`][idx].length; i++) {
        let option = document.createElement("option");
        option.value = data[`${menu}`][idx][i]["id"];
        option.innerHTML = data[`${menu}`][idx][i]["name"];
        del.appendChild(option);
      }
    });
  });
}

async function addLink() {
  let menu = document.getElementById("menu").value;
  let submenu = document.getElementById("submenu").value;
  let link = document.getElementById("link").value;
  let name = document.getElementById("name").value;

  if (menu === "" || submenu === "" || link === "" || name === "") {
    alert("Please fill all the fields");
    return;
  }

  let data = {
    menu: menu,
    submenu: submenu,
    link: link,
    name: name,
  };

  console.log(data);

  await fetch(url + "/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res);
  });
}

let form = document.getElementById("menuform");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addLink();
});

async function deleteLink() {
  let menu = document.getElementById("menu").value;
  let submenu = document.getElementById("submenu").value;
  let del = document.getElementById("del_menu").value;


  if (menu === "" || submenu === "" || del === "") {
    alert("Please fill all the fields");
    return;
  }

  let data = {
    menu: menu,
    submenu: submenu,
    id: del,
  };


  await fetch(url + "/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res);
  });
}

