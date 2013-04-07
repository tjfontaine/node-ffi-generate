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
