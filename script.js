function addToCart(id) {
  let products = JSON.parse(localStorage.getItem("productsData"));
  let prod = products.find(p => p.id === id);
  if (!prod || prod.stock <= 0) return alert("المنتج غير متاح");

  let qty = selectedQuantities[id] || 1;
  if (qty > prod.stock) return alert("لا يوجد كمية كافية");

  // خصم الكمية من المخزون
  prod.stock -= qty;
  localStorage.setItem("productsData", JSON.stringify(products));

  // إضافة للسلة
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, quantity: qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("تمت الإضافة للسلة");
  displayProducts(); // لو عندك دالة بتعرض المنتجات عشان تحدث الكميات
}

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart");
  if (!container) return;

  if (cart.length === 0) {
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

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let products = JSON.parse(localStorage.getItem("productsData")) || [];

  // ابحث عن المنتج في السلة عشان ترجع الكمية للمخزون
  let item = cart.find(i => i.id === id);
  if (!item) return;

  // ابحث عن المنتج في المنتجات وارجع الكمية
  let prod = products.find(p => p.id === id);
  if (prod) {
    prod.stock += item.quantity;
  }

  // احذف المنتج من السلة
  cart = cart.filter(i => i.id !== id);

  // حدث التخزين المحلي
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("productsData", JSON.stringify(products));

  displayCart();
  displayProducts(); // لو عندك دالة بتعرض المنتجات لتحديث الكميات
}
