let cart = [];

    const products = [
      {
        name: "Nike Kobe 6 Protro",
        price: 1999000,
        image: "image/kobeshoe.jpg"
      },
      {
        name: "Air Jordan Luka 3 PF",
        price: 3550000,
        image: "image/luka3pf.jpg"
      },
      {
        name: "Air Jordan Luka 2",
        price: 800000,
        image: "image/jordanairnikeluka2.jpg"
      },
      {
        name: "Nike Precision 7",
        price: 1500000,
        image: "image/precision7.jpg"
      }
    ];

    const productList = document.getElementById("product-list");
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Rp ${product.price.toLocaleString('id-ID')}</p>
        <button onclick="addToCart('${product.name}')">Tambah ke Keranjang</button>
      `;
      productList.appendChild(div);
    });

    function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
    cart.push(product);
    alert(`${productName} telah ditambahkan ke keranjang!`);
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString('id-ID')}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPriceElement.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const invoiceItems = document.getElementById('invoice-items');
  const invoiceTotal = document.getElementById('invoice-total');
  invoiceItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString('id-ID')}`;
    invoiceItems.appendChild(li);
    total += item.price;
  });

  invoiceTotal.textContent = `Total Pembayaran: Rp ${total.toLocaleString('id-ID')}`;

  // Simpan invoice ke localStorage
  const invoiceData = {
    items: cart,
    total: total,
    date: new Date().toLocaleString()
  };
  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
  invoices.push(invoiceData);
  localStorage.setItem('invoices', JSON.stringify(invoices));

  // Kosongkan keranjang
  cart = [];
  updateCartDisplay();
  navigateTo('invoice');
}



function navigateTo(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  if (pageId === 'keranjang') {
    updateCartDisplay();
  }
}


    function navigateTo(pageId) {
      const pages = document.querySelectorAll(".page");
      pages.forEach(page => page.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");
    }

    function showPurchaseHistory() {
  const historyList = document.getElementById('history-list');
  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
  historyList.innerHTML = '';

  invoices.forEach(invoice => {
    const li = document.createElement('li');
    li.textContent = `Tanggal: ${invoice.date} | Total: Rp ${invoice.total.toLocaleString('id-ID')}`;
    historyList.appendChild(li);
  });
}

function printInvoiceToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title / Header struk
  doc.setFontSize(18);
  doc.text("Toko Sepatu Nara", 10, 10);
  doc.setFontSize(12);
  doc.text("====================================", 10, 15);

  // Daftar Produk yang Dibeli
  const invoiceItems = document.getElementById('invoice-items');
  let yOffset = 20; // starting vertical position for items

  invoiceItems.querySelectorAll('li').forEach((li, index) => {
    doc.text(li.textContent, 10, yOffset);
    yOffset += 10;
  });

  // Total Pembayaran
  const invoiceTotal = document.getElementById('invoice-total').textContent;
  doc.text("====================================", 10, yOffset);
  yOffset += 10;
  doc.text(invoiceTotal, 10, yOffset);

  // Footer Struk
  yOffset += 10;
  doc.text("Terima kasih atas pembelian Anda!GAUSAH MBALEK MANEH", 10, yOffset);

  // Save the PDF
  doc.save('struk-nara.pdf');
}

// Fungsi Pindah Halaman
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

function daftarAkun(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simpan ke localStorage
  const akun = { username, password };
  localStorage.setItem("akun_" + username, JSON.stringify(akun));

  alert("Akun berhasil dibuat. Silakan login.");
  window.location.href = "login.html";
}

// Fungsi DAFTAR Akun
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (localStorage.getItem(username)) {
    alert('Username sudah terdaftar!');
    return;
  }

  const userData = { username: username, password: password };
  localStorage.setItem(username, JSON.stringify(userData));
  alert('Akun berhasil dibuat!');
  navigateTo('login');
}

// Fungsi LOGIN Akun
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const userData = JSON.parse(localStorage.getItem(username));
  if (!userData) {
    alert('Akun tidak ditemukan!');
    return;
  }

  if (userData.password === password) {
    alert('Login berhasil!');
    navigateTo('produk'); // Ganti ke halaman produk kamu
  } else {
    alert('Password salah!');
  }
}
 
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function gantiFoto(gambarBaru) {
    document.getElementById("fotoUtama").src = gambarBaru.src;
  }


  function prosesPembayaran() {
    const metode = document.querySelector('input[name="metode"]:checked');
    if (!metode) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }

    const metodeDipilih = metode.value;

    if (metodeDipilih === "QRIS") {
      document.getElementById("qris-info").style.display = "block";
    } else {
      document.getElementById("qris-info").style.display = "none";
    }

    alert(`Silakan lanjutkan pembayaran melalui ${metodeDipilih}.`);
    // Simpan invoice atau lanjut
    localStorage.removeItem('keranjang');
    window.location.href = "invoice.html";
  }