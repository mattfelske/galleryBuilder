/**
 * The galleryBuilder tool is designed to allow a developer to a vertical or horizontal gallery 
 * that has been sorted into buckets of fixed element length. The elements can be custom tailored
 * to include whatever format the user requires.
 * 
 * Currently Supported Formats
 *  - String
 *  
 * SETUP INSTRUCTIONS ******************************************
 * 
 * 1. 	Create a variable and create a new galleryBuilder object. 
 * 		Pass in the ID of the container that the gallery will be located in.
 * 
 * 		myApp=new galleryBuilder();
 * 		myApp.initializeApp(id, scrollAlignment, numPerBucket, bWidth, bHeight);
 * 
 * @author Matt Felske
 * @version 0.0.2
 */
 
 var sumGlobal;

function GalleryBuilder() {

	var SCROLL_HORIZONTAL = 0;
	var SCROLL_VERTICAL = 1;
	
	var STRING_TYPE = 0;
	var IMAGE_TYPE = 1;
	
	/**** USER SUBMITTED *********************************/
	var elementType = STRING_TYPE;
	var scrollAlignment = SCROLL_HORIZONTAL;
	var numberPerBuckets = 5;
	var bucketElementWidth = 30;
	var bucketElementHeight = 30;
	var bucketElementMarginTop = 10;
	var bucketElementMarginRight = 15;
	var bucketElementMarginBottom = 10;
	var bucketElementMarginLeft = 15;
	/*****************************************************/
	
	var data;
	var buckets = new Array();
	
	var gbContainer;
	var surfaceWidth;
	var surfaceHeight;
	var windowOffsetWidth;
	var windowOffsetHeight;
	
	
	this.initializeApp=initializeApp;
	this.setMargins=setMargins;
	this.setData=setData;
	
	
	function initializeApp(containerID, scrollAlign, numBucket, bWidth, bHeight) {
		console.log("Initializing ...");
		
		gbContainer = document.getElementById(containerID);
		surfaceWidth = gbContainer.offsetWidth;
		surfaceHeight = gbContainer.offsetHeight;
		windowOffsetWidth = gbContainer.offsetLeft;
		windowOffsetHeight = gbContainer.offsetTop;
		if(scrollAlign == SCROLL_HORIZONTAL || scrollAlign == SCROLL_VERTICAL) {
			scrollAlignment = scrollAlign;
		}
		numberPerBuckets = numBucket;
		bucketElementWidth = bWidth;
		bucketElementHeight = bHeight;
	    
		
	    buildBuckets()
	    buildGallery(gbContainer);
	    
		
		/**********************************************************************
		Attches scroll bar to content
		**********************************************************************/
	    var axisY = document.getElementById("axisY");
	    var axisX = document.getElementById("axisX");
	    var gbContainer = document.getElementById("gb-container");
		
	    if(axisY != null) {
	    	axisY.onscroll = function (event) {
	    		//console.log("scroll event detected! " + axisY.scrollTop);
	    		gbContainer.scrollTop = axisY.scrollTop;
	    	}
	    }
	    if(axisX != null) {
	    	axisX.onscroll = function (event) {
	    		//console.log("scroll event detected! " + axisX.scrollTop);
	    		gbContainer.scrollLeft = axisX.scrollLeft;
	    	}
	    }
		/**********************************************************************/
		
	}
	
	function setMargins(top, right, bottom, left) {
		bucketElementMarginTop = top;
		bucketElementMarginRight = right;
		bucketElementMarginBottom = bottom;
		bucketElementMarginLeft = left;
	}
	
	function setData(type, dataInfo) {
		elementType = type;
		data = dataInfo;
	} 
	
	
	function buildBuckets() {
		for(var i=0; i<data.length; i=i+numberPerBuckets) {
			var subArray = data.slice(i,i+numberPerBuckets);
			buckets.push(subArray);
		}
	}
	
	function buildGallery(parent){
		
		
		var galleryNode = document.createElement("DIV");
		var att = document.createAttribute("class");
		var att2 = document.createAttribute("style");
		var att3 = document.createAttribute("id");
		att.value="gb-container";
		att3.value="gb-container";
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att2.value="left: 0px; top: 20px;";
		} else {
			att2.value="left: 20px; top: 0px;";
		}	
		galleryNode.setAttributeNode(att);
		galleryNode.setAttributeNode(att2);
		galleryNode.setAttributeNode(att3);
		
		var sumHeight = 0;
		var sumWidth = 0;
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			sumHeight = (bucketElementHeight * numberPerBuckets) + (bucketElementMarginBottom * (numberPerBuckets - 1));
			sumWidth = bucketElementWidth + bucketElementMarginLeft + bucketElementMarginRight;
	
		} else {
			sumHeight = bucketElementHeight + bucketElementMarginTop + bucketElementMarginBottom;
			sumWidth = (bucketElementWidth * numberPerBuckets) + (bucketElementMarginRight * (numberPerBuckets - 1));
		}	
	
		
		for(var i=0; i< buckets.length; i++) {
			generateBucket(galleryNode, buckets[i], i, sumWidth, sumHeight);
		}
		
		parent.appendChild(galleryNode);
		
		
		var sum = 0;
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			/* Height for Scrollbar */
			var myElem = document.getElementById("col0");
			var style = myElem.currentStyle || window.getComputedStyle(myElem);
	
			var elementWidth = myElem.offsetWidth;
			var elementMarginRight = parseInt(style.marginRight);
			sum = (elementWidth * buckets.length) + ((buckets.length - 1) * elementMarginRight) + elementMarginRight;
			
			sumGlobal = sum;
			
			/* Element Manipulation */
	
		} else {
			var myElem = document.getElementById("row0");
			var style = myElem.currentStyle || window.getComputedStyle(myElem);
	
			var elementHeight = myElem.offsetHeight;
			var elementMarginBottom = parseInt(style.marginBottom);
			
			sum = (elementHeight * buckets.length) + ((buckets.length - 1) * elementMarginBottom) + elementMarginBottom;
		}	
		
		generateScrollbars(parent, sum);
		
	}
	
	//********************************************************************************************************************************
	//sum is the size of the scrollable content
	//parent is the container of the  buckets and scrollbar (gbcontainer in this example)
	
	function generateScrollbars(parent, sum) {
		
		var node = document.createElement("DIV");
		var att1 = document.createAttribute("class");
		var att2 = document.createAttribute("id");
		var att3 = document.createAttribute("style");
		
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att1.value="gb-scrollX";
			att2.value="axisX";
			//att3.value="left: "+windowOffsetWidth+"px; top: "+(windowOffsetHeight - 20)+"px; width:"+surfaceWidth+"px;";
			att3.value="width:"+surfaceWidth+"px; top:-"+surfaceHeight+"px;";
		} else {
			att1.value="gb-scrollY";
			att2.value="axisY";
			//att3.value="left: "+(windowOffsetWidth - 20)+"px; top: "+windowOffsetHeight+"px; height:"+surfaceHeight+"px;";
			att3.value="height:"+surfaceHeight+"px; top:-"+surfaceHeight+"px;";
		}		
		node.setAttributeNode(att1);
		node.setAttributeNode(att2);
		node.setAttributeNode(att3);
		
		var childNode = document.createElement("DIV");
		var att = document.createAttribute("class");
		var atta = document.createAttribute("style");
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att.value="divX";
			atta.value="width:" + sum + "px;";
		} else {
			att.value="divY";
			atta.value="height:" + sum + "px;";
		}	
		childNode.setAttributeNode(att);
		childNode.setAttributeNode(atta);
		node.appendChild(childNode);
		
		parent.appendChild(node);
	}
	
	/** unlock slider code ********************************/
	$(function() {
	
		$("#slider").draggable({
			axis: 'x',
			containment: 'parent',
			drag: function(event, ui) {
				
				//var scrollNumber = (ui.position.left * sumGlobal) / 337;
				var scrollNumber = (ui.position.left * (sumGlobal-400)) / 337;	
				
				console.log("math ugh : " + ui.position.left + "*" + sumGlobal + "/ 400 = " + scrollNumber);
				
				document.getElementById('gb-container').scrollLeft = scrollNumber;
				
				/*
				if (ui.position.left > 200) {
					console.log("200 boom");
				} else {
					// Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
					// $("h2 span").css("opacity", 100 - (ui.position.left / 5))
				}*/
			},
			stop: function(event, ui) {
				if (ui.position.left < 200) {
					$(this).animate({
						left: 0
					})
				}
			}
		});
		
	});

	
	//**************************************************************************************************************************
	
	function generateBucket(parent, numArray, pos, bucketWidth, bucketHeight) {
		
		var node = document.createElement("DIV");
		var att = document.createAttribute("class");
		var att2 = document.createAttribute("id");
		var att3 = document.createAttribute("style");
		
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att.value="gb-col";
			att2.value="col" + pos;
		} else {
			att.value="gb-row";
			att2.value="row" + pos;
			
		}
		att3.value="width: "+bucketWidth+"px; height: "+bucketHeight+"px;";
		node.setAttributeNode(att);
		node.setAttributeNode(att2);
		node.setAttributeNode(att3);
		
		for(var i=0; i< numArray.length; i++) {
			generateItem(node, numArray[i], (pos * numberPerBuckets) + i);
		}
		parent.appendChild(node);
	}
	
	function generateItem(parent, val, pos) {
		var node = document.createElement("DIV");
		
		if(elementType == STRING_TYPE) {
			generateStringItem(node, val);
		} else if(elementType == IMAGE_TYPE) {
			generateImageItem(node, val, pos);
		} else {
			console.log("Unknown Element Type");
		}
		
		var att=document.createAttribute("class");
		var att2 = document.createAttribute("style");
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att.value="gb-col-item";
		} else {
			att.value="gb-row-item";
		}	
		att2.value="width: "+bucketElementWidth+"px; height: "+bucketElementHeight+"px;";
		
		node.setAttributeNode(att);
		node.setAttributeNode(att2);
		
		parent.appendChild(node);
	}
	
	function generateStringItem(parent, val) {
		var textNode = document.createTextNode(val);
		parent.appendChild(textNode);
	}
	
	function generateImageItem(parent, val, valPos) {
		var linkNode = document.createElement("A");
		var imgNode = document.createElement("IMG");
		
		var attREF = document.createAttribute("href");
		var attID = document.createAttribute("id");
		attREF.value = "" + val;
		attID.value = "gb-element-" + valPos;
		linkNode.setAttributeNode(attREF);
		linkNode.setAttributeNode(attID);
		
		linkNode.appendChild(imgNode);
		
		var attSRC = document.createAttribute("src");
		attSRC.value = "" + val;
		imgNode.setAttributeNode(attSRC);
		
		var attWidth = document.createAttribute("width");
		attWidth.value = bucketElementWidth;
		imgNode.setAttributeNode(attWidth);
		
		var attHeight = document.createAttribute("height");
		attHeight.value = bucketElementHeight;
		imgNode.setAttributeNode(attHeight);
		
		var attAlt = document.createAttribute("alt");
		attAlt.value = "alt " + val;
		imgNode.setAttributeNode(attAlt);
		
		parent.appendChild(linkNode);
	}


}

var myData = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];

myApp=new GalleryBuilder();
myApp.setData(1,myData);
myApp.setMargins(10, 25, 10, 25);
myApp.initializeApp("myContainer", 0, 4, 70, 80);










