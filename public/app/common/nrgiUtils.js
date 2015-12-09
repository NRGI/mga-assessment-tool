
// angular.module('app').factory('nrgiUtils', function(nrgiToastr) {
//   return {
//     notify: function(msg) {
//       nrgiToastr.success(msg);
//       console.log(msg);
//     },
//     error: function(msg) {
//       nrgiToastr.error(msg);
//       console.log(msg);
//     }
//   }


// angular.module('app').filter('capitalize', function() {
//   return function(input, all) {
//     return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
//   }
// });