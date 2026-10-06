import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  Sparkles, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Copy, 
  Save, 
  RefreshCw, 
  HelpCircle, 
  Gamepad2, 
  Layers, 
  BookOpen, 
  BrainCircuit, 
  Lightbulb, 
  Check, 
  FileSpreadsheet, 
  Presentation, 
  FileCode, 
  Zap,
  Tag,
  Shuffle,
  Volume2,
  Headphones,
  Mic,
  PenTool,
  Send,
  ExternalLink,
  ChevronRight,
  FileText
} from 'lucide-react';
import { 
  analyzeTextbookAndGenerate, 
  convertAnalysisToCurriculumUnit, 
  TextbookAnalysisResult,
  PDF_PAGES_CURRICULUM
} from '../../services/textbookAiService';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/audio';

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  extension: 'pdf' | 'excel' | 'word' | 'ppt' | 'text' | 'image' | 'other';
  extractedText: string;
  pageNumber?: number;
}

interface TextbookAIServicePanelProps {
  onNavigatePortal?: (portal: string) => void;
}

export const TextbookAIServicePanel: React.FC<TextbookAIServicePanelProps> = ({ onNavigatePortal }) => {
  const { currentUser, saveUnit, deleteUnit, units, syncAllStandardUnits } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Grade & Book Series settings
  const [grade, setGrade] = useState<number>(3);
  const [bookSeries, setBookSeries] = useState<string>('Global Success');

  // Teacher view mode: 'curriculum_explorer' (Xem kho 80 Units SGK cả năm) or 'upload' (Phân tích thêm tài liệu mới)
  const [teacherViewMode, setTeacherViewMode] = useState<'curriculum_explorer' | 'upload'>('curriculum_explorer');
  const [explorerGrade, setExplorerGrade] = useState<number>(3);
  const [syncStatusToast, setSyncStatusToast] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deletingUnit, setDeletingUnit] = useState<any | null>(null);

  // Page-by-page PDF lesson mode: "Cứ 1 trang PDF là 1 đơn vị bài học"
  const [selectedPdfPage, setSelectedPdfPage] = useState<number>(1);

  // Uploaded docs
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([
    {
      id: 'doc-page-1',
      name: `SGK_Lop3_Trang24_Lesson1.pdf`,
      size: 185000,
      extension: 'pdf',
      pageNumber: 1,
      extractedText: PDF_PAGES_CURRICULUM[0].pageText
    }
  ]);

  // Execution states
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [result, setResult] = useState<TextbookAnalysisResult | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState<'listening' | 'speaking' | 'reading' | 'writing' | 'vocab_games' | 'pedagogy'>('listening');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');
  const [lastCreatedUnitId, setLastCreatedUnitId] = useState<string | null>(null);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);

  // Filter preset pages by grade
  const gradePresets = PDF_PAGES_CURRICULUM.filter(p => p.grade === grade);

  // Determine file extension type
  const getFileExtensionType = (filename: string): UploadedDocument['extension'] => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['xlsx', 'xls', 'csv'].includes(ext)) return 'excel';
    if (['ppt', 'pptx'].includes(ext)) return 'ppt';
    if (['doc', 'docx'].includes(ext)) return 'word';
    if (ext === 'pdf') return 'pdf';
    if (['txt', 'json', 'md'].includes(ext)) return 'text';
    if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) return 'image';
    return 'other';
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Handle Multi-file Upload (PDF, PPT, Excel, Word)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    sound.playPop();
    const newDocs: UploadedDocument[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extType = getFileExtensionType(file.name);
      let extractedText = '';

      try {
        if (extType === 'excel') {
          const buffer = await file.arrayBuffer();
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheetTexts: string[] = [];
          workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const txt = XLSX.utils.sheet_to_txt(sheet);
            if (txt && txt.trim()) {
              sheetTexts.push(`[Sheet: ${sheetName}]\n${txt}`);
            }
          });
          extractedText = sheetTexts.join('\n\n') || `Bảng tính Excel: ${file.name}`;
        } else if (extType === 'text') {
          extractedText = await file.text();
        } else if (extType === 'pdf') {
          const raw = await file.text().catch(() => '');
          extractedText = raw.slice(0, 4000) || `Tài liệu PDF Trang Sách Giáo Khoa Lớp ${grade}: ${file.name} (1 Trang PDF = 1 Đơn Vị Bài Học)`;
        } else if (extType === 'word' || extType === 'ppt') {
          const raw = await file.text().catch(() => '');
          const printable = raw.replace(/[^\x20-\x7E\u00A0-\u024F\u1EA0-\u1EF9]/g, ' ').replace(/\s+/g, ' ').trim();
          extractedText = printable.slice(0, 4000) || `Tài liệu bài học: ${file.name}`;
        } else {
          extractedText = `Tài liệu: ${file.name}`;
        }
      } catch (err) {
        extractedText = `Tài liệu đính kèm: ${file.name}`;
      }

      newDocs.push({
        id: `doc-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: file.size,
        extension: extType,
        pageNumber: i + 1,
        extractedText
      });
    }

    setUploadedDocs(prev => [...prev, ...newDocs]);
    sound.playSuccess();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Select a preset PDF page
  const handleSelectPresetPage = (presetPage: typeof PDF_PAGES_CURRICULUM[0]) => {
    sound.playPop();
    setSelectedPdfPage(presetPage.pageNumber);
    const newDoc: UploadedDocument = {
      id: `doc-page-${Date.now()}`,
      name: `SGK_Lop${presetPage.grade}_Trang${presetPage.pageNumber}_${presetPage.lessonName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      size: 195000,
      extension: 'pdf',
      pageNumber: presetPage.pageNumber,
      extractedText: presetPage.pageText
    };
    setUploadedDocs([newDoc]);
  };

  // Remove document
  const handleRemoveDoc = (id: string) => {
    sound.playPop();
    setUploadedDocs(prev => prev.filter(d => d.id !== id));
    if (previewDocId === id) setPreviewDocId(null);
  };

  // Run AI Analysis: Page-by-page deep analysis covering 4 skills
  const handleAnalyzePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (uploadedDocs.length === 0) {
      sound.playWrong();
      setErrorMessage('Vui lòng chọn hoặc tải lên ít nhất một file/trang sách giáo khoa!');
      return;
    }

    sound.playPop();
    setLoading(true);
    setResult(null);
    setSavedSuccessMsg('');
    setLastCreatedUnitId(null);

    const combinedRawText = uploadedDocs
      .map((doc, idx) => `=== TRANG PDF [${doc.pageNumber || idx + 1}]: ${doc.name} ===\n${doc.extractedText}`)
      .join('\n\n');

    try {
      setProgressStep('Đang kết nối Gemini 3.8 Flash đọc nội dung trang sách giáo khoa PDF...');
      setTimeout(() => setProgressStep('Đang phân tích chuyên sâu 4 kỹ năng: Nghe, Nói, Đọc, Viết...'), 700);
      setTimeout(() => setProgressStep('Đang sinh bài tập Nghe & Nhận diện ngữ âm Phonics...'), 1400);
      setTimeout(() => setProgressStep('Đang tạo đề luyện Nói kèm phát âm và câu hỏi Đọc hiểu...'), 2100);
      setTimeout(() => setProgressStep('Đang thiết kế các dạng bài tập Viết & Cấu trúc Mini Game...'), 2800);

      const data = await analyzeTextbookAndGenerate({
        grade,
        bookSeries,
        unitTitle: 'Auto',
        rawText: combinedRawText
      });

      sound.playSuccess();
      setResult(data);

      // AI TỰ ĐỘNG CHUYỂN NGAY LẬP TỨC SANG CỔNG HỌC SINH KHÔNG CẦN BẤM GỬI THỦ CÔNG
      const unitName = data.analysis.detectedUnitTitle || data.analysis.theme || `Unit Sách Giáo Khoa Lớp ${grade}`;
      const newUnit = convertAnalysisToCurriculumUnit(data, {
        grade,
        bookSeries,
        unitTitle: unitName,
        teacherName: currentUser?.fullName || 'Giáo viên Tiếng Anh',
        publishDirectlyToStudents: true
      });

      saveUnit(newUnit);
      setLastCreatedUnitId(newUnit.id);
      setSavedSuccessMsg(`🎉 AI ĐÃ TỰ ĐỘNG PHÂN TÍCH & CHUYỂN BÀI HỌC "${newUnit.title}" SANG CỔNG HỌC SINH LỚP ${grade}! Học sinh đã có thể chọn học và làm bài tập 4 kỹ năng tự chấm điểm ngay lập tức.`);
    } catch (err: any) {
      sound.playWrong();
      setErrorMessage('Lỗi phân tích: ' + (err.message || 'Không thể kết nối Gemini API.'));
    } finally {
      setLoading(false);
      setProgressStep('');
    }
  };

  // Manual re-sync or publish trigger if needed
  const handlePublishToStudentPortal = () => {
    if (!result) return;
    sound.playSuccess();

    const unitName = result.analysis.detectedUnitTitle || result.analysis.theme || `Unit Sách Giáo Khoa Lớp ${grade}`;

    const newUnit = convertAnalysisToCurriculumUnit(result, {
      grade,
      bookSeries,
      unitTitle: unitName,
      teacherName: currentUser?.fullName || 'Giáo viên Tiếng Anh',
      publishDirectlyToStudents: true
    });

    saveUnit(newUnit);
    setLastCreatedUnitId(newUnit.id);
    setSavedSuccessMsg(`🎉 ĐÃ ĐỒNG BỘ BÀI HỌC "${newUnit.title}" SANG CỔNG HỌC SINH! Học sinh lớp ${grade} đã có thể vào học và làm đủ 4 kỹ năng ngay lập tức.`);
  };

  // Copy JSON
  const handleCopyJSON = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJSON(true);
    sound.playPop();
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const renderDocIcon = (ext: UploadedDocument['extension']) => {
    switch (ext) {
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'ppt':
        return <Presentation className="w-5 h-5 text-orange-600 shrink-0" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-600 shrink-0" />;
      case 'pdf':
        return <FileCode className="w-5 h-5 text-rose-600 shrink-0" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Grade 1 to 5 Auto-Sync Status Dashboard Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 text-white shadow-xl border border-indigo-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-xs font-black text-emerald-300 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toàn Bộ SGK Lớp 1 - 5 Đã Tự Động Đồng Bộ Sang Cổng Học Sinh</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Hệ Thống Sách Giáo Khoa Cả Năm & Tự Động Đồng Bộ Sang Học Sinh
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Toàn bộ tài liệu SGK chuẩn Bộ GD&ĐT từ Lớp 1 đến Lớp 5 đã được phân tích đầy đủ kiến thức và hệ thống bài tập 4 kỹ năng <strong>(Nghe – Nói – Đọc – Viết)</strong> tự động chấm điểm. Giáo viên <strong>không cần phải gửi từng bài thủ công</strong>. Học sinh chỉ cần chọn khối lớp của mình là học xuyên suốt cả năm để ôn lại bài.
              </p>
            </div>

            {/* Quick 1-Click Sync Button */}
            <div className="shrink-0 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  syncAllStandardUnits();
                  setSyncStatusToast('Đã đồng bộ thành công toàn bộ 80 bài học chuẩn SGK Lớp 1 đến Lớp 5 sang Cổng Học Sinh!');
                  setTimeout(() => setSyncStatusToast(''), 4000);
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-indigo-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 border-b-3 border-amber-600"
              >
                <RefreshCw className="w-4 h-4 text-indigo-950" />
                <span>ĐỒNG BỘ LẠI 80 UNITS SGK (1-CLICK SYNC)</span>
              </button>

              {onNavigatePortal && (
                <button
                  type="button"
                  onClick={() => onNavigatePortal('student')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Xem Trực Tiếp Cổng Học Sinh</span>
                </button>
              )}
            </div>
          </div>

          {/* Sync Status Toast Alert if triggered */}
          {syncStatusToast && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-400 rounded-2xl text-emerald-200 text-xs font-black flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{syncStatusToast}</span>
            </div>
          )}

          {/* 5 Grade Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            {[1, 2, 3, 4, 5].map(g => {
              const count = units.filter(u => u.grade === g).length;
              return (
                <div 
                  key={g}
                  onClick={() => {
                    sound.playPop();
                    setExplorerGrade(g);
                    setTeacherViewMode('curriculum_explorer');
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    teacherViewMode === 'curriculum_explorer' && explorerGrade === g
                      ? 'bg-indigo-600/40 border-amber-400 shadow-md scale-102'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Khối Lớp {g}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {count} <span className="text-xs font-bold text-slate-400">Units</span>
                  </div>
                  <div className="text-[10px] text-emerald-300 font-bold mt-1">
                    🟢 Tự động phát học sinh
                  </div>
                </div>
              );
            })}
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setTeacherViewMode('curriculum_explorer');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                teacherViewMode === 'curriculum_explorer'
                  ? 'bg-amber-400 text-indigo-950 shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kho SGK Cả Năm Đang Phát ({units.length} Units Lớp 1 - 5)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setTeacherViewMode('upload');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                teacherViewMode === 'upload'
                  ? 'bg-amber-400 text-indigo-950 shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải Lên Thêm Tài Liệu Mới (PDF / Slide)</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: CURRICULUM EXPLORER (Xem toàn bộ bài học SGK Lớp 1-5 học sinh đang học) */}
      {teacherViewMode === 'curriculum_explorer' && (
        <div className="space-y-4">
          {/* Grade Selector & Info Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-indigo-100 text-indigo-800 font-black px-2.5 py-0.5 rounded-full uppercase">
                  Kiểm Tra Nội Dung Cổng Học Sinh
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Khối Lớp {explorerGrade} • {units.filter(u => u.grade === explorerGrade).length} Units
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Danh Sách Bài Học SGK Cả Năm Khối {explorerGrade} (Tự Động Phát Sang Học Sinh)
              </h3>
              <p className="text-xs text-slate-500">
                Toàn bộ các Unit dưới đây đã có đủ 4 kỹ năng Nghe - Nói - Đọc - Viết tự động chấm điểm và được sắp xếp đúng theo thứ tự cả năm học.
              </p>
            </div>

            {/* Selector buttons */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl shrink-0">
              {[1, 2, 3, 4, 5].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setExplorerGrade(g);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    explorerGrade === g
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          {/* Unit cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {units
              .filter(u => u.grade === explorerGrade)
              .sort((a, b) => {
                const numA = parseInt(a.title.match(/Unit\s+(\d+)/i)?.[1] || '999', 10);
                const numB = parseInt(b.title.match(/Unit\s+(\d+)/i)?.[1] || '999', 10);
                return numA - numB;
              })
              .map((unit, index) => (
                <div
                  key={unit.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-black px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        🟢 Đang phát
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-sm line-clamp-1">
                      {unit.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold mb-3 line-clamp-1">
                      {unit.vietnameseTitle}
                    </p>

                    {/* 4 Skills summary */}
                    <div className="grid grid-cols-2 gap-1 text-[10px] font-bold text-slate-600 mb-3 bg-slate-50 p-2 rounded-xl">
                      <span>🎧 {unit.listeningQuestions.length} câu nghe</span>
                      <span>🎙️ {unit.speechPrompts.length} câu nói AI</span>
                      <span>📖 1 bài đọc</span>
                      <span>✍️ {unit.writingChallenges.length} bài viết</span>
                    </div>

                    {/* Vocab preview chips */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {unit.vocabularies.slice(0, 3).map(v => (
                        <span key={v.id} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          {v.emoji} {v.word}
                        </span>
                      ))}
                      {unit.vocabularies.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">+{unit.vocabularies.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold">{unit.bookSeries}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playPop();
                        setDeletingUnit(unit);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 border border-rose-200 transition-colors cursor-pointer"
                      title="Xóa học liệu khỏi Cổng Giáo Viên và Cổng Học Sinh"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Delete Unit Confirmation Modal (No window.confirm!) */}
          {deletingUnit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-rose-200 shadow-2xl space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
                  <Trash2 className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-black text-slate-900">
                    Xác Nhận Xóa Học Liệu?
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Bạn có chắc chắn muốn xóa bài học <strong>"{deletingUnit.title} - {deletingUnit.vietnameseTitle}"</strong>?
                  </p>
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-700 font-bold mt-2">
                    ⚠️ Học liệu này sẽ ngay lập tức biến mất khỏi cả Cổng Giáo Viên và Cổng Học Sinh!
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setDeletingUnit(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playSuccess();
                      deleteUnit(deletingUnit.id);
                      setSyncStatusToast(`Đã xóa thành công bài học "${deletingUnit.title}". Học liệu đã biến mất khỏi cả Cổng Giáo Viên và Cổng Học Sinh!`);
                      setTimeout(() => setSyncStatusToast(''), 4000);
                      setDeletingUnit(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa Vĩnh Viễn</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: UPLOAD & ANALYZE NEW DOCUMENT */}
      {teacherViewMode === 'upload' && (
      <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white shadow-xl border border-indigo-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-bold text-indigo-300 mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-300" />
            <span>Chế độ Tự Động Phân Tích & Chuyển Thẳng Sang Cổng Học Sinh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
            Tải Lên Tài Liệu / PDF Mới & Tự Động Đồng Bộ 4 Kỹ Năng
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-2 leading-relaxed">
            Mỗi tài liệu hoặc trang PDF sách giáo khoa được AI phân tích chuyên sâu thành một bài học hoàn chỉnh. Hệ thống tự động thiết kế phong phú bài tập cho cả <strong>4 kỹ năng Nghe – Nói – Đọc – Viết</strong> và TỰ ĐỘNG CHUYỂN NGAY sang Cổng Học Sinh để học sinh luyện tập tức thì.
          </p>

          {/* Quick Skill Badges */}
          <div className="flex flex-wrap gap-2 mt-4 text-[11px] font-bold">
            <span className="bg-sky-500/20 border border-sky-400/30 text-sky-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5" /> 1. Kỹ năng Nghe (Listening Audio)
            </span>
            <span className="bg-purple-500/20 border border-purple-400/30 text-purple-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" /> 2. Kỹ năng Nói (Phát âm Microphone)
            </span>
            <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> 3. Kỹ năng Đọc (Truyện & Trắc nghiệm)
            </span>
            <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" /> 4. Kỹ năng Viết (Điền chữ & Ghép câu)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = PDF Upload & Page Selector, Right = 4-Skill Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-document & Page-by-page PDF (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="font-black text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <FileCode className="w-5 h-5 text-rose-600" />
              <span>Trang Sách Giáo Khoa PDF Cần Phân Tích</span>
            </h3>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
              PDF Page Unit
            </span>
          </div>

          <form onSubmit={handleAnalyzePage} className="space-y-4">
            {/* Grade & Book Series */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khối Lớp
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:border-indigo-600"
                >
                  <option value={1}>Lớp 1 (6 tuổi - Pre-A1)</option>
                  <option value={2}>Lớp 2 (7 tuổi - Pre-A1)</option>
                  <option value={3}>Lớp 3 (8 tuổi - A1.1)</option>
                  <option value={4}>Lớp 4 (9 tuổi - A1.2)</option>
                  <option value={5}>Lớp 5 (10 tuổi - A1.3)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bộ Sách Giáo Khoa
                </label>
                <select
                  value={bookSeries}
                  onChange={(e) => setBookSeries(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:border-indigo-600"
                >
                  <option value="Global Success">Global Success (Bộ GD&ĐT)</option>
                  <option value="Family and Friends">Family & Friends National</option>
                  <option value="i-Learn Smart Start">i-Learn Smart Start</option>
                  <option value="English Discovery">English Discovery</option>
                </select>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/40 hover:bg-rose-50 rounded-2xl p-4 text-center transition-all cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md shadow-rose-300 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-rose-950">
                Tải lên file PDF Sách Giáo Khoa hoặc Slide
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Hệ thống nhận diện từng trang: <strong>1 Trang PDF = 1 Đơn vị bài học</strong>
              </p>
            </div>

            {/* Uploaded Documents List */}
            {uploadedDocs.length > 0 && (
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Trang bài học đã chọn ({uploadedDocs.length}):
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {uploadedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {renderDocIcon(doc.extension)}
                        <div className="truncate">
                          <div className="font-bold text-slate-800 truncate">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">
                            {formatSize(doc.size)} • <span className="text-emerald-700 font-bold">Sẵn sàng phân tích 4 kỹ năng</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewDocId(previewDocId === doc.id ? null : doc.id)}
                          className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                        >
                          {previewDocId === doc.id ? 'Ẩn' : 'Xem trang'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Xóa trang"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {previewDocId && (
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono max-h-36 overflow-y-auto leading-relaxed border border-slate-700">
                    <div className="text-slate-400 text-[10px] uppercase font-sans font-black mb-1">
                      Nội dung trích xuất từ trang PDF:
                    </div>
                    {uploadedDocs.find(d => d.id === previewDocId)?.extractedText}
                  </div>
                )}
              </div>
            )}

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={loading || uploadedDocs.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 active:scale-98 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang Phân Tích 4 Kỹ Năng Bằng Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>PHÂN TÍCH TRANG PDF & SINH ĐỦ 4 KỸ NĂNG</span>
                </>
              )}
            </button>
          </form>

          {/* Progress message during generation */}
          {loading && (
            <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl animate-pulse space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>{progressStep || 'Đang xử lý pipeline AI...'}</span>
              </div>
              <div className="w-full bg-indigo-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 4-Skills Results & Direct Student Transfer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!result && !loading && (
            <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center min-h-[440px] text-slate-400">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-700 mb-1">Chưa Phân Tích Trang PDF</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Hãy chọn trang PDF mẫu hoặc tải file lên, sau đó nhấn <strong>"Phân Tích Trang PDF & Sinh Đủ 4 Kỹ Năng"</strong> để xem và chuyển trực tiếp sang trang Học Sinh.
              </p>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-5 animate-fadeIn">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-black rounded-md uppercase">
                      Đã Phân Tích Từ Trang PDF
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {bookSeries} • Lớp {grade}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mt-0.5">
                    {result.analysis.detectedUnitTitle || result.analysis.theme || 'Unit Tiếng Anh Tiểu Học'}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Chủ đề: {result.analysis.theme} • Chuẩn CEFR: {result.analysis.cefrLevel}
                  </p>
                </div>

                {/* TRANSFER BUTTON TO STUDENT PORTAL */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJSON ? 'Đã chép' : 'Chép JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePublishToStudentPortal}
                    className="px-4 py-2 text-xs font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer border border-emerald-400"
                    title="Lưu bài học vào hệ thống và chuyển sang cổng học sinh"
                  >
                    <Save className="w-4 h-4 text-emerald-100" />
                    <span>LƯU & CHUYỂN SANG CỔNG HỌC SINH</span>
                  </button>
                </div>
              </div>

              {/* Success Notification with direct student portal link */}
              {savedSuccessMsg && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-bold text-emerald-900 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{savedSuccessMsg}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-2 border-t border-emerald-200">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        if (onNavigatePortal) {
                          onNavigatePortal('/student/home');
                        }
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>👉 Mở Cổng Học Sinh & Học Ngay</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-emerald-700">
                      Học sinh đăng nhập tại <code>/student/login</code> sẽ thấy bài học này hiển thị đầu tiên!
                    </span>
                  </div>
                </div>
              )}

              {/* 4 Skills Navigation Tabs */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveSkillTab('listening')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'listening'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>1. Nghe ({result.fourSkillsData?.listening?.length || result.multipleChoiceQuizzes.length} câu)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillTab('speaking')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'speaking'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>2. Nói ({result.fourSkillsData?.speaking?.length || 4} câu)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillTab('reading')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'reading'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>3. Đọc (Truyện & Câu hỏi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillTab('writing')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'writing'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>4. Viết ({result.fourSkillsData?.writing?.length || 5} bài)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillTab('vocab_games')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'vocab_games'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Từ Vựng & Game</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSkillTab('pedagogy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeSkillTab === 'pedagogy'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Cấu Trúc Sư Phạm</span>
                </button>
              </div>

              {/* SKILL TAB 1: LISTENING (Kỹ Năng Nghe) */}
              {activeSkillTab === 'listening' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-900 font-bold flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Dạng bài tập Nghe: Học sinh nghe đoạn băng audio đọc to và chọn 1 trong 4 đáp án đúng.</span>
                  </div>

                  {(result.fourSkillsData?.listening || result.multipleChoiceQuizzes).map((lItem, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-black text-slate-900">{lItem.question}</span>
                        </div>
                      </div>

                      {/* Audio Script */}
                      <div className="p-2.5 rounded-xl bg-white border border-sky-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                          <span className="font-semibold text-slate-700 italic truncate">
                            Băng nghe: "{(lItem as any).audioScript || (lItem as any).context || lItem.question}"
                          </span>
                        </div>
                        <span className="text-[10px] font-black uppercase text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md shrink-0">
                          Audio Script
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {lItem.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === lItem.correctIndex;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                              {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Giải thích sư phạm:</strong> {lItem.explanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SKILL TAB 2: SPEAKING (Kỹ Năng Nói) */}
              {activeSkillTab === 'speaking' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900 font-bold flex items-center gap-2">
                    <Mic className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Dạng bài tập Nói: Học sinh bấm micro nói theo câu mẫu chuẩn, AI chấm điểm trực tiếp từ 0 đến 100 và nhận xét ngữ âm.</span>
                  </div>

                  {(result.fourSkillsData?.speaking || [
                    { phrase: 'What is this? - It is a pen.', phonetic: '/wɒt ɪz ðɪs/ - /ɪt ɪz ə pen/', vietnamese: 'Đây là cái gì? - Đây là một cái bút mực.', tip: 'Chú ý phát âm rõ âm /p/ trong pen, không đọc thành ben.' },
                    { phrase: 'Is it your school bag?', phonetic: '/ɪz ɪt jɔːr skuːl bæɡ/', vietnamese: 'Đây có phải cặp sách của bạn không?', tip: 'Lên giọng ở cuối câu hỏi Yes/No.' },
                    { phrase: 'Open your book, please.', phonetic: '/ˈəʊpən jɔːr bʊk pliːz/', vietnamese: 'Xin mời mở sách ra.', tip: 'Âm /k/ ở cuối từ book phát âm nhẹ và dứt khoát.' },
                    { phrase: 'I have a yellow pencil.', phonetic: '/aɪ hæv ə ˈjeləʊ ˈpensəl/', vietnamese: 'Tôi có một cây bút chì màu vàng.', tip: 'Nối âm have a thành /hævə/ tự nhiên.' }
                  ]).map((sItem, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-black text-purple-950">{sItem.phrase}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                          Luyện Nói Mic
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold block">Phiên âm IPA chuẩn:</span>
                          <span className="font-mono text-purple-700 font-bold">{sItem.phonetic}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-bold block">Nghĩa tiếng Việt:</span>
                          <span className="text-slate-800 font-bold">{sItem.vietnamese}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-200/60 text-[11px] text-purple-900 flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span><strong>Mẹo phát âm cho học sinh tiểu học:</strong> {sItem.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SKILL TAB 3: READING (Kỹ Năng Đọc) */}
              {activeSkillTab === 'reading' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dạng bài tập Đọc: Đoạn văn truyện tranh ngắn từ trang SGK kèm câu hỏi kiểm tra đọc hiểu.</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>{result.fourSkillsData?.reading?.title || 'Đoạn Văn Bài Đọc Trang SGK'}</span>
                    </h4>

                    <p className="text-xs text-slate-800 leading-relaxed p-4 bg-white rounded-xl border border-slate-200 font-medium">
                      {result.fourSkillsData?.reading?.passage || (result.interactiveGameStructures.dialogueRoleplay.lines.map(l => `${l.speaker}: ${l.text}`).join('. '))}
                    </p>

                    <div className="pt-2 space-y-3">
                      <span className="text-xs font-black text-slate-700 block uppercase tracking-wider">
                        Câu hỏi đọc hiểu ({result.fourSkillsData?.reading?.questions?.length || 2} câu):
                      </span>
                      {(result.fourSkillsData?.reading?.questions || [
                        { question: 'What is inside the school bag?', options: ['Two books and a ruler', 'A kitten', 'A smartphone', 'None'], correctIndex: 0 },
                        { question: 'What color is the pen?', options: ['Blue', 'Red', 'Yellow', 'Black'], correctIndex: 0 }
                      ]).map((q, qIdx) => (
                        <div key={qIdx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-2">
                          <div className="font-bold text-slate-900">{qIdx + 1}. {q.question}</div>
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 border ${
                                  optIdx === q.correctIndex
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                    : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                  optIdx === q.correctIndex ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                                {optIdx === q.correctIndex && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SKILL TAB 4: WRITING (Kỹ Năng Viết) */}
              {activeSkillTab === 'writing' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 font-bold flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Dạng bài tập Viết: Điền chữ cái còn thiếu, sắp xếp chữ cái thành từ đúng, ghép từ thành câu hoàn chỉnh.</span>
                  </div>

                  {(result.fourSkillsData?.writing || [
                    { type: 'missing_letter', prompt: 'Điền chữ cái còn thiếu vào từ "Pencil"', maskedWord: 'P _ N C _ L', answer: 'E, I' },
                    { type: 'missing_letter', prompt: 'Điền chữ cái còn thiếu vào từ "Ruler"', maskedWord: 'R _ L _ R', answer: 'U, E' },
                    { type: 'unscramble', prompt: 'Sắp xếp chữ cái thành từ đúng', maskedWord: 'B O K O', answer: 'BOOK' },
                    { type: 'sentence_builder', prompt: 'Sắp xếp các từ thành câu hoàn chỉnh', maskedWord: 'this? / is / What', answer: 'What is this?' },
                    { type: 'sentence_builder', prompt: 'Sắp xếp các từ thành câu hoàn chỉnh', maskedWord: 'is / a / It / pen.', answer: 'It is a pen.' }
                  ]).map((wItem, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-amber-500 text-white font-black text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-800">{wItem.prompt}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                            {wItem.type === 'sentence_builder' ? 'Ghép câu' : wItem.type === 'unscramble' ? 'Xếp từ' : 'Điền chữ'}
                          </span>
                        </div>
                        {wItem.maskedWord && (
                          <div className="font-mono font-black text-sm tracking-widest text-indigo-950 mt-1 pl-7">
                            {wItem.maskedWord}
                          </div>
                        )}
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-black text-xs shrink-0 self-start sm:self-center">
                        Đáp án đúng: {wItem.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SKILL TAB 5: VOCAB & GAMES */}
              {activeSkillTab === 'vocab_games' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Flashcards */}
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
                      Flashcards Từ Vựng Nòng Cốt ({result.vocabularyExercises.flashcards.length}):
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {result.vocabularyExercises.flashcards.map((f, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center text-center">
                          <span className="text-3xl mb-1">{f.emoji}</span>
                          <span className="text-sm font-black text-indigo-950">{f.word}</span>
                          <span className="text-[11px] font-mono text-indigo-600">{f.phonetic}</span>
                          <span className="text-xs font-bold text-slate-700 mt-1">{f.vietnamese}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matching Pairs */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Cặp Ghép Nối Trí Nhớ (Memory Game)</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {result.interactiveGameStructures.matchingPairs.map((pair) => (
                        <div key={pair.id} className="p-2 rounded-xl bg-white border border-amber-200 text-xs flex items-center gap-2">
                          <span className="text-xl">{pair.emoji}</span>
                          <div>
                            <div className="font-black text-slate-900">{pair.word}</div>
                            <div className="text-[10px] text-slate-500">{pair.meaning}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SKILL TAB 6: PEDAGOGY STRUCTURE */}
              {activeSkillTab === 'pedagogy' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Mục Tiêu Bài Học</span>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {result.analysis.pedagogicalGoal}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                      <span className="text-[10px] font-black uppercase text-indigo-400 block mb-1">Chuẩn Trình Độ & Ngữ Âm</span>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          <span>Cấp độ: {result.analysis.cefrLevel}</span>
                        </div>
                        <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Ngữ âm: {result.analysis.phonicsFocus}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-black text-slate-800 uppercase block mb-2">
                      Mẫu Câu Giao Tiếp Trọng Tâm:
                    </span>
                    <div className="space-y-2">
                      {result.analysis.grammarPatterns.map((pat, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-indigo-900 font-bold flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-sans text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{pat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    )}
  </div>
  );
};
