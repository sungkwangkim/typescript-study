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

## 타입 시스템은 자바스크립트의 런타임 동작을 '모델링' 한다.
자바스크립트의 런타임 동작을 모델링하는 것은 타입스크립트 타입 시스템의 기본 원칙.


아래의 코드가 당연하다고 생각하면, 타입스크립트를 도입안하는게 좋음.
```javascript
const a = null + 7;
const a = null + 11;
```



## 아이템2 타입스크립트 설정 이해하기
