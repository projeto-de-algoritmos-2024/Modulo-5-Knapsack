import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([{ value: 0, weight: 0 }]);
  const [capacity, setCapacity] = useState(0);
  const [result, setResult] = useState(null);
  const [table, setTable] = useState(null);

  // Função para calcular o valor máximo da mochila
  const knapsack = (n, weights, values, W) => {
    let M = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    // Construindo a tabela M
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (weights[i - 1] <= w) {
          M[i][w] = Math.max(
            M[i - 1][w],
            values[i - 1] + M[i - 1][w - weights[i - 1]]
          );
        } else {
          M[i][w] = M[i - 1][w];
        }
      }
    }

    // Recuperando os itens que foram incluídos
    let res = M[n][W];
    let w_remaining = W;
    let selectedItems = [];

    for (let i = n; i > 0 && res > 0; i--) {
      if (res === M[i - 1][w_remaining]) continue;
      else {
        selectedItems.push(i); // O item foi incluído
        res -= values[i - 1];
        w_remaining -= weights[i - 1];
      }
    }

    setTable(M); // Armazena a tabela para exibição
    return { maxValue: M[n][W], selectedItems };
  };

  // Função que lida com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = items.map((item) => parseInt(item.value));
    const weights = items.map((item) => parseInt(item.weight));
    const W = parseInt(capacity);
    const result = knapsack(items.length, weights, values, W);
    setResult(result);
  };

  // Função para adicionar um novo item
  const addItem = () => {
    setItems([...items, { value: 0, weight: 0 }]);
  };

  // Função para remover o último item
  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  // Função para atualizar o item
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div className="App">
      <h1>Problema da Mochila (Knapsack)</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Capacidade da Mochila:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        <h3>Itens:</h3>
        {items.map((item, index) => (
          <div key={index}>
            <label>
              Valor do Item {index + 1}:
              <input
                type="number"
                value={item.value}
                onChange={(e) =>
                  handleItemChange(index, "value", e.target.value)
                }
              />
            </label>
            <label>
              Peso do Item {index + 1}:
              <input
                type="number"
                value={item.weight}
                onChange={(e) =>
                  handleItemChange(index, "weight", e.target.value)
                }
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Adicionar Item
        </button>
        <button type="button" onClick={removeItem}>
          Remover Último Item
        </button>
        <button type="submit">Calcular</button>
      </form>

      {result && (
        <div>
          <h3>Resultado:</h3>
          <p>Valor Máximo: {result.maxValue}</p>
          <p>Itens Selecionados: {result.selectedItems.join(", ")}</p>
        </div>
      )}

      {table && (
        <div>
          <h3>Tabela:</h3>
          <table border="1">
            <tbody>
              {table.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
