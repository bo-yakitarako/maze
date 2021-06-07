//迷路(改良ver) はぎさんのやり方を参考にしました
#include <iostream>
#include <random>
#include <ctime>
#include <vector>
#include <stdio.h>

using namespace std;

class Labyrinth {
    private: 
        int xSize;
        int ySize;
        int directionsArray[4][2] = {{0, -1}, {1, 0}, {0, 1}, {-1, 0}}; //コンパイル時warnigが出るが動作には問題なし
        vector<vector<bool> > maze;

    public:
        Labyrinth(int xSize, int ySize);
        bool JudgeEdge(int x_index, int y_index);
        bool judgeDirections(int x_index, int y_index, int direction);
        bool searchDigable();
        vector<int> getMovableDirections(int x_index, int y_index);
        vector<int> getRestartPoint(); 
        vector<int> digRoad(int x_index, int y_index, int digableDirection); 
        void digMaze();
        void print(); 
        ~Labyrinth();
};

//コンストラクタ
Labyrinth::Labyrinth(int xSize, int ySize) {
    srand(time(NULL));
    this->xSize = xSize;
    this->ySize = ySize;
    //迷路の土台を生成
    maze.resize(xSize, vector<bool>(ySize));
    for (int i = 0; i < xSize; i ++) {
        for (int j = 0; j < ySize; j ++) {
            maze[i][j] = false;
        }
    }
    maze[1][1] = true; //スタート地点
}

//引数によって与えられた座標が壁であるかを判定する
bool Labyrinth::JudgeEdge(int x_index, int y_index) {
    int edge_array[4] = {0, ySize - 1, xSize - 1, 0}; // 上, 右, 下, 左の順番
    for (int i = 0; i < 4; i ++) {
        if (i % 2 == 0 && x_index == edge_array[i]) {
            return false;
        } else if (i % 2 == 1 && y_index == edge_array[i]) {
            return false;
        }
    }
    return true;
}

//リスタート地点の取得
vector<int> Labyrinth::getRestartPoint() {
    vector<int> restart_point;
    vector<vector <int> > restart_points;
    for (int i = 1; i < xSize - 1; i ++) {
        for (int j = 1; j < ySize - 1; j ++) {
            if (maze[i][j]) {
                if (getMovableDirections(i, j).size() > 0) {
                    //リスタート地点の座標が入ったらforを抜ける
                    restart_point.push_back(i); //0番目にはx座標
                    restart_point.push_back(j); //1番目にはy座標
                    restart_points.push_back(restart_point);
                    restart_point.clear();
                    break;
                }
            }
        }
    }
    if (restart_points.size() > 0) {
        //x, yの要素番号は一対一対応であるのでxだけ求めれば良い
        int restart_point_index = rand() % restart_points.size();
        restart_point.push_back(restart_points[restart_point_index][0]); //x座標にpush_back
        restart_point.push_back(restart_points[restart_point_index][1]); //y座標にpush_back
        return restart_point;
    }

    restart_point.clear();
    return restart_point;
}

//上下左右に対してその方向に進めるかを判定する
bool Labyrinth::judgeDirections(int x_index, int y_index, int direction) {
    //指定した座標がまだ掘られていない場所かつ壁ではなければ通る
    if (maze[x_index + directionsArray[direction][0]][y_index + directionsArray[direction][1]] == false &&
        JudgeEdge(x_index + directionsArray[direction][0], y_index + directionsArray[direction][1])) {
        return true;
    }

    return false;
}

//judgeDirectionsで返された値からさらにその先へ進めるかの判定->進めたらその方向を返す
vector<int> Labyrinth::getMovableDirections(int x_index, int y_index) {
    vector<int> digable_directions;
    int more_directions[4][3] = {{3, 0, 1}, {0, 1, 2}, {1, 2, 3}, {2, 3, 0}}; //三方向の判定->4パターンあり, 時計回りの順番で判定
    int judge_count = 0; 
    for (int i = 0; i < 4; i ++) {
        for (int j = 0; j < 3; j ++) {
            if (judgeDirections(x_index, y_index, i)) { 
                if (maze[x_index + directionsArray[i][0] + directionsArray[more_directions[i][j]][0]][y_index + directionsArray[i][1] + directionsArray[more_directions[i][j]][1]] == false) {
                    judge_count ++;
                }
            }
        }
        if (judge_count == 3) {
            digable_directions.push_back(i);
        }
        judge_count = 0;
    }    

    return digable_directions;
}

bool Labyrinth::searchDigable() {
    //迷路全体の調査
    for (int i = 1; i < xSize - 1; i ++) {
        for (int j = 1; j < ySize - 1; j ++) {
            if (maze[i][j]) {
                for (int k = 0; k < 4; k ++) {
                    if (getMovableDirections(i, j).size() != 0) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

//迷路を作っていく
void Labyrinth::digMaze() {
    int x_index = 1;
    int y_index = 1;
    while(searchDigable() != false) {
        vector<int> directions = getMovableDirections(x_index, y_index);
        if (directions.size() > 0) {
            int digableDirection = rand() % directions.size();
            vector<int> next_point = digRoad(x_index, y_index, directions[digableDirection]);
            //次の座標の設定
            if (next_point.size() > 0) {
                x_index = next_point[0];
                y_index = next_point[1];
            }
        }  else if (directions.size() == 0) {
            vector<int> restart_point = getRestartPoint();
            if (restart_point.size() > 0) {
                x_index = restart_point[0];
                y_index = restart_point[1];
            }
        }
        directions.clear();
    }
    //ゴール地点の生成
    if (maze[xSize - 2][ySize - 2] == false) {
        maze[xSize - 2][ySize - 2] = true;
    }
}

//引数の示す方向に道を作る
vector<int> Labyrinth::digRoad(int x_index, int y_index, int digableDirection) {
    vector<int> next_point;
    for (int i = 0; i < 4; i ++) {
        next_point.push_back(x_index + directionsArray[i][0]);
        next_point.push_back(y_index + directionsArray[i][1]);
        if (i == digableDirection && JudgeEdge(next_point[0], next_point[1]) && maze[next_point[0]][next_point[1]] == false) {
            maze[next_point[0]][next_point[1]] = true;
            return next_point;
        }
        next_point.clear();
    }

    return next_point;
}

//表示関数
void Labyrinth::print() {
    //"◇" : スタート地点, "☆" : ゴール地点
    const char *wall = "■";
    const char *hole = "□";
    const char *start = "◇";
    const char *goal = "☆";
    for (int i = 0; i < xSize; i++) {
        for (int j = 0; j < ySize; j++) {
            printf("%s ", maze[i][j] == false ? (i == 0 && j == 1 ? start : (i == xSize - 1 && j == ySize - 2) ? goal : wall) : hole);
        }
        printf("\n");
    }
}

Labyrinth::~Labyrinth() { //デストラクタ
    vector<vector<bool> >().swap(maze);
}


int main() {
    Labyrinth obj(15, 15);
    obj.digMaze();
    obj.print();

    return 0;
}