const DOMINIOS_DESCARTAVEIS = [
  "mailinator.com",
  "yopmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "tempmail.com",
  "sharklasers.com",
  "dispostable.com",
  "trashmail.com",
  "fakeinbox.com",
  "emailondeck.com",
];

export function isEmailDescartavel(email: string) {
  const valor = String(email ?? "").trim().toLowerCase();
  const partes = valor.split("@");

  if (partes.length !== 2) return true;

  const dominio = partes[1];
  return DOMINIOS_DESCARTAVEIS.includes(dominio);
}