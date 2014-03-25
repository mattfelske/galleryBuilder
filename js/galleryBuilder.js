function galleryBuilder() {

	this.initializeApp=initializeApp;
	function initializeApp() {
		console.log("Initializing ...");
	    
	    buildBuckets()
	    buildGallery("myContainer");
	    
	    $(function(){
	        $(".gb-scrollX").scroll(function(){
	            $(".gb-container")
	                .scrollLeft($(".gb-scrollX").scrollLeft());
	        });
	        
	        $(".gb-scrollY").scroll(function(){
	            $(".gb-container")
	                .scrollTop($(".gb-scrollY").scrollTop());
	        });
	    });
	}
	
	
	var SCROLL_HORIZONTAL = 0;
	var SCROLL_VERTICAL = 1;
	
	/**** USER SUBMITTED *********************************/
	var scrollAlignment = SCROLL_VERTICAL;
	var numberPerBuckets = 5;
	var bucketElementWidth = 42;
	var bucketElementHeight = 62;
	var bucketElementMarginTop = 10;
	var bucketElementMarginRight = 10;
	var bucketElementMarginBottom = 10;
	var bucketElementMarginLeft = 10;
	/*****************************************************/
	
	var data = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];
	var buckets = new Array();
	
	var gbContainer = document.getElementById("myContainer");
	
	var surfaceWidth = document.getElementById("myContainer").offsetWidth;
	var surfaceHeight = document.getElementById("myContainer").offsetHeight;
	var windowOffsetWidth = document.getElementById("myContainer").offsetLeft;
	var windowOffsetHeight = document.getElementById("myContainer").offsetTop;
	
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
		att.value="gb-container";
		galleryNode.setAttributeNode(att);
		
		var sumHeight = 0;
		var sumWidth = 0;
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			sumHeight = (bucketElementHeight + bucketElementMarginTop +bucketElementMarginBottom) * numberPerBuckets;
			sumWidth = bucketElementWidth + ((bucketElementMarginTop + bucketElementMarginBottom ) *2);
	
		} else {
			sumHeight = bucketElementHeight + bucketElementMarginTop + bucketElementMarginBottom;
			sumWidth = (bucketElementWidth + bucketElementMarginLeft + bucketElementMarginRight) * numberPerBuckets;
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
		
		generateScrollbars(galleryNode, sum);
		
	}
	
	function generateScrollbars(parent, sum) {
		
		var node = document.createElement("DIV");
		var att1 = document.createAttribute("class");
		var att2 = document.createAttribute("id");
		var att3 = document.createAttribute("style");
		
		if(scrollAlignment == SCROLL_HORIZONTAL) {
			att1.value="gb-scrollX";
			att2.value="axisX";
			att3.value="left: "+windowOffsetWidth+"px; top: "+(windowOffsetHeight - 20)+"px; width:"+surfaceWidth+"px;";
		} else {
			att1.value="gb-scrollY";
			att2.value="axisY";
			att3.value="left: "+(windowOffsetWidth - 20)+"px; top: "+windowOffsetHeight+"px; height:"+surfaceHeight+"px;";
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

myApp=new galleryBuilder();
myApp.initializeApp();










