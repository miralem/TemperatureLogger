angular.module('temperatureLoggerApp',  [
    'ui.router',
    'googlechart',
    'angularMoment'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state("root", {
                template: "<section ui-view></section>",
                controller: function ($state) {
                    console.log("d")
                }
            })
            .state("start", {
                url: "",
                templateUrl: "views/start.html",
                data: {

                },
                controller: function ($scope, $http, moment, dataHandler) {
                    $scope.chart = {
                        data: [],
                        labels: []
                    };

                    var chart = {
                        labels: [],
                        series: [],
                        data: []
                    }

                    var maxPoints = 10;

                    var seriesData = {};
                    var series = [];

                    dataHandler.get()
                        .success(function(data){
                            $scope.chartObject = {
                              "type": "LineChart",
                              "displayed": true,
                              "data": {
                                "cols": [
                                  {
                                    "id": "month",
                                    "label": "Month",
                                    "type": "string",
                                    "p": {}
                                  },
                                  {
                                    "id": "laptop-id",
                                    "label": "Laptop",
                                    "type": "number",
                                    "p": {}
                                  },
                                  {
                                    "id": "desktop-id",
                                    "label": "Desktop",
                                    "type": "number",
                                    "p": {}
                                  },
                                  {
                                    "id": "server-id",
                                    "label": "Server",
                                    "type": "number",
                                    "p": {}
                                  },
                                  {
                                    "id": "cost-id",
                                    "label": "Shipping",
                                    "type": "number"
                                  }
                                ],
                                "rows": [
                                  {
                                    "c": [
                                      {
                                        "v": "January"
                                      },
                                      {
                                        "v": 19,
                                        "f": "42 items"
                                      },
                                      {
                                        "v": 12,
                                        "f": "Ony 12 items"
                                      },
                                      {
                                        "v": 7,
                                        "f": "7 servers"
                                      },
                                      {
                                        "v": 4
                                      }
                                    ]
                                  },
                                  {
                                    "c": [
                                      {
                                        "v": "February"
                                      },
                                      {
                                        "v": 13
                                      },
                                      {
                                        "v": 1,
                                        "f": "1 unit (Out of stock this month)"
                                      },
                                      {
                                        "v": 12
                                      },
                                      {
                                        "v": 2
                                      }
                                    ]
                                  },
                                  {
                                    "c": [
                                      {
                                        "v": "March"
                                      },
                                      {
                                        "v": 24
                                      },
                                      {
                                        "v": 5
                                      },
                                      {
                                        "v": 11
                                      },
                                      {
                                        "v": 6
                                      }
                                    ]
                                  }
                                ]
                              },
                              "options": {
                                "title": "Sales per month",
                                "isStacked": "true",
                                "fill": 20,
                                "displayExactValues": true,
                                "vAxis": {
                                  "title": "Sales unit",
                                  "gridlines": {
                                    "count": 10
                                  }
                                },
                                "hAxis": {
                                  "title": "Date"
                                }
                              },
                              "formatters": {}
                            }




//                            var total = data.length;
//                            var startTime = data[total-1].date;
//                            var endTime = data[0].date;
//
//                            var resolution = total > maxPoints ? Math.round(total / maxPoints) : 1;
//
//                            console.log("Resolution", resolution)
//
//                            var tStart = Math.round(moment(startTime).unix() / 60) * 60;
//                            var tEnd = Math.round(moment(endTime).unix() / 60) * 60;
//                            var tCurrent = tStart
//
//
//                            var points = {};
//                            var mainIndex = 0;
//
//                            while(tCurrent < tEnd){
//                                mainIndex++;
//                                tCurrent = moment.unix(tCurrent).seconds(0).add(1, "minute").unix();
//
//                                if((mainIndex-1) % resolution == 0){
//                                    points[tCurrent] = null;
//                                    $scope.chart.labels.push(moment.unix(tCurrent).format('HH:mm'));
//                                }else{
//                                    console.log("n")
//                                }
//                            }
//
//                            console.log(points);
//
//                            angular.forEach(data, function(val, index){
////                                if(index % resolution == 0)
////                                    continue;
//
//                                if(!seriesData[val.address]){
//                                    $scope.chart.data.push([])
//
//                                    series.push(val.address);
//                                    seriesData[val.address] = JSON.parse(JSON.stringify(points))
//                                }
//
//                                var t = Math.round(moment(val.date).unix() / 60) * 60;
//
//                                seriesData[val.address][t] = val.temperature;
//
//                                //console.log(seriesData[val.address][t], "--------------")
//                            })
//
//                            angular.forEach(series, function(val, index){
//                                for(prop in seriesData[val]){
//
//
//                                    $scope.chart.data[index].push(seriesData[val][prop]);
//                                }
//                            })
//
//
////                            $scope.chart.labels = seriesData[series[0]];
//                            $scope.chart.series = series;
////                            $scope.chart.data = [seriesData[series[0]]];
////
//                            console.log(seriesData)
//
//
//                                //$scope.chart = chart;
                        })







                }
            })
        })

    .factory('dataHandler', function($http, conf, moment){
        return {
            get: function(){
                return $http.get(conf.apiUrl + "?")
            }
        }
    })

    .constant('conf', {
        //apiUrl: 'http://188.226.133.251:8081/api'
        apiUrl: 'http://localhost:8081/api'
    })