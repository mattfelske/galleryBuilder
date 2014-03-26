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
 * 		myApp.initializeApp();
 * 
 * @author Matt Felske
 * @version 1.0
 */

function galleryBuilder(containerID) {

	this.initializeApp=initializeApp;
	function initializeApp(id) {
		console.log("Initializing ...");
	    
	    buildBuckets()
	    buildGallery(containerID);
	    
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
	}
	
	
	var SCROLL_HORIZONTAL = 0;
	var SCROLL_VERTICAL = 1;
	
	/**** USER SUBMITTED *********************************/
	var scrollAlignment = SCROLL_HORIZONTAL;
	var numberPerBuckets = 5;
	var bucketElementWidth = 42;
	var bucketElementHeight = 62;
	var bucketElementMarginTop = 10;
	var bucketElementMarginRight = 15;
	var bucketElementMarginBottom = 10;
	var bucketElementMarginLeft = 15;
	/*****************************************************/
	
	var data = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
	var buckets = new Array();
	
	var gbContainer = document.getElementById(containerID);
	
	var surfaceWidth = document.getElementById(containerID).offsetWidth;
	var surfaceHeight = document.getElementById(containerID).offsetHeight;
	var windowOffsetWidth = document.getElementById(containerID).offsetLeft;
	var windowOffsetHeight = document.getElementById(containerID).offsetTop;
	
	//initializeApp();
	
	function buildBuckets() {
		for(var i=0; i<data.length; i=i+numberPerBuckets) {
			var subArray = data.slice(i,i+numberPerBuckets);
			buckets.push(subArray);
		}
	}
	
	function buildGallery(containerID){
		
		
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
		
		gbContainer.appendChild(galleryNode);
		
		
		var sum = 0;
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			/* Height for Scrollbar */
			var myElem = document.getElementById("col0");
			var style = myElem.currentStyle || window.getComputedStyle(myElem);
	
			var elementWidth = myElem.offsetWidth;
			var elementMarginRight = parseInt(style.marginRight);
			sum = (elementWidth * buckets.length) + ((buckets.length - 1) * elementMarginRight) + elementMarginRight;
			
			/* Element Manipulation */
	
		} else {
			var myElem = document.getElementById("row0");
			var style = myElem.currentStyle || window.getComputedStyle(myElem);
	
			var elementHeight = myElem.offsetHeight;
			var elementMarginBottom = parseInt(style.marginBottom);
			
			sum = (elementHeight * buckets.length) + ((buckets.length - 1) * elementMarginBottom) + elementMarginBottom;
		}	
		
		generateScrollbars(gbContainer, sum);
		
	}
	
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
			generateItem(node, numArray[i]);
		}
		parent.appendChild(node);
	}
	
	function generateItem(parent, num) {
		var node = document.createElement("DIV");
		var textNode = document.createTextNode("M-"+num+"-F");
		node.appendChild(textNode);
		
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


}

/*myApp=new galleryBuilder();
myApp.initializeApp();*/










