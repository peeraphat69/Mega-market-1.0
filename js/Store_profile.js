var product = [{
    id: 1,
    img: 'img/moon.jpg',
    name: 'ดวงจันทร์',
    price: 500,
    description: 'ดวงดาวขนาดจิ๋ว มีเส้นผ่าศูนญ์กลาง 50 cm.',
    type: 'toy',
    sale: '5.4k'
},{
    id:2,
    img:'img/shoot.avif',
    name:'รองเท้าอดิดาส',
    price: 7500,
    description:'ร้องเท้าลายใหม่ออกตัววันนี้แล้ว',
    type:'shoe',
    sale: '1.54k'
},{
    id:3,
    img:'img/labtop.jpg',
    name:'โน๊ตบุ๊ค',
    price: 145000,
    description:'โน๊ตบุ๊คส่วนตัวสำหรับใช้ทำงานทั่วไป และแล่นเกม',
    type:'electronic',
    sale: '12'
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