angular.module('mainApp.listaCarro', [])
    .controller('listaCarroCtrl', function ($scope, $http) {
        $scope.message = "Lista de Carros";
        $scope.newCarro = {};
        $scope.carros = {};
        $scope.selected = false;

        // Obtenemos todos los datos de la base de datos
        $http.get('/api/carro').success(function (data) {
            $scope.carros = data;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $scope.registrarCarro = function () {
            $http.post('/api/carro', $scope.newCarro)
                .success(function (data) {
                    $scope.newCarro = {}; // Borramos los datos del formulario
                    $scope.carros = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // Función para editar los datos de una persona
        $scope.modificarCarro = function (newCarro) {
            $http.put('/api/carro/' + $scope.newCarro._id, $scope.newProducto)
                .success(function (data) {
                    $scope.newCarro = {}; // Borramos los datos del formulario
                    $scope.carros = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // Función que borra un objeto persona conocido su id
        $scope.borrarCarro = function (newCarro) {
            $http.delete('/api/carro/' + $scope.newCarro._id)
                .success(function (data) {
                    $scope.newCarro = {};
                    $scope.carros = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // Función para coger el objeto seleccionado en la tabla
        $scope.selectCarro = function (carro) {
            $scope.newCarro = carro;
            $scope.selected = true;
            console.log($scope.newCarro, $scope.selected);
        };
    });