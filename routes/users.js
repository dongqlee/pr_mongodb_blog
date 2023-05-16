const express = require('express');
const multer = require('multer');
//미들웨어를 추가하는 새로운 방법, 일부 요청에만 적용되어야하는 시나리오에 유용

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function( req, file, cb) { //콜백 = 업로드된 파일에 관해 선택한 이름을 다시 multer로 반환, 콜백 호출이 중요함
    cb(null, 'images'); //두개의 값전달, 1 잠재적 오류, 발생하지 않는다면 null값 넣기 2 파일을 저장하려는 경로
  },
  filename: function( req, file, cb) {
    cb(null, Date.now() +'-'+ file.originalname);//중복 제거를 위해, originalname에는 확장자를 포함한다 
  }
}); // multer이 예측한 대로 새 저장 객체를 생성

const upload = multer({ storage: storageConfig}); //키값으로 전달
//특정 라우터에만 적용하고 싶다면 express 기능 사용가능, 적용할 라우터로 가서 경로 다음에 처리 함수 전에 매개변수 값 추가
// destination 목적지는 업로드 될 파일이 저장될 폴더가 될 것 multer에 지시하는 것

const router = express.Router();

router.get('/', async function(req, res) {
  const users = await db.getDb().collection('users').find().toArray(); //라우터에서 모든 사용자 데이터를 가져오기 위함
  res.render('profiles', {users: users});
});



router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function(req, res) { //단일 업로드
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);
  //multer이 파일명과 경로를 설정, 확장자는 미정 

  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path  //경로 저장
  });

  res.redirect('/');
})

module.exports = router;