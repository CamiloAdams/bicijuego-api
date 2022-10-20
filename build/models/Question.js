"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var questionSchema = new _mongoose.Schema({
  pregunta: String,
  respuesta: Boolean,
  imgURL: String
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Question", questionSchema);
exports["default"] = _default;