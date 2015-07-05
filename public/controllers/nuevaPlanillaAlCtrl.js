angular.module('mainApp.nuevaPlanillaAl', ['xeditable'])

.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})

.controller('nuevaPlanillaAlCtrl', ['$scope', '$location', 'serviceData', function($scope, $location, serviceData) {
	$scope.message = "Crear Pedido Carro Paso 1 de 2";
	$scope.fecha = new Date();
	$scope.carros = ['ABC123 - Chofer1', 'BCD123 - Chofer2', 'EFG123 - Chofer3'];
	//  $scope.selection = $scope.carros[0];
	$scope.registrarPedido = function() {
		serviceData.setChoferCarro($scope.carroSelected);
		serviceData.setFechaPedido($scope.fecha);
		$location.path('/formSalidaAl');
	}

}])

.controller('planillaAlCtrl', ['$scope', '$location', '$filter', '$http', '$q', 'serviceData', function($scope, $location, $filter, $http, $q, serviceData) {
	$scope.message = "Crear Pedido Carro Paso 2 de 2";
	$scope.datoslabel = "Datos Chofer";
	$scope.chofer = serviceData.getChoferCarro();
	$scope.fecha = serviceData.getFechaPedido();
	$scope.placa = "ABC123";


	$scope.cambiarPedido = function() {
		$location.path('/nuevaPlanillaAl');
	}
	$scope.addProducto = function() {
		//Add Product Logic
	}

	$scope.users = [{
		id: 1,
		name: 'awesome user1',
		status: 2,
		group: 4,
		groupName: 'admin'
	}, {
		id: 2,
		name: 'awesome user2',
		status: undefined,
		group: 3,
		groupName: 'vip'
	}, {
		id: 3,
		name: 'awesome user3',
		status: 2,
		group: null
	}];

	$scope.statuses = [{
		value: 1,
		text: 'status1'
	}, {
		value: 2,
		text: 'status2'
	}, {
		value: 3,
		text: 'status3'
	}, {
		value: 4,
		text: 'status4'
	}];

	$scope.groups = [];
	$scope.loadGroups = function() {
		return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
			$scope.groups = data;
		});
	};

	$scope.showGroup = function(user) {
		if (user.group && $scope.groups.length) {
			var selected = $filter('filter')($scope.groups, {
				id: user.group
			});
			return selected.length ? selected[0].text : 'Not set';
		} else {
			return user.groupName || 'Not set';
		}
	};

	$scope.showStatus = function(user) {
		var selected = [];
		if (user.status) {
			selected = $filter('filter')($scope.statuses, {
				value: user.status
			});
		}
		return selected.length ? selected[0].text : 'Not set';
	};

	$scope.checkName = function(data, id) {
		if (id === 2 && data !== 'awesome') {
			return "Username 2 should be `awesome`";
		}
	};

	// filter users to show
	$scope.filterUser = function(user) {
		return user.isDeleted !== true;
	};

	// mark user as deleted
	$scope.deleteUser = function(id) {
		var filtered = $filter('filter')($scope.users, {
			id: id
		});
		if (filtered.length) {
			filtered[0].isDeleted = true;
		}
	};

	// add user
	$scope.addUser = function() {
		$scope.users.push({
			id: $scope.users.length + 1,
			name: '',
			status: null,
			group: null,
			isNew: true
		});
	};

	// cancel all changes
	$scope.cancel = function() {
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
		};
	};

	// save edits
	$scope.saveTable = function() {
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
}])


.service('serviceData', function() {
	var choferCarro = '';
	var fechaPedido = '';
	return {
		getChoferCarro: function() {
			return choferCarro;
		},
		setChoferCarro: function(chofer) {
			choferCarro = chofer;
		},
		getFechaPedido: function() {
			return fechaPedido;
		},
		setFechaPedido: function(fecha) {
			fechaPedido = fecha;
		}
	};


});