import { NextRequest, NextResponse } from "next/server";

type SessionUser = {
  id: string;
  nome: string;
  email: string;
  role: "superadmin" | "admin" | "user";
  empresaId: string;
};

function lerSessao(request: NextRequest): SessionUser | null {
  try {
    const session = request.cookies.get("session")?.value;

    if (!session) return null;

    const json = Buffer.from(session, "base64").toString("utf-8");
    return JSON.parse(json) as SessionUser;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const rotasPublicas = [
    "/",
    "/login",
    "/registro",
    "/planos",
    "/recuperar-senha",
  ];

  const isArquivoInterno =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".");

  const isApiPublica =
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/logout") ||
    pathname.startsWith("/api/auth/registro") ||
    pathname.startsWith("/api/auth/esqueci-senha") ||
    pathname.startsWith("/api/auth/redefinir-senha") ||
    pathname.startsWith("/api/usuarios/convites/token") ||
    pathname.startsWith("/api/usuarios/convites/aceitar");

  const isPaginaPublica =
    rotasPublicas.includes(pathname) ||
    pathname.startsWith("/aceitar-convite") ||
    pathname.startsWith("/redefinir-senha");

  if (isArquivoInterno || isApiPublica || isPaginaPublica) {
    return NextResponse.next();
  }

  const sessionUser = lerSessao(request);

  if (!sessionUser) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  if (sessionUser.role === "superadmin") {
    return NextResponse.next();
  }

  const rotasPainelProtegidas = [
    "/dashboard",
    "/produtos",
    "/usuarios",
    "/fornecedores",
    "/solicitacoes",
    "/movimentacoes",
    "/relatorios",
    "/atividade",
    "/minhas-solicitacoes",
    "/dashboard/minha-assinatura",
    "/dashboard/empresa",
  ];

  const precisaValidarAssinatura = rotasPainelProtegidas.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`)
  );

  if (!precisaValidarAssinatura) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`${origin}/api/auth/validar-assinatura`, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("erro", "assinatura");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("erro", "assinatura");
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};