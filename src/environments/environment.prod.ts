export const environment = {
  firebase: {
    projectId: 'microbancosofka',
    appId: '1:469639356538:web:bbd72711b19151d8f79bc3',
    storageBucket: 'microbancosofka.appspot.com',
    apiKey: 'AIzaSyAZaMClmnVZCTpt7n82vMPN4UeUrMjiISA',
    authDomain: 'microbancosofka.firebaseapp.com',
    messagingSenderId: '469639356538',
    measurementId: 'G-H9CMNWMY3C',
  },
  production: true,
  regexEmail:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  regexPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
};
