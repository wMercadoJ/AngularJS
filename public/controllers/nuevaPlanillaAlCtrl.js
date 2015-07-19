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

            $scope.users = [{
                id: 1,
                codigoProd: 'COD001',
                nombreProd: 'PRODUCT1',
                precio: 2,
                unidad: 4,
                paquetes: 10,
                status: 2,
                total: 5
            }, {
                id: 2,
                codigoProd: 'COD002',
                nombreProd: 'PRODUCT2',
                precio: 3,
                unidad: 2,
                paquetes: 5,
                status: 1,
                total: 1
            }];

            $scope.precios = [{
                value: 1,
                text: 'Precio1'
            }, {
                value: 2,
                text: 'Precio2'
            }, {
                value: 3,
                text: 'Precio3'
            }];


            $scope.statuses = [
                {value: 1, text: 'Paquetes'},
                {value: 2, text: 'Cajas'}
            ];


            $scope.showStatus = function (user) {
                var selected = [];
                if (user.status) {
                    selected = $filter('filter')($scope.statuses, {value:user.status});
                }
                return (user.status && selected.length) ? selected[0].text : 'Not set';
            };

            $scope.groups = [];
            $scope.loadGroups = function () {
                return $scope.groups.length ? null : $http.get('/groups').success(function (data) {
                    $scope.groups = data;
                });
            };

            $scope.showGroup = function (user) {
                if (user.group && $scope.groups.length) {
                    var selected = $filter('filter')($scope.groups, {
                        id: user.group
                    });
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return user.groupName || 'Not set';
                }
            };

            $scope.showPrecios = function (user) {
                var selected = [];
                if (user.precio) {
                    selected = $filter('filter')($scope.precios, {
                        value: user.precio
                    });
                }
                return selected.length ? selected[0].text : 'Not set';
            };
            /*
             $scope.checkName = function(data, id) {
             if (id === 2 && data !== 'awesome') {
             return "Username 2 should be `awesome`";
             }
             };
             */
            // filter users to show
            $scope.filterUser = function (user) {
                return user.isDeleted !== true;
            };

            // mark user as deleted
            $scope.deleteUser = function (id) {
                var filtered = $filter('filter')($scope.users, {
                    id: id
                });
                if (filtered.length) {
                    filtered[0].isDeleted = true;
                }
            };

            // add user
            $scope.addUser = function () {
                $scope.users.push({
                    id: $scope.users.length + 1,
                    name: '',
                    status: null,
                    group: null,
                    isNew: true
                });
            };

            // cancel all changes
            $scope.cancel = function () {
                for (var i = $scope.users.length; i--;) {
                    var user = $scope.users[i];
                    // undelete
                    if (user.isDeleted) {
                        delete user.isDeleted;
                    }
                    // remove new
                    if (user.isNew) {
                        $scope.users.splice(i, 1);
                    }
                }
                ;
            };

            // save edits
            $scope.saveTable = function () {
                var results = [];
                for (var i = $scope.users.length; i--;) {
                    var user = $scope.users[i];
                    // actually delete user
                    if (user.isDeleted) {
                        $scope.users.splice(i, 1);
                    }
                    // mark as not new
                    if (user.isNew) {
                        user.isNew = false;
                    }

                    // send on server
                    results.push($http.post('/saveUser', user));
                }

                return $q.all(results);
            };
            //Modal
            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;

            $scope.addProducto = function (size) {

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
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

    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items' , function ($scope, $modalInstance,$http, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };


        $scope.example9data = [];
        $scope.productos = {};
        $scope.example9model = [];

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
                $scope.example9data.push(producto);
            }

            $scope.example9settings = {
                enableSearch: true,
                scrollableHeight: '200px',
                scrollable: true
            };
            $scope.example9customTexts = {
                buttonDefaultText: 'Seleccionar Productos',
                checkAll: 'Seleccionar Todos',
                uncheckAll: 'Deseleccionar todos',
                dynamicButtonTextSuffix: 'Productos Seleccionados'
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
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