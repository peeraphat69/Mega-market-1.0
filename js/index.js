var product = [{
    id: 1,
    img: 'img/moon.jpg',
    name: 'ดวงจันทร์',
    price: 500,
    description: 'ดวงดาวขนาดจิ๋ว มีเส้นผ่าศูนญ์กลาง 50 cm.',
    type: 'toy',
    sale: '0'
},{
    id:2,
    img:'img/shoot.avif',
    name:'รองเท้าอดิดาส',
    price: 7500,
    description:'ร้องเท้าลายใหม่ออกตัววันนี้แล้ว',
    type:'shoe',
    sale: '0'
},{
    id:3,
    img:'img/labtop.jpg',
    name:'โน๊ตบุ๊ค',
    price: 145000,
    description:'โน๊ตบุ๊คส่วนตัวสำหรับใช้ทำงานทั่วไป และแล่นเกม',
    type:'electronic',
    sale: '0'
}];

// เริ่มต้น แสดงสินค้า
$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++){
        html += `<div onclick="open_detail(${i})" class="product-items ${product[i].type}">
            <img class="product-img" src="${product[i].img}" alt="" />
            <p class="product-name">${product[i].name}</p>
            <p class="product-title">${product[i].description}</p>
            <div class="product-sale_price">
              <p class="product-price">${numberWithCommas(product[i].price)} บาท</p>
              <p class="product-sale">ขายแล้ว${product[i].sale} ชิ้น</p>
            </div>
          </div>`;
    }
    $("#productlist").html(html);
})
// สิ้นสุด แสดงสินค้า

// เริ่มต้น จุดทศนิยม
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
// สิ้นสุด จุดทศนิยม

// เริ่มต้น ค้นหาสินค้า
function searchsomthing(elem){
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++){
        if( product[i].name.includes(value) ) {
            html += `<div onclick="open_detail(${i})" class="product-items ${product[i].type}">
            <img class="product-img" src="${product[i].img}" alt="" />
            <p class="product-name">${product[i].name}</p>
            <p class="product-title">${product[i].description}</p>
            <div class="product-sale_price">
              <p class="product-price">${numberWithCommas(product[i].price)} บาท</p>
              <p class="product-sale">ขายแล้ว${product[i].sale} ชิ้น</p>
            </div>
          </div>`;
        }
    }
    if(html == ''){
        $("#productlist").html('<p>ไม่พบสินค้า</p>')
    }else{
        $("#productlist").html(html);
    }
}
// สิ้นสุด ค้นหาสินค้า

// // เริ่มต้น ประเภทสินค้า
function searchproduct(param){
    console.log(param);
    $(".product-items").css('display', 'none');
    if(param == 'All'){
        $(".product-items").css('display', 'block')
    }
    else{
        $("."+param).css('display', 'block')
    }
}
// // สิ้นสุด ประเภทสินค้า

// เริ่ม แสดงตระกร้าเมื่อกด
var productindex = 0;
function open_detail(index){
    productindex = index;
    console.log(productindex)
    $("#modal_desc").css('display', 'flex')
    $("#mdd-img").attr('src',product[index].img);
    $("#mdd-name").text(product[index].name);
    $("#mdd-price").text(numberWithCommas(product[index].price +' บาท '))
    $("#mdd-desc").text(product[index].description);
}
function closeModal1(){
    $(".modal").css('display', 'none')
}
// จบ แสดงตระกร้าเมื่อกด

// เริ่ม เพิ่มของในตะกร้าและประวัติ
var cart = [];
var record = []; 

function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            cart[i].count++;
            pass = false;
        }
    }

    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        cart.push(obj);
    }

    Swal.fire({
        icon: 'success',
        title: 'เพิ่ม ' + product[productindex].name + ' ไปที่ตะกร้า!'
    });

    updateCartCount();
    rendercart();
}

// 🔥 แก้ให้เพิ่ม `sale` เฉพาะเมื่อกดปุ่มซื้อ
function buyProduct() {
    for (let i = 0; i < cart.length; i++) {
        let productID = cart[i].id;
        let productIndex = product.findIndex(p => p.id === productID);

        if (productIndex !== -1) {
            product[productIndex].sale = (parseInt(product[productIndex].sale) + cart[i].count).toString();
        }

        record.push({ ...cart[i] });
    }

    updateProductSale();
    cart = []; // เคลียร์ตะกร้า
    updateCartCount();
    rendercart();
    renderrecord();

    Swal.fire({
        icon: 'success',
        title: 'ทำการซื้อสินค้าเรียบร้อยแล้ว!'
    });

    closeModal();
}



// จบ เพิ่มของในตะกร้า


// เริ่ม เปิดตะกร้าสินค้า
function opencart(){
    $('#modalcart').css('display','flex')
    rendercart();
}
// ปิด เปิดตะกร้าสินค้า

// เริ่ม เพิ่มสินค้าไปในตะกร้า
function rendercart(){
    if(cart.length > 0){
        var html = '';
        for(var i=0; i<cart.length; i++){
            html += `<div class="cartlist-items">
            <div class="cartlist-left">
              <img src="${cart[i].img}" alt="">
              <div class="cartlist-detail">
                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} บาท</p>
              </div>
            </div>
            <div class="cartlist-right">
              <p onclick="deinitems('-',${i})" class="btnc">-</p>
              <p id="countitems${i}" style="margin: 0 10px;">${cart[i].count}</p>
              <p onclick="deinitems('+',${i})" class="btnc">+</p>
            </div>
          </div>
          `;
        }
        $("#mycart").html(html)
    }
    else{
        $("#mycart").html(`<p style="font-size: 2vw;"> ไม่มีสินค้าในตะกร้า </p><br><div id="mycart" class="cartlist">
          
        `)
    }
}
// ปิด เพิ่มสินค้าไปในตะกร้า

// เริ่ม เพิ่มและลบสินค้าในตะกร้า
function deinitems(action, index) {
    if(action == '-'){
        if(cart[index].count > 0){
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0){
                Swal.fire({
                    icon: 'warning',
                    title: 'คุณต้องการลบสินค้า?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'ลบ',
                    cancelButtonText: 'ยกเลิก'         
                }).then((res) =>{
                    if(res.isConfirmed){
                        cart.splice(index, 1);
                        rendercart();
                        renderrecord();  // 🔥 อัปเดตข้อมูลในประวัติการสั่งซื้อ
                        updateCartCount();
                    } else {
                        cart[index].count++;
                        $("#countitems"+index).text(cart[index].count);
                    }
                })
            }
        }
    } else if(action == '+'){
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count);
    }
    renderrecord();  // 🔥 อัปเดตข้อมูลในประวัติการสั่งซื้อ
    updateCartCount();
}




// เริ่ม เปิดปิดประวัติ
function openrecord(){
    $('#record').css('display','flex')
    rendercart();
}
function closereocrd(){
    $(".record").css('display', 'none')
}
// ปิด เปิดปิดประวัติ

// เปิด แสดงประวัติเมื่อกดเพิ่มสินค้า
function renderrecord(){
    if(record.length > 0){
        var html = '';
        for(var i=0; i<record.length; i++){
            html += `<div class="recordlist-items">
          <div class="record-left">
            <img src="${record[i].img}" alt="">
            <div class="recordlist-detail">
              <p style="font-size: 1.5vw;"> ${record[i].name}</p>
              <p style="font-size: 1.2vw;"> ${numberWithCommas(record[i].price * record[i].count)} บาท</p>
            </div>
          </div>
          <div class="record-right">
            <p class="right_text">จำนวน </p>
            <p style="margin: 0 10px">${record[i].count}</p>
            <p class="right_text"> ชิ้น</p>
          </div>
        </div>
          `;
        }
        $("#myrecord").html(html)
    }
    else{
        $("#myrecord").html(`<p> ไม่มีประวัติการสั่งซื้อ </p>`);
    }
}

// ปิด แสดงประวัติเมื่อกดเพิ่มสินค้าฃ

function updateCartCount() {
    let totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    if (totalCount > 0) {
        $("#cartcount").css('display', 'flex').text(totalCount);
    } else {
        $("#cartcount").css('display', 'none');
    }
}


function updateProductSale() {
    for (let i = 0; i < product.length; i++) {
        $(".product-items").eq(i).find(".product-sale").text("ขายแล้ว " + product[i].sale + " ชิ้น");
    }
}


// อัปเดตจำนวนขาย (product.sale)
// รีเฟรช UI ให้แสดงจำนวนที่ขายจริง
function buyProduct() {
    for (let i = 0; i < cart.length; i++) {
        let productID = cart[i].id;
        let productIndex = product.findIndex(p => p.id === productID);
        
        if (productIndex !== -1) {
            product[productIndex].sale = (parseInt(product[productIndex].sale) + cart[i].count).toString();
        }

        // 🔥 เพิ่มสินค้าลงใน record โดยไม่รวมกับรายการเดิม
        record.push({ ...cart[i] });
    }

    updateProductSale();
    cart = []; // เคลียร์ตะกร้า
    updateCartCount();
    rendercart();
    renderrecord(); // 🔥 อัปเดตประวัติการสั่งซื้อ

    Swal.fire({
        icon: 'success',
        title: 'ทำการซื้อสินค้าเรียบร้อยแล้ว!'
    });

    closeModal();
}
