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
	var chartData = {
		"First": 10,
		"Second": 14,
		"Third": 2,
		"Fourth": 12,
		"Fifth": 18
	};

	this.drawGraph = function() {

		switch (canvasType) {
			case 'radial':
			console.log( 'radial' );
			var total_value = 0;
			var roundSize = 0.5;
			for (var categ in chartData){
				var val = chartData[categ];
				total_value += val;
			}

			var start_angle = 0;
			for (categ in chartData){
				val = chartData[categ];
				var slice_angle = 2 * Math.PI * val / total_value;

				drawPieSlice(
					ctx,
					canvas.width/2,
					canvas.height/2,
					Math.min(canvas.width/2,canvas.height/2),
					start_angle,
					start_angle+slice_angle,
					);

				start_angle += slice_angle;
			}

			drawPieSlice(
				ctx,
				canvas.width/2,
				canvas.height/2,
				//drawing a white circle over the chart
				roundSize * Math.min(canvas.width/2,canvas.height/2),
				0,
				2 * Math.PI,
				"#fff"
				);
			break;
			case 'linear':
			console.log( 'linear' );

			break;
			case 'pie':
			console.log( 'pie' );

			var total_value = 0;
			for (var categ in chartData){
				var val = chartData[categ];
				total_value += val;
			}

			var start_angle = 0;
			for (categ in chartData){
				val = chartData[categ];
				var slice_angle = 2 * Math.PI * val / total_value;

				drawPieSlice(
					ctx,
					canvas.width/2,
					canvas.height/2,
					Math.min(canvas.width/2,canvas.height/2),
					start_angle,
					start_angle+slice_angle,
					);

				start_angle += slice_angle;
			}

			// draw caption

			for (categ in chartData){
				val = chartData[categ];
				slice_angle = 2 * Math.PI * val / total_value;
				var pieRadius = Math.min(canvas.width/2,canvas.height/2);
				var labelX = canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
				var labelY = canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

				// if (this.options.doughnutHoleSize){
				// 	var offset = (pieRadius * this.options.doughnutHoleSize ) / 2;
				// 	labelX = canvas.width/2 + (offset + pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
				// 	labelY = canvas.height/2 + (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle/2);               
				// }

				var labelText = Math.round(100 * val / total_value);
				ctx.fillStyle = "white";
				ctx.font = "bold 20px Arial";
				ctx.fillText(labelText+"%", labelX,labelY);
				start_angle += slice_angle;
			}
			break;
			default:
			console.log( 'no chart type' );
		}
		var legend = $(canvas).data('legend');
		this.drawLegend(chartData, $(canvas).data('legend'))
	}


	this.drawLegend = function (chartData, legendId) {
		var legendHTML = "";
		for (categ in chartData){
			legendHTML += "<div><span style='display:inline-block;width:20px;background-color: #000;'>&nbsp;</span> "+categ+"</div>";
		}
		document.getElementById(legendId).innerHTML = legendHTML;
	}


	function drawLine(ctx, startX, startY, endX, endY){
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(endX,endY);
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

	function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.stroke();
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
