"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
  onDetected: (codigo: string) => void | Promise<void>;
};

export default function BarcodeScanner({ onDetected }: Props) {
  const reactId = useId();
  const elementId = `scanner-${reactId.replace(/[:]/g, "")}`;

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const startedRef = useRef(false);
  const detectingRef = useRef(false);
  const mountedRef = useRef(true);

  const [erro, setErro] = useState("");
  const [carregandoCamera, setCarregandoCamera] = useState(false);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [ultimoCodigo, setUltimoCodigo] = useState("");

  const pararScanner = useCallback(async () => {
    try {
      if (scannerRef.current && startedRef.current) {
        await scannerRef.current.stop();
        startedRef.current = false;
      }
    } catch (error) {
      console.error("Erro ao parar scanner:", error);
    } finally {
      if (mountedRef.current) {
        setCameraAtiva(false);
      }
    }
  }, []);

  const iniciarScanner = useCallback(async () => {
    try {
      setErro("");
      setCarregandoCamera(true);

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      if (startedRef.current) {
        setCameraAtiva(true);
        return;
      }

      await scannerRef.current.start(
        { facingMode: { exact: "environment" } },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.777778,
        },
        async (decodedText) => {
          if (detectingRef.current) return;

          const codigo = decodedText.trim();
          if (!codigo) return;

          detectingRef.current = true;
          setUltimoCodigo(codigo);

          try {
            await onDetected(codigo);
            await pararScanner();
          } catch (error) {
            console.error("Erro ao processar leitura:", error);
          } finally {
            setTimeout(() => {
              detectingRef.current = false;
            }, 1200);
          }
        },
        () => {}
      );

      startedRef.current = true;

      if (mountedRef.current) {
        setCameraAtiva(true);
      }
    } catch (error) {
      console.error("Erro ao iniciar câmera:", error);

      try {
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode(elementId);
        }

        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.777778,
          },
          async (decodedText) => {
            if (detectingRef.current) return;

            const codigo = decodedText.trim();
            if (!codigo) return;

            detectingRef.current = true;
            setUltimoCodigo(codigo);

            try {
              await onDetected(codigo);
              await pararScanner();
            } catch (err) {
              console.error("Erro ao processar leitura:", err);
            } finally {
              setTimeout(() => {
                detectingRef.current = false;
              }, 1200);
            }
          },
          () => {}
        );

        startedRef.current = true;

        if (mountedRef.current) {
          setCameraAtiva(true);
        }
      } catch (fallbackError) {
        console.error("Erro ao iniciar câmera em modo fallback:", fallbackError);
        setErro(
          "Não foi possível abrir a câmera. No iPhone, abra o sistema em HTTPS no Safari e permita acesso à câmera."
        );
      }
    } finally {
      if (mountedRef.current) {
        setCarregandoCamera(false);
      }
    }
  }, [elementId, onDetected, pararScanner]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      async function finalizar() {
        try {
          if (scannerRef.current && startedRef.current) {
            await scannerRef.current.stop();
            startedRef.current = false;
          }
        } catch (error) {
          console.error("Erro ao parar scanner no cleanup:", error);
        }

        try {
          await scannerRef.current?.clear();
        } catch (error) {
          console.error("Erro ao limpar scanner:", error);
        }

        detectingRef.current = false;
      }

      finalizar();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {!cameraAtiva ? (
          <button
            type="button"
            onClick={iniciarScanner}
            disabled={carregandoCamera}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregandoCamera ? "Abrindo câmera..." : "Iniciar scanner"}
          </button>
        ) : (
          <button
            type="button"
            onClick={pararScanner}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Parar scanner
          </button>
        )}
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div
        id={elementId}
        className="h-72 w-full overflow-hidden rounded-lg border border-zinc-300 bg-black"
      />

      {cameraAtiva && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Câmera ativa. Aponte para o código de barras.
        </div>
      )}

      {ultimoCodigo && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
          Último código lido: <strong>{ultimoCodigo}</strong>
        </div>
      )}
    </div>
  );
}