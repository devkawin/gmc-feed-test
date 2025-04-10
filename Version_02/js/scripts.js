var preload = true;
var xmlDoc, random, image, title, price, year, link, condition, productCount = 8, totalItems, brand, allLinks=[], filteredDataObj = {}, filteredDataArr=[];

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
  xmlhttp.open("GET", "../gmc-feed-test/data/mymoto_Gumtree_Export_260325.xml", true);
  xmlhttp.send();
}

function printXMLdata(xml) {
  xmlDoc = xml.responseXML;
  // filterBrandCondition();

  totalItems = xmlDoc.getElementsByTagName("g:brand").length;

  for(var t=0; t<totalItems; t++){
    brand = xmlDoc.getElementsByTagName("g:brand")[t].childNodes[0].nodeValue.trim();
    condition = xmlDoc.getElementsByTagName("g:condition")[t].childNodes[0].nodeValue.trim();
    image = xmlDoc.getElementsByTagName("g:image_link")[t].childNodes[0].nodeValue;
    title = xmlDoc.getElementsByTagName("g:title")[t].childNodes[0].nodeValue.split("Used ")[1];
    price = xmlDoc.getElementsByTagName("g:price")[t].childNodes[0].nodeValue.replace("AUD","");
    price = Number(price);
    price = "$"+price.toLocaleString();
    year = xmlDoc.getElementsByTagName("g:year")[t].childNodes[0].nodeValue;
    link = xmlDoc.getElementsByTagName("g:link")[t].childNodes[0].nodeValue;

    if(brand == "Toyota" && condition == "Used"){
      filteredDataArr.push({brand:brand, condition:condition, image:image, title:title, price:price, year:year, link:link});
    }
  }
  // console.log(filteredDataArr);

  random = generateRandom();
  random = random.split(',')
  // console.log(random)

  for(var k=0; k<productCount; k++){
    // console.log(filteredDataArr);
    image = filteredDataArr[random[k]].image;
    title = filteredDataArr[random[k]].title;
    price = filteredDataArr[random[k]].price;
    year = filteredDataArr[random[k]].year;
    condition = filteredDataArr[random[k]].condition;
    link = filteredDataArr[random[k]].link;

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
    var digits = [...Array(filteredDataArr.length).keys()];
    // console.log(digits)
    for (var i = digits.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, productCount).join(',');
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
