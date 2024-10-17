const balance = document.querySelector("#balance")
const income_amount = document.querySelector("#inc-amt")
const expense_amount = document.querySelector("#exp-amt")
const description = document.querySelector("#desc")
const amount = document.querySelector("#amount")
const form = document.querySelector("#form")
const trans = document.querySelector("#trans")


// const dummyData = [
//     { id: 1, description: "Tea", amount: -30 },
//     { id: 2, description: "Petrol", amount: -200 },
//     { id: 3, description: "Recharge", amount: -999 },
//     { id: 4, description: "food", amount: -200 },
//     { id: 5, description: "Salary", amount: 30000 },

// ];

// let transaction = dummyData;

const localstoragetrans=JSON.parse(localStorage.getItem("getting"))
let transaction =localStorage.getItem("getting")!==null ? localstoragetrans :[];

function loadTransaction(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML = `
    ${transaction.description}
     <span>${sign} ${Math.abs(transaction.amount)}</span>
     <button class="btn-del" onclick="removetrans(${transaction.id})">X</button>

    ` ;


    trans.appendChild(item)
}
function removetrans(id) {
    if (confirm("If you want to delete this transaction")) {
        transaction = transaction.filter((transaction) =>
            transaction.id != id);
        config();
        updatelocalstorage()
    } else {
        return;
    }
}

function updateamount(){
  const amounts=transaction.map((transaction)=>transaction.amount)
  const total=amounts.reduce((acc,item)=>(acc +=item),0).toFixed(2)
  balance.innerHTML=`₹ ${total}`
  const income=amounts.filter((item) =>item >0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
  income_amount.innerHTML=`₹ ${income}`
  const expence=amounts.filter((item) =>item <0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
  expense_amount.innerHTML=`₹ ${expence}`;
};


function config() {
    trans.innerHTML = ""
    transaction.forEach(loadTransaction);
updateamount();
}

function addtransaction(e){
    e.preventDefault()
  if(description.value.trim()==""||amount.value.trim()==""){
    alert("plese enter properly");
  }
  else{
    let transactions={
        id:uniqueID(),
        description:description.value,
        amount:+amount.value
    };
    transaction.push(transactions)
    loadTransaction(transactions)
    description.value="";
    amount.value="";
    updateamount();
    updatelocalstorage();
  }
  
}

function uniqueID(){
    return Math.floor(Math.random()*1000000000)
}

form.addEventListener("submit",addtransaction)

window.addEventListener("load", function () {
    config()
});

function updatelocalstorage(){
    localStorage.setItem("getting",JSON.stringify(transaction));
}