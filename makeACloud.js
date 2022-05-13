/* settings*/ 
var makeCanvas = true;
var width = 6600;
var height = 9000;
var circleTypes = 290; // number of circle types available
var circleGap = 120;
var startX = 0;
var startY = 0;

/* make canvas */

if (makeCanvas) {
  var idmake = stringIDToTypeID( "make" );
    var desc6 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
        var desc7 = new ActionDescriptor();
        var idname = stringIDToTypeID( "name" );
        desc7.putString( idname, """circlespawn""" );
        var idartboard = stringIDToTypeID( "artboard" );
        desc7.putBoolean( idartboard, false );
        var idautoPromoteBackgroundLayer = stringIDToTypeID( "autoPromoteBackgroundLayer" );
        desc7.putBoolean( idautoPromoteBackgroundLayer, false );
        var idmode = stringIDToTypeID( "mode" );
        var idRGBColorMode = stringIDToTypeID( "RGBColorMode" );
        desc7.putClass( idmode, idRGBColorMode );
        var idwidth = stringIDToTypeID( "width" );
        var iddistanceUnit = stringIDToTypeID( "distanceUnit" );
        desc7.putUnitDouble( idwidth, iddistanceUnit, width );
        var idheight = stringIDToTypeID( "height" );
        var iddistanceUnit = stringIDToTypeID( "distanceUnit" );
        desc7.putUnitDouble( idheight, iddistanceUnit, height );
        var idresolution = stringIDToTypeID( "resolution" );
        var iddensityUnit = stringIDToTypeID( "densityUnit" );
        desc7.putUnitDouble( idresolution, iddensityUnit, 72 );
        var idpixelScaleFactor = stringIDToTypeID( "pixelScaleFactor" );
        desc7.putDouble( idpixelScaleFactor, 1.000000 );
        var idfill = stringIDToTypeID( "fill" );
        var idfill = stringIDToTypeID( "fill" );
        var idwhite = stringIDToTypeID( "white" );
        desc7.putEnumerated( idfill, idfill, idwhite );
        var iddepth = stringIDToTypeID( "depth" );
        desc7.putInteger( iddepth, 8 );
        var idprofile = stringIDToTypeID( "profile" );
        desc7.putString( idprofile, """sRGB IEC61966-2.1""" );
        var idguides = stringIDToTypeID( "guides" );
            var list2 = new ActionList();
        desc7.putList( idguides, list2 );
    var iddocument = stringIDToTypeID( "document" );
    desc6.putObject( idnew, iddocument, desc7 );
    var iddocumentID = stringIDToTypeID( "documentID" );
    desc6.putInteger( iddocumentID, 219 );
executeAction( idmake, desc6, DialogModes.NO );
}

var circles = [];

/* functions*/
var protection = 0;

function spawnCircle(horz, vert, iterations) {
  var currentHorz = horz;
  var currentVert = vert;
  var circleType;
  var currentAngle = randomAngle();

  while (circles.length < iterations) {
    
    currentAngle = randomAngle();
    currentHorz = currentHorz + randomHorz(currentAngle);
    currentVert = currentVert + randomVert(currentAngle);
    circleType = chooseCircle();

    var circle = {
      x: currentHorz,
      y: currentVert,
      whichCircle: circleType
    }
  
    if (isInsideCanvas(circle)) {
  
  var overlapping = false;
  for (var j = 0; j < circles.length; j++) {
    var other = circles[j];
    var d = dist(circle.x, circle.y, other.x, other.y);
    if (d < circleGap) {
      overlapping = true;
    }
  }
  if (!overlapping) {
    circles.push(circle);
    var idplaceEvent = stringIDToTypeID( "placeEvent" );
    var desc190 = new ActionDescriptor();
    var idID = stringIDToTypeID( "ID" );
    desc190.putInteger( idID, 2 );
    var idnull = stringIDToTypeID( "null" );
    desc190.putPath( idnull, new File(circle.whichCircle));
    var idfreeTransformCenterState = stringIDToTypeID( "freeTransformCenterState" );
    var idquadCenterState = stringIDToTypeID( "quadCenterState" );
    var idQCSAverage = stringIDToTypeID( "QCSAverage" );
    desc190.putEnumerated( idfreeTransformCenterState, idquadCenterState, idQCSAverage );
    var idoffset = stringIDToTypeID( "offset" );
        var desc191 = new ActionDescriptor();
        var idhorizontal = stringIDToTypeID( "horizontal" );
        var iddistanceUnit = stringIDToTypeID( "distanceUnit" );
        desc191.putUnitDouble( idhorizontal, iddistanceUnit, circle.x );
        var idvertical = stringIDToTypeID( "vertical" );
        var iddistanceUnit = stringIDToTypeID( "distanceUnit" );
        desc191.putUnitDouble( idvertical, iddistanceUnit, circle.y );
    var idoffset = stringIDToTypeID( "offset" );
    desc190.putObject( idoffset, idoffset, desc191 );
  executeAction( idplaceEvent, desc190, DialogModes.NO );
  } 

} else {
  if (x>(width/2-100)) {
    currentHorz = (width/2)-200;
    // currentAngle = 180;
    if (y>(height/2)-200) {
      currentVert = (height/2)-200;
      // currentAngle = 225;
    } else if (y < (0-(height/2-200))) {
      currentVert = 0-(height/2-200);
      // currentAngle = 135;
    }
  } else if (x < (0- (width/2-200) )) {
    currentHorz = (0- (width/2-200) );
    // currentAngle = 0;
    if (y>(height/2)-200) {
      currentVert = (height/2)-200; 
      // currentAngle = 315;
    } else if (y < (0-(height/2-200))) {
      currentVert = (0-(height/2-200));
      // currentAngle = 45;
    }
  } else if (y > (height/2-200)) {
    currentVert = (height/2)-200;
    // currentAngle = 270;
  } else if (y < 0- (height/2-200)) {
    currentVert = 0 - (height/2-200);
    // currentAngle = 90;
  }
  }
}
};

spawnCircle(startX, startY, iterations);
spawnCircle(0, -2000, 419);

function chooseCircle() {
  var circleNum = randomNumber(1, circleTypes).toString();
  var circleFile = /*PATH TO SOURCE FOLDER*/ + "/circlesscanned/Layer " + circleNum + ".png";
  return circleFile;
};

function dist(x1, y1, x2, y2){
  y = x2 - x1;
  x = y2 - y1;
  
  return Math.sqrt(x * x + y * y);
};

function randomAngle() {
  var angle = randomNumber(0, 359);
  return angle;
};

function randomHorz(angle) {
  var randomHorz = circleGap * Math.cos(angle * Math.PI/180);
  return randomHorz;
};

function randomVert(angle) {
  var randomVert = circleGap * Math.sin(angle * Math.PI/180);
  return randomVert;
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function isInsideCanvas(circle) {
  return !(circle.x < (0-((width/2)-100)) || circle.x > ((width/2) - 100) || circle.y < (0 - ((height/2)-100)) || circle.y > ((height/2) - 100))
};