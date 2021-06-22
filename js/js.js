

$('.brush').bind('click',()=>{
  if($('.map').css("pointer-events")==('none')){
    $('.map').css("pointer-events","auto")
    // $('.brush').css('display',"none")
   
 
  
  }else{
    $('.map').css("pointer-events","none")



  }
})
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map-google"), {
    center: { lat: 35.8283991, lng: 10.583035 },
    zoom: 13,
  });
//add element to clickable layer 



  $(function() {

    var mouseIsDown = false;
    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');

    var stab = Number($('.color-picker').height());
    
    $('#map').css('top', stab);

    $(resizeCanvas());

    ctx.fillStyle = "blue";
    ctx.globalAlpha = 10;
    ctx.globalCompositeOperation = "xor";

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - stab;
    }

    if (!localStorage.getItem('session')) {
        var session = {
        'points': [],
        'state': true,
        'item': 0
        };
    } else {
        session = JSON.parse(localStorage.getItem('session'));
        unwrap(session);
    }
    var i = session.item;
var previous_session={}





function latLng2Point(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}
    function point2LatLng(map,point) {
        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
        
        return map.getProjection().fromPointToLatLng(worldPoint);
      }
    $('.map').bind('mousedown', function() {
        mouseIsDown = true;
        
    });
    $('.map').bind('mousemove', function(e) {
        if (!mouseIsDown) return;
        var offsetX = $(this).offset().left;
        var offsetY = $(this).offset().top;
        var x = e.pageX - offsetX;
        var y = e.pageY - offsetY;
        

        var point=[]
        point.x=x
        point.y=y
        pointMarker=point2LatLng(map,point)
       
        

        
        session.item = i;
        session.points.push({'color': ctx.fillStyle, 'x': pointMarker.lat(), 'y': pointMarker.lng()});
        i++;

        draw(ctx.fillStyle, x, y);

    });
    $('.map').bind('mouseup', function(e) {
        mouseIsDown = false;
        //localStorage.setItem('session', JSON.stringify(session));
        console.log(session);
        $.ajax({
          url:"http://maps.navi.tn:8000/",
          type:"POST",
  
          data:{
           session:JSON.stringify(session)
          },
          success:function(response) {
            console.log(response);
         },
         error:function(){
          alert("error");
         }
  
        });

    });
    $('.color-picker div').bind('click', function() {
        ctx.fillStyle = $(this).data('color');
        $('.color-picker div').removeClass('active');
        $(this).addClass('active');
    });

    function unwrap(session) {
        session.points.forEach(function(a) {
            draw(a.color, Number(a.x), Number(a.y));
        });
    }

    function draw(color, x, y) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2*Math.PI);
        ctx.fill();
    }
    
}); 


}

