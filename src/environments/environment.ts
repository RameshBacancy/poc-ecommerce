// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //API_BASE_URL: "http://localhost:8000"
  API_BASE_URL: 'https://reqres.in',
  FIRE_BASE_URL: 'https://ng-poc-ecomm.firebaseio.com',
  FIRE_BASE_CONFIG: {
    apiKey: 'AIzaSyAYKFgr6tkzlt17v8dvdtUFGuJWDszI8hE',
    authDomain: 'ng-poc-ecomm.firebaseapp.com',
    databaseURL: 'https://ng-poc-ecomm.firebaseio.com',
    projectId: 'ng-poc-ecomm',
    storageBucket: 'ng-poc-ecomm.appspot.com',
    messagingSenderId: '600467657375',
    appId: '1:600467657375:web:cf0fb34453d7793408c8aa',
    measurementId: 'G-PZJWH0Y4CH'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
