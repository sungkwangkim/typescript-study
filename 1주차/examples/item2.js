"use strict";
// 런타임에는 타입 체크가 불가능합니다.
// interface Square {
//     width: number;
// }
// interface Rectangle extends Square {
//     height: number;
// }
// type Shape = Square | Rectangle;
// function calculateArea(shape: Shape) {
//     if (shape instanceof Rectangle) {
//         return shape.width * shape.height;
//     }
//     else {
//         return shape.width * shape.width;
//     }
// }
// class Square {
//     constructor(public width: number) {}
// }
// class Rectangle extends Square {
//     constructor(public width: number, public height: number) {
//         super(width);
//     }
// }
// type Shape = Square | Rectangle;
// function calculateArea(shape: Shape) {
//     if (shape instanceof Rectangle) {
//         return shape.width * shape.height;
//     }
//     else {
//         return shape.width * shape.width;
//     }
// }
function asNumber(val) {
    return val;
}
