export type PlanoSaas = "free" | "pro" | "enterprise";

export function valorPlano(plano: string) {
  if (plano === "pro") return 49;
  if (plano === "enterprise") return 199;
  return 0;
}

export function diasPlano(plano: string) {
  if (plano === "free") return 30;
  if (plano === "pro") return 30;
  if (plano === "enterprise") return 30;
  return 30;
}

export function adicionarDias(data: Date, dias: number) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  return novaData;
}