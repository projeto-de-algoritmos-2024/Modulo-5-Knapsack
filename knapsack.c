#include <stdio.h>

#define MAX_ITEMS 100
#define MAX_WEIGHT 100

int max(int a, int b) {
    return (a > b) ? a : b;
}

void knapsack(int n, int w[], int v[], int W) {
    int M[MAX_ITEMS + 1][MAX_WEIGHT + 1]; // Matriz para armazenar os valores

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            if (i == 0 || j == 0) {
                M[i][j] = 0;
            } else if (w[i - 1] <= j) {
                M[i][j] = max(M[i - 1][j], v[i - 1] + M[i - 1][j - w[i - 1]]);
            } else {
                M[i][j] = M[i - 1][j];
            }
        }
    }

    printf("Tabela de Programação Dinâmica:\n");
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            printf("%d ", M[i][j]);
        }
        printf("\n");
    }

    printf("Valor máximo que pode ser obtido: %d\n", M[n][W]);

    printf("Itens incluídos na mochila:\n");
    int res = M[n][W]; // Valor máximo obtido
    int w_remaining = W;

    for (int i = n; i > 0 && res > 0; i--) {
        if (res == M[i - 1][w_remaining]) {
            continue;
        } else {
            printf("Item %d (valor = %d, peso = %d)\n", i, v[i - 1], w[i - 1]);

            res -= v[i - 1];
            w_remaining -= w[i - 1];
        }
    }
}

int main() {
    int n, W;

    printf("Digite o número de itens: ");
    scanf("%d", &n);

    int w[n], v[n]; // Arrays para armazenar os pesos e valores dos itens

    for (int i = 0; i < n; i++) {
        printf("Digite o valor e o peso do item %d: ", i + 1);
        scanf("%d %d", &v[i], &w[i]);
    }

    printf("Digite a capacidade máxima da mochila: ");
    scanf("%d", &W);

    knapsack(n, w, v, W);

    return 0;
}
