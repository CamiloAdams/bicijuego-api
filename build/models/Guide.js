"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var guideSchema = new _mongoose.Schema({
  nombre: String,
  texto: [String],
  imagenes: [String]
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Guide", guideSchema);
exports["default"] = _default;