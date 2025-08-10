
function addToCart(id){
  let products = JSON.parse(localStorage.getItem("productsData"));
  let prod = products.find(p => p.id === id);
  if(!prod || prod.quantity <= 0) return alert("المنتج غير متاح");

  let qty = selectedQuantities[id] || 1;
  if(qty > prod.quantity) return alert("لا يوجد كمية كافية");

  // خصم الكمية من المخزون
  prod.quantity -= qty;
  localStorage.setItem("productsData", JSON.stringify(products));

  // إضافة للسلة
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.id === id);
  if(existing){
    existing.quantity += qty;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, quantity: qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("تمت الإضافة للسلة");
  displayProducts(); // تحديث حالة المنتج
}

function displayCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart");
  if(!container) return;

  if(cart.length === 0){
    container.innerHTML = "<p>السلة فارغة</p>";
    return;
  }
  container.innerHTML = "";
  cart.forEach(item => {
    container.innerHTML += `
      <div>
        <h3>${item.name}</h3>
        <p>السعر: ${item.price} جنيه</p>
        <p>الكمية: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">إزالة</button>
      </div>
      <hr>
    `;
  });
}

function removeFromCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}
