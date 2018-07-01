var firebase = require('firebase')
const { exec } = require('child_process')
var config = {
  apiKey: 'AIzaSyDIpabXAOtnYE0XFMz4hSzhBj7v_fFzrxc',
  authDomain: 'tdh-monitor.firebaseapp.com',
  databaseURL: 'https://tdh-monitor.firebaseio.com',
  projectId: 'tdh-monitor',
  storageBucket: 'tdh-monitor.appspot.com',
  messagingSenderId: '1029367526620',
}
firebase.initializeApp(config)
const finish = async () => {
   const uuid = process.argv[2]
var database = firebase.database()
    await database
    .ref('mail-migration')
    .child(uuid)
    .child('status')
    .set('Done')
    .then(() => process.exit())
}
finish()
