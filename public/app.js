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
                    dataHandler.get()
                        .success(function(data){
                            console.log(date);
                        })
                   
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
