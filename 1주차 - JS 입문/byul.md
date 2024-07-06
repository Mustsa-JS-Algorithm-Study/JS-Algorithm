> # 제곱수 판별하기

- 나의 풀이

```javascript
function solution(n) {
  for (i = 1; i < n; i++) {
    if (i * i === n) {
      return 1;
    }
  }
  return 2;
}
```

- 좋은 풀이

```javascript
function solution(n) {
  return Number.isInteger(Math.sqrt(n)) ? 1 : 2;
}
```

```
- Number.isInteger() 함수를 사용했다. true false 반환
- 삼항연산자를 사용했다.
```
