
function showChart()
{
  var reportData = reportsController.bracketsData;
  
 var data = [];
for(var i=reportData.length-1;i>=0;i--){
	data.push({
		name : reportData[i].name,
		y: reportData[i].avg/(1000*60),
      //y: 20,
		drilldown :'dummy'
	});
}
  
	var  reportObj = {
	        credits: {
    						enabled: false
  						},
            chart: {
        type: 'column'
    },
    title: {
        text: 'Work Order Management - Technician Efficiency Analysis'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
      title: {
            text: 'D U R A T I O N'
        }
    },
    yAxis: {
       title: {
            text: 'T I M E (Minutes)'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true
           //     format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>'
        //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [{
        name: 'Efficiency',
        colorByPoint: true,
        data: data
    }],
    drilldown: {
        series: [{
            name: 'January',
            id: 'January',
            data: [
                [
                    'v11.0',
                    24.13
                ],
                [
                    'v8.0',
                    17.2
                ],
                [
                    'v9.0',
                    8.11
                ],
                [
                    'v10.0',
                    5.33
                ],
                [
                    'v6.0',
                    1.06
                ],
                [
                    'v7.0',
                    0.5
                ]
            ]
        }, {
            name: 'Chrome',
            id: 'Chrome',
            data: [
                [
                    'v40.0',
                    5
                ],
                [
                    'v41.0',
                    4.32
                ],
                [
                    'v42.0',
                    3.68
                ],
                [
                    'v39.0',
                    2.96
                ],
                [
                    'v36.0',
                    2.53
                ],
                [
                    'v43.0',
                    1.45
                ],
                [
                    'v31.0',
                    1.24
                ],
                [
                    'v35.0',
                    0.85
                ],
                [
                    'v38.0',
                    0.6
                ],
                [
                    'v32.0',
                    0.55
                ],
                [
                    'v37.0',
                    0.38
                ],
                [
                    'v33.0',
                    0.19
                ],
                [
                    'v34.0',
                    0.14
                ],
                [
                    'v30.0',
                    0.14
                ]
            ]
        }, {
            name: 'Firefox',
            id: 'Firefox',
            data: [
                [
                    'v35',
                    2.76
                ],
                [
                    'v36',
                    2.32
                ],
                [
                    'v37',
                    2.31
                ],
                [
                    'v34',
                    1.27
                ],
                [
                    'v38',
                    1.02
                ],
                [
                    'v31',
                    0.33
                ],
                [
                    'v33',
                    0.22
                ],
                [
                    'v32',
                    0.15
                ]
            ]
        }, {
            name: 'Safari',
            id: 'Safari',
            data: [
                [
                    'v8.0',
                    2.56
                ],
                [
                    'v7.1',
                    0.77
                ],
                [
                    'v5.1',
                    0.42
                ],
                [
                    'v5.0',
                    0.3
                ],
                [
                    'v6.1',
                    0.29
                ],
                [
                    'v7.0',
                    0.26
                ],
                [
                    'v6.2',
                    0.17
                ]
            ]
        }, {
            name: 'Opera',
            id: 'Opera',
            data: [
                [
                    'v12.x',
                    0.34
                ],
                [
                    'v28',
                    0.24
                ],
                [
                    'v27',
                    0.17
                ],
                [
                    'v29',
                    0.16
                ]
            ]
        }]
    }
};
			var jsonString = encodeURIComponent(JSON.stringify(reportObj));
			var Charturl =ChartServerUrl + "/desktopweb/web/localfiles/highcharts/examples/column-stacked/DBSChart.html?title=FundsTransfer&json=" +jsonString;
			reportsController.view.brwReports.htmlString="<html><body><iframe src="+Charturl+" width=\"1350\" height=\"1500\"frameborder=\"1\"scrolling=\"no\"></iframe></body></html>";
}


function formatDate() {
	var currentDate = new Date()
	var day = currentDate.getDate()
	var month = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
	
	dt1 = month + "/" + day + "/" + year;
	
	var hours = currentDate.getHours()
	var minutes = currentDate.getMinutes()
	var seconds = currentDate.getSeconds()
	
	if (minutes < 10)
	minutes = "0" + minutes

	var suffix = "AM";
	if (hours >= 12) {
	suffix = "PM";
	hours = hours - 12;
	}
	if (hours == 0) {
	hours = 12;
	}

	dt2 = dt1+" " + hours + ":" + minutes + ":" + seconds +" " + suffix;
	kony.print("dt2------------------"+dt2);
	return dt2;
}


	