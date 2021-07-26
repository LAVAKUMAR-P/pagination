let div=document.createElement("div");
div.className="pagination";
document.body.append(div);


function creattable(users){
    let div=document.createElement("div");
    div.className="user-list"
    let table=document.createElement("table");
    let tr1=document.createElement("tr");
    let thead=document.createElement("th");
    thead.innerHTML="ID";
    let thead2=document.createElement("th");
    thead2.innerHTML="NAME";
    let thead3=document.createElement("th");
    thead3.innerHTML="E-MAIL";
    tr1.append(thead,thead2,thead3);
    table.append(tr1);
    div.append(table);
    document.body.append(div);
        users.forEach(e => {
          let row=document.createElement("tr");
          row.innerHTML=`<tr><td>${e.id}</td><td>${e.name}</td><td>${e.email}</td></tr> ` ;
          table.append(row);
        });
      
    }
    let pagechange=(i,users)=>{
      const pageUsers=users.slice((i - 1) * 10, i * 10);
      document.querySelector(".user-list").remove();
      creattable(pageUsers);
    }

async function getdata(){
    const data = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    const users = await data.json();
    try{
    const pagination = document.querySelector(".pagination");
    pagination.className="pagebuttons";
    const noOfPages = Math.ceil(users.length / 10);
    localStorage.setItem("LastPage",noOfPages);
    localStorage.setItem("key",1);
    
    //home button.....................................................................................
    let home=document.createElement('button');
    home.innerText="HOME";
    home.className="pre";
    home.onclick=function (){
    let i=1;
    localStorage.setItem("key",i);
    pagechange(i,users);
    }
    pagination.append(home);

    //previous page button.............................................................................. 
    let pre=document.createElement('button');
    pre.innerText="<";
    pre.className="pre";
    pre.onclick=function (){
    let i=localStorage.getItem("key");
    if(i>1)
    {
      i=i-1;
    }
    localStorage.setItem("key",i);
    pagechange(i,users);
    }
    pagination.append(pre);

    //loop to creat 1 to nopagers buttons..................................................................
    for (let i = 1; i <= noOfPages; i++) {
      const page = document.createElement("button");
      page.innerText = i;
      // page
      page.onclick = function () {
        localStorage.setItem("key",i);
        pagechange(i,users);
      };
      pagination.append(page);
       
    }


    //forword button......................................................................................
    let forw=document.createElement('button');
    forw.innerText=">";
    forw.className="for";
    forw.onclick=function (){
    let i=localStorage.getItem("key");
    let LastPage=localStorage.getItem("LastPage");
    if(i!==LastPage)
    {
      i=parseInt(i)+1;
    }
    localStorage.setItem("key",i);
    pagechange(i,users);
    }
    pagination.append(forw);

   //End button..............................................................................................
    let end=document.createElement('button');
    end.innerText="END";
    end.className="pre";
    end.onclick=function (){
    let i=localStorage.getItem("LastPage");
    localStorage.setItem("key",i);
    pagechange(i,users);
    }
    pagination.append(end);

    const firstTenUsers=users.slice(0,10);
    creattable(firstTenUsers);
  }
  catch(err){
   alert("CHECK YOUR NETWORK CONNECTION")
  }
}

getdata();
