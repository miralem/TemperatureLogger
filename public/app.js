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
                    $scope.sensor = {}

                    var sensorDataHandler = function(){
                        dataHandler.get()
                            .success(function(data){
                                angular.forEach(data, function(row){
                                    if(!$scope.sensor[row.address])
                                        $scope.sensor[row.address] = row;
                                })
                            })
                    }

                    sensorDataHandler();

                    setTimeout(function(){
                        sensorDataHandler();
                    }, 15000);

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
        apiUrl: '/:8081/api'
        //apiUrl: 'http://localhost:8081/api'
    })
