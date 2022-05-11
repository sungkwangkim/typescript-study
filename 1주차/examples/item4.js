function caculateLength(v) {
    return Math.sqrt(v.x * v.y + v.y * v.y);
}
var v = { x: 3, y: 4, name: 'zee' };
var r = caculateLength(v); // 정상 결과는 5
console.log(r);
function caculateLength1(v) {
    var length = 0;
    for (var _i = 0, _a = Object.keys(v); _i < _a.length; _i++) {
        var axis = _a[_i];
        var coord = v[axis];
        length += Math.abs(coord);
    }
    return length;
}
var vec3D = { x: 3, y: 4, z: 1, address: '123 hi' };
caculateLength1(vec3D);
