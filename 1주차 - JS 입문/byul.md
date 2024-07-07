> ## 1. 제곱수 판별하기

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

  `Number.isInteger()` 함수를 사용했다. true false 반환

  `삼항연산자`를 사용했다.

> ## 2. 피자 나눠먹기 (3)

- 나의 풀이

  ```javascript
  function solution(slice, n) {
    return Math.ceil(n / slice);
  }
  ```

  `Math.ceil()` : 올림

  `Math.floor()` : 내림

  `Math.round()` : 반올림

  `.toFixed(digit)` : 고정 소수점 만들기

> ## 3. 특정 문자 제거하기 ⭐

- 나의 풀이

  ```javascript
  function solution(my_string, letter) {
    var new_string = "";
    for (i = 0; i < my_string.length; i++) {
      if (my_string[i] === letter) continue;
      else new_string += my_string[i];
    }
    return new_string;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(my_string, letter) {
    const answer = my_string.split(letter).join("");
    return answer;
  }
  ```

  letter로 `split`하고 `join` 했다.

  ```javascript
  function solution(my_string, letter) {
    return my_string.replaceAll(letter, "");
  }
  ```

  `replaceAll(letter, "")` : letter를 ""로 바꾼다.

  ```javascript
  function solution(my_string, letter) {
    return Array.from(my_string)
      .filter((t) => t !== letter)
      .join("");
  }
  ```

  `Array.from(문자열)`으로 배열로 만들었다.

> ## 4. 최댓값 만들기 (1)

- 나의 풀이

  ```javascript
  function solution(numbers) {
    for (i = 0; i < numbers.length; i++) {
      for (j = 0; j < numbers.length - 1; j++) {
        if (numbers[i] > numbers[j]) {
          var temp = numbers[j];
          numbers[j] = numbers[i];
          numbers[i] = temp;
        }
      }
    }
    return numbers[0] * numbers[1];
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(numbers) {
    numbers.sort((a, b) => b - a);
    return numbers[0] * numbers[1];
  }
  ```

  `배열.sort` 를 몰랐다.

  `sort()`는 오름차순
  `sort((a,b)=>b-a)`는 내림차순

> ## 5. 배열 원소의 길이

- 나의 풀이

  ```javascript
  function solution(strlist) {
    return strlist.map((el) => el.length);
  }
  ```

> ## 6. 피자 나눠 먹기 (2)

- 나의 풀이

  ```javascript
  function solution(n) {
    var big = n > 6 ? n : 6;
    var small = n < 6 ? n : 6;
    for (i = big; i <= n * 6; i++) {
      if (i % n === 0 && i % 6 === 0) {
        return i / 6;
      }
    }
  }
  ```

  최소공배수를 구하려고 했다.

- 좋은 풀이

  ```javascript
  const solution = (n) => {
    let piece = 6;

    while (true) {
      if (piece % n === 0) {
        break;
      }
      piece += 6;
    }

    return piece / 6;
  };
  ```

> ## 7. 배열 회전시키기

- 나의 풀이

  ```javascript
  function solution(numbers, direction) {
    if (direction === "right") {
      var last = numbers[numbers.length - 1];
      for (i = numbers.length - 2; i >= 0; i--) {
        numbers[i + 1] = numbers[i];
      }
      numbers[0] = last;
    } else {
      var first = numbers[0];
      for (i = 1; i < numbers.length; i++) {
        numbers[i - 1] = numbers[i];
      }
      numbers[numbers.length - 1] = first;
    }
    return numbers;
  }
  ```

- 좋은 풀이

  ```javascript
  function solution(numbers, direction) {
    var answer = [];

    if ("right" == direction) {
      numbers.unshift(numbers.pop());
    } else {
      numbers.push(numbers.shift());
    }

    answer = numbers;

    return answer;
  }
  ```

  `배열.pop()` : 가장 마지막 원소를 반환, 배열에서 제거

  `배열.shift()` : 가장 첫 원소를 반환, 배열에서 제거

  `배열.unshift(a)` : 가장 처음 원소로 a를 넣음

  `배열.push(a)` : 가장 마지막 원소로 a를 넣음
