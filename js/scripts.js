var preload = true;
var xmlDoc, random, image, title, price, link, condition, allLinks=[];

var imagesLoaded = 0; const allImages = document.getElementsByTagName("img"); const totalImagesToLoad = allImages.length;

function init() {
  loadXMLDoc();
  startAd();
  if (preload) { preloadImages(); }
  else { implementEvents(); }
};

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      printXMLdata(this);
    }
  };
  xmlhttp.open("GET", "../data/mymoto_Gumtree_Export_260325.xml", true);
  xmlhttp.send();
}

function printXMLdata(xml) {
  xmlDoc = xml.responseXML;
  random = generateRandom();
  // console.log(random)
  // console.log(random.length)

  for(var k=0; k<random.length; k++){
    image = xmlDoc.getElementsByTagName("g:image_link")[random.split('')[k]].childNodes[0].nodeValue;
    title = xmlDoc.getElementsByTagName("g:title")[random.split('')[k]].childNodes[0].nodeValue;
    price = xmlDoc.getElementsByTagName("g:price")[random.split('')[k]].childNodes[0].nodeValue;
    condition = xmlDoc.getElementsByTagName("g:condition")[random.split('')[k]].childNodes[0].nodeValue;
    link = xmlDoc.getElementsByTagName("g:link")[random.split('')[k]].childNodes[0].nodeValue;

    document.getElementById("title"+[k+1]).innerHTML = title;
    document.getElementById("img"+[k+1]).src = image;
    document.getElementById("price"+[k+1]).innerHTML = price;
    document.getElementById("badge"+[k+1]).innerHTML = condition;
    // console.log(image,title,price, link);
    
  allLinks.push(link);

  document.getElementById('productclick'+[k+1]).addEventListener('click', function (e) {
    var element = e.target.id;
    element = element.slice(element.length-1, element.length)
    // console.log(element)
    window.open(allLinks[element-1], '_blank');
  });
  document.getElementById('productclick'+[k+1]).addEventListener('mouseover', function (e) {
    var element = e.target.id;
    element = element.slice(element.length-1, element.length);
    // console.log(element);
    document.getElementById("titleparent"+[element]).style.opacity = "1";
  });
  document.getElementById('productclick'+[k+1]).addEventListener('mouseout', function (e) {
    var element = e.target.id;
    element = element.slice(element.length-1, element.length);
    // console.log(element);
    document.getElementById("titleparent"+[element]).style.opacity = "0";
  });
  document.getElementById("badgeparent"+[k+1]).style.opacity = "1";
  document.getElementById("priceparent"+[k+1]).style.opacity = "1";
  }
  // console.log(allLinks)
}

function generateRandom(){
    var digits = [...Array(10).keys()];
    for (var i = digits.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, 8).join('');
}

function preloadImages() { for (var i = 0; i < allImages.length; i++) { var download = new Image(); download.onload = function () { imagesLoaded++; checkTotalImagesLoaded(); }; download.src = allImages[i].src; } };
function checkTotalImagesLoaded() { if (imagesLoaded == totalImagesToLoad) { implementEvents(); } };
function implementEvents() {
    
  document.getElementById('content').addEventListener('click', function () {
    // window.open(clickTag, '_blank');
  });
    
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader").style.animationIterationCount = 0;
};

window.addEventListener('load', init());

function startAd() {
  document.getElementById("maincontainer").style.opacity = "1";

}