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
  $scope.role = "Almacenes";
  if($scope.role == "Admin"){
    $scope.menus = [{
        title : "Planilla Salida",
        action : "planillaSalidaAd",
        href: "#/planillaSalidaAd"
      },
      {
        title : "Liquidacion",
        action : "liquidacion",
        href: "#/planillaLiquidacion"
      },
      {
        title : "Reportes",
        menu : [
          {
            title : "Reporte A",
            action : "reporte.A",
            href: "#/reporteA"
          },
          {
            title : "Reporte B",
            action : "reporte.B"
          },
          {
            divider: true
          },
          {
            title : "Reporte C",
            action : "reporte.C"
          }
        ]
      }
    ]; // end menus
  }


  if($scope.role == "Almacenes"){
    $scope.menus = [{
        title : "Planilla Salida",
        action : "planillaSalidaAl",
        href: "#/planillaSalidaAl"
      },
      {
        title : "Reportes",
        menu : [
          {
            title : "Reporte A",
            action : "item.one"
          },
          {
            title : "Reporte B",
            action : "item.two"
          },
          {
            divider: true
          },
          {
            title : "Reporte C",
            action : "item.three"
          }
        ]
      }
    ]; // end menus
  }

  if($scope.role == "SA"){
    $scope.menus = [{
        title : "Reportes",
        menu : [
          {
            title : "Reporte A",
            action : "item.one"
          },
          {
            title : "Reporte B",
            action : "item.two"
          },
          {
            divider: true
          },
          {
            title : "Reporte C",
            action : "item.three"
          }
        ]
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

.controller('carrosController',function($scope, $http){
  $scope.newCarro = {};
  $scope.carros = {};
  $scope.selected = false;

  // Obtenemos todos los datos de la base de datos
  $http.get('/api/carro').success(function(data) {
    $scope.carros = data;
  })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  $scope.registrarCarro = function() {
    $http.post('/api/carro', $scope.newCarro)
        .success(function(data) {
          $scope.newCarro = {}; // Borramos los datos del formulario
          $scope.carros = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };

  // Función para editar los datos de una persona
  $scope.modificarCarro = function(newCarro) {
    $http.put('/api/carro/' + $scope.newCarro._id, $scope.newCarro)
        .success(function(data) {
          $scope.newCarro = {}; // Borramos los datos del formulario
          $scope.carros = data;
          $scope.selected = false;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };

  // Función que borra un objeto persona conocido su id
  $scope.borrarCarro = function(newCarro) {
    $http.delete('/api/carro/' + $scope.newCarro._id)
        .success(function(data) {
          $scope.newCarro = {};
          $scope.carros = data;
          $scope.selected = false;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
  };

  // Función para coger el objeto seleccionado en la tabla
  $scope.selectCarro = function(carro) {
    $scope.newCarro = carro;
    $scope.selected = true;
    console.log($scope.newCarro, $scope.selected);
  };
})

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
    .when('/planillaSalidaAl', {	
      templateUrl: 'pages/almacenes/planillaSalidaAl.html',
      controller: 'planillaSalidaAlCtrl',
    })   
    .when('/addEditPlanillaC', {  
      templateUrl: 'pages/almacenes/addEditPlanillaC.html',
      controller: 'addEditPlanillaCAllCtrl',
    })   
    .when('/planillaLiquidacion', {
      templateUrl: 'pages/planillaLiquidacion/planillaLiquidacion.html',
      controller: 'planillaLiquidacionCtrl',
    })


}])


