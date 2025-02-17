function open_add_product() {
    // เปิดการแสดง div add_product_store
    $("#add_product_store").css('display', 'flex');
}
function closeadd(){
    $(".add_product_store").css('display', 'none')
}
function closeModal2(){
    $(".modal").css('display', 'none')
}

document.addEventListener("DOMContentLoaded", function () {
    let productList = [...product]; // ใช้ `product` เป็นค่าเริ่มต้น

    // ฟังก์ชันเพิ่มสินค้า
    window.addProduct = function () {
        let name = document.getElementById("productName").value.trim();
        let detail = document.getElementById("productDetail").value.trim();
        let price = document.getElementById("productPrice").value.trim();
        let image = document.getElementById("productImage").value.trim();

        if (!name || !detail || !price || !image) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
            return;
        }

        if (isNaN(price)) {
            alert("ราคาต้องเป็นตัวเลขเท่านั้น!");
            return;
        }

        let newProduct = {
            id: productList.length + 1,
            name: name,
            description: detail,
            price: parseFloat(price),
            img: image,
            sale: 0,
            type: 'other' // เพิ่ม type ให้สินค้าใหม่
        };

        productList.push(newProduct);
        product.push(newProduct); // เพิ่มลง product ด้วย

        renderProducts();

        document.getElementById("productName").value = "";
        document.getElementById("productDetail").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productImage").value = "";

        closeModal();
    };

    function renderProducts() {
        let html = "";
        productList.forEach((product, index) => {
            html += `
                <div onclick="open_detail(${index})" class="product-items ${product.type}">
                    <img class="product-img" src="${product.img}" alt="Product Image">
                    <p class="product-name">${product.name}</p>
                    <p class="product-title">${product.description}</p>
                    <div class="product-sale_price">
                        <p class="product-price">${numberWithCommas(product.price)} บาท</p>
                        <p class="product-sale">ขายแล้ว ${product.sale} ชิ้น</p>
                    </div>
                </div>
            `;
        });
        document.getElementById("productlist").innerHTML = html;
    }

    window.closeModal = function () {
        document.getElementById("add_product_store").style.display = "none";
    };

    // โหลดสินค้าเมื่อเปิดเว็บ
    renderProducts();
});

