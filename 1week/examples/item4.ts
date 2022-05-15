interface Vector2D {
    x: number;
    y: number;
}

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

interface NamedVector {
    name: string;
    x: number;
    y: number;
}

function caculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.y + v.y * v.y)
}


const v: NamedVector = { x: 3, y: 4, name: 'zee'}
const r = caculateLength(v) // 정상 결과는 5
console.log(r)



function caculateLength1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis]
        length += Math.abs(coord)
    }
    return length
}


const vec3D: Vector3D = { x: 3, y: 4, z: 1, address: '123 hi'}
caculateLength1(vec3D) 
