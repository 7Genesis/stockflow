import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rotasProtegidas = [
  "/dashboard",
  "/produtos",
  "/movimentacoes",
  "/scanner",
  "/solicitacoes",
  "/usuarios",
  "/perfil",
  "/minhas-solicitacoes",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const precisaProteger = rotasProtegidas.some((rota) =>
    pathname.startsWith(rota)
  );

  if (!precisaProteger) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = decodeURIComponent(session);
    const json = Buffer.from(decoded, "base64").toString("utf-8");
    JSON.parse(json);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/produtos/:path*",
    "/movimentacoes/:path*",
    "/scanner/:path*",
    "/solicitacoes/:path*",
    "/usuarios/:path*",
    "/perfil/:path*",
    "/minhas-solicitacoes/:path*",
  ],
};