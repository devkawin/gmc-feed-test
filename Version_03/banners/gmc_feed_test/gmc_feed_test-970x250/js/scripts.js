window.addEventListener('load', init());
var random, image, title, price, link, productCount = 8, totalItems, allLinks = [], images;

function init() {
    // images = document.getElementsByTagName("img")[0].complete;
    // console.log(images)
    fetch('../gmc_feed_test-970x250/data/mymoto_Gumtree_Export_260325.json').then(response => response.json()).then(data => {
        totalItems = data.length;

        random = generateRandom();
        random = random.split(',')
        // console.log(random)

        for (var k = 0; k < productCount; k++) {
            console.log();
            document.getElementById("title" + [k + 1]).innerHTML = data[random[k]].title;
            document.getElementById("img" + [k + 1]).src = data[random[k]].image;
            document.getElementById("img" + [k + 1]).style.opacity = "1";
            document.getElementById("img" + [k + 1]).style.transition = "0.5s linear 0.5s";
            document.getElementById("price" + [k + 1]).innerHTML = data[random[k]].price;
            document.getElementById("badge" + [k + 1]).innerHTML = "Used";

            allLinks.push(data[random[k]].link);

            document.getElementById('productclick' + [k + 1]).addEventListener('click', function(e) {
                var element = e.target.id;
                element = element.slice(element.length - 1, element.length)
                // console.log(element)
                window.open(allLinks[element - 1], '_blank');
            });
            document.getElementById('productclick' + [k + 1]).addEventListener('mouseover', function(e) {
                var element = e.target.id;
                element = element.slice(element.length - 1, element.length);
                // console.log(element);
                document.getElementById("titleparent" + [element]).style.opacity = "1";
            });
            document.getElementById('productclick' + [k + 1]).addEventListener('mouseout', function(e) {
                var element = e.target.id;
                element = element.slice(element.length - 1, element.length);
                // console.log(element);
                document.getElementById("titleparent" + [element]).style.opacity = "0";
            });
            document.getElementById("badgeparent" + [k + 1]).style.opacity = "1";
            document.getElementById("priceparent" + [k + 1]).style.opacity = "1";
        }
    }
    ).catch(error => console.error('Error loading JSON:', error));
    startAd();
}
;
function printJSONdata(data) {
// console.log(allLinks)
}

function generateRandom() {
    var digits = [...Array(totalItems).keys()];
    // console.log(digits)
    for (var i = digits.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [digits[i],digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, productCount).join(',');
}
function startAd() {

  document.getElementById('content').addEventListener('click', function() {// window.open(clickTag, '_blank');
  });
    document.getElementById("maincontainer").style.opacity = "1";
    document.getElementById("content").style.opacity = "1";
    document.getElementById("loader").style.display = "none";
    document.getElementById("loader").style.animationIterationCount = 0;
}
