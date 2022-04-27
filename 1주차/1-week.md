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
```

