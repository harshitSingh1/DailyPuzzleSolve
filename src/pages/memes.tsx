import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  RefreshCw,
  Type,
  Palette,
  Trash2,
  Plus,
  Minus,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
  ImageIcon,
  Layers,
  Move,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/SEOHead";
import AdBlock from "@/components/ads/AdBlock";

// ─── Types ──────────────────────────────────────────
interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  bold: boolean;
  italic: boolean;
  align: CanvasTextAlign;
  rotation: number;
  opacity: number;
  shadow: boolean;
}

interface HistoryState {
  textElements: TextElement[];
}

interface RedditMeme {
  data: { id: string; title: string; url: string; permalink: string };
}

// ─── Constants ──────────────────────────────────────
const FONTS = [
  "Impact",
  "Arial",
  "Comic Sans MS",
  "Courier New",
  "Georgia",
  "Verdana",
  "Times New Roman",
  "Trebuchet MS",
];
const COLORS = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff6600",
  "#1976d2",
];
const FILTERS = ["Trending", "Latest", "Top Weekly", "Best Of All Time"] as const;

const defaultText = (): TextElement => ({
  id: Date.now().toString(),
  text: "Your text here",
  x: 250,
  y: 50,
  fontSize: 32,
  fontFamily: "Impact",
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 4,
  bold: true,
  italic: false,
  align: "center",
  rotation: 0,
  opacity: 1,
  shadow: true,
});

// ─── Component ──────────────────────────────────────
const Memes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Template state
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  // Text state
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // History for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([{ textElements: [] }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Gallery
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Trending");

  const activeText = textElements.find((t) => t.id === activeTextId) || null;

  // ── Fetch templates ───────────────────────────────
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setTemplates(d.data.memes.slice(0, 50));
          setSelectedTemplate(d.data.memes[0]);
        }
      })
      .catch(console.error);
  }, []);

  // ── Fetch gallery ─────────────────────────────────
  const { data: galleryMemes = [], isLoading: galleryLoading } = useQuery({
    queryKey: ["reddit-memes", filter],
    queryFn: async () => {
      const urls: Record<string, string> = {
        Trending: "https://www.reddit.com/r/programmingmemes/hot.json?limit=12",
        Latest: "https://www.reddit.com/r/programmingmemes/new.json?limit=12",
        "Top Weekly": "https://www.reddit.com/r/programmingmemes/top.json?limit=12&t=week",
        "Best Of All Time": "https://www.reddit.com/r/programmingmemes/top.json?limit=12&t=all",
      };
      const res = await fetch(urls[filter]);
      const data = await res.json();
      return (data?.data?.children || []) as RedditMeme[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // ── History helpers ───────────────────────────────
  const pushHistory = useCallback(
    (elements: TextElement[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ textElements: elements });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex],
  );

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTextElements(history[historyIndex - 1].textElements);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTextElements(history[historyIndex + 1].textElements);
    }
  };

  // ── Canvas rendering ──────────────────────────────
  useEffect(() => {
    const imgSrc = customImage || selectedTemplate?.url;
    if (!imgSrc || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current!;
      const maxW = Math.min(500, window.innerWidth - 40);
      const ratio = Math.min(maxW / img.width, 500 / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      textElements.forEach((t) => {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate((t.rotation * Math.PI) / 180);
        ctx.globalAlpha = t.opacity;
        ctx.textAlign = t.align;

        const style = `${t.bold ? "bold " : ""}${t.italic ? "italic " : ""}`;
        ctx.font = `${style}${t.fontSize}px ${t.fontFamily}`;

        if (t.shadow) {
          ctx.shadowColor = "rgba(0,0,0,0.5)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
        }

        ctx.strokeStyle = t.strokeColor;
        ctx.lineWidth = t.strokeWidth;
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;

        // Multi-line support
        const lines = t.text.split("\n");
        lines.forEach((line, i) => {
          const yOffset = i * t.fontSize * 1.2;
          ctx.strokeText(line, 0, yOffset);
          ctx.fillStyle = t.color;
          ctx.fillText(line, 0, yOffset);
        });

        // Selection indicator
        if (t.id === activeTextId) {
          ctx.globalAlpha = 0.3;
          const metrics = ctx.measureText(t.text);
          const w = metrics.width + 10;
          const h = t.fontSize * lines.length * 1.2 + 10;
          ctx.strokeStyle = "#1976d2";
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 3]);
          ctx.strokeRect(-w / 2 - 5, -t.fontSize - 5, w, h);
        }

        ctx.restore();
      });
    };
    img.src = imgSrc;
  }, [selectedTemplate, customImage, textElements, activeTextId]);

  // ── Mouse/Touch handlers ──────────────────────────
  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const findTextAt = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return null;
    for (let i = textElements.length - 1; i >= 0; i--) {
      const t = textElements[i];
      const style = `${t.bold ? "bold " : ""}${t.italic ? "italic " : ""}`;
      ctx.font = `${style}${t.fontSize}px ${t.fontFamily}`;
      const w = ctx.measureText(t.text).width;
      if (x >= t.x - w / 2 - 10 && x <= t.x + w / 2 + 10 && y >= t.y - t.fontSize - 10 && y <= t.y + 10) {
        return t;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getCanvasPos(e);
    const hit = findTextAt(pos.x, pos.y);
    if (hit) {
      setActiveTextId(hit.id);
      setIsDragging(true);
      setDragOffset({ x: pos.x - hit.x, y: pos.y - hit.y });
    } else {
      setActiveTextId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !activeTextId) return;
    const pos = getCanvasPos(e);
    setTextElements((prev) =>
      prev.map((t) => (t.id === activeTextId ? { ...t, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y } : t)),
    );
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      pushHistory(textElements);
    }
  };

  // ── Text operations ───────────────────────────────
  const addText = () => {
    const canvas = canvasRef.current;
    const newText = defaultText();
    if (canvas) {
      newText.x = canvas.width / 2;
      newText.y = textElements.length === 0 ? 50 : canvas.height - 50;
    }
    const updated = [...textElements, newText];
    setTextElements(updated);
    setActiveTextId(newText.id);
    pushHistory(updated);
  };

  const deleteText = () => {
    if (!activeTextId) return;
    const updated = textElements.filter((t) => t.id !== activeTextId);
    setTextElements(updated);
    setActiveTextId(null);
    pushHistory(updated);
  };

  const updateActive = (updates: Partial<TextElement>) => {
    const updated = textElements.map((t) => (t.id === activeTextId ? { ...t, ...updates } : t));
    setTextElements(updated);
  };

  const commitUpdate = () => pushHistory(textElements);

  // ── File upload ───────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomImage(reader.result as string);
      setSelectedTemplate(null);
      setTextElements([]);
      setActiveTextId(null);
    };
    reader.readAsDataURL(file);
  };

  // ── Download / Share ──────────────────────────────
  const download = async (url?: string) => {
    if (!url) {
      // Download from canvas editor
      if (canvasRef.current) {
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
      }
      return;
    }

    // For external images (Reddit etc.), draw to an offscreen canvas to bypass CORS
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image load failed"));
      });
      const offscreen = document.createElement("canvas");
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const ctx = offscreen.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataUrl = offscreen.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = dataUrl;
      link.click();
    } catch {
      // Second fallback: fetch as blob
      try {
        const res = await fetch(url, { mode: "cors" });
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = blobUrl;
        link.click();
        URL.revokeObjectURL(blobUrl);
      } catch {
        // Final fallback: open image directly (not Reddit page)
        window.open(url, "_blank");
      }
    }
  };

  const share = async (url?: string) => {
    try {
      if (url) {
        if (navigator.share) await navigator.share({ title: "Check out this meme!", url });
        else window.open(url, "_blank");
      } else if (canvasRef.current) {
        const blob = await new Promise<Blob | null>((r) => canvasRef.current?.toBlob(r, "image/png"));
        if (blob) {
          const file = new File([blob], "meme.png", { type: "image/png" });
          if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file], title: "Check out this meme!" });
          } else {
            window.open(URL.createObjectURL(blob), "_blank");
          }
        }
      }
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  const randomTemplate = () => {
    if (!templates.length) return;
    setSelectedTemplate(templates[Math.floor(Math.random() * templates.length)]);
    setCustomImage(null);
    setTextElements([]);
    setActiveTextId(null);
  };

  // Template filtering
  const filteredTemplates = templateSearch
    ? templates.filter((t) => t.name.toLowerCase().includes(templateSearch.toLowerCase()))
    : templates;
  const visibleTemplates = showAllTemplates ? filteredTemplates : filteredTemplates.slice(0, 12);

  return (
    <>
      <SEOHead
        title="Free Programming Meme Generator - Create & Share Developer Memes"
        description="Create hilarious programming, coding, and tech memes instantly. 50+ templates, drag-and-drop text, custom colors, and trending Reddit dev memes. 100% free."
        path="/memes"
        dateModified={new Date().toISOString().split("T")[0]}
        breadcrumbs={[{ name: "Meme Generator", url: "https://dailypuzzlesolve.com/memes" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Programming Meme Generator",
          applicationCategory: "EntertainmentApplication",
          operatingSystem: "Web",
          url: "https://dailypuzzlesolve.com/memes",
          description:
            "Free online meme generator for programmers and tech enthusiasts. Create custom memes with 50+ templates.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@type": "Organization", name: "PuzzleLogicHub" },
        }}
      />
      <main className="pt-6 pb-12">
        <div className="container">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h1 className="mb-2 font-display text-3xl font-extrabold sm:text-4xl">DevMode: Here LOLs Are Born</h1>
            <p className="text-muted-foreground">A tale for the grandkids: This is how I met your Meme-ther!</p>
          </motion.div>
          <AdBlock slot="5934836566" format="leaderboard" lazy={false} minHeight={90} className="mb-8" />

          {/* ── EDITOR SECTION ─────────────────────── */}
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Canvas */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-w-[500px]">
                {!selectedTemplate && !customImage ? (
                  <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
                    <p className="text-muted-foreground">Select a template or upload an image</p>
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="mx-auto cursor-crosshair rounded-xl shadow-lg"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                  />
                )}
              </div>

              {/* Quick actions below canvas */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 rounded-full"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo2 className="h-3.5 w-3.5" /> Undo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 rounded-full"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo2 className="h-3.5 w-3.5" /> Redo
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 rounded-full" onClick={() => download()}>
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 rounded-full" onClick={() => share()}>
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="text" className="flex-1 gap-1.5">
                    <Type className="h-3.5 w-3.5" /> Text
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex-1 gap-1.5">
                    <Layers className="h-3.5 w-3.5" /> Templates
                  </TabsTrigger>
                  <TabsTrigger value="style" className="flex-1 gap-1.5">
                    <Palette className="h-3.5 w-3.5" /> Style
                  </TabsTrigger>
                </TabsList>

                {/* ── Text Tab ────────────────────────── */}
                <TabsContent value="text" className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={addText} className="flex-1 gap-1.5 rounded-full" size="sm">
                      <Plus className="h-3.5 w-3.5" /> Add Text
                    </Button>
                    <Button
                      onClick={deleteText}
                      variant="destructive"
                      className="gap-1.5 rounded-full"
                      size="sm"
                      disabled={!activeTextId}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>

                  {/* Text list */}
                  {textElements.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Text Layers</p>
                      {textElements.map((t, i) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTextId(t.id)}
                          className={`w-full rounded-lg border p-2 text-left text-sm transition-colors ${
                            t.id === activeTextId ? "border-primary bg-accent" : "border-border hover:bg-muted"
                          }`}
                        >
                          <span className="font-medium">Layer {i + 1}:</span>{" "}
                          <span className="text-muted-foreground">{t.text.substring(0, 25)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Edit active text */}
                  {activeText && (
                    <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-3">
                      <Input
                        value={activeText.text}
                        onChange={(e) => updateActive({ text: e.target.value })}
                        onBlur={commitUpdate}
                        placeholder="Enter text..."
                        className="font-medium"
                      />

                      {/* Formatting row */}
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant={activeText.bold ? "default" : "outline"}
                          className="h-8 w-8"
                          onClick={() => {
                            updateActive({ bold: !activeText.bold });
                            commitUpdate();
                          }}
                        >
                          <Bold className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant={activeText.italic ? "default" : "outline"}
                          className="h-8 w-8"
                          onClick={() => {
                            updateActive({ italic: !activeText.italic });
                            commitUpdate();
                          }}
                        >
                          <Italic className="h-3.5 w-3.5" />
                        </Button>
                        <div className="mx-1 w-px bg-border" />
                        {(["left", "center", "right"] as const).map((a) => (
                          <Button
                            key={a}
                            size="icon"
                            variant={activeText.align === a ? "default" : "outline"}
                            className="h-8 w-8"
                            onClick={() => {
                              updateActive({ align: a });
                              commitUpdate();
                            }}
                          >
                            {a === "left" ? (
                              <AlignLeft className="h-3.5 w-3.5" />
                            ) : a === "center" ? (
                              <AlignCenter className="h-3.5 w-3.5" />
                            ) : (
                              <AlignRight className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        ))}
                        <div className="mx-1 w-px bg-border" />
                        <Button
                          size="icon"
                          variant={activeText.shadow ? "default" : "outline"}
                          className="h-8 w-8"
                          onClick={() => {
                            updateActive({ shadow: !activeText.shadow });
                            commitUpdate();
                          }}
                          title="Toggle shadow"
                        >
                          S
                        </Button>
                      </div>

                      {/* Font size */}
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Size: {activeText.fontSize}px</span>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => {
                                updateActive({ fontSize: Math.max(12, activeText.fontSize - 2) });
                                commitUpdate();
                              }}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => {
                                updateActive({ fontSize: Math.min(80, activeText.fontSize + 2) });
                                commitUpdate();
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Slider
                          value={[activeText.fontSize]}
                          onValueChange={([v]) => updateActive({ fontSize: v })}
                          onValueCommit={commitUpdate}
                          min={12}
                          max={80}
                          step={1}
                        />
                      </div>

                      {/* Rotation */}
                      <div>
                        <div className="mb-1 flex items-center gap-1.5">
                          <RotateCw className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Rotation: {activeText.rotation}°</span>
                        </div>
                        <Slider
                          value={[activeText.rotation]}
                          onValueChange={([v]) => updateActive({ rotation: v })}
                          onValueCommit={commitUpdate}
                          min={-180}
                          max={180}
                          step={1}
                        />
                      </div>

                      {/* Opacity */}
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Opacity: {Math.round(activeText.opacity * 100)}%
                        </span>
                        <Slider
                          value={[activeText.opacity * 100]}
                          onValueChange={([v]) => updateActive({ opacity: v / 100 })}
                          onValueCommit={commitUpdate}
                          min={10}
                          max={100}
                          step={5}
                        />
                      </div>

                      {/* Stroke width */}
                      <div>
                        <span className="text-xs text-muted-foreground">Outline: {activeText.strokeWidth}px</span>
                        <Slider
                          value={[activeText.strokeWidth]}
                          onValueChange={([v]) => updateActive({ strokeWidth: v })}
                          onValueCommit={commitUpdate}
                          min={0}
                          max={10}
                          step={1}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* ── Templates Tab ───────────────────── */}
                <TabsContent value="templates" className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={randomTemplate}
                      variant="outline"
                      className="flex-1 gap-1.5 rounded-full"
                      size="sm"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Random
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-1.5 rounded-full"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-3.5 w-3.5" /> Upload
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <Input
                    placeholder="Search templates..."
                    value={templateSearch}
                    onChange={(e) => setTemplateSearch(e.target.value)}
                    className="text-sm"
                  />

                  <div className="grid max-h-[400px] grid-cols-3 gap-2 overflow-y-auto pr-1">
                    {visibleTemplates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTemplate(t);
                          setCustomImage(null);
                          setTextElements([]);
                          setActiveTextId(null);
                        }}
                        className={`overflow-hidden rounded-lg border-2 transition-all ${
                          selectedTemplate?.id === t.id
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <img
                          src={t.url}
                          alt={t.name}
                          className="aspect-square w-full object-contain p-1"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>

                  {filteredTemplates.length > 12 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowAllTemplates(!showAllTemplates)}
                    >
                      {showAllTemplates ? "Show Less" : `Show All (${filteredTemplates.length})`}
                    </Button>
                  )}
                </TabsContent>

                {/* ── Style Tab ───────────────────────── */}
                <TabsContent value="style" className="space-y-4">
                  {!activeText ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      Select or add a text element to style it
                    </p>
                  ) : (
                    <>
                      {/* Font family */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Font Family</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {FONTS.map((f) => (
                            <button
                              key={f}
                              onClick={() => {
                                updateActive({ fontFamily: f });
                                commitUpdate();
                              }}
                              style={{ fontFamily: f }}
                              className={`rounded-lg border px-2.5 py-1.5 text-sm transition-colors ${
                                activeText.fontFamily === f
                                  ? "border-primary bg-accent font-bold"
                                  : "border-border hover:bg-muted"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Text color */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Text Color</p>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button
                              key={c}
                              onClick={() => {
                                updateActive({ color: c });
                                commitUpdate();
                              }}
                              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                activeText.color === c
                                  ? "border-primary ring-2 ring-primary/30 scale-110"
                                  : "border-border"
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-border text-xs hover:bg-muted">
                                +
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-3">
                              <Input
                                type="color"
                                value={activeText.color}
                                onChange={(e) => updateActive({ color: e.target.value })}
                                onBlur={commitUpdate}
                                className="h-10 w-full cursor-pointer"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {/* Stroke color */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Outline Color</p>
                        <div className="flex flex-wrap gap-2">
                          {["#000000", "#ffffff", "#ff0000", "#1976d2", "#333333"].map((c) => (
                            <button
                              key={c}
                              onClick={() => {
                                updateActive({ strokeColor: c });
                                commitUpdate();
                              }}
                              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                activeText.strokeColor === c
                                  ? "border-primary ring-2 ring-primary/30 scale-110"
                                  : "border-border"
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-border text-xs hover:bg-muted">
                                +
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-3">
                              <Input
                                type="color"
                                value={activeText.strokeColor}
                                onChange={(e) => updateActive({ strokeColor: e.target.value })}
                                onBlur={commitUpdate}
                                className="h-10 w-full cursor-pointer"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ── GALLERY SECTION ────────────────────── */}
          <div className="mt-12">
            <h2 className="mb-2 text-center font-display text-2xl font-bold">Puzzled? Same. Let&apos;s Meme Instead</h2>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {FILTERS.map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  className="rounded-full font-semibold"
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {galleryLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                      <Skeleton className="aspect-square w-full" />
                      <div className="flex gap-2 p-3">
                        <Skeleton className="h-9 flex-1 rounded-full" />
                        <Skeleton className="h-9 flex-1 rounded-full" />
                      </div>
                    </div>
                  ))
                : galleryMemes.map((meme) => (
                    <div
                      key={meme.data.id}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={meme.data.url}
                          alt={meme.data.title}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="flex gap-2 p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1.5 rounded-full"
                          onClick={() => download(meme.data.url)}
                        >
                          <Download className="h-3.5 w-3.5" /> Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-1.5 rounded-full"
                          onClick={() => share(`https://reddit.com${meme.data.permalink}`)}
                        >
                          <Share2 className="h-3.5 w-3.5" /> Share
                        </Button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Ad before SEO Content */}
          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-8" />

          {/* SEO Content */}
          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-3 font-display text-xl font-bold">Free Online Programming Meme Generator</h2>
            <p className="mb-3 text-muted-foreground">
              Create hilarious coding and developer memes in seconds with our free online meme generator. Perfect for
              programmers, tech enthusiasts, and anyone who loves a good laugh about software development.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>✅ 50+ popular meme templates with instant search</li>
              <li>✅ Multiple text layers with drag-and-drop positioning</li>
              <li>✅ Rich formatting: bold, italic, alignment, rotation, opacity</li>
              <li>✅ Custom color picker for text and outlines</li>
              <li>✅ Upload your own images</li>
              <li>✅ Undo/Redo support</li>
              <li>✅ Trending developer memes from Reddit</li>
              <li>✅ Free download and one-click sharing</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "programming memes",
                "coding memes generator",
                "developer memes",
                "tech memes 2026",
                "free meme maker",
              ].map((q) => (
                <span key={q} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {q}
                </span>
              ))}
            </div>
          </div>

          <AdBlock slot="5934836566" format="rectangle" lazy={true} minHeight={250} className="mt-4" />
        </div>
      </main>
    </>
  );
};

export default Memes;
