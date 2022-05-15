# 1장 타입스크립트 알아보기

## 아이템1 타입스크립트와 자바스크립트관계 이해하기
> 타입스크립트는 자바스크립트의 상위 집합 == 자바스크립트는 타입스크립트의 부분집합

- 타입추론
city 변수가 문자열이라는 것을 알려주지 않아도 초깃값으로 타입을 추론하는것
```javascript
let city = 'new york city';
console.log(city.toUppercase());
```


### 타입스크립트의 목표
**런타임에 오류를 발생시킬 코드를 미리 찾아 내는것!**
모든 오류를 찾아내는건 아님

예를 들어,, 아래의 오타 오류를 찾아냄! (타입스크립트 만쉐이~!)
```javascript
const state = [
    {name: "AAA", capital: "1111"},
    {name: "BBB", capital: "2222"},
    {name: "CCC", capital: "333"},
]

for (const state of states) {
    console.log(state.capitol);
}

------- output------
undefined
undefined
undefined

```



### 타입 시스템은 자바스크립트의 런타임 동작을 '모델링' 한다.
자바스크립트의 런타임 동작을 모델링하는 것은 타입스크립트 타입 시스템의 기본 원칙.


아래의 코드가 당연하다고 생각하면, 타입스크립트를 도입안하는게 좋음.
```javascript
const a = null + 7;
const a = null + 11;
```

<br />
<br />
<br />



## 아이템2 타입스크립트 설정 이해하기
어떻게 설정하느냐에 따라 완전히 다른 언어처럼 느낄수 있음
설정을 제대로 사용하려면 아래 2가지를 이해해야함
- `noImplicitAny`
- `strictNullChecks`

<br />


### `noImplicitAny`
변수들이 미리 정의된 타입을 가져야 하는지여부를 제어함.

```javascript
function add(a, b)
 // 'a' 매개변수에는 암ㅣ적으로 'any' 형식이 포함됨
```
이상황에서 noImplicitAny가 설정되어 있다면, 위 코드는 오류.

**타입스크립트는 타입정보를 가질때 가장 효과적이기 때문에 되도록 이면 noImplicitAny를 설정해야함.**

> 새 프로젝트를 시작한다면, 처음부터 noImplicitAny를 설정하여 코드를 작성할때마다 타입을 명시하도록 해야함.


<br />

### `strictNullChecks`

`strictNullChecks` 해제시 아래코드는 유효
```javascript
const x: number = null;
```

<br />


`strictNullChecks` 설정시 아래코드는 오류.

null 대신 undefined를 써도 오류

```javascript
const x: number = null;
```

`strictNullChecks` 설정은 null, undefined 관련 오류를 잡아내는데 많은 도움을 준다.

새로 프로젝트 시작
- `strictNullChecks` 설정 추천


기존코드 마이그레이션중
- `strictNullChecks` 해제 해도 됨.



<br />
<br />
<br />


## 아이템3 코드 생성과 타입이 관계없음을 이해하기
### 타입스크립트 컴파일러의 2가지 역활
- 트랜스 파일(transpile)
- 코드의 타입 오류 체크
위 2개가 완전히 독립적.

### 타입 오류가 있는 코드도 컴파일 가능
   - 오류가 있을때 컴파일하지 않으려면, tsconfig.jsondp `noEmitOnError`를 설정


### 런타임에 타입체크 불가능

- 인터페이스는 타입으로만 사용 가능

```javascript
interface Square {
    width: number;
}

interface Rectangle extends Square {
    height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
        // height를 찾을수 없음. 컴파일 오류!
    }
}
```

- 클래스로 선언하면, 타입과 값으로 모두 사용할수 있음

**`type Shape = Square | Rectagle` 부분에서 Rectangle은 타입으로 참조 되지만, `shape instanceof Rectangle` 부분에서는 값으로 참조됨**
어떻게 참조되는지 구분하는 건 매우 중요함. 아이템8장에서 다룸.
```javascript
class Square {
    constructor(public width: number) {}
}

class Rectangle extends Square {
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    else {
        return shape.width * shape.width;
    }
}
```

### 타입 연산은 런타임에 영향을 주지 않습니다.
as number는 '타입 단언문' 입니다. 이런 문법이 언제 적절히 사용될 수 있는지 아이템9장에서 다룸
```javascript
function asNumber(val: number | string): number {
    return typeof(val) === 'string' ? Number(val) : val;
}
```

### 런타임 타입은 선언된 타입과 다를 수 있습니다.
```javascript
function setLightSwitch(value: boolean) {
    switch (value) {
        case true:
            console.log(true);
            break;
        case false:
            console.log(false);
            break;
        default:
            console.log('default')
    }
}

interface LightApiResponse {
    lightSwitchValue: boolean;
}

async function setLight() {
    const response = await fetch('/light');
    const result: LightApiResponse = await response.json();
    setLightSwitch(result.lightSwitchValue);

    // /light를 요청하면 LightApiResponse를 반환하라고 선언했지만, 실제로 그렇게 되리라는 보장은 없습니다.
}
```

- 타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있습니다.
- 선언된 타입이 언제든지 달라질 수 있다는 것을 명심해야 합니다.


### 타입스크립트 타입으로는 함수를 오버로드할 수 없습니다.
타입스크립트에서는 타입과 런타임 동작이 무관하기 대문에, 함수 오버로딩은 불가능.
```javascript
function add (a: number, b: number) {
    return a + b;
}

function add (a: number, b: string) {
    return a + b;
}
```

### 타입스크립트 타입은 런타임 성능에 영향을 주지 않습니다.
- 타입과 타입 연산자는 자바스크립트 변환시점에 제거되기 때문에, 런타임의 성능에 영향을 주지 않습니다.

- 타입스크리트 컴파일러는 '빌드타임' 오버헤드가 있지만 상당히 빠른 편임
- 혹시라도 빌드 오버헤드가 커지면, '트렌스파일만(transpile only)'을 설정하여 타입체크를 skip 할수 있음.
- ES5로 타킷으로 컴파일될때 호환성을 위한 특정 헬퍼 코드를 추가하는데, 이런경우 호환성을 위한 오버헤드 또는 성능을 위한 네이티브 구현체 선택 문제임.
- 즉.. 호환성과 성능 사이의 선택은 컴파일 타킷과 언어 레벨의 문제이며, 여전히 타입과는 무관함.


<br>
<br>
## 아이템4 구조적 타이핑에 익숙해지기


### 구조적 타이핑이란?
NamedVector의 구조가 Vector2D와 호환이 되기 때문에 calculateLength 호출이 가능하는 것을 구조적 타이핑(structual typeing)
```javascript
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
    return math.sqrt(v.x * x.y + v.y * v.y)
}


const v: NamedVector = { x: 3, y: 4, name: 'zee'}
caculateLength(v) // 정상 결과는 5
```


<br>
루프를 쓰는것 보다, 모든속성을 구현하는것이 더 좋음.

BAD
```javascript
function caculateLength1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis]
        length += Math.abs(coord)
    }
    return length
}

// address 속성부터 에러가 나서 이 예재는 잘못된 예재인듯..
const vec3D: Vector3D = { x: 3, y: 4, z: 1, address: '123 hi'}
caculateLength1(vec3D) 
```

<br>

GOOD
```javascript
function caculateLength1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
        const coord = v[axis]
        length += Math.abs(coord)
    }
    return length
}

// address 속성부터 에러가 나서 이 예재는 잘못된 예재인듯..
const vec3D: Vector3D = { x: 3, y: 4, z: 1, address: '123 hi'}
caculateLength1(vec3D) 
```


## 아이템5 any 타입 지양하기
any를 사용하면 타입스크립트의 수많은 장점을 누릴 수 없게 된다.
부득이하게 any를 사용하더라도 그 위험성을 알고 있어야 합니다.

- any 타입에는 타입 안정성이 없습니다.
- any 타입은 코딩시 자동완성이 안됩니다.
- any 타입은 코드 리팩터링 때 버그를 감춥니다.                                                                                           
```javascript
// interface에서 any를 number로 변경시 2군데를 수정해야 한다.
interface Props {
    onSelectedItem: (item: any) = > void;
}
function Comp (props: Props) {
   const { onSelectedItem } = props;
}



let selectedId: number = 0;
function handleSelecItem(item: any) {
    selectedId = item.id;
}

Comp({onSelectedItem: handleSelectItem})

```
- any는 타입 설계를 감춰버립니다.




# 2장 타입스크립트의 타입 시템
타입스크립트의 가장 중요한 역활은 타입 시스템.

2장에서 다루는것
- 타입 시스템이란 무엇인지?
- 어떻게 사용?
- 무엇을 결정?
- 가급적 사용하지 말아야 할 기능.

<br />

## 아이템6 편집기를 사용하여 타입 시스템 탐색하기

- 타입스크립트 컴파일러(tsc)
- 단독으로 실행할 수 있는 타입스크립트 서버(tsserver)

타입스크립트가 타입을 어떻게 이해하고 있는지 살펴보는 것. (아래 2가지 개념 중요)
- 타입 넓히기 (아이템 21)
- 타입 좁히기 (아이템 22)

<br />
내가 typescript를 쓰면서 가장 좋았던 부분. null 체크

```javascript
function getElement(elemId: string|HTMLElement|null): HTMLElement {
    if (typeof elemId === 'object') {
        return elemId;
        // ~~~~~~~ 'HTMLElement | null 
    }
    else if (elemId === null) {
        return document.body;
    }
    else {
        const el = document.getElementById(elemId);
        return el;
        // ~~~~~~~ 'HTMLElement | null 
    }
}
```

## 아이템7 타입이 값들의 집합이라고 생각하기

가장 작은 집한은 아무것도 포함하지 않는 공집합이며,
타입스크립트에서는 `never` 타입입니다.

(드디어 never가 나왔군...)

`never`타입으로 선언된 변수의 범위는 공집합이기 때문에 아무런 값도 할당할 수 없습니다.

(never는 어떻게 쓰는거지? 매우 궁금..)

- 리터럴 타입 (유닛타입)
   - 가장 작은 집합
- 유니온 타입
   - 2이상 묶은거 (|)



타입스크립트 용어와 집합용어
- never --> 공집합
- 리터럴 --> 원소가 1개인 집합
- 값이 T에 할당 가능 --> 값이 T의 원소
- T1이 T2에 할당 가능 --> T1이 T2의 부분 집합
- T1이 T2를 상속 --> T1이 T2의 부분 집합
- T1 | T2 --> T1과 T2의 합집합
- T1 & T2 --> T1과 T2의 교집합
- unknown --> 전체 (universal) 집합


## 아이템8 타입 공간과 값 공간의 심벌 구분하기

> 심벌?<br>
> interface Person { ... } <br>
> const Person = ... <br>
> 위와 같이 인터페이스명, 함수명, 변수명을 칭하는 용어00 


타입스크립트의 심벌(symbol)은 타입 공간이나 값 공간 중의 한 곳에 존재합니다.

(타입공간? 값 공간? 이라는 개념있구만! 아직 모름!)

2공간의 개념을 잡으려면, 타입스크립트 플레이그라운드를 활용 (https://www.typescript.org/play)


```javascript

// 이렇게 쓰는것을 타입 공간
interface Cylinder {
    radius: number;
    height: number;
}

// 이렇게 쓰면 값 공간
const Cylinder = {radius: number, height: number} => ({radius, height})


function calculateVolume(shape: unknow) {
    if (shape instanceof Cylinder) {
        shape.radius = shape.radius
        // ~~~~~~~ '{}' 형식에 'raduis' 속성이 없다

    }
}
```


instanceof Cylinder는 타입이 아니라, 함수를 참조함.

(의도는 interface의 Cylinder로 체크하기 원했음.)

instanceof는 자바스크립트 런타입에 연산자이기 때문에, 값에 대해서 연산을 함.
<br /><br />


### 제너릴 타입의 한정자(Generic<T extends number>) 이해했음! 
이것을 이해라면, index 타입을 이해해야함.


<br />
<br />

함수 파라미터에서 구조분해를 할떄 좋은 방법

```javascript
// base
function email(option: {person: Person, subject: string, body: string}) {
    // ...
}

// Bad
// 오류남..
function email({
    person: Person,
    // ~~~~~ 바인딩 요소 'Person'에 암시적으로 'any' 형식이 있습니다.
    subject: string,
    body: string
}) {
    // ...
}


// Good
function email({
    person,
    subject,
    body
}: {person: Person, subject: string, body: string}) {
    // ...
}
```