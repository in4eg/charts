(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();


ChartGraph = function(element) {
	var pixelRatio = window.devicePixelRatio || 1;
	var canvas = element;
	var ctx = canvas.getContext('2d');
	var width = 0, height = 0;

	(setCanvasSize = function() {
		width = $(canvas).parent().outerWidth() * pixelRatio;
		height = $(canvas).parent().outerHeight() * pixelRatio;
		canvas.width = width;
		canvas.height = height;
	})();


	var canvasType = $(canvas).data('type');
	var chartData = $(canvas).data('chart');

	console.log(JSON.parse(chartData))

	this.drawGraph = function() {

		switch (canvasType) {
			case 'radial':
			console.log( 'radial' );
			break;
			case 'linear':
			console.log( 'linear' );
			break;
			case 'pie':
			console.log( 'pie' );
			break;
			default:
			console.log( 'no chart type' );
		}
	}

	function drawLine(ctx, startX, startY, endX, endY){
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(endX,endY);
		ctx.stroke();
	}

	function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.stroke();
	}

	function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(centerX,centerY);
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
	}


	window.addEventListener('resize', function() {
		setCanvasSize();
	});


	return this;
};


$('[data-chart]').each(function(i, canvas){
	var graph = new ChartGraph(canvas)
	graph.drawGraph();

})
