# 김경우
---
## 1. N으로 표현
- 나의 풀이
````javascript
const DP = (N, number, callStack, dp) => {
    // callStafck 몇번째 호출인지 알려주는 변수
    callStack++;
    
    // 만약 callStack이 4라면, 4번째 호출이라는 의미이고, 그때 만들 수 있는 수의 조합
    // 1+3, 2+2, 3+1
    // 여기서 중요한 점은 1+3과 3+1이 다른 것. (ex. 5/555 , 555/5)
    for (let i = 1; i < callStack; i++) {
        for (let x of dp[i]) {
            for (let y of dp[callStack - i]) {
                if(x + y > 0) dp[callStack].add(x + y);
                if(x - y > 0)dp[callStack].add(x - y);
                if(x * y > 0) dp[callStack].add(x * y);
                if (y !== 0) dp[callStack].add(Math.floor(x / y));
            }
        }
    }

    // 여기는 숫자 이어 붙였을 때
    dp[callStack].add(Number(String(N).repeat(callStack)));
    
    // 해당 callStack에서 number가 조합되었으면 callStack이 정답이니까 리턴.
    if (dp[callStack].has(number)) {
        return callStack;
    }
    
    // 그게 아니면 아직 number를 못찾았으니까 -1 리턴.
    return -1;
}

function solution(N, number) {
    if (N === number) return 1;
    
    // 중복은 피하기 위해서 Set의 배열 생성
    const dp = Array.from({ length: 9 }, () => new Set());
    
    // 8번 이상의 호출은 의미가 없으므로 반복문은 최대 8번 반복
    for (let i = 1; i <= 8; i++) {
        const answer = DP(N, number, i - 1, dp);
        if (answer !== -1) return answer;
    }
    
    return -1;
}
````

- 학습내용
````
1. DP를 풀 때 떠올려야할 아이디어는 이전에 계산된 결과들을 사용하여 다음 결과물을 만들 수 있는지 생각하는 것.
2. 대부분 DP문제는 dfs나 bfs로 풀 수 있을 것 같음.
3. 중복된 계산을 계속 반복해야 한다면 DP를 사용.
````
---
## 2. 정수 삼각형
- 나의 풀이(DP)
````javascript
function solution(triangle) {  
    const height = triangle.length;

    //              7
    //           3     8
    //        8     1     0
    //     2     7     4     4
    //  4     5     2     6     5
    
    // 삼각형의 높이 만큼 반복문 시행
    for(let i = 1; i < height; i++) {
        for(let j = 0; j < i + 1; j++) {
            if(j === 0) {
                // j가 0이라는 것은 삼각형의 각 레벨의 첫번째 인덱스라는 의미
                // 해당 위치 값은 이전 위치에서 왼쪽 아래로만 이동으로만 생성
                // 이동이 완료된 위치에 값을 누적
                triangle[i][j] = triangle[i][j] + triangle[i - 1][j];
            } else if (i === j) {
                // i와 j가 같다는 것은 삼각형의 각 레벨의 맨 끝에 있는 인덱스라는 의미
                // 해당 위치값은 이전 위치에서 오른쪽 아래로만 이동으로만 생성
                // 이동이 완료된 위치에 값을 누적
                triangle[i][j] = triangle[i][j] + triangle[i - 1][j - 1];
            } else {
                // 위의 상황들에 속하지 않으면 양쪽에서 값이 오는 상횡이고, 만들어진 값들 중에서 최대값을 선택해서 이동 후 위치에 값을 누적
                var max = triangle[i][j] + triangle[i - 1][j - 1];
                if(max < triangle[i][j] + triangle[i - 1][j])
                    max = triangle[i][j] + triangle[i - 1][j];
                triangle[i][j] = max
            }
        }
    }
    
    // 결국 triangle의 제일 하단부에는 만들어진 값의 배열이 존재
    // 거기서 최댓값 가져와
    return Math.max(...triangle[height-1]);
}
````
<br/><br/>

- 나의 풀이(DFS)
````javascript
function solution(triangle) {
    const height = triangle.length;
    const temp = Array(height).fill(null).map((val, idx) => Array(idx + 1).fill(null));
    console.log(temp)

    //              7
    //           3     8
    //        8     1     0
    //     2     7     4     4
    //  4     5     2     6     5

    const dfs = (level, index) => {

        // dfs의 재귀 호출에서 삼각형의 제일 하단부에 위치하게 되면 그 위치에 있는 값을 가져옴
        if (level === height - 1) {
            return triangle[level][index];
        }

        // temp는 생성되고 나서 null로 채워져 있고, 이 null 값들은 dfs를 돌면서 숫자로 바뀔 것임.
        // 만약 현재 보고 있는 dfs의 level과 index에 있는 temp의 값이 null이 아니라는 것은 이미 값이 만들어서 채워졌다는 것.
        // 그럼 원래 있던 값을 리턴
        if (temp[level][index] !== null) {
            return temp[level][index];
        }

        // left와 right로 들어면 level과 index의 자식들을 dfs로 재귀 호출
        const left = dfs(level + 1, index);
        const right = dfs(level + 1, index + 1);

        // 현재 level과 index에 속하는 temp에는 이때의 triangle의 값과 이때의 temp의 자식들 중에서 최댓값을 더하도록 함.
        temp[level][index] = triangle[level][index] + Math.max(left, right);

        // 그때의 값을 리턴
        return temp[level][index];
    }

    // 맨 처음 시작하는 위치로 dfs 실행
    return dfs(0, 0);
}
````
---
## 3. 등굣길
- 나의 풀이(DP)
````javascript
function solution(m, n, puddles) {

    // 지도 생성성
    var map = Array.from({ length: n }, () => Array(m).fill(0));
    
    // 시작점 설정
    map[0][0] = 1;
    
    // 물 웅덩이는 -1로 해서 표시해놓기
    for(const element of puddles) {
        map[element[1] - 1][element[0] - 1] = -1;
    } 
    
    // dp 맵이 n x m 이니까 그만큼 이중반복으로 살펴보기
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            // 만약 만난 곳이 물 웅덩이면 0으로 설정하고 패스
            // 물 웅덩이가 아니면 이전위치랑 현재위치 값 더함
            if(map[i][j] === -1) {
                map[i][j] = 0
            } else {
                if(i > 0) map[i][j] += map[i - 1][j];
                if(j > 0) map[i][j] += map[i][j - 1];
                map[i][j] %= 1000000007
            }
        }
    }
    
    // 결국 map의 도착지점에는 경로의 합이 누적되었을겨.
    return map[n-1][m-1]
}
````

<br/><br/>

- 나의 풀이(BFS)
```` javascript
function solution(m, n, puddles) {
    // 맵 생성
    const map = Array.from({ length: n }, () => Array(m).fill(0));

    // 물 웅덩이 표시
    for (const element of puddles) {
        map[element[1] - 1][element[0] - 1] = -1;
    }

    // 시작점 설정
    map[0][0] = 1;
    
    // BFS에 사용할 큐
    var queue = [[0,0]];
    
    //BFS 시작
    while(queue.length !== 0) {
        const [x,y] = queue.shift();
        
        // 아래로 가기
        var a = x + 1
        var b = y;
        
        // 아래로 이동한 점이 물 웅덩이도 아니고 맵도 벗어난게 아니면 해당 점 enqueue
        if(a < n && b < m && map[a][b] !== -1) {
            if(map[a][b] === 0) {
                queue.push([a,b])
            }
            // 해당 점까지의 가는 방법의 수는 원래 자기가 가지고 있던 값에 이전 경로에서 들어온 값을 더함
            map[a][b] = (map[a][b] + map[x][y]) % 1000000007
        }
        
        // 오른쪽으로 가기
        a = x;
        b = y + 1;
        
        // 오른쪽으로 이동한 점이 물 웅덩이도 아니고 맵도 벗어난게 아니면 해당 점 enqueue
        if(a < n && b < m && map[a][b] !== -1) {
            if(map[a][b] === 0) {
                queue.push([a,b])
            }
            // 해당 점까지의 가는 방법의 수는 원래 자기가 가지고 있던 값에 이전 경로에서 들어온 값을 더함
            map[a][b] = (map[a][b] + map[x][y]) % 1000000007
        }
    }

    return map[n-1][m-1]
}
````