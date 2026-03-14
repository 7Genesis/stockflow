export function limiteUsuariosPorPlano(plano: string) {
  if (plano === "free") return 2;
  if (plano === "pro") return 10;
  if (plano === "enterprise") return 999;
  return 2;
}