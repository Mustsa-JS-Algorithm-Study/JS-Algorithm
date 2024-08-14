# 김경우
---
## 1. 타켓 넘버
- 나의 풀이
````javascript
const DFS = (numbers, currentSum, target) => {
    if(numbers.length === 0) {
        if(currentSum === target) return 1;
        return 0;
    }

    var plus = DFS(numbers.slice(1), numbers[0] + currentSum, target)
    var minus = DFS(numbers.slice(1), -numbers[0] + currentSum, target)

    return plus + minus;
}

function solution(numbers, target) {
    var plus = DFS(numbers.slice(1), numbers[0], target)
    var minus = DFS(numbers.slice(1), -numbers[0], target);
    return plus + minus;
}
// numbers의 맨 앞에 있는 숫자 꺼내기
// 그 숫자를 제외한 배열 복사본 생성
// 꺼낸 숫자를 더할때와 뺄때로 나누어서 DFS 실행
````
- 다른 풀이
````javascript
function solution(numbers, target) {
    let answer = 0;
    getAnswer(0,0);
    function getAnswer(x,value) {
        if(x<numbers.length){
            getAnswer(x+1,value + numbers[x]);
            getAnswer(x+1,value - numbers[x]);
        } else{
            if(value === target){
                answer++
            }
        }
    }
    return answer;
}
// x는 사용한 숫자의 개수를 의미하면서 동시에 인덱스를 의미할 수 있음
// 매 단계에서 numbers의 숫자를 더하거나 뺌
// 연산 결과는 value에 저장
// x가 숫자를 모두 사용했으면 아래에 있는 else 문을 만나고 target을 찾았는지 여부에 따라 answer를 증가시킴
````

- 학습 내용
```
- DFS에 대해서 학습함
- DFS는 탐색을 하는데 사용하는 알고리즘
- DFS는 어떠한 노드에서 시작해서 해당 분기를 모두 확인하기 전까지 다른 분기로 넘어가지 않음
- 깊이 우선 탐색이라는 말처럼 깊게 짜박혀있는 놈들 먼저 탐색
- 모든 노드를 방문해야 하는 상황일때 사용
- 구현 자체는 BFS보다 간단
- 모든 노드를 훑기 때문에 BFS보다 느림
- 스택이나 재귀함수로 구현 가능
```

## 2. 네트워크
- 나의 풀이
````javascript
const DFS = (graph, vertex, visited, n) => {
    visited[vertex] = true;

    for(let i = 0; i < n; i++) {
        if(graph[vertex][i] === 1 && !visited[i]) {
            DFS(graph, i, visited, n)
        }
    }
}

function solution(n, graph) {
    var answer = 0;
    var visited = new Array(n).fill(false);
    var vertex = 0;
    
    while(visited.some((element) => element === false)) {
        DFS(graph,vertex,visited, n)
        vertex = visited.findIndex((element) => element === false)
        answer++;
    }
    return answer;
}

// visited는 정점의 개수만큼 채워진 방문여부 배열
// DFS를 돌려서 연결된 정점들을 모두 방문하도록 함.
// while 문에서 visited가 false(아직 방문 안한 놈이 있으면) 계속 반복
// DFS 끝나면 방문 안한 놈 찾기
// DFS 돌 때마다 answer 1증가

// DFS 함수 내부에서는 해당 정점을 방문했다고 표시
// DFS 함수 내부 for문에서 해당 정점에서 연결된 놈이 있고, 방문 안했으면 그 점을 DFS 걸어버리기
````
- 학습 내용
```
- DFS 활용 문제였다.
- 3단계인데 2단계였던 이전 문제보다 시간이 덜 걸림
- 이번에도 문제 제목처럼 네트워크로, 연결을 찾는 것이기 때문에 DFS 사용
- 근데 이제 이걸 모든 정점에 대해서 반복한 것
```
---

## 3. 게임 맵 최단거리
- 나의 풀이
````javascript
const BFS = (maps, x, y, n, m) => {
    var queue = [[x, y, 1]];
    
    while(queue.length !== 0) {
        const visit = queue.shift();
        
        if(visit[0] === n && visit[1] === m) return visit[2]

        if(maps[visit[0]][visit[1]] === 1) {
            maps[visit[0]][visit[1]] = 0;
            if(visit[0] != n && maps[visit[0]+1][visit[1]] === 1) {
                queue.push([visit[0]+1, visit[1], visit[2]+1])
            }
            if(visit[1] != m && maps[visit[0]][visit[1]+1] === 1) {
                queue.push([visit[0], visit[1]+1, visit[2]+1])
            }
            if(visit[0] != 0 && maps[visit[0]-1][visit[1]] === 1) {
                queue.push([visit[0]-1, visit[1], visit[2]+1])
            }
            if(visit[1] != 0 && maps[visit[0]][visit[1]-1] === 1) {
                queue.push([visit[0], visit[1]-1, visit[2]+1])
            }
        }
    }
    return -1;
}

function solution(maps) {
    const n = maps.length - 1
    const m = maps[0].length - 1
    
    return BFS(maps, 0, 0, n, m);
}
// 0,0은 출발점 & n,m은 내가 가고싶은 점
// 몇번의 이동에서 도착했는지를 알아야하기 때문에 BFS함수 내부 queue에서 2번 인덱스의 값을 step으로 설정정
// 시작점을 queue에 넣고 queue가 동날때 까지 반복 시작
// 일단 queue에서 하나 꺼내고 꺼낸 점에서 연결된 지점 탐색해서 queue에다가 push
// 꺼낸 점은 다시 queue에 들어오면 안되니까 0으로 설정
// 과정 반복
// 꺼낸 위치가 내가 가고싶은 지점인 n,m이면 해당 step을 리턴
````

- 학습 내용
```
- BFS를 학습함
- BFS는 어떤 노드에서 시작해서 가장 가까운 노드를 먼저 탐색하는 방법
- 제일 멀리 떨어진 녀석을 제일 나중에 방문
- 주어진 두 점 사이에 경로가 있는지 궁금할 때 사용함
- 최단거리를 구할때 유리함 (가장 가까운 곳 먼저 찾기 때문에 빙 돌아갈 일이 없음)
- 큐로 구현 가능능
```

---
## 4. 단어 변환
- 나의 풀이
````javascript
const BFS = (begin, target, words) => {
    var queue = [[begin, 0]];
    const len = begin.length;
    const visited = new Set();

    while (queue.length !== 0) {
        const [currentWord, steps] = queue.shift();

        if (currentWord === target) {
            return steps;
        }

        for (const element of words) {
            if (!visited.has(element)) {
                var diff = 0;

                for (let i = 0; i < len; i++) {
                    if (currentWord[i] !== element[i]) diff++;
                    if (diff === 2) break;  
                }

                if (diff === 1) {
                    visited.add(element);
                    queue.push([element, steps + 1]);
                }
            }
        }
    }

    return 0;
}

function solution(begin, target, words) {
    if (!words.includes(target)) {
        return 0;
    }

    return BFS(begin, target, words);
}

// 처음에 BFS에서 queue에 begin과 step을 담은 값을 넣어줌
// visited는 set으로 선언하여, 중복이 걸릴일이 없으니까 마음 놓고 add
// 그 뒤로 BFS 실행, queue에서 꺼낸 값이 target이면 step 값을 리턴
// 그게 아니라면 words 배열을 돌면서 금방 queue에서 꺼낸 단어가 1개 차이 나는 단어들만 추리고 각각의 단어들을 push
// 과정 반복
````

- 학습 내용
```
- Set()
    Set은 JS에서 제공하는 내장 객체, 중복되지 않은 값들의 집합
    배열과 비슷하지만, 중복된 값 허용X, 순서 유지, 모든 자료형 등록 가능이 Set()의 특징

    주요 method는 add, delete, has, clear, size 등이 있음.
    add는 요소를 맨 뒤에 추가, 이미 있으면 추가 안함
    delete는 특정 값을 제거, 제거를 성공하면 true 실패하면 false
    has는 특정 값을 가지고 있는 지 확인, 성공하면 true 실패하면 false
    clear는 싹 다 제거
    size는 set의 요소 개수 리턴
```
---
## 6. 여행 경로
- 나의 풀이
````javascript
const DFS = (filteredTickets, destination, step, ticketsCount, path, answer) => {
    var len = filteredTickets.length;
    
    if(step === ticketsCount) {
        answer.push([...path])
        return;
    }
    
    for(let i = 0; i < len; i++) {
        if(filteredTickets[i][0] === destination) {
            path.push(filteredTickets[i][1])
            DFS(filteredTickets.filter((ticket)=> ticket != filteredTickets[i]), filteredTickets[i][1], step + 1, ticketsCount, path, answer);
            path.pop();
        }
    }
}

function solution(tickets) {
    var answer = [];
    
    var len = tickets.length
    
    for(let i = 0; i < len; i++) {
        if(tickets[i][0] === "ICN") {
            DFS(tickets.filter((ticket)=> ticket != tickets[i]), tickets[i][1], 1, len, tickets[i], answer);
        }
    }
    return answer.sort()[0]
}

// 출발지가 ICN인 곳들에 대해서 각각 DFS 실행
// DFS 첫번째 인자는 tickets 중에서 출발티켓 제외한 배열, 두번째 인자로는 출발티켓의 목적지, 세번째 인자는 사용한 티켓 개수,네번째는 전체 티켓 개수, 다섯번째 인자로는 내가 사용하고 있는 티켓, 여섯번째는 정답배열
// DFS가 호출될 때마다 tickets는 하나씩 줄어들 거임
// 티켓을 다썼으면 전체 티켓 개수랑 같을거임. 그러면 그때 정답배열에 만들어진 경로를 추가하고 걍 리턴
// DFS 내부 for문에서는 path에 목적지를 추가하고, 남은 티켓들 중에서 추가한 목적지가 출발지인 곳들로 DFS
// 그리고 path에서 추가한 목적지를 빼줌. 왜냐하면 원래대로 되돌려야하기 때문임
// (path가 [ICN , ABC]인 DFS에 대해서 이 경로를 유지하기 위함) 
````