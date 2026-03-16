db.collection("orders").get().then((snap)=>{
  snap.forEach((doc)=>{
    let data=doc.data();
    let table=document.getElementById("table");
    let row=table.insertRow();
    row.insertCell(0).innerText=data.orderID;
    row.insertCell(1).innerText=data.name;
    row.insertCell(2).innerText=data.phone;
    row.insertCell(3).innerText=data.ref;
    row.insertCell(4).innerText=data.status;
  });
});

function downloadExcel(){
  let csv="OrderID,Name,Phone,Referral,Status\n";
  db.collection("orders").get().then((snap)=>{
    snap.forEach((doc)=>{
      let d=doc.data();
      csv+=d.orderID+","+d.name+","+d.phone+","+d.ref+","+d.status+"\n";
    });
    let blob=new Blob([csv]);
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="orders.csv";
    a.click();
  });
}
