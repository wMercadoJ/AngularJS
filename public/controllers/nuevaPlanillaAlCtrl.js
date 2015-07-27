angular.module('mainApp.nuevaPlanillaAl', ['xeditable', 'ui.bootstrap', 'angularjs-dropdown-multiselect'])

    .run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    })

    .controller('nuevaPlanillaAlCtrl', ['$scope', '$location', '$http', 'serviceData', function ($scope, $location, $http, serviceData) {

        $scope.carros = {};

        // Obtenemos todos los datos de la base de datos
        $http.get('/api/carro').success(function (data) {
            $scope.carros = data;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        $scope.message = "Crear Pedido Producto Paso 1 de 2";
        $scope.fecha = new Date();

        $scope.registrarPedido = function () {
            serviceData.setChoferCarro($scope.carroSelected);
            serviceData.setFechaPedido($scope.fecha);
            $location.path('/formSalidaAl');
        }

    }])

    .controller('planillaAlCtrl', ['$scope', '$location', '$filter', '$http', '$q', '$modal', '$log', 'serviceData',
        function ($scope, $location, $filter, $http, $q, $modal, $log, serviceData) {
            $scope.message = "Crear Pedido Producto Paso 2 de 2";
            $scope.datoslabel = "Datos Chofer";
            $scope.chofer = serviceData.getChoferCarro();
            $scope.fecha = serviceData.getFechaPedido();

            $scope.cambiarPedido = function () {
                $location.path('/nuevaPlanillaAl');
            }
            $scope.listaProductos = [];

            $scope.removeItem = function(index) {
                $scope.listaProductos.splice(index, 1);
            };

            $scope.animationsEnabled = true;

            $scope.addProducto = function (size) {

                var listaProductoModal = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'listaProductosModal.html',
                    controller: 'listaProductosModalCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.listaProductos;
                        }
                    }
                });

                listaProductoModal.result.then(function (selectedProducto) {
                    for (var i = 0; i < selectedProducto.length; i++) {
                        var producto = new Object();
                        producto.id = selectedProducto[i].id;
                        producto.codigoProd = selectedProducto[i].codigo;
                        producto.nombreProd = selectedProducto[i].nombre;
                        producto.precio = 2;
                        producto.unidad = 3;
                        producto.paquetes = 0;
                        producto.cajas = 0;
                        producto.total = selectedProducto[i].precio*0;

                        $scope.listaProductos.push(producto);

                        // Función para editar los datos de una persona

                        //$http.get('/api/productoCod/' + producto.codigoProd)
                        //    .success(function (data) {
                        //        console.log("Datos");
                        //        console.log(data);
                        //    })
                        //    .error(function (data) {
                        //        console.log('Error: ' + data);
                        //    });

                    }

                    //$scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        }
    ])


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

    .controller('listaProductosModalCtrl', ['$scope', '$modalInstance', '$http',function ($scope, $modalInstance, $http) {
        $scope.datosProductos = [];
        $scope.productos = {};
        $scope.modeloProductos = [];

        $scope.settingsProductos = {
            enableSearch: true,
            externalIdProp: '',
            scrollableHeight: '200px',
            scrollable: true
        };

        $scope.productoCustomTexts = {
            buttonDefaultText: 'Seleccionar Productos',
            checkAll: 'Seleccionar Todos',
            uncheckAll: 'Deseleccionar todos',
            dynamicButtonTextSuffix: 'Productos Seleccionados'
        };

        // Obtenemos todos los datos de la base de datos
        $http.get('/api/producto').success(function (data) {
            $scope.productos = data;

            for (var i = 0; i < $scope.productos.length; i++) {
                var producto = new Object();
                producto.id = $scope.productos[i]._id;
                producto.label = $scope.productos[i].codigo + " - " + $scope.productos[i].nombre;
                producto.codigo = $scope.productos[i].codigo;
                producto.nombre = $scope.productos[i].nombre;
                producto.precio = $scope.productos[i].precio;
                $scope.datosProductos.push(producto);
            }

            $scope.ok = function () {
                $modalInstance.close($scope.modeloProductos);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    }])


    .service('serviceData', function () {
        var choferCarro = '';
        var fechaPedido = '';
        return {
            getChoferCarro: function () {
                return choferCarro;
            },
            setChoferCarro: function (chofer) {
                choferCarro = chofer;
            },
            getFechaPedido: function () {
                return fechaPedido;
            },
            setFechaPedido: function (fecha) {
                fechaPedido = fecha;
            }
        };


    });