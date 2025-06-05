export function FormataData(dataString: string): string {
  const data = new Date(dataString);
  if (isNaN(data.getTime())) {
    return "Data inválida";
  }
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}