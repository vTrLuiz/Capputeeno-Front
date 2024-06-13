export function formatValue(valorEmCentavos: number) {
    const valorEmReais = valorEmCentavos / 100;
    const opcoes = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    };
    const valorFormatado = valorEmReais.toLocaleString("pt-BR", opcoes);

    return valorFormatado;
  }