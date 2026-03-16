let refCount={};

db.collection("orders").get().then((snap)=>{
  snap.forEach((doc)=>{
    let r=doc.data().ref;
    if(r){
      refCount[r]=(refCount[r]||0)+1;
    }
  });

  let sorted=Object.entries(refCount).sort((a,b)=>b[1]-a[1]);
  let html="";
  sorted.forEach((r,i)=>{
    html+=(i+1)+". "+r[0]+" - "+r[1]+" referrals<br>";
  });
  document.getElementById("leaders").innerHTML=html;
});
