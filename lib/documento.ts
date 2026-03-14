export function onlyDigits(value: string | undefined | null) {
  return String(value ?? "").replace(/\D/g, "");
}

export function validarCPF(cpf: string) {
  const valor = onlyDigits(cpf);

  if (valor.length !== 11) return false;
  if (/^(\d)\1+$/.test(valor)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(valor[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(valor[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(valor[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(valor[10])) return false;

  return true;
}

export function validarCNPJ(cnpj: string) {
  const valor = onlyDigits(cnpj);

  if (valor.length !== 14) return false;
  if (/^(\d)\1+$/.test(valor)) return false;

  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += Number(valor[i]) * pesos1[i];
  }

  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== Number(valor[12])) return false;

  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += Number(valor[i]) * pesos2[i];
  }

  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  if (digito2 !== Number(valor[13])) return false;

  return true;
}

export function validarDocumento(tipoDocumento: string, documento: string) {
  const tipo = String(tipoDocumento ?? "").trim().toLowerCase();
  const valor = onlyDigits(documento);

  if (tipo === "cpf") return validarCPF(valor);
  if (tipo === "cnpj") return validarCNPJ(valor);

  return false;
}