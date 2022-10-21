"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _cors = _interopRequireDefault(require("cors"));
var _initialSetup = require("./libs/initialSetup");
var _questions = _interopRequireDefault(require("./routes/questions.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _guides = _interopRequireDefault(require("./routes/guides.routes"));
var _score = _interopRequireDefault(require("./routes/score.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createAdminUser)();
app.set("pkg", _package["default"]);
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.get("/", function (req, res) {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version
  });
});
app.use("/api/questions", _questions["default"]);
app.use("/api/auth", _auth["default"]);
app.use("/api/guides", _guides["default"]);
app.use("/api/scores", _score["default"]);
app.use("/api/users", _user["default"]);
var _default = app;
exports["default"] = _default;