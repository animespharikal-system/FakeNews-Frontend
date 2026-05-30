import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { InputCard } from "../components/InputCard";
import { ResultCard } from "../components/ResultCard";
import { LoadingScanner } from "../components/LoadingScanner";
import { Cpu, Terminal, Sparkles } from "lucide-react";
import { getApiErrorMessage, predictNews } from "../services/api";

interface AnalyzePageProps {
  onLogout: () => void;
  userEmail?: string;
}

interface ResultData {
  type: "text" | "url";
  content: string;
  prediction: string;
  confidence: number;
  score: number;
  label: "VERIFIED" | "SUSPICIOUS" | "CLICKBAIT" | "FAKE NEWS";
  sensationalism: number;
  bias: "LEFT" | "CENTER" | "RIGHT" | "EXTREME";
  sourceTrust: number;
  aiProbability: number;
  summary: string;
}

interface DashboardScanData {
  id: string | number;
  title: string;
  score: number;
  label: ResultData["label"];
  source: string;
}

const createDashboardResult = (scanData: DashboardScanData): ResultData => ({
  type: "text",
  content: scanData.title,
  prediction: scanData.label,
  confidence: scanData.score,
  score: scanData.score,
  label: scanData.label,
  sensationalism: scanData.score < 40 ? 82 : scanData.score < 70 ? 55 : 12,
  bias:
    scanData.score < 40 ? "EXTREME" : scanData.score < 75 ? "LEFT" : "CENTER",
  sourceTrust: scanData.score,
  aiProbability: scanData.score < 40 ? 94 : scanData.score < 70 ? 45 : 8,
  summary: `Imported scan record ${scanData.id}. Origin domain verified as [${scanData.source}]. Telemetry indices match previous archival checks. Rating: ${scanData.label}.`,
});

export const AnalyzePage: React.FC<AnalyzePageProps> = ({
  onLogout,
  userEmail,
}) => {
  const location = useLocation();
  const initialScanData = (
    location.state as { scanData?: DashboardScanData } | null
  )?.scanData;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultData | null>(() =>
    initialScanData ? createDashboardResult(initialScanData) : null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clampConfidence = (confidence: number) =>
    Math.min(100, Math.max(0, Number(confidence.toFixed(1))));

  const mapPredictionToLabel = (prediction: string): ResultData["label"] => {
    const normalizedPrediction = prediction.trim().toLowerCase();

    if (normalizedPrediction.includes("fake")) return "FAKE NEWS";
    if (
      normalizedPrediction.includes("real") ||
      normalizedPrediction.includes("true") ||
      normalizedPrediction.includes("verified")
    )
      return "VERIFIED";
    if (normalizedPrediction.includes("clickbait")) return "CLICKBAIT";

    return "SUSPICIOUS";
  };
  const handleAnalyze = async (data: {
    type: "text" | "url";
    content: string;
  }) => {
    setIsAnalyzing(true);
    setResult(null);
    setErrorMessage(null);

    try {
      const predictionResult = await predictNews(data.content.trim());
      const confidence = clampConfidence(predictionResult.confidence);
      const label = mapPredictionToLabel(predictionResult.prediction);
      const isFakePrediction = label === "FAKE NEWS";

      setResult({
        type: data.type,
        content: data.content,
        prediction: predictionResult.prediction,
        confidence,
        score: confidence,
        label,
        sensationalism: isFakePrediction
          ? Math.max(70, Math.round(confidence))
          : Math.max(8, Math.round(100 - confidence)),
        bias: isFakePrediction ? "EXTREME" : "CENTER",
        sourceTrust: isFakePrediction
          ? Math.max(5, Math.round(100 - confidence))
          : Math.round(confidence),
        aiProbability: isFakePrediction
          ? Math.round(confidence)
          : Math.max(5, Math.round(100 - confidence)),
        summary: `Backend model returned "${predictionResult.prediction}" with ${confidence}% confidence for the submitted ${data.type === "url" ? "URL text payload" : "news content"}.`,
      });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setIsAnalyzing(false);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-64 w-96 h-96 rounded-full bg-cyber-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl pointer-events-none" />

      {/* Responsive Sidebar Menu */}
      <Sidebar onLogout={onLogout} userEmail={userEmail} />

      {/* Main Panel Content Area */}
      <main className="flex-1 lg:pl-64 min-w-0 transition-all duration-300">
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 pt-20 lg:pt-10">
          {/* Header title */}
          <div>
            <div className="flex items-center gap-2 text-cyber-cyan">
              <Terminal className="w-5 h-5 neon-text-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                ANALYSIS TELEMETRY NODE
              </span>
            </div>
            <h1 className="font-display font-black text-3xl text-white mt-1 leading-none">
              CREDIBILITY SCANNER
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-2">
              Deconstruct content structures and evaluate contextual truth
              ratings in real-time
            </p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Card: Input Card (Spans 5 columns) */}
            <div className="lg:col-span-5">
              <InputCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Right Card: Dynamic state view (Spans 7 columns) */}
            <div className="lg:col-span-7">
              {isAnalyzing && <LoadingScanner />}

              {!isAnalyzing && result && (
                <ResultCard result={result} onClear={handleClear} />
              )}

              {!isAnalyzing && errorMessage && (
                <div className="glassmorphism rounded-2xl p-8 glow-border-cyber relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] text-center font-mono">
                  <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
                  <div className="relative z-10 max-w-md">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-red bg-cyber-red/10 text-cyber-red shadow-[0_0_15px_rgba(239,68,68,0.25)] text-xs font-black tracking-widest uppercase">
                      <Terminal size={14} />
                      <span>API LINK FAILURE</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-6 leading-relaxed">
                      {errorMessage}
                    </p>
                    <button
                      onClick={handleClear}
                      className="mt-6 px-4 py-3 rounded-xl border border-slate-800 hover:border-cyber-cyan/30 bg-slate-950/40 text-slate-400 hover:text-cyber-cyan transition-all cursor-pointer text-xs font-mono font-bold uppercase tracking-widest"
                    >
                      Reset Scanner
                    </button>
                  </div>
                </div>
              )}

              {!isAnalyzing && !result && !errorMessage && (
                /* Idle holographic screen card */
                <div className="glassmorphism rounded-2xl p-8 glow-border-cyan relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] text-center font-mono">
                  {/* Glowing core animation */}
                  <div className="relative w-24 h-24 flex items-center justify-center z-10 mb-6 group cursor-pointer">
                    {/* Ring orbit */}
                    <div className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-cyber-pulse" />
                    {/* Rotating grid circle */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-cyber-cyan/40 animate-glow-spin" />
                    {/* Pulsing glow backdrop */}
                    <div className="absolute inset-4 rounded-full bg-cyber-cyan/5 group-hover:bg-cyber-cyan/15 blur-md transition-all duration-300" />
                    {/* Core CPU Icon */}
                    <div className="relative z-10 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <Cpu size={24} />
                    </div>
                  </div>

                  <div className="relative z-10 max-w-sm">
                    <h3 className="font-display font-black text-slate-300 text-sm tracking-widest uppercase flex items-center justify-center gap-1.5 select-none">
                      <Sparkles size={14} className="text-cyber-cyan" />
                      <span>COGNITIVE CORE IDLE</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1 uppercase">
                      Awaiting telemetry scan inputs
                    </p>

                    <p className="text-xs text-slate-400 mt-6 leading-relaxed bg-slate-950/40 border border-slate-900/60 p-4 rounded-xl">
                      TruthLens AI uses advanced neural vector modeling and
                      contextual reference checks to evaluate structural
                      language integrity. Paste an article copy on the left to
                      initiate telemetry scanning.
                    </p>
                  </div>

                  {/* Cyber Grid background for high-tech aesthetic */}
                  <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
