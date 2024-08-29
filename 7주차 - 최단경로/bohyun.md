# 보현 7주차 - 최단경로

최단 경로 알고리즘은 그래프에서 두 정점(노드) 간의 경로 중에서 가장 짧은 경로(최단거리)를 찾기 위한 알고리즘

이 알고리즘은 네트워크, 지도, 게임 등 다양한 분야에서 활용되며, 대표적으로 **다익스트라(Dijkstra), 벨만-포드(Bellman-Ford), 플로이드-와샬(Floyd-Warshall) 알고리즘** 이 존재

<br>

## 1. 다익스트라 알고리즘 (Dijkstra's Algorithm)

**가중치**가 있는 그래프에서 한 정점에서 다른 모든 정점으로의 최단 경로를 찾는 알고리즘입니다. 이 알고리즘은 음의 가중치를 허용하지 않으며, 그리디 알고리즘을 기반으로 합니다.

### 동작 과정:
1. 출발 노드를 설정하고, 출발 노드의 거리를 0으로 초기화
2. 방문하지 않은 노드 중 가장 짧은 거리를 가진 노드를 선택
3. 해당 노드를 거쳐 다른 노드로 가는 경로를 계산하고, 기존 경로보다 짧으면 갱신
4. 위 과정을 모든 노드를 처리할 때까지 반복


## psudocode
```JavaScript
function dijkstra(graph, start) {
    const distances = {};  // 각 정점까지의 최단 거리
    const visited = new Set();  // 방문한 정점을 기록
    const queue = [start];  

    // 모든 정점의 거리를 무한대로 초기화
    distances = new Array(graph.length).fill(Infinity);
    distances[start] = 0;  // 시작 정점의 거리는 0으로 설정

    while (queue.length > 0) {
        // 큐에서 현재 정점을 꺼내고 방문 처리 -> 더이상 방문하지 않기 위해 큐 사용 필수
        const current = queue.shift();
        visited.add(current);

        // 인접한 정점들에 대해 최단 거리 갱신
        for (let neighbor in graph[current]) {
            if (!visited.has(neighbor)) {
                const distance-update = distances[current] + graph[current][neighbor];
                if (distance-update < distances[neighbor]) {
                    distances[neighbor] = distance-update;
                    queue.push(neighbor);  // 갱신된 정점을 큐에 추가
                }
            }
        }
    }

    return distances;
}

```

<br>

## 2. 벨만-포드 알고리즘 (Bellman-Ford Algorithm)

**음의 가중치**를 가진 그래프에서도 동작하는 최단 경로 알고리즘
다익스트라 알고리즘과 달리! 음의 가중치를 허용하며, 최단 경로가 존재하지 않는 경우(음의 사이클)도 감지할 수 있음

### 동작 과정:
1. 모든 간선의 가중치를 초기화
2. 각 간선을 반복적으로 검사하여, 경로의 거리를 갱
3. 만약 n-1번의 반복 후에도 거리가 갱신된다면 음의 사이클이 존재하는 것으로 판단

## psudocode
```JavaScript
function bellmanFord(graph, start) {
    const distances = {};  
    distances = new Array(graph.length).fill(Infinity);
    distances[start] = 0;  

    for (let i = 0; i < Object.keys(graph).length - 1; i++) { 
        // n-1 번임에도 갱신되면 음의 사이클
        for (let node in graph) {
            for (let neighbor in graph[node]) {
                const distance-update = distances[node] + graph[node][neighbor];
                if (distance-update < distances[neighbor]) {
                    distances[neighbor] = distance-update;
                }
            }
        }
    }

    // 음의 사이클 검출
    for (let node in graph) {
        for (let neighbor in graph[node]) {
            if (distances[node] + graph[node][neighbor] < distances[neighbor]) {
                throw new Error("음의 사이클이 존재");
            }
        }
    }

    return distances;
}

// 예시 그래프
const graph = {
    A: { B: 2, C: 3 },
    B: { C: 1, D: 5 },
    C: { D: 2 },
    D: {}
};

console.log(bellmanFord(graph, 'A'));  // { A: 0, B: 2, C: 3, D: 5 }


```

<br>

## 3. 플로이드-와샬 알고리즘 (Floyd-Warshall Algorithm)

플로이드-와샬 알고리즘은 모든 정점 간의 최단 경로를 찾는 알고리즘입니다. 동적 프로그래밍을 이용하여, 그래프의 모든 쌍에 대해 최단 경로를 계산합니다.

### 동작 과정:
1. 그래프를 인접 행렬로 표현하고, 시작 노드에서 도착 노드로 가는 초기 경로를 설정
2. 각 노드를 거쳐가는 경로를 고려하여 최단 경로를 갱신
3. 모든 노드에 대해 위 과정을 반복


## psudocode
```JavaScript
function floydWarshall(graph) {
    const nodes = Object.keys(graph);
    const distances = {};

    // 그래프의 인접 행렬 복사를 통한 초기화
    nodes.forEach(i => {
        distances[i] = {};
        nodes.forEach(j => {
            if (i === j) {
                distances[i][j] = 0;
            } else if (graph[i][j] !== undefined) {
                distances[i][j] = graph[i][j];
            } else {
                distances[i][j] = Infinity;
            }
        });
    });

    // 플로이드-와샬 알고리즘은 <모든 정점 쌍>에 대한 조사가 필요하다
    nodes.forEach(k => {
        nodes.forEach(i => {
            nodes.forEach(j => {
                if (distances[i][j] > distances[i][k] + distances[k][j]) {
                    distances[i][j] = distances[i][k] + distances[k][j];
                }
            });
        });
    });

    return distances;
}

```