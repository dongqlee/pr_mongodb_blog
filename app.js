const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
//urlencoded 미들웨어를 모든 요청에 적용하지 않고 파일이 업로드 될 것으로 예상되는 라우트에만 적용할 것
app.use(express.static('public'));
app.use('/images', express.static('images'));
//정적인 것으로 제공하기위함, 정적으로 사용 가능한 콘텐츠가 있는 폴더의 이름은 링크의 일부가 아님!!
// 경로가 '/images/imagesname' 이고 요청이 있다면 미들웨어가 활성화 될 것임, /images 필터링

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
