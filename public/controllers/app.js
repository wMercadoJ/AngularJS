/**
 * Created by Luffy on 04/07/2015.
 */
angular.module('mainApp', [
    'ngSanitize',
    'ngRoute',
    'mainApp.navBar',
    'mainApp.inicio',
    'mainApp.listaCarro',
    'mainApp.listaEmpAd',
    'mainApp.listaEmpleado',
    'mainApp.listaUser',
    'mainApp.nuevaPlanillaAl',
    'mainApp.nuevoEmpleado',
    'mainApp.nuevoUser',
    'mainApp.planillaDiaAlCAl',
    'mainApp.planillaLiq',
    'mainApp.planillaLiqPend',
    'mainApp.planillaSalA',
    'mainApp.planillaSalPendA',
    'mainApp.registroProductos',
    'mainApp.reporteLiqEmp',
    'mainApp.reporteLiqF',
    'mainApp.reporteProductoExistAl',
    'mainApp.reporteProductoGral',
    'mainApp.reportes1',
    'mainApp.reportes2',
    'mainApp.reporteSalProdE',
    'mainApp.reporteSalProdF',
    'mainApp.reportes',
    'xeditable'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'pages/home.html'
                //controller: 'inicioCtrl',
            })
            .when('/planillaDiaAl', {
                templateUrl: 'pages/almacenes/planillaDiaAl.html',
                controller: 'planillaDiaAlCAlCtrl',
            })
            .when('/nuevaPlanillaAl', {
                templateUrl: 'pages/almacenes/nuevaPlanillaAl.html',
                controller: 'nuevaPlanillaAlCtrl',
            })
            .when('/reporteProductoGral', {
                templateUrl: 'pages/almacenes/reporteProdGral.html',
                controller: 'reporteProductoGralCtrl',
            })
            .when('/reporteProductoExistAl', {
                templateUrl: 'pages/almacenes/reporteProdAl.html',
                controller: 'reporteProductoExistAlCtrl',
            })
            .when('/listaEmpleado', {
                templateUrl: 'pages/administradorCuentas/listaEmp.html',
                controller: 'listaEmpleadoCtrl',
            })
            .when('/nuevoEmpleado', {
                templateUrl: 'pages/administradorCuentas/nuevoEmp.html',
                controller: 'nuevoEmpleadoCtrl',
            })
            .when('/listaUser', {
                templateUrl: 'pages/administradorCuentas/listaUser.html',
                controller: 'listaUserCtrl',
            })
            .when('/nuevoUser', {
                templateUrl: 'pages/administradorCuentas/nuevoUser.html',
                controller: 'nuevoUserCtrl',
            })
            .when('/planillaSalPendA', {
                templateUrl: 'pages/administrador/planillaSalPendA.html',
                controller: 'planillaSalPendACtrl',
            })
            .when('/planillaSalA', {
                templateUrl: 'pages/administrador/planillaSalA.html',
                controller: 'planillaSalACtrl',
            })
            .when('/planillaLiqPend', {
                templateUrl: 'pages/administrador/planillaLiqPend.html',
                controller: 'planillaLiqPendCtrl',
            })
            .when('/planillaLiq', {
                templateUrl: 'pages/administrador/planillaLiq.html',
                controller: 'planillaLiqCtrl',
            })
            .when('/reporteLiqFecha', {
                templateUrl: 'pages/administrador/reporteLiqF.html',
                controller: 'reporteLiqFCtrl',
            })
            .when('/reporteLiqEmp', {
                templateUrl: 'pages/administrador/reporteLiqEmp.html',
                controller: 'reporteLiqEmpCtrl',
            })
            .when('/reporteSalProdF', {
                templateUrl: 'pages/administrador/reporteSalProdF.html',
                controller: 'reporteSalProdFCtrl',
            })
            .when('/reporteSalProdE', {
                templateUrl: 'pages/administrador/reporteSalProdE.html',
                controller: 'reporteSalProdECtrl',
            })
            .when('/listaEmpAd', {
                templateUrl: 'pages/administrador/listaEmpAd.html',
                controller: 'listaEmpAdCtrl',
            })
            .when('/listaCarro', {
                templateUrl: 'pages/administrador/listaCarro.html',
                controller: 'listaCarroCtrl',
            })
            .when('/listaCarro', {
                templateUrl: 'pages/administrador/listaCarro.html',
                controller: 'nuevaPlanillaAlCtrl',
            })
            .when('/formSalidaAl', {
                templateUrl: 'pages/almacenes/formSalidaAl.html',
                controller: 'planillaAlCtrl',
            })

    }]);
