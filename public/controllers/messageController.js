angular.module('mainController')
	.controller('inicioCtrl', function ($scope){
		$scope.message = "Bienvenido al Sistema de Salidas de Productos";
	});
angular.module('mainController')
	.controller('listaEmpleadoCtrl', function ($scope){
		$scope.message = "Empleados existentes en Sistema";
	});
angular.module('mainController')
	.controller('nuevoEmpleadoCtrl', function ($scope){
		$scope.message = "Crear nuevo empleado:";
	});
angular.module('mainController')
	.controller('listaUserCtrl', function ($scope){
		$scope.message = "Usuarios existentes en Sistema";
	});
angular.module('mainController')
	.controller('nuevoUserCtrl', function ($scope){
		$scope.message = "Crear nuevo Usuario:";
	});
angular.module('mainController')
	.controller('planillaSalPendACtrl', function ($scope){
		$scope.message = "Planillas Pendientes del dia:";
	});
angular.module('mainController')
	.controller('planillaSalACtrl', function ($scope){
		$scope.message = "Planillas Revisadas del dia:";
	});
angular.module('mainController')
	.controller('planillaLiqPendCtrl', function ($scope){
		$scope.message = "Planillas de Liquidacion Pendientes:";
	});

angular.module('mainController')
	.controller('planillaLiqCtrl', function ($scope){
		$scope.message = "Planilla de Liquidacion del dia";
	});

angular.module('mainController')
	.controller('reporteLiqEmpCtrl', function ($scope){
		$scope.message = "Reporte de Planillas de Liquidacion por Empleado";
	});
angular.module('mainController')
	.controller('reporteLiqFCtrl', function ($scope){
		$scope.message = "Reporte de Planillas de Liquidacion por fecha";
	});
angular.module('mainController')
	.controller('reporteSalProdFCtrl', function ($scope){
		$scope.message = "Reporte de Planillas de Salida por fecha";
	});
angular.module('mainController')
	.controller('reporteSalProdECtrl', function ($scope){
		$scope.message = "Reporte de Planillas de Salida por Empleado";
	});
angular.module('mainController')
	.controller('listaEmpAdCtrl', function ($scope){
		$scope.message = "Lista de Empleados";
	});
angular.module('mainController')
	.controller('listaCarroCtrl', function ($scope){
		$scope.message = "Lista de Carros";
	});
angular.module('mainController')
	.controller('planillaDiaAlCAlCtrl', function ($scope){
		$scope.message = "Lista de Planilla de Salidas Almacenes del dia";
	});
angular.module('mainController')
	.controller('nuevaPlanillaAlCtrl', function ($scope){
		$scope.message = "Crear Nueva Planilla";
	});
angular.module('mainController')
	.controller('reporteProductoGralCtrl', function ($scope){
		$scope.message = "Reporte Productos en gral";
	});
angular.module('mainController')
	.controller('reporteProductoExistAlCtrl', function ($scope){
		$scope.message = "Reporte Productos fisicos existentes en alamcenes";
	});

angular.module('mainController')
	.controller('registroProductosCtrl', function ($scope){
		$scope.message = "Registro de Productos";
	});

angular.module('mainController')
	.controller('reportesCtrl', function ($scope){
		$scope.message = "Reportes";
	});

angular.module('mainController')
	.controller('reportes1Ctrl', function ($scope){
		$scope.message = "Reportes 1";
	});

angular.module('mainController')
	.controller('reportes2Ctrl', function ($scope){
		$scope.message = "Reportes 2";
	});