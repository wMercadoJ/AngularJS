/*Controlador para el menu y ruteo de paginas de navegacion*/
angular.module('mainController',['ngSanitize','ngRoute'])

.controller('mainDirectiveCtrl',function($scope){
  //=== Variables ===//
  
  $scope.affixed = 'top';
  $scope.search = {
    show : true,
    terms : ''
  };
  $scope.brand = "<span class='glyphicon glyphicon-home'></span> Inicio";
  $scope.inverse = true;
  $scope.role = "Admin";
  if($scope.role == "Admin"){
    $scope.menus = [{
        title : "Planillas de Salida",
        action : "planillaSalPendA",
        href: "#/planillaSalPendA"
      },
      {
        title : "Planillas de Liquidacion",
        action : "planillaLiqPend",
        href: "#/planillaLiqPend"
      },
      {
        title : "Reportes",
        menu : [
          {
            title : "Reporte Planilla Liquidacion",
            action : "reporteLiqFecha",
            href: "#/reporteLiqFecha"
          },
          {
            divider: true
          },
          {
            title : "Reporte Planilla Salida Productos",
            action : "reporteSalProdF",
            href: "#/reporteSalProdF"
          }
        ]
      },
      {
        title : "Empleados",
        action : "listaEmpAd",
        href: "#/listaEmpAd"
      },
      {
        title : "Carros Distribuidores",
        action : "listaCarro",
        href: "#/listaCarro"
      }
    ]; // end menus
  }


  if($scope.role == "Almacenes"){
    $scope.menus = [{
        title : "Planillas de Salida",
        action : "planillaDiaAl",
        href: "#/planillaDiaAl"
      },
      {
        title : "Reportes",
        action : "reporteProductoGralAl",
        href: "#/reporteProductoGral"
      }
    ]; // end menus
  }

  if($scope.role == "AdministradorCuentas"){
    $scope.menus = [{
      title : "Administrar Usuarios",
      action : "listaUser",
      href: "#/listaUser"
    },
      {
        title : "Administrar Empleados",
        action : "listaEmpleado",
        href: "#/listaEmpleado"
      }
    ]; // end menus
  }
  
  
  $scope.item = '';
  $scope.styling = 'Inverse';
  $scope.searchDisplay = 'Visible';
  
      
  $scope.toggleAffixed = function(){
    switch($scope.affixed){
      case 'top':
        $scope.affixed = 'bottom';
        break;
      case 'bottom':
        $scope.affixed = 'none';
        break;
      case 'none':
        $scope.affixed = 'top';
        break;
    };
  }; // end toggleAffixed
}) // end mainDirectiveCtrl

/*Aniadido codigo pa carros*/

/**
 * Angled Navbar Directive
 *
 * @requires: ngSanitize, Bootstrap 3 (jQuery & Bootstrap's JS - responseive features require the inclusion of the Bootstrap JS)
 **/
.directive('angledNavbar',function(){
  return {
    restrict : 'AE',
    scope : {
      brand : '=',
      menus : '=',
      affixed : '=',     
      inverse : '='
    },
    templateUrl : 'nav/navbar.html',
    controller : function($scope,$element,$attrs){
      //=== Scope/Attributes Defaults ===//
      
      $scope.defaults = {
        brand : '<span class="glyphicon glyphicon-certificate"></span>',
        menus : [],
        search : {
          show : false
        }
      }; // end defaults
      
                
      //=== Methods ===//
      
      /**
       * Have Branding
       * Checks to see if the "brand" attribute was passed, if not use the default
       * @result  string
       */
      $scope.haveBranding = function(){
        return (angular.isDefined($attrs.brand)) ? $scope.brand : $scope.defaults.brand;
      }; 
      
      /**
       * Has Menus
       * Checks to see if there were menus passed in for the navbar.
       * @result  boolean
       */
      $scope.hasMenus = function(){
        return (angular.isDefined($attrs.menus));
      };
      
      /**
       * Has Dropdown Menu
       * Check to see if navbar item should have a dropdown menu
       * @param  object  menu
       * @result  boolean
       */
      $scope.hasDropdownMenu = function(menu){
        return (angular.isDefined(menu.menu) && angular.isArray(menu.menu));
      }; // end hasDropdownMenu
      
      /**
       * Is Divider
       * Check to see if dropdown menu item is to be a menu divider.
       * @param  object  item
       * @result  boolean
       */
      $scope.isDivider = function(item){
        return (angular.isDefined(item.divider) && angular.equals(item.divider,true));
      }; // end isDivider
    }
  };
}) // end navbar

.config(['$routeProvider', function($routeProvider){
  $routeProvider   
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'inicioCtrl',
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

}])


