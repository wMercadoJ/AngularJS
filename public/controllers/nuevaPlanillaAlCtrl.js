angular.module('mainApp.nuevaPlanillaAl', ['xeditable', 'ui.bootstrap', 'angularjs-dropdown-multiselect'])

    .run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    })

    .controller('nuevaPlanillaAlCtrl', ['$scope', '$location', 'serviceData', function ($scope, $location, serviceData) {
        $scope.message = "Crear Pedido Carro Paso 1 de 2";
        $scope.fecha = new Date();
        $scope.carros = ['ABC123 - Chofer1', 'BCD123 - Chofer2', 'EFG123 - Chofer3'];
        //  $scope.selection = $scope.carros[0];
        $scope.registrarPedido = function () {
            serviceData.setChoferCarro($scope.carroSelected);
            serviceData.setFechaPedido($scope.fecha);
            $location.path('/formSalidaAl');
        }

    }])

    .controller('planillaAlCtrl', ['$scope', '$location', '$filter', '$http', '$q', '$modal', '$log', 'serviceData',
        function ($scope, $location, $filter, $http, $q, $modal, $log, serviceData) {
            $scope.message = "Crear Pedido Carro Paso 2 de 2";
            $scope.datoslabel = "Datos Chofer";
            $scope.chofer = serviceData.getChoferCarro();
            $scope.fecha = serviceData.getFechaPedido();
            $scope.placa = "ABC123";


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
                cajas: 50,
                total: 5
            }, {
                id: 2,
                codigoProd: 'COD002',
                nombreProd: 'PRODUCT2',
                precio: 3,
                unidad: 2,
                paquetes: 5,
                cajas: 25,
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

    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.example9model = [];
        $scope.example9data = [
            {id: 1, label: "Producto01"},
            {id: 2, label: "Producto02"},
            {id: 3, label: "Producto03"}, ,
            {id: 4, label: "Producto04"},
            {id: 5, label: "Producto05"},
            {id: 6, label: "Producto06"},
            {id: 7, label: "Producto07"},
            {id: 8, label: "Producto08"},
            {id: 9, label: "Producto09"},
            {id: 10, label: "Producto10"},
            {id: 11, label: "Producto11"}];
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