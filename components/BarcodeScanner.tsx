"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
  onDetected: (codigo: string) => void;
};

export default function BarcodeScanner({ onDetected }: Props) {
  const reactId = useId();
  const elementId = `scanner-${reactId.replace(/[:]/g, "")}`;

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);
  const detectingRef = useRef(false);

  const [erro, setErro] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode(elementId);
    scannerRef.current = scanner;

    async function iniciar() {
      try {
        setErro("");

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            if (detectingRef.current) return;
            detectingRef.current = true;

            try {
              onDetected(decodedText);

              if (startedRef.current) {
                await scanner.stop();
                startedRef.current = false;
              }
            } catch (e) {
              console.error("Erro ao processar leitura:", e);
            }
          },
          () => {}
        );

        startedRef.current = true;
      } catch (err) {
        console.error("Erro ao iniciar câmera:", err);
        setErro(
          "Não foi possível abrir a câmera. No iPhone, abra o sistema pelo link HTTPS no Safari e permita acesso à câmera."
        );
      }
    }

    iniciar();

    return () => {
      async function finalizar() {
        try {
          if (scannerRef.current && startedRef.current) {
            await scannerRef.current.stop();
            startedRef.current = false;
          }
        } catch (e) {
          console.error("Erro ao parar scanner no cleanup:", e);
        }

        try {
          await scannerRef.current?.clear();
        } catch (e) {
          console.error("Erro ao limpar scanner:", e);
        }

        detectingRef.current = false;
      }

      finalizar();
    };
  }, [elementId, onDetected]);

  if (erro) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {erro}
      </div>
    );
  }

  return (
    <div
      id={elementId}
      className="h-72 w-full overflow-hidden rounded-lg border border-zinc-300 bg-black"
    />
  );
}