/*jshint esversion: 6 */
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import router from "./src/router";
import cors from "cors";
import connectMongo from "connect-mongo";
const app = express();
const port = process.env.PORT || 5000;
const MongoStore = connectMongo(session);

app.set("views", path.join(__dirname, "./views/")); // 默認就是views目錄
app.use("/node_modules/", express.static(path.join(__dirname, "./node_modules/")));

app.use(cors());
app.use(cookieParser("38940293"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "youarehash", // 加密字串: 會與原密碼組合成新的字串, 在進行加密
    resave: false,
    saveUninitialized: true, // session默認直接分配給你一個加密過的key,false: server 真的存資料到 session時, 才分配cookie key
    store: new MongoStore({ url: "mongodb://localhost:27017/sessiondb" }),
    cookie: {
      maxAge: 600 * 1000,
      httpOnly: true,
      secure: true
    }
  })
);

// parse application/json
app.use(bodyParser.json());
app.use(router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res) => {
  res.send("404 Not found...");
});

app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err.message
  });
});

app.listen(port, () => console.log(`server is running at port ${port}...`));
module.exports = app;
