# 김경우
---
## 1. K번째 수
- 나의 풀이
````javascript
function solution(array, commands) {
    return commands.map((value2, index2) =>
 (array.filter((value1, index1)=>
 (index1 + 1 >= commands[index2][0] && index1 + 1 <= commands[index2][1]))).
sort((a,b)=> a-b)[commands[index2][2]-1])
}
// 커맨드 배열 안에 있는 배열(이하 내부 배열) 1개당 1개의 리턴이 있기 때문에 map
// 내부 배열의 0번 인덱스에 있는 값부터 1번 인덱스에 있는 값까지 filter
// 정렬 후, 내부 배열의 2번 인덱스에 있는 값 추출
````
- 다른 풀이
````javascript
function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .filter((value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1)
            .sort((a,b) => a - b)    

        return newArray[position - 1]
    })
}
// 나랑 거의 똑같음.
// 다른 점은 구조분해할당을 했냐 안했냐 차이
````

- 학습 내용
```
1.  array의 내부 배열에서 0번 인덱스에 있는 값부터 1번 인덱스의 값까지 얻을 때 filter를 사용했는데, slice 하면 더 편했을 듯?
```
---
## 2. 가장 큰 수
- 나의 풀이 (시간초과)❌
````javascript
function solution(numbers) {
    var answer;
    var temp = (numbers.sort().reverse());
    temp.push(-1)
    console.log(temp);
    var len = temp.length;
    var swapStack = 0;
    var flag = 0;
    
    for(let k = 0; k < len/2 + 1; k++) {
        for(let i = 0; i < len - 1; i++) {
            var val1 = temp[i].toString();
            var val2 = temp[i + 1 + swapStack].toString();

            if(val1[0]===val2[0]) {
                var val1Len = val1.length;
                var val2Len = val2.length
                var longerLength = val1Len >= val2Len ? val1Len : val2Len
                for(let j = 1; j <= longerLength; j++) {
                    if(val1[j % val1Len] > val2[j % val2Len]) {
                        var char;
                        char = temp[i];
                        temp[i] = temp[i+swapStack]
                        temp[i+swapStack] = char;
                        swapStack = 0;
                        //console.log(temp)
                        break;
                    }
                    else if(val1[j % val1Len] < val2[j % val2Len]) {
                        swapStack++;
                        i--;
                        break;
                    }
                }
            } 
            else if(swapStack) {
                var char;
                char = temp[i];
                temp[i] = temp[i+swapStack]
                temp[i+swapStack] = char;
                swapStack = 0;
                // console.log(temp);
            }
        }
    }
    if(temp[0] === 0) return "0";
    temp.pop()
    return temp.join('')
}
// 어차피 옳지 않은 풀이
// 코드를 짤 때 가졌던 생각
// 배열을 일단 sort().reverse()로 숫자들을 문자로 취급하고 정렬하고 역순
// 2개씩 꺼내서 toString()으로 문자열로 만들고 앞자리가 같으면 내부 알고리즘 시행
// 두 수의 길이 중 더 긴 길이만큼 각 자리 수의 대소 비교,
// 작은 수는 비교할 숫자가 동 나면 다시 앞자리부터 비교
// 
// ex) [1000,100,10,1] => 1 10 100 1000
// 1000과 100일때
// 1 0 0 0
// 1 0 0 1
// 100이 이겼음, 따라서 1000은 swap이 이뤄질 수 있도록 swapStack 1증가
// 이후에 1000은 10이랑 1이랑 싸워서 계속 지니까 swapStack은 3이 됨
// 3번째 인덱스와 swap
// =========대충 이런식===========
// [547, 54, 5]라는 반례가 있었는데 이것만 해결하면 정답 같은데 못하겠어서 포기하고 정답 체크함
````

- 다른 풀이
````javascript
function solution(numbers) {
    
    const answer = numbers.sort((a, b) => {
        let strA = a.toString();
        let strB = b.toString();
        // 두 문자열을 붙여보고 비교하여 더 큰 쪽이 앞에 오도록 정렬
        return (strB + strA) - (strA + strB);
    })
    
    if(answer.every(a=> a === 0)) return "0"
    
    return answer.join('')
}
````
- 학습 내용
````
1. sort((a,b)=>a-b), sort((a,b)=>b-a) 너무 대충 알고 있었음.
그냥 오름차순, 내림차순으로만 알고 있었음
좀 더 깊게 공부가 필요하다고 필요성을 느낌
다른 풀이에서 sort의 콜백 함수 인수로 a와 b가 있다.
내부적으로는 a와 b를 문자열로 바꾼 값인 strA와 strB를 선언했다.
두 문자열의 순서를 달리하여 붙인 결과를 서로 뺀다. 만약 strB+strA가 strA+strB보다 크다면 a와 b는 순서가 바뀐다.
ex) numbers = [3, 30, 34, 5, 9]
<cycle1>
a = 3, b = 30 => strB+strA=303, strA+strB=330 => 음수
a = 3, b = 34 => strB+strA=343, strA+strB=334 => 양수 => swap
numbers => [34, 30, 3, 5, 9]
a = 34, b = 5 => strB+strA=534, strA+strB=345 => 양수 => swap
numbers => [5, 30, 3, 34, 9]
a = 5, b = 9 => strB+strA=95, strA+strB=59 => 양수 => swap
numbers => [9, 30, 3, 34, 5]
<cycle2>
a = 30, b = 3 => strB+strA=330, strA+strB=303 => 양수 => swap
numbers => [9, 3, 30, 34, 5]
a = 3, b = 34 => strB+strA=343, strA+strB=334 => 양수 => swap
numbers => [9, 34, 30, 3, 5]
a = 34, b = 5 => strB+strA=534, strA+strB=345 => 양수 => swap
numbers => [9, 5, 30, 3, 34]
<cycle3>
a = 30, b = 3 => strB+strA=330, strA+strB=303 => 양수 => swap
numbers => [9, 5, 3, 30, 34]
a = 3, b = 34 => strB+strA=343, strA+strB=334 => 양수 => swap
numbers => [9, 5, 34, 30, 3]
<cycle4>
a = 30, b = 3 => strB+strA=330, strA+strB=303 => 양수 => swap
numbers => [9, 5, 34, 3, 30]

sort() 함수에 대해서 더 공부가 필요하겠다.
````
---
## 3. H-index
- 나의 풀이
````javascript
function solution(citations) {
    return citations.sort((a,b)=> b-a).filter((val, idx)=> (val >= idx + 1) 
    ).length  
}
// h편의 논문이 h번 이상 인용되었다!
// 여기서 h를 구하는 것이니까 내림차순으로 정렬하고
// val >= idx + 1를 조건으로 filter를 하면
// (현재 내림차순 정렬된 상황에서/ idx+1은 인용된 논문 수를 의미)
// 맨 앞의 값이 조건을 만족하면 1편의 논문이 1번이상 인용된 것
// 두번째 값을 읽을 때도 조건을 만족 하면 2편의 논문이 2번 이상 인용된 것
// 만약 세번째 값을 읽을 때 조건을 만족하지 않으면 그 뒤로는 볼 필요도 없음 
// (내림차순이니까)
````

- 다른 풀이
````javascript
function solution(citations) {
     citations = citations.sort(sorting);
     var i = 0;
     while(i + 1 <= citations[i]){
         i++;
     }
     return i;


     function sorting(a, b){
         return b - a;
     }
}
````
