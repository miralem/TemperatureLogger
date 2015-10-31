angular.module('temperatureLoggerApp',  [
    'ui.router',
    'chart.js'
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
                controller: function ($scope, $http, dataHandler) {
                    var chart {
                        labels: [],
                        series: [],
                        data: []
                    }

                    dataHandler.get()
                        .success(function(data){
                            angular.forEach(data, function(val, index){
                                console.log(val)
                            })
                        })


                        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
                        $scope.series = ['Series A', 'Series B'];
                        $scope.data = [
                        [11, 11, 11, 11, 11, 11, 11],
                        [28, 48, 40, 19, 86, 27, 90]
                        ];
                        $scope.onClick = function (points, evt) {
                        console.log(points, evt);
                        };
                }
            })
        })

    .factory('dataHandler', function($http, conf){
        return {
            get: function(){
                return $http.get('/data.json')
            }
        }
    })

    .constant('conf', {
        apiUrl: 'http://188.226.133.251:8081/api'
    })