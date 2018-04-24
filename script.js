  var app=angular.module('myapp',['ui.router']);

 app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider
  .state("additems", {
        url:'/additems',
        views:{
          'additemstopage':{
            templateUrl : 'addtopage.html',
            controller:'addctrl'
          }
        }  
    })
 .state("viewcart", {
        url:'/viewcart',
        views:{
          'viewcart':{
            templateUrl : 'viewcart.html',
            controller:'cartviewctrl'
          }
        }  
    })
 .state("viewproduct", {
        url:'/productdetail',
        views:{
          'productdetail':{
            templateUrl : 'productdetail.html',
            controller:'productdetail'
          }
        }  
    })
  .state("viewall", {
        url:'/viewall',
        views:{
          'viewall':{
            templateUrl : 'viewitems.html',
            controller:'viewctrl'
          }
        }  
    });
  $urlRouterProvider.otherwise("/viewall");
}]);


app.service('data',function () {

    this.productlist=[
    {proname:'Oneplus 5T',img:'1.jpg',category:'Mobiles',price:2000,description:'This product is a very good eeficent and works reliable' },
    {proname:'Ponniyin Selvan',img:'pon.jpg',category:'Books',price:100,description:'written By Kalki contains very intersting thoughts and nice to read' },
    {proname:'Royal Enfield Classic',img:'ro.jpg',category:'Vechicles',price:100000,description:'nice matee black color'}];
 
    this.catnames=['Mobiles','Books','Vechicles'];
    this.cartlist=[];
    this.checkoutItem=[];
  
    this.setproductlist = function(proname,imname,category,price,description) {
       this.productlist.push({proname: proname,img:imname,category:category ,price: price,description:description});
    };

    this.setcatnames = function(category) {
       this.catnames.push(category);
    };

    this.setcartlist = function(name,img,price) {
      this.cartlist.push({proname:name,imge:img,price:price});
   };

   this.setcheckoutItem = function(name,img,price,checkid) {
    this.cartlist.push({proname:name,imge:img,price:price,id:checkid});
 };

    this.getproductlist = function(){
        return this.productlist;
    };

     this.getcatnames = function(){
        return this.catnames;
    };

    this.getcartlist = function(){
        return this.cartlist;
    };

    this.getcheckoutItem = function(){
      return this.checkoutItem;
  };
});

app.controller('addctrl',['$scope','data',function($scope,data) {
 $scope.catnames=data.getcatnames();
  $scope.addproduct=function(){
    if ((angular.isDefined($scope.proname))&&(angular.isDefined($scope.imname))&&(angular.isDefined($scope.category))&&(angular.isDefined($scope.price))&&(angular.isDefined($scope.descriptin))&&($scope.proname != '') &&($scope.imname != '')&&($scope.category != '') && ($scope.price != '') && ($scope.descriptin != '')) {

   data.setproductlist($scope.proname,$scope.imname,$scope.category ,$scope.price,$scope.descriptin);
                    $scope.proname = '';
                    $scope.imname='';
                    $scope.category = '';
                    $scope.price = '';
                    $scope.descriptin = '';
    }
    console.log(data.getproductlist());
  }
$scope.addcatname=function(){
  if((angular.isDefined($scope.catname))&&($scope.catname !='')){

    data.setcatnames($scope.catname);
    $scope.catname='';

  }
}
  }]);

  
app.controller('viewctrl',['$scope','data',function($scope,data) {
  $scope.catnames=data.getcatnames();
  $scope.products=data.getproductlist();
$scope.cartlist=data.getcartlist();
$scope.alerttype='alert-success';
 $scope.showSuccessAlert = false;
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };


$scope.additems=function(name,img,price){
  data.setcartlist(name,img,price);

  $scope.successTextAlert = "Your Item Added to cart";
  $scope.alerttype='alert-success';
  $scope.showSuccessAlert = true;

}

    }]);
app.controller('cartviewctrl',['$scope','data',function($scope,data) {
  $scope.cartlist=data.getcartlist();
  $scope.checkouttotal=0;
  $scope.none = true;
  $scope.nodata = false;
  if($scope.cartlist.length==0){
      $scope.none=false;
      $scope.nodata=true;
    }else{
      $scope.none=true;
      $scope.nodata=false;
    }
for(var i=0;i<$scope.cartlist.length;i++){
      $scope.checkouttotal+=$scope.cartlist[i].price;
}
$scope.generateId=function() {
  $scope.checkoutId='';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <9; i++){
  $scope.checkoutId+= possible.charAt(Math.floor(Math.random() * possible.length));
  }
  $scope.none = false;
 
}

}]);  