async function verificarNome() {
  const nomeDigitado = document.getElementById('nome').value.trim().toLowerCase();
  const resultado = document.getElementById('resultado');

  if (!nomeDigitado) {
    resultado.textContent = 'Por favor, digite um nome.';
    return;
  }

  const sheetId = '1ngw4lhQcnZI_kLxaClGrZ_Ebj5bz1YnMVC3w6sFaKbw';
  const apiKey = 'AIzaSyD3MJgzKLhSZ6gCkXICXlCZqexpkfL2pC4';
  const range = 'Respostas do Formulário 1!B2:B'; // Coluna B a partir da linha 2

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const nomes = data.values?.flat().map(n => n.toLowerCase().trim()) || [];

    if (nomes.includes(nomeDigitado)) {
      resultado.textContent = `✅ O nome "${nomeDigitado}" está na planilha.`;
    } else {
      resultado.textContent = `❌ O nome "${nomeDigitado}" NÃO está na planilha.`;
    }
  } catch (error) {
    console.error('Erro ao acessar a planilha:', error);
    resultado.textContent = 'Erro ao acessar a planilha.';
  }
}
