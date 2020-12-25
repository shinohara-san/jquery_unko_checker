// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "poopp-cktr.firebaseapp.com",
  databaseURL: "https://poopp-cktr.firebaseio.com",
  projectId: "poopp-cktr",
  storageBucket: "poopp-cktr.appspot.com",
  messagingSenderId: "190304621",
  appId: "1:190304621:web:af80653e9403cfb5b08a64",
  measurementId: "G-89WGWGH1MV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore().collection('chat');
// console.log(db);

var idArray = [];

var form = $('#unko_form');

$('#send').on('click', function (e) {
  e.preventDefault();  
// form.submit(function (e) {
  // input[type=date]削除したらこれが朝夕の値を持ち出した
  var calender = form[0][0].value;
  // console.log(calender);
  // var time = form[0][1].value
  // console.log(time);
  var chokoUnko = $("input[name='chokoUnko']:checked").val();
  // console.log(chokoUnko);
  var kotsuUnko = $("input[name='kotsuUnko']:checked").val();
  // console.log(kotsuUnko);

  // 日時を取得する関数
  function getNowDatetime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);
    // const sec = ('0' + date.getSeconds()).slice(-2);
    return `${year}/${month}/${day} ${hour}:${min}`
  }

  // submitボタンクリック時にデータを送信する処理
  // こいつらが前の方にあったら動かなかった→データ取得してそれを代入、よってこいつら後ろ
  db.add({
    calender: calender,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    chokoUnko: chokoUnko,
    kotsuUnko: kotsuUnko,
    clocktime: getNowDatetime(),
  });

  $('#send_modal').fadeIn();
  var modalFade = function () {
    $('#send_modal').fadeOut();
  };
  setTimeout(modalFade, 3000);
});

db.orderBy('clocktime', 'desc').onSnapshot(function (querySnapshot) {
  let str = '';
  idArray = querySnapshot;
  querySnapshot.forEach(function (doc) {
    const id = doc.id;
    const data = doc.data();
    // console.log(data);
    str += '<div id="' + id + '">';
    str += '<p>' + data.clocktime + '</p>';
    str += '<p>' + data.calender + '</p>';
    
    str += '<p>' + data.chokoUnko + '</p>';
    str += '<p>' + data.kotsuUnko + '</p>';
    str += '</div>'
    str += '<hr>'
  });
  $('#output').html(str);
});


$('#delete').on('click', function () {
    // 削除の処理
    console.log(idArray);
    idArray.forEach(function (doc) {
      console.log('id表示' + doc.id);
      db.doc(doc.id).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    });
  
});



