const bikes = [
  {name:"KTM Duke 200", price:120, img:"https://images.ctfassets.net/8zlbnewncp6f/1J0jC0NYqTm1R7A3hyyqDW/522f75649a473f5b9ceaf495c6c44629/ktm-duke-200-primer-plano.png"},
  {name:"Yamaha R15", price:130, img:"https://images.ctfassets.net/8zlbnewncp6f/1XMbKZJ9TZf5Um6BCeLTDp/9dafb85fb0f653b3200424b15070af9d/Yamaha_New_R15_V4__1_.jpg"},
  {name:"Kawasaki Ninja 300", price:250, img:"https://www.kawasaki-india.com/content/dam/products/pim/studio/Resource_312822_24EX300E_319GN1DRF00D_A.jpg"},
  {name:"BMW G310RR", price:280, img:"https://motoringworld.in/wp-content/uploads/2022/08/BMW-G-310-RR-Review-web3.jpg"},
  {name:"Suzuki Gixxer SF", price:140, img:"https://cms-i.autodaily.vn/du-lieu/2023/06/11/Suzuki%20Gixxer%20SF%20250%202023%20(1).jpg"},
  {name:"RE Classic 350", price:150, img:"https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/studio-shots/new-360/commando-sand/01.png"},
  {name:"RE Meteor 350", price:170, img:"https://cdn.bikedekho.com/processedimages/royal-enfield/meteor-350/source/meteor-35068c7e581bedf0.jpg"},
  {name:"Jawa 42", price:160, img:"https://news24online.com/wp-content/uploads/2023/10/Untitled-1-14.jpg?w=1024"},
  {name:"Honda H’ness CB350", price:180, img:"https://autonexa.com/storage/photos/1/January%202025/Honda%20CB350%20H%E2%80%99ness.png"},
  {name:"Hero Xpulse 200", price:130, img:"https://imgcdn.zigwheels.ph/large/gallery/exterior/208/3331/hero-xpulse-200-4v-left-side-view-full-image-919812.jpg"},
  {name:"RE Himalayan", price:180, img:"https://www.targetmotori.com/wp-content/uploads/2022/05/royal_enfield_himalayan_2-2048x1539.jpeg"},
  {name:"Bajaj Pulsar 220", price:100, img:"https://imgd.aeplcdn.com/1280x720/n/cw/ec/142401/bajaj-pulsar-220-left-side-view0.jpeg?isig=0&wm=3&q=75"},
  {name:"TVS Apache RTR 160", price:110, img:"https://auteco.vtexassets.com/arquivos/ids/379510/moto-tvs-apache-RTR-160-4v-EDICION-ESPECIAL-2025-foto1.png?v=638751487276300000"},
  {name:"Honda Shine", price:90, img:"https://www.bikes4sale.in/pictures/default/honda-shine-125-disc-2025/honda-shine-125-disc-2025-pic-1.jpg"},
  {name:"Suzuki Access 125", price:85, img:"https://img.autocarindia.com/model/uploads/modelimages/Suzuki-Access-125-100320251038.jpg"},
  {name:"Harley Iron 883", price:500, img:"https://d2bywgumb0o70j.cloudfront.net/2023/08/23/785837fe84bfb2acf2489d42323a1616_d7f2ca6582c6e052.jpg"},
  {name:"Ducati Monster", price:600, img:"https://facts.net/wp-content/uploads/2023/10/14-intriguing-facts-about-ducati-monster-821-1696372659.jpg"},
  {name:"Kawasaki Z900", price:550, img:"https://storage.kawasaki.eu/public/kawasaki.eu/en-EU/model/24MY_Z900_SE_Performance_BK2_STU__1_.jpg"}
];
let cart = []; 
let selectedPay = '';

function saveUser() {
    const n = document.getElementById("userNameInput").value.trim();
    if(n) { sessionStorage.setItem("user", n); checkUser(); }
}

function checkUser() {
    const u = sessionStorage.getItem("user");
    if(u) {
        document.getElementById("loginOverlay").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
        document.getElementById("welcomeMsg").innerHTML = `<i class="fa fa-user-circle"></i> Welcome, ${u}`;
        renderCategories(); 
        renderProducts(allProducts); 
        updateUI();
    }
}

function renderCategories() {
    document.getElementById("catBar").innerHTML = categories.map(c => `
        <div class="cat-item" onclick="filterCat('${c.id}', '${c.name}')">
            <img src="${c.img}"><span>${c.name}</span>
        </div>`).join('');
}

function filterCat(id, name) { 
    document.getElementById("catTitle").innerText = name;
    renderProducts(id==='all' ? allProducts : allProducts.filter(p => p.cat === id)); 
}

function renderProducts(arr) {
    document.getElementById("products").innerHTML = arr.map(p => `
        <div class="product">
            <img src="${p.img}">
            <div class="p-info">
                <h4 class="p-name">${p.name}</h4>
                <b class="p-price">₹${p.price}</b>
                <button class="add-btn" onclick="addToCart(${p.id})"><i class="fa fa-plus"></i> Add to Bag</button>
            </div>
        </div>`).join('');
}

function addToCart(id) {
    const p = allProducts.find(x=>x.id===id);
    const ex = cart.find(x=>x.id===id);
    if(ex) ex.qty++; else cart.push({...p, qty:1});
    updateUI();
}

function updateUI() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById("cartCount").innerText = count;
    let t = 0;
    document.getElementById("cartItems").innerHTML = cart.map((c) => {
        t += (c.price * c.qty);
        return `<div style="display:flex; gap:12px; margin-bottom:15px; background:#f8fafc; padding:10px; border-radius:12px;">
            <img src="${c.img}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
            <div style="flex:1">
                <div style="font-size:0.8rem; font-weight:600;">${c.name}</div>
                <div style="font-size:0.75rem; color:#64748b;">₹${c.price} x ${c.qty}</div>
            </div>
            <b style="font-size:0.85rem;">₹${c.price*c.qty}</b>
        </div>`;
    }).join('');
    document.getElementById("totalPrice").innerText = t;
}

function toggleSidebar(id) { document.getElementById(id).classList.toggle("open"); }
function openCheckout() { if(cart.length>0) document.getElementById("checkoutModal").classList.remove("hidden"); }
function closeCheckout() { document.getElementById("checkoutModal").classList.add("hidden"); }

function setPay(m) {
    selectedPay = m;
    document.querySelectorAll('.pay-option').forEach(e => e.classList.remove('active'));
    document.getElementById('opt-'+m).classList.add('active');
    document.getElementById("upiBox").className = m==='upi' ? '' : 'hidden';
}

function processOrder() {
    const ph = document.getElementById("cPhone").value;
    const addr = document.getElementById("cAddr").value.trim();

    if(ph.length < 10) return alert("Please enter valid 10-digit number!");
    
    // Address Compulsory Logic
    if(addr === "") {
        alert("Delivery Address is compulsory! Please enter your details.");
        document.getElementById("cAddr").focus();
        return;
    }

    if(!selectedPay) return alert("Select payment method!");
    
    document.getElementById("checkoutForm").classList.add("hidden");
    document.getElementById("finalBill").classList.remove("hidden");
    
    document.getElementById("bId").innerText = Math.floor(Math.random()*900000);
    
    let html = ''; let tot = 0;
    cart.forEach(c => {
        tot += (c.price * c.qty);
        html += `<div class="bill-item"><span>${c.name} (x${c.qty})</span><b>₹${c.price*c.qty}</b></div>`;
    });
    document.getElementById("bItems").innerHTML = html;
    document.getElementById("bTotal").innerText = tot;
    
    cart = []; 
    updateUI();
}

function logout() { sessionStorage.clear(); location.reload(); }

window.onload = checkUser;
