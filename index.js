var product = [{
    id: 1,
    img: 'https://i.pinimg.com/736x/38/52/23/385223c439a6c48e45fa6efcd0a61b1a.jpg',
    name: 'Steelseries',
    price: 3500,
    description: 'Steelseries Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iusto, recusandae similique ipsam commodi nostrum?',
    type: 'EarPhones'
}, {
    id: 2,
    img: 'https://hard-digital.com.ar/public/files/Teclado%20Mecanico%20Hyperx%20Alloy%20Origins%2060%20Negro%20Switch%20Red/3.jpg',
    name: 'HyperX Alloy Origins 60',
    price: 3500,
    description: 'HyperX Alloy Origins 60 Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt iusto, recusandae similique ipsam commodi nostrum?',
    type: 'KeyBoard'
}, {
    id: 3,
    img: 'https://m.media-amazon.com/images/I/61mSFiCPgVL._AC_SL1500_.jpg',
    name: 'Tenda',
    price: 500,
    description: 'Tenda ipsum dolor sit amet consectetur adipisicing elit. Deserunt iusto, recusandae similique ipsam commodi nostrum?',
    type: 'WifiRouter'
}, {
    id: 4,
    img: 'https://www.jib.co.th/img_master/product/original/2024102416211971543_1.jpg',
    name: 'WIRELESS MOUSE AJAZZ AJ159 APEX',
    price: 1830,
    description: 'WIRELESS MOUSE AJAZZ AJ159 APEX ipsum dolor sit amet consectetur adipisicing elit. Deserunt iusto, recusandae similique ipsam commodi nostrum?',
    type: 'Mouse'
}];

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class='product-items ${product[i].type}'>
                    <img class='product-img'
                        src="${product[i].img}" alt="">
                    <p style="font-size: 1.3rem; padding-left: 1rem;">${product[i].name}</p>
                    <p style="font-size:1rem; padding-left: 1rem;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;


    }
    $("#productlist").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    // console.log("#"+elem.id)
    var value = $("#" + elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class='product-items ${product[i].type}'>
                    <img class='product-img'
                        src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw; padding-left: 1rem;">${product[i].name}</p>
                    <p style="font-size:1vw; padding-left: 1rem;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
        }
    }
    if (html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}

function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if (param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("." + param).css('display', 'block')
    }
}
var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-dest").text(product[index].description)

}

function closeModal() {
    $(".modal").css('display', 'none')
}
var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            console.log('found same product')
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
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $('#cartcount').css('display', 'flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display', 'flex')
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-itemes">
                    <div class="cartlist-left">
                        <img src="${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">${numberWithCommas(cart[i].name)}</p>
                            <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB</p>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p onclick= "deinitems('-', ${i})"  class="btnc">-</p>
                        <p id="countitems${i}"style="margin:  0 20px;">${cart[i].count}</p>
                        <p onclick= "deinitems('+', ${i})"  class="btnc">+</p>
                    </div>
                </div>`
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action,index) {
    if(action == '-'){
        if(cart[index].count>0){
            cart[index].count--;
            $('#countitems'+index).text(cart[index].count)

            if(cart[index].count <= 0){
                Swal.fire({
                    icon:'warning',
                    title:'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtomtext: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                    if(res.isConfirmed){
                        cart.splice(index, 1)
                        console.log(cart)
                        rendercart()
                        $('#countitems'+index).text(cart[index].count)
                    }
                })
            }
        }
    }
    else if (action == '+'){
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
    }
}