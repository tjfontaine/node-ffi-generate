// Copyright 2013 Timothy J Fontaine <tjfontaine@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

var libclang = require('libclang');
var Type = libclang.Type;

module.exports = function (type) {
  var ret;
  switch (type) {
    case Type.Void:
      ret = 'ref.types.void';
      break;
    case Type.Bool:
      ret = 'ref.types.byte';
      break;
    case Type.Char_U:
    case Type.UChar:
      ret = 'ref.types.uchar';
      break;
    case Type.UShort:
      ret = 'ref.types.ushort';
      break;
    case Type.UInt:
      ret = 'ref.types.uint32';
      break;
    case Type.ULong:
      ret = 'ref.types.ulong';
      break;
    case Type.ULongLong:
      ret = 'ref.types.ulonglong';
      break;
    case Type.Char_S:
    case Type.SChar:
      ret = 'ref.types.char';
      break;
    case Type.Short:
      ret = 'ref.types.short';
      break;
    case Type.Int:
      ret = 'ref.types.int32';
      break;
    case Type.Long:
      ret = 'ref.types.long';
      break;
    case Type.LongLong:
      ret = 'ref.types.longlong';
      break;
    case Type.Float:
      ret = 'ref.types.float';
      break;
    case Type.Double:
      ret = 'ref.types.double';
      break;
  }
  return ret;
};
module.exports.CString = 'ref.types.CString';
