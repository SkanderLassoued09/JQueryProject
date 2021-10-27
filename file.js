
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'wCustomized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'blue.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'bCustomized.jpg' 
            
        }
    }
}

$(function(){
        var searchParams = {
    quantity: '',
    quality: '',
    color: '',
    style: '',
}
function update(){
    searchParams.quantity = parseInt( $('#quantity').val());
    searchParams.quality = $('#quality-of-fabric .quality-one.selected').attr('id');
    searchParams.color = $('#color .color-one.selected').attr('id');
    searchParams.style = $('#style').val();
    updateOrder();

}

function updateOrder(){
    var qualityId = '#' + searchParams.quality;
    var colorId = '#' + searchParams.color;
    var styleSelector = '#style option[value = ' + searchParams.style + ']';
    var totalOrder = calculate()
    
    $('#result-product').html();
    $('#result-color').html($(colorId).text());
    $('#result-quantity').html(searchParams.quantity);
    $('#result-quality').html($(qualityId).text());
    $('#result-style').html($(styleSelector).text());
    $('#result-total').html(totalOrder);
    var photoURL = "images/" + products[searchParams.color][searchParams.style].photo;
    $('#imageProduct').attr('src',photoURL)
    
   
    
}

function calculate(){
var unitPrice = products[searchParams.color][searchParams.style].unit_price;
if(searchParams.quality == 'high'){
    unitPrice *= 1.12;
}
// quantity is a string cuz it comes from an input so we had better to change it to a number using parsInt
var price = unitPrice * searchParams.quantity;

if(searchParams.quantity >= 1000){
   price *= 0.8 ;

} else if(searchParams.quantity >= 500){
    price *= 0.88;

} else if (searchParams.quantity >= 100){
    price *= 0.95;
}
return price;
} 
update()

$('#quantity').change(function(){
    searchParams.quality = parseInt($('#quantity').val());
    updateOrder();
})

$('#style').change(function(){
    searchParams.style = $('#style').val();
    updateOrder();
})


$('.color-one').click(function(){
   var clickedColor = $(this).parent().attr('id');
   var childSelector = '#' + clickedColor + ' .color-one'
   $(childSelector).removeClass('selected')
   $(this).addClass('selected')
   var selectedColor = '#' + clickedColor + ' .color-one.selected'
   searchParams[clickedColor] = $(selectedColor).attr('id');
   updateOrder()
})

$('.quality-one').click(function(){
    var clickedQuality = $(this).parent().attr('id');
    var childQuality = '#' + clickedQuality + ' .quality-one';
    $(childQuality).removeClass('selected');
    $(this).addClass('selected')
      var selectedQuality = '#' + clickedQuality + ' .quality-one.selected'
   searchParams[clickedQuality] = $(selectedQuality).attr('id');
   updateOrder()
})

})






