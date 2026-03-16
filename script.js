const TOTAL_PENS = 40;

function showForm(){
  document.getElementById("form").style.display="block";
}

function generateOrderID(){
  return "ORD"+Math.floor(Math.random()*1000000);
}

function confirmOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let ref = document.getElementById("ref").value;

  if(name=="" || phone==""){
    alert("Enter Name and Phone");
    return;
  }

  db.collection("orders").get().then((snapshot)=>{
    let sold = snapshot.size;
    if(sold >= TOTAL_PENS){
      alert("Sorry! Pens are sold out");
      document.getElementById("form").style.display="none";
      document.getElementById("result").innerHTML="<h2>Sold Out</h2><p>No pens left.</p>";
      return;
    }

    let orderID = generateOrderID();

    db.collection("orders").add({
      orderID: orderID,
      name: name,
      phone: phone,
      ref: ref,
      status: "Pending Verification",
      time: Date.now()
    });

    // WhatsApp confirmation
    window.open("https://wa.me/91"+phone+"?text="+encodeURIComponent(
      "Your pen order is confirmed.\nOrder ID: "+orderID+"\nStatus: Pending Verification"
    ));

    document.getElementById("result").innerHTML="Order placed!<br>Order ID: "+orderID;
  });
}

// Live sold counter
db.collection("orders").onSnapshot((snapshot)=>{
  let sold = snapshot.size;
  document.getElementById("sold").innerText = sold;
  if(sold >= TOTAL_PENS){
    document.querySelector(".product button").disabled=true;
    document.querySelector(".product button").innerText="Sold Out";
  }
});
