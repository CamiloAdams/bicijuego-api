"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var scoreSchema = new _mongoose.Schema({
  id_usuario: {
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  },
  respuestas_correctas: Number
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)("Score", scoreSchema);
exports["default"] = _default;