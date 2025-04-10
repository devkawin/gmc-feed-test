var version = 0;
var si = 0;

window.addEventListener("load", ready);

function ready() {
    document.querySelector("#dropdown").addEventListener("change", removeclass);
    setversion();
    //console.log(version);
    document.querySelector(".title").innerHTML = settings[version].title;
    document.title = settings[version].title;
    var sizes = settings[version].sizes.split(",");
    for (var i = 0; i < sizes.length; i++) {
        createbanners("mainbannerarea", "mainbannercontainer" + (i + 1), sizes[i]);
        createbanners("mainbannercontainer" + (i + 1), "bannerheader" + (i + 1));
        createbanners("bannerheader" + (i + 1), "labelcontainer" + (i + 1));
        createbanners("labelcontainer" + (i + 1), "label" + (i + 1), sizes[i]);
        createbanners("bannerheader" + (i + 1), "refreshcontainer" + (i + 1));
        createbanners("refreshcontainer" + (i + 1), "refresh" + (i + 1));
        createbanners("bannerheader" + (i + 1), "openlinkcontainer" + (i + 1));
        createbanners("openlinkcontainer" + (i + 1), "openlink" + (i + 1));
        createbanners("bannerheader" + (i + 1), "qrcodecontainer" + (i + 1));
        createbanners("qrcodecontainer" + (i + 1), "qrcode" + (i + 1));
        createbanners("bannerheader" + (i + 1), "backupcontainer" + (i + 1));
        createbanners("backupcontainer" + (i + 1), "backup" + (i + 1));
        createbanners("bannerheader" + (i + 1), "previewcontainer" + (i + 1));
        createbanners("previewcontainer" + (i + 1), "preview" + (i + 1));
        createbanners("bannerheader" + (i + 1), "downloadcontainer" + (i + 1));
        createbanners("downloadcontainer" + (i + 1), "download" + (i + 1));
        createbanners("mainbannercontainer" + (i + 1), "bannercontainer" + (i + 1), sizes[i]);
        createbanners("bannercontainer" + (i + 1), "banners" + (i + 1), sizes[i]);

        document.querySelector("#refreshcontainer" + (i + 1)).addEventListener("click", reloadbanner);
        document.querySelector("#downloadcontainer" + (i + 1)).addEventListener("click", downloadbanner);
        document.querySelector("#qrcodecontainer" + (i + 1)).addEventListener("click", qrcodescan);
        document.querySelector("#backupcontainer" + (i + 1)).addEventListener("click", showbackup);
        document.querySelector("#openlinkcontainer" + (i + 1)).addEventListener("click", openlink);
        document.querySelector("#previewcontainer" + (i + 1)).addEventListener("click", preview);

        setfilter(i, sizes[i].trim());

        document.querySelector("#check" + (i + 1)).addEventListener("click", filterbanners);

    }

    setbnrheaderWidth();

}

function removeclass() {

    version = document.querySelector("#dropdown").selectedIndex;
    si = version;
    //console.log(version);
    var len = document.querySelectorAll(".checks").length;
    for (var i = 0; i < len; i++) {
        var elecheck = document.querySelector("#check" + (i + 1));
        elecheck.parentElement.removeChild(elecheck);
        var elelabel = document.querySelector("label");
        elelabel.parentElement.removeChild(elelabel);
        var elebancontainers = document.querySelector("#mainbannercontainer" + (i + 1));
        elebancontainers.parentElement.removeChild(elebancontainers);
    }

    var len2 = document.querySelector("#dropdown").length;
    for (var i = 0; i < len2; i++) {
        var eledropdown = document.querySelector("#dropdown" + (i + 1));
        eledropdown.parentElement.removeChild(eledropdown);
    }

    ready();

}

function setversion() {
    //console.log(si);
    for (var i = 0; i < settings.length; i++) {
        var ver = document.createElement("option");
        ver.setAttribute("value", settings[i].title);
        ver.setAttribute("id", "dropdown" + (i + 1));
        document.querySelector("#dropdown").appendChild(ver);

        document.querySelector("#dropdown" + (i + 1)).innerHTML = settings[i].title;
    }
    document.querySelector("#dropdown" + (si + 1)).selected = true;
}

var features = {
    class: ["refresh", "openlink", "qrcode", "backup", "preview", "download"],
    icon: ["refresh", "up-right-from-square", "qrcode", "image", "eye", "download"],
    title: ["Reload banner", "Open in new tab", "Scan QR code to view on mobile", "Backup image", "Preview on page", "Download banner"]
};

function createbanners(p, c, s) {

    //console.log(p, c, s);
    if (c.search("banners") != 0) {
        var ele = document.createElement("div");
    } else {
        var ele = document.createElement("iframe");
        ele.setAttribute("src", "banners/" + settings[version].folder + "/" + settings[version].folder + "-" + s.trim() + "/index.html");
        ele.setAttribute("scrolling", "no");
    }

    //console.log(p, c);
    ele.setAttribute("id", c);
    if (c.search("bannercontainer") == 0) {
        ele.setAttribute("class", c.slice(0, c.length - 1) + " hcenter position");
    } else {
        ele.setAttribute("class", c.slice(0, c.length - 1) + " position");
    }

    var ic = c.slice(0, c.length - 1)
    for (var i = 0; i < features.class.length; i++) {
        if (ic == features.class[i]) {
            var ele = document.createElement("i");
            ele.setAttribute("id", c);
            ele.setAttribute("class", c.slice(0, c.length - 1) + " allcenter position fas fa-" + features.icon[i]);
            //console.log( ele, c);
            ele.setAttribute("title", features.title[i]);
        }
    }

    document.querySelector("#" + p).appendChild(ele);
    var label = ele.className.split(" ")[0];
    if (label == "label") {
        //console.log(label);

        if (s) {
            document.querySelector("#" + c).innerHTML = s + " | Custom";
            for (var i = 0; i < Object.keys(sizeterms).length; i++) {
                //console.log(s);
                //console.log(sizeterms["_" + s]);
                if (Object.keys(sizeterms)[i] == "_" + s.split("-")[0].trim()) {
                    var ss = s + " | " + sizeterms["_" + s.split("-")[0].trim()];
                    document.querySelector("#" + c).innerHTML = ss;
                }
            }

        }
    }

    if (s) {
        var ss = s.split("-")[0].trim();
        var sizeW = ss.split("x")[0].trim();
        var sizeH = ss.split("x")[1].trim();
        /*if (sizeH == sizeH+"-alt") {
        console.log(sizeH);
            document.querySelector(".labelcontainer").style.width = "230px";
        }*/
        //console.log(sizeW, sizeH, c);

        document.querySelector("#" + c).style.width = sizeW + "px";
        document.querySelector("#" + c).style.height = sizeH + "px";

        var label = ele.className.split(" ")[0];
        if (label == "label") {
            document.querySelector("#" + c).style.width = "";
            document.querySelector("#" + c).style.height = "";
            document.querySelector("#" + c).setAttribute("class", "label allcenter");

        }

    }

}

function setbnrheaderWidth() {
    if (settings[version].sizes) {
        for (var i = 0; i < settings[version].sizes.split(",").length; i++) {
            var bnrwdth = document.querySelector("#mainbannercontainer" + (i + 1)).style.width;
            if (bnrwdth.split("px")[0] <= 200) {
                //console.log(bnrwdth.split("px")[0]);
                document.querySelector("#bannerheader" + (i + 1)).style.width = "200px";
            }
        }

    }
}

function reloadbanner(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)

    document.querySelector("#banners" + id).src = "";
    var sizes = settings[version].sizes.split(",");
    //console.log(sizes)
    setTimeout(function() {
        document.querySelector("#banners" + id).src = "banners/" + settings[version].folder + "/" + settings[version].folder + "-" + sizes[id - 1].trim() + "/index.html";
    }, 100);
}

function downloadbanner(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)

    var sizes = settings[version].sizes.split(",");
    var zip = "banners/" + settings[version].folder + "/" + settings[version].folder + "-" + sizes[id - 1].trim() + ".zip";
    //var backup = "banners/" + settings[version].folder + "/" + settings[version].folder + "-" + sizes[id - 1].trim() + ".jpg";
    window.open(zip, "_blank");
    //window.open(backup, "_blank");

}

function qrcodescan(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)

    var data = document.querySelector("#banners" + id).src;
    var url = "https://api.qrserver.com/v1/create-qr-code/?data=" + data + "&bgcolor=#000000";
    document.querySelector(".qrcodeclose").style.left = "288px";
    document.querySelector(".qrcodearea").style.display = "block";
    document.querySelector(".qrcodeimg").src = url;

}

function closeqrcode() {
    document.querySelector(".qrcodearea").style.display = "none";
    document.querySelector(".qrcodeclose").style.top = "";
    document.querySelector(".qrcodeimg").style.top = "";
}

function showbackup(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)

    var sizes = settings[version].sizes.split(",");
    document.querySelector(".qrcodearea").style.display = "block";
    var s = sizes[id - 1];
    var imgurl = "banners/" + settings[version].folder + "/" + settings[version].folder + "-" + s.trim() + ".jpg";
    document.querySelector(".qrcodeimg").src = imgurl;
    document.querySelector(".qrcodeclose").style.left = parseInt(s.split("x")[0]) + 32 + "px";
    if (parseInt(s.split("x")[1]) > 500) {
        document.querySelector(".qrcodeclose").style.top = "2px";
        document.querySelector(".qrcodeimg").style.top = "2px";
    }
}

function openlink(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)
    var url = document.querySelector("#banners" + id).src;
    window.open(url, "_blank");
}

function filterbanners(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)
    //console.log(sizes);
    var check = document.querySelector("#check" + id);
    if (check.checked == true) {
        document.querySelector("#mainbannercontainer" + id).style.display = "block";
    } else {
        document.querySelector("#mainbannercontainer" + id).style.display = "none";
    }
}

function setfilter(i, s) {
    //console.log(s)
    if (true) {
        var chkbx = document.createElement("input");
        chkbx.setAttribute("type", "checkbox");
        chkbx.setAttribute("id", "check" + (i + 1));
        chkbx.setAttribute("class", "checks");
        chkbx.setAttribute("name", s);
        chkbx.setAttribute("value", s);
        chkbx.checked = true;

        var chkbxlbl = document.createElement("label");
        chkbxlbl.setAttribute("for", "check" + (i + 1));
        chkbxlbl.innerHTML = s;
    }
    document.querySelector(".menu").appendChild(chkbx);
    document.querySelector(".menu").appendChild(chkbxlbl);
}

function preview(e) {
    var id = e.target.id;
    id = id.replace(/\D/g, '');
    //console.log(id)
    var url = document.querySelector("#banners" + id).src;
    window.open("testpage/index.html?" + url, "_blank");
    //console.log(url)
}
