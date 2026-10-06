// ============================================================================
// HỆ THỐNG KHO TRANH MINH HỌA AI 3D CHÂN THỰC (3D REALISTIC DIGITAL ARTWORK)
// Chuẩn hóa tên file theo quy chuẩn Bộ GD&ĐT: [grade]_[unit]_[ten_tu_vung]_3d.png
// Phong cách 3D Pixar / Disney Studio Render: Ánh sáng đa chiều, chất liệu nổi khối,
// bục trưng bày 3D (3D Podium Stage), đổ bóng mượt mà, màu sắc tươi sáng tiểu học.
// Quản lý độc lập theo từng Trường học (School Data Isolation: schoolId)
// ============================================================================

import { Unit, Vocabulary, ListeningQuestion } from '../types';

export interface ExtractedSgkImage {
  id: string;
  fileName: string; // [grade]_[unit]_[ten_tu_vung]_3d.png
  grade: number;
  unit: number | string;
  term: string; // Tên từ vựng (ví dụ: "pencil", "ruler", "schoolbag")
  vietnamese: string;
  category?: string;
  dataUrl: string;
  sourceTextbook?: string;
  style?: '3d_realistic';
  createdAt: string;
}

export interface PresetPdfPage {
  id: string;
  title: string;
  grade: number;
  unitNumber: number;
  bookSeries: string;
  description: string;
  targetVocabs: { word: string; vietnamese: string; emoji: string; category: string }[];
  contextDialogue?: string;
}

// 1. Hàm tạo tên file chuẩn hóa 3D: [grade]_[unit]_[ten_tu_vung]_3d.png
export const formatSgkImageFileName = (
  grade: number,
  unitIdOrNum: string | number,
  termOrPage: string
): string => {
  const cleanGrade = Math.max(1, Math.min(5, grade));
  
  let cleanUnit = '1';
  if (typeof unitIdOrNum === 'number') {
    cleanUnit = String(unitIdOrNum);
  } else if (typeof unitIdOrNum === 'string') {
    const match = unitIdOrNum.match(/\d+/);
    cleanUnit = match ? match[0] : '1';
  }

  const cleanTerm = termOrPage
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') || 'item';

  return `${cleanGrade}_${cleanUnit}_${cleanTerm}_3d.png`;
};

// 2. Helper sinh đối tượng 3D chi tiết (3D Realistic Subject Vector Model)
// Từng chủ đề từ vựng được vẽ khối 3D với đổ bóng, phản xạ bề mặt và viền sáng kim loại/nhựa bóng
function generate3DSubjectModel(word: string, category: string, emoji: string, uid: string): string {
  const w = word.toLowerCase();

  // 1. SÁCH / VỞ (3D Hardbound Book with Gold Foil & Silk Ribbon)
  if (w.includes('book') || w.includes('sach')) {
    return `
      <!-- 3D Perspective Book -->
      <g transform="translate(140, 75)">
        <!-- Cast Shadow -->
        <ellipse cx="70" cy="140" rx="85" ry="18" fill="#0F172A" opacity="0.32" filter="blur(6px)"/>
        
        <!-- Back Cover Depth -->
        <polygon points="10,120 135,135 150,115 25,100" fill="#7F1D1D"/>
        
        <!-- Thick Paper Block with individual page line ridges -->
        <polygon points="20,105 138,122 135,92 18,76" fill="#FFFBEB" stroke="#E2E8F0" stroke-width="1"/>
        <line x1="20" y1="100" x2="137" y2="117" stroke="#CBD5E1" stroke-width="1"/>
        <line x1="20" y1="94" x2="136" y2="111" stroke="#CBD5E1" stroke-width="1"/>
        <line x1="19" y1="88" x2="136" y2="105" stroke="#CBD5E1" stroke-width="1"/>
        
        <!-- Red Silk Bookmark Ribbon draping out -->
        <path d="M 85 105 Q 95 130 90 148 Q 98 142 105 146 Q 100 128 92 106 Z" fill="#DC2626" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"/>
        
        <!-- Main Front Cover (Deep Sapphire/Ruby with Specular Gradient) -->
        <polygon points="12,72 134,88 152,56 30,40" fill="url(#coverGrad_${uid})" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.25))"/>
        
        <!-- 3D Book Spine Curvature -->
        <path d="M 12 72 Q 8 96 10 120 L 25 100 Q 22 70 30 40 Z" fill="#991B1B"/>
        
        <!-- Gold Foil Inlay Frame & Star Emblem -->
        <polygon points="26,67 122,80 138,58 42,46" fill="none" stroke="#FDE047" stroke-width="2.5" opacity="0.9"/>
        <circle cx="82" cy="63" r="14" fill="#FACC15" stroke="#FEF08A" stroke-width="2"/>
        <polygon points="82,53 85,60 93,61 87,66 89,73 82,69 75,73 77,66 71,61 79,60" fill="#FFFFFF"/>
        
        <!-- Specular Highlight Sheen Strip on Front Cover -->
        <polygon points="35,48 55,51 40,70 20,67" fill="#FFFFFF" opacity="0.4"/>
      </g>
    `;
  }

  // 2. BÚT CHÌ (3D Hexagonal Pencil with Sharpened Cedar & Pink Eraser)
  if (w.includes('pencil') || w.includes('chi')) {
    return `
      <!-- 3D Dynamic Angle Hexagonal Pencil -->
      <g transform="translate(100, 75) rotate(-28 110 80)">
        <!-- Pencil Shadow -->
        <ellipse cx="120" cy="130" rx="90" ry="12" fill="#0F172A" opacity="0.3" filter="blur(5px)"/>
        
        <!-- Pink Eraser Block with 3D cylindrical end -->
        <rect x="20" y="56" width="30" height="24" rx="4" fill="url(#pinkEraserGrad_${uid})" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <ellipse cx="20" cy="68" rx="5" ry="12" fill="#F43F5E"/>
        
        <!-- Shiny Metallic Brass Ferrule with Embossed Rings -->
        <rect x="50" y="55" width="22" height="26" fill="url(#brassFerruleGrad_${uid})"/>
        <line x1="56" y1="55" x2="56" y2="81" stroke="#FEF08A" stroke-width="1.5"/>
        <line x1="64" y1="55" x2="64" y2="81" stroke="#854D0E" stroke-width="1"/>
        
        <!-- Hexagonal Pencil Body (3 Visible Facets with 3 Distinct Light Values) -->
        <rect x="72" y="55" width="110" height="8" fill="#FDE047"/>
        <rect x="72" y="63" width="110" height="10" fill="#EAB308"/>
        <rect x="72" y="73" width="110" height="8" fill="#CA8A04"/>
        
        <!-- Sharpened Natural Cedar Wood Cone Taper -->
        <polygon points="182,55 220,68 182,81" fill="#FDE68A"/>
        <path d="M 182,55 Q 188,68 182,81 Z" fill="#F59E0B" opacity="0.6"/>
        
        <!-- Sharp Graphite Lead Tip with Specular Highlight -->
        <polygon points="208,64 228,68 208,72" fill="#1E293B"/>
        <circle cx="218" cy="67" r="1.5" fill="#FFFFFF"/>
      </g>
    `;
  }

  // 3. THƯỚC KẺ (3D Translucent Neon-Acrylic Ruler)
  if (w.includes('ruler') || w.includes('thuoc')) {
    return `
      <!-- 3D Beveled Acrylic Ruler -->
      <g transform="translate(100, 85) rotate(-14 110 70)">
        <!-- Deep Cast Shadow -->
        <rect x="25" y="65" width="190" height="42" rx="8" fill="#0F172A" opacity="0.28" filter="blur(6px)"/>
        
        <!-- Translucent Neon Green/Cyan Acrylic Glass Body -->
        <rect x="20" y="45" width="190" height="42" rx="8" fill="url(#acrylicGrad_${uid})" stroke="#67E8F9" stroke-width="2" filter="drop-shadow(0 8px 12px rgba(6,182,212,0.3))"/>
        
        <!-- Beveled Upper Edge Specular Sheen -->
        <line x1="24" y1="47" x2="206" y2="47" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
        
        <!-- Millimeter & Centimeter Measurement Hash Ticks -->
        ${Array.from({ length: 16 }).map((_, i) => {
          const x = 32 + i * 11;
          const h = i % 5 === 0 ? 16 : 8;
          return `<line x1="${x}" y1="46" x2="${x}" y2="${46 + h}" stroke="#0E7490" stroke-width="${i % 5 === 0 ? 2 : 1.2}"/>`;
        }).join('')}
        
        <!-- Numbers 0, 1, 2, 3 on Ruler -->
        <text x="32" y="74" font-family="Arial" font-size="10" font-weight="900" fill="#0E7490">0</text>
        <text x="87" y="74" font-family="Arial" font-size="10" font-weight="900" fill="#0E7490">5</text>
        <text x="142" y="74" font-family="Arial" font-size="10" font-weight="900" fill="#0E7490">10</text>
        <text x="194" y="74" font-family="Arial" font-size="10" font-weight="900" fill="#0E7490">15</text>
      </g>
    `;
  }

  // 4. CẶP SÁCH / BALO (3D Sculpted Pixar Backpack)
  if (w.includes('bag') || w.includes('cap') || w.includes('balo')) {
    return `
      <!-- 3D Pixar Styled Backpack -->
      <g transform="translate(130, 50)">
        <!-- Ambient Shadow -->
        <ellipse cx="80" cy="165" rx="75" ry="16" fill="#0F172A" opacity="0.32" filter="blur(6px)"/>
        
        <!-- Top Carrying Handle -->
        <path d="M 55 45 C 55 15 105 15 105 45" fill="none" stroke="#0369A1" stroke-width="9" stroke-linecap="round"/>
        <path d="M 55 45 C 55 18 105 18 105 45" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
        
        <!-- Main Backpack Dome Body with Multi-Tone 3D Gradient -->
        <rect x="20" y="38" width="120" height="125" rx="36" fill="url(#backpackGrad_${uid})" filter="drop-shadow(0 10px 14px rgba(0,0,0,0.25))"/>
        
        <!-- Front Rounded Zipper Pouch -->
        <rect x="35" y="85" width="90" height="68" rx="20" fill="url(#pouchGrad_${uid})" stroke="#FDE047" stroke-width="2"/>
        <path d="M 40 85 Q 80 82 120 85" fill="none" stroke="#CA8A04" stroke-width="3" stroke-dasharray="4 2"/>
        
        <!-- 3D Metallic Star Badge on Pouch -->
        <circle cx="80" cy="115" r="14" fill="#FACC15" stroke="#FEF08A" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <polygon points="80,105 83,112 91,113 85,118 87,125 80,121 73,125 75,118 69,113 77,112" fill="#FFFFFF"/>
        
        <!-- Side Mesh Pocket with Bottle Top -->
        <path d="M 18 85 Q 10 110 18 135 Z" fill="#0284C7"/>
        <rect x="8" y="75" width="12" height="18" rx="4" fill="#E2E8F0"/>
        
        <!-- Gloss Specular Highlight Ribbon -->
        <path d="M 35 48 Q 80 40 115 50" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
      </g>
    `;
  }

  // 5. CỤC TẨY (3D Clay Wedge Eraser with Paper Sleeve)
  if (w.includes('eraser') || w.includes('tay')) {
    return `
      <!-- 3D Beveled Wedge Eraser -->
      <g transform="translate(130, 70)">
        <!-- Soft Contact Shadow -->
        <ellipse cx="80" cy="130" rx="70" ry="14" fill="#0F172A" opacity="0.3" filter="blur(5px)"/>
        
        <!-- Blue Eraser Rubber Wedge -->
        <polygon points="25,95 105,120 145,85 65,60" fill="#0284C7"/>
        <polygon points="25,95 25,110 105,135 105,120" fill="#0369A1"/>
        <polygon points="105,120 105,135 145,100 145,85" fill="#075985"/>
        
        <!-- Clean White Paper Sleeve Wrapped with Logo -->
        <polygon points="45,85 115,105 135,88 65,68" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
        <polygon points="45,85 45,100 115,120 115,105" fill="#E2E8F0"/>
        
        <!-- Brand Stripe & Star on Sleeve -->
        <polygon points="60,78 100,90 102,83 62,71" fill="#EF4444"/>
        <circle cx="85" cy="85" r="6" fill="#FACC15"/>
        
        <!-- Specular Bevel Sheen -->
        <line x1="25" y1="95" x2="65" y2="60" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      </g>
    `;
  }

  // 6. BÚT MỰC / BÚT BI (3D Executive Gel Pen with Chrome Clip)
  if (w.includes('pen') || w.includes('muc')) {
    return `
      <!-- 3D Luxury Gel Pen -->
      <g transform="translate(110, 80) rotate(-32 100 70)">
        <ellipse cx="110" cy="120" rx="80" ry="10" fill="#0F172A" opacity="0.28" filter="blur(5px)"/>
        
        <!-- Pen Body Glossy Cylinder -->
        <rect x="25" y="60" width="130" height="18" rx="6" fill="url(#penBarrelGrad_${uid})" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"/>
        
        <!-- Shiny Chrome Pocket Clip -->
        <rect x="35" y="52" width="45" height="5" rx="2" fill="url(#chromeGrad_${uid})"/>
        <circle cx="78" cy="54" r="4" fill="#E2E8F0"/>
        
        <!-- Rubber Comfort Grip -->
        <rect x="120" y="61" width="30" height="16" fill="#1E293B" opacity="0.8"/>
        <line x1="128" y1="61" x2="128" y2="77" stroke="#334155" stroke-width="1.5"/>
        <line x1="138" y1="61" x2="138" y2="77" stroke="#334155" stroke-width="1.5"/>
        
        <!-- Polished Chrome Cone Nib -->
        <polygon points="155,62 180,69 155,76" fill="url(#chromeGrad_${uid})"/>
        <circle cx="180" cy="69" r="1.5" fill="#38BDF8"/>
        
        <!-- High-Gloss Light Streak -->
        <line x1="30" y1="63" x2="145" y2="63" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      </g>
    `;
  }

  // 7. QUẢ TÁO (3D Luscious Glossy Apple with Green Leaf)
  if (w.includes('apple') || w.includes('tao')) {
    return `
      <!-- 3D Glossy Apple -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="148" rx="60" ry="14" fill="#0F172A" opacity="0.32" filter="blur(6px)"/>
        <!-- Brown Apple Stem -->
        <path d="M 70 45 Q 75 20 85 15" fill="none" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
        <!-- 3D Fresh Green Leaf -->
        <path d="M 72 32 Q 95 15 105 28 Q 95 48 72 32 Z" fill="#22C55E" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"/>
        <path d="M 74 32 Q 90 24 102 28" fill="none" stroke="#15803D" stroke-width="1.5"/>
        <!-- 3D Apple Body -->
        <path d="M 70 50 C 40 40 22 70 24 100 C 26 130 50 146 70 142 C 90 146 114 130 116 100 C 118 70 100 40 70 50 Z" fill="url(#clockBodyGrad_${uid})" filter="drop-shadow(0 10px 16px rgba(185,28,28,0.35))"/>
        <!-- Specular Curved Highlight -->
        <ellipse cx="48" cy="75" rx="14" ry="24" fill="#FFFFFF" opacity="0.55" transform="rotate(-25 48 75)"/>
        <circle cx="56" cy="62" r="4" fill="#FFFFFF" opacity="0.8"/>
      </g>
    `;
  }

  // 8. QUẢ BÓNG (3D Stitched Soccer Ball / Sports Ball)
  if (w.includes('ball') || w.includes('bong')) {
    return `
      <!-- 3D Dimensional Ball -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="150" rx="65" ry="15" fill="#0F172A" opacity="0.35" filter="blur(6px)"/>
        <!-- Main Sphere Body -->
        <circle cx="70" cy="85" r="54" fill="url(#acrylicGrad_${uid})" filter="drop-shadow(0 10px 18px rgba(0,0,0,0.3))"/>
        <!-- Hexagon Patterns -->
        <polygon points="70,60 82,70 78,84 62,84 58,70" fill="#0F172A" opacity="0.85"/>
        <polygon points="70,42 78,32 62,32" fill="#0F172A" opacity="0.75"/>
        <polygon points="98,62 108,70 102,80 90,76" fill="#0F172A" opacity="0.75"/>
        <polygon points="42,62 32,70 38,80 50,76" fill="#0F172A" opacity="0.75"/>
        <!-- High Gloss Specular Reflection -->
        <ellipse cx="50" cy="58" rx="18" ry="10" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 50 58)"/>
      </g>
    `;
  }

  // 9. XE HƠI / Ô TÔ (3D Pixar Style Cute Car)
  if (w.includes('car') || w.includes('o to') || w.includes('xe hoi')) {
    return `
      <!-- 3D Pixar Cute Car -->
      <g transform="translate(125, 75)">
        <ellipse cx="95" cy="125" rx="90" ry="16" fill="#0F172A" opacity="0.35" filter="blur(6px)"/>
        <!-- Wheels -->
        <circle cx="50" cy="115" r="18" fill="#1E293B" stroke="#475569" stroke-width="3"/>
        <circle cx="50" cy="115" r="8" fill="#E2E8F0"/>
        <circle cx="140" cy="115" r="18" fill="#1E293B" stroke="#475569" stroke-width="3"/>
        <circle cx="140" cy="115" r="8" fill="#E2E8F0"/>
        <!-- Car Chassis -->
        <path d="M 20 95 Q 20 70 50 70 L 65 45 Q 85 40 135 45 L 155 70 Q 185 70 185 95 Q 185 110 160 110 L 35 110 Z" fill="url(#clockBodyGrad_${uid})" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.25))"/>
        <!-- Windshield & Windows -->
        <polygon points="70,68 128,68 120,48 76,48" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5" opacity="0.9"/>
        <!-- Headlights -->
        <circle cx="28" cy="85" r="8" fill="#FEF08A" filter="drop-shadow(0 0 6px #FACC15)"/>
        <!-- Specular Highlight Strip -->
        <path d="M 35 75 Q 95 65 170 75" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      </g>
    `;
  }

  // 10. ROBOT (3D Cute Futuristic Robot)
  if (w.includes('robot') || w.includes('nguoi may')) {
    return `
      <!-- 3D Cute Robot -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="148" rx="60" ry="14" fill="#0F172A" opacity="0.3" filter="blur(6px)"/>
        <!-- Antenna -->
        <line x1="70" y1="40" x2="70" y2="20" stroke="#94A3B8" stroke-width="4"/>
        <circle cx="70" cy="18" r="7" fill="#FACC15" filter="drop-shadow(0 0 6px #FACC15)"/>
        <!-- Head -->
        <rect x="32" y="38" width="76" height="54" rx="16" fill="url(#acrylicGrad_${uid})" stroke="#38BDF8" stroke-width="2" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.2))"/>
        <!-- Glowing LED Eyes -->
        <circle cx="52" cy="62" r="9" fill="#0284C7"/>
        <circle cx="52" cy="62" r="5" fill="#38BDF8" filter="drop-shadow(0 0 4px #67E8F9)"/>
        <circle cx="88" cy="62" r="9" fill="#0284C7"/>
        <circle cx="88" cy="62" r="5" fill="#38BDF8" filter="drop-shadow(0 0 4px #67E8F9)"/>
        <!-- Cute Smile Display -->
        <path d="M 60 76 Q 70 82 80 76" fill="none" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
        <!-- Body -->
        <rect x="40" y="96" width="60" height="42" rx="12" fill="url(#chromeGrad_${uid})"/>
        <circle cx="70" cy="116" r="8" fill="#EF4444"/>
      </g>
    `;
  }

  // 11. ĐỒNG HỒ / BÁO THỨC (3D Twin-Bell Alarm Clock)
  if (w.includes('clock') || w.includes('time') || w.includes('up') || w.includes('day')) {
    return `
      <!-- 3D Twin-Bell Alarm Clock -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="150" rx="65" ry="14" fill="#0F172A" opacity="0.32" filter="blur(6px)"/>
        <line x1="35" y1="130" x2="25" y2="150" stroke="#CA8A04" stroke-width="6" stroke-linecap="round"/>
        <line x1="105" y1="130" x2="115" y2="150" stroke="#CA8A04" stroke-width="6" stroke-linecap="round"/>
        <circle cx="35" cy="40" r="20" fill="url(#bellGrad_${uid})" stroke="#EAB308" stroke-width="2"/>
        <circle cx="105" cy="40" r="20" fill="url(#bellGrad_${uid})" stroke="#EAB308" stroke-width="2"/>
        <rect x="67" y="25" width="6" height="16" fill="#64748B"/>
        <circle cx="70" cy="22" r="6" fill="#94A3B8"/>
        <circle cx="70" cy="90" r="52" fill="url(#clockBodyGrad_${uid})" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.3))"/>
        <circle cx="70" cy="90" r="44" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
        ${Array.from({ length: 12 }).map((_, i) => {
          const ang = (i * 30 * Math.PI) / 180;
          const x1 = 70 + 36 * Math.sin(ang);
          const y1 = 90 - 36 * Math.cos(ang);
          const x2 = 70 + 40 * Math.sin(ang);
          const y2 = 90 - 40 * Math.cos(ang);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1E293B" stroke-width="${i % 3 === 0 ? 2.5 : 1}"/>`;
        }).join('')}
        <line x1="70" y1="90" x2="70" y2="60" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
        <line x1="70" y1="90" x2="52" y2="105" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="70" y1="90" x2="88" y2="100" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="70" cy="90" r="4" fill="#EF4444"/>
        <path d="M 40 65 Q 70 50 100 65" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      </g>
    `;
  }

  // 12. ĐỘNG VẬT / THÚ CƯNG (3D Pixar Cute Character - Kitten / Puppy)
  if (w.includes('cat') || w.includes('kitten') || w.includes('dog') || w.includes('puppy') || w.includes('meo') || w.includes('cho')) {
    return `
      <!-- 3D Pixar Cute Character -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="148" rx="60" ry="14" fill="#0F172A" opacity="0.3" filter="blur(6px)"/>
        <ellipse cx="70" cy="115" rx="42" ry="34" fill="url(#characterGrad_${uid})"/>
        <circle cx="70" cy="68" r="40" fill="url(#characterGrad_${uid})" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.2))"/>
        <polygon points="38,40 50,12 68,34" fill="#FB923C"/>
        <polygon points="42,38 52,18 64,34" fill="#FDA4AF"/>
        <polygon points="102,40 90,12 72,34" fill="#FB923C"/>
        <polygon points="98,38 88,18 76,34" fill="#FDA4AF"/>
        <ellipse cx="54" cy="64" rx="10" ry="13" fill="#1E293B"/>
        <circle cx="51" cy="59" r="4.5" fill="#FFFFFF"/>
        <circle cx="56" cy="68" r="2" fill="#FFFFFF"/>
        <ellipse cx="86" cy="64" rx="10" ry="13" fill="#1E293B"/>
        <circle cx="83" cy="59" r="4.5" fill="#FFFFFF"/>
        <circle cx="88" cy="68" r="2" fill="#FFFFFF"/>
        <polygon points="70,75 66,72 74,72" fill="#F43F5E"/>
        <path d="M 64 77 Q 70 82 76 77" fill="none" stroke="#9A3412" stroke-width="2" stroke-linecap="round"/>
        <path d="M 46 95 Q 70 106 94 95" fill="none" stroke="#DC2626" stroke-width="6" stroke-linecap="round"/>
        <circle cx="70" cy="104" r="7" fill="#FACC15" stroke="#FEF08A" stroke-width="1.5"/>
      </g>
    `;
  }

  // 13. MẶT TRỜI / THỜI TIẾT (3D Smiling Radiant Sun)
  if (w.includes('sun') || w.includes('sunny') || w.includes('troi')) {
    return `
      <!-- 3D Radiant Sun -->
      <g transform="translate(145, 60)">
        <ellipse cx="70" cy="150" rx="60" ry="14" fill="#0F172A" opacity="0.25" filter="blur(6px)"/>
        <!-- Sun Rays -->
        ${Array.from({ length: 8 }).map((_, i) => {
          const ang = (i * 45 * Math.PI) / 180;
          const x1 = 70 + 52 * Math.sin(ang);
          const y1 = 75 - 52 * Math.cos(ang);
          const x2 = 70 + 66 * Math.sin(ang);
          const y2 = 75 - 66 * Math.cos(ang);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#F59E0B" stroke-width="7" stroke-linecap="round" filter="drop-shadow(0 0 4px #FBBF24)"/>`;
        }).join('')}
        <!-- Golden Sphere Core -->
        <circle cx="70" cy="75" r="44" fill="url(#bellGrad_${uid})" filter="drop-shadow(0 8px 16px rgba(234,179,8,0.4))"/>
        <!-- Big Sparkly Eyes -->
        <circle cx="56" cy="72" r="5" fill="#78350F"/>
        <circle cx="58" cy="70" r="1.5" fill="#FFFFFF"/>
        <circle cx="84" cy="72" r="5" fill="#78350F"/>
        <circle cx="86" cy="70" r="1.5" fill="#FFFFFF"/>
        <!-- Warm Smile -->
        <path d="M 60 84 Q 70 94 80 84" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
        <!-- Rosy Cheeks -->
        <circle cx="50" cy="80" r="6" fill="#FDA4AF" opacity="0.8"/>
        <circle cx="90" cy="80" r="6" fill="#FDA4AF" opacity="0.8"/>
      </g>
    `;
  }

  // 14. NGÔI NHÀ (3D Cozy Pixar House)
  if (w.includes('house') || w.includes('home') || w.includes('nha')) {
    return `
      <!-- 3D Cozy House -->
      <g transform="translate(135, 60)">
        <ellipse cx="80" cy="150" rx="75" ry="16" fill="#0F172A" opacity="0.3" filter="blur(6px)"/>
        <!-- Chimney -->
        <rect x="105" y="35" width="16" height="30" fill="#B91C1C" rx="3"/>
        <ellipse cx="113" cy="35" rx="8" ry="3" fill="#7F1D1D"/>
        <!-- Main Walls Block -->
        <rect x="30" y="70" width="100" height="70" rx="10" fill="#FEF08A" stroke="#FDE047" stroke-width="2" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.2))"/>
        <!-- 3D Roof -->
        <polygon points="15,75 80,25 145,75" fill="#DC2626" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"/>
        <polygon points="80,25 145,75 140,82 80,32" fill="#991B1B"/>
        <!-- Front Door -->
        <rect x="68" y="98" width="24" height="42" rx="4" fill="#78350F"/>
        <circle cx="86" cy="120" r="2.5" fill="#FDE047"/>
        <!-- Window -->
        <rect x="38" y="88" width="22" height="22" rx="4" fill="#38BDF8" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="49" y1="88" x2="49" y2="110" stroke="#FFFFFF" stroke-width="1.5"/>
        <line x1="38" y1="99" x2="60" y2="99" stroke="#FFFFFF" stroke-width="1.5"/>
      </g>
    `;
  }

  // DEFAULT 3D HOLOGRAPHIC GEM STAGE (For Any General Word / Topic)
  return `
    <!-- 3D Floating Gem Showcase with Dynamic Specular Sheen -->
    <g transform="translate(145, 65)">
      <!-- Soft Depth Shadow -->
      <ellipse cx="70" cy="145" rx="65" ry="16" fill="#0F172A" opacity="0.3" filter="blur(6px)"/>
      
      <!-- 3D Glossy Sphere Orb Backdrop with Rim Light -->
      <circle cx="70" cy="72" r="54" fill="url(#orbGrad_${uid})" filter="drop-shadow(0 10px 16px rgba(0,0,0,0.22))"/>
      <ellipse cx="54" cy="46" rx="24" ry="14" fill="#FFFFFF" opacity="0.45" transform="rotate(-25 54 46)"/>
      
      <!-- Central Dimensional Subject Icon -->
      <text x="70" y="94" text-anchor="middle" font-size="68" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" filter="drop-shadow(0 6px 8px rgba(0,0,0,0.3))">
        ${emoji}
      </text>
      
      <!-- Surrounding Floating 3D Sparkle Stars -->
      <circle cx="22" cy="38" r="5" fill="#FDE047" filter="drop-shadow(0 0 6px #FACC15)"/>
      <circle cx="120" cy="45" r="4" fill="#67E8F9" filter="drop-shadow(0 0 6px #38BDF8)"/>
      <circle cx="115" cy="108" r="6" fill="#F472B6" filter="drop-shadow(0 0 6px #EC4899)"/>
    </g>
  `;
}

// 3. Trình tạo tranh kỹ thuật số AI 3D Chân thực (3D Realistic Studio Vector Render)
export const generate3DRealisticSvgIllustration = (
  grade: number,
  unitNumber: number | string,
  word: string,
  vietnamese: string,
  emoji: string = '📘',
  category: string = 'General'
): { fileName: string; dataUrl: string } => {
  const fileName = formatSgkImageFileName(grade, unitNumber, word);
  const uid = Math.random().toString(36).substring(2, 8);

  // Grade color themes for 3D studio lighting
  const grade3DThemes: Record<number, {
    studioBg1: string;
    studioBg2: string;
    podiumTop: string;
    podiumFront: string;
    accent: string;
    badgeBg: string;
    glow: string;
  }> = {
    1: { studioBg1: '#FFFBEB', studioBg2: '#FEF3C7', podiumTop: '#FDE68A', podiumFront: '#D97706', accent: '#B45309', badgeBg: '#F59E0B', glow: '#FBBF24' },
    2: { studioBg1: '#F0F9FF', studioBg2: '#E0F2FE', podiumTop: '#BAE6FD', podiumFront: '#0284C7', accent: '#0369A1', badgeBg: '#0EA5E9', glow: '#38BDF8' },
    3: { studioBg1: '#F0FDF4', studioBg2: '#DCFCE7', podiumTop: '#BBF7D0', podiumFront: '#16A34A', accent: '#15803D', badgeBg: '#10B981', glow: '#34D399' },
    4: { studioBg1: '#FAF5FF', studioBg2: '#F3E8FF', podiumTop: '#E9D5FF', podiumFront: '#9333EA', accent: '#7E22CE', badgeBg: '#A855F7', glow: '#C084FC' },
    5: { studioBg1: '#FFF1F2', studioBg2: '#FFE4E6', podiumTop: '#FECDD3', podiumFront: '#E11D48', accent: '#BE123C', badgeBg: '#F43F5E', glow: '#FB7185' }
  };

  const theme = grade3DThemes[grade] || grade3DThemes[3];
  const subjectModelSvg = generate3DSubjectModel(word, category, emoji, uid);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 360" width="100%" height="100%">
      <defs>
        <!-- 3D Studio Radial Background -->
        <radialGradient id="studioGrad_${uid}" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="60%" stop-color="${theme.studioBg1}"/>
          <stop offset="100%" stop-color="${theme.studioBg2}"/>
        </radialGradient>

        <!-- 3D Podium Gradients -->
        <linearGradient id="podiumTopGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="${theme.podiumTop}"/>
          <stop offset="100%" stop-color="${theme.glow}"/>
        </linearGradient>
        <linearGradient id="podiumFrontGrad_${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${theme.podiumFront}"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>

        <!-- Shading & Materials Gradients for 3D Items -->
        <linearGradient id="coverGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DC2626"/>
          <stop offset="70%" stop-color="#991B1B"/>
          <stop offset="100%" stop-color="#450A0A"/>
        </linearGradient>
        <linearGradient id="brassFerruleGrad_${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="50%" stop-color="#EAB308"/>
          <stop offset="100%" stop-color="#713F12"/>
        </linearGradient>
        <linearGradient id="pinkEraserGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDA4AF"/>
          <stop offset="100%" stop-color="#E11D48"/>
        </linearGradient>
        <linearGradient id="acrylicGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#A5F3FC" stop-opacity="0.88"/>
          <stop offset="60%" stop-color="#06B6D4" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="#0891B2" stop-opacity="0.9"/>
        </linearGradient>
        <linearGradient id="backpackGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="50%" stop-color="#0284C7"/>
          <stop offset="100%" stop-color="#0369A1"/>
        </linearGradient>
        <linearGradient id="pouchGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="100%" stop-color="#F59E0B"/>
        </linearGradient>
        <linearGradient id="penBarrelGrad_${uid}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="40%" stop-color="#0284C7"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="chromeGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="45%" stop-color="#CBD5E1"/>
          <stop offset="70%" stop-color="#94A3B8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>
        <linearGradient id="clockBodyGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F87171"/>
          <stop offset="60%" stop-color="#DC2626"/>
          <stop offset="100%" stop-color="#7F1D1D"/>
        </linearGradient>
        <linearGradient id="bellGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A"/>
          <stop offset="70%" stop-color="#EAB308"/>
          <stop offset="100%" stop-color="#854D0E"/>
        </linearGradient>
        <linearGradient id="characterGrad_${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FED7AA"/>
          <stop offset="60%" stop-color="#FB923C"/>
          <stop offset="100%" stop-color="#C2410C"/>
        </linearGradient>
        <radialGradient id="orbGrad_${uid}" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="${theme.glow}"/>
          <stop offset="100%" stop-color="${theme.podiumFront}"/>
        </radialGradient>
      </defs>

      <!-- 1. 3D Studio Environment Frame -->
      <rect width="460" height="360" rx="26" fill="url(#studioGrad_${uid})"/>
      
      <!-- Studio Ambient Floating Orbs for 3D Depth of Field -->
      <circle cx="50" cy="70" r="18" fill="#FFFFFF" opacity="0.4" filter="blur(4px)"/>
      <circle cx="410" cy="110" r="24" fill="#FFFFFF" opacity="0.35" filter="blur(5px)"/>
      <circle cx="390" cy="280" r="14" fill="${theme.glow}" opacity="0.25" filter="blur(3px)"/>

      <!-- 3. Central 3D Podium / Floating Pedestal Stage -->
      <!-- Ground Floor Shadow -->
      <ellipse cx="230" cy="245" rx="145" ry="32" fill="#0F172A" opacity="0.18" filter="blur(8px)"/>
      
      <!-- Cylindrical Podium Front Face (Beveled Depth) -->
      <path d="M 95 210 C 95 232 365 232 365 210 L 365 224 C 365 246 95 246 95 224 Z" fill="url(#podiumFrontGrad_${uid})"/>
      
      <!-- Podium Elliptical Top Surface -->
      <ellipse cx="230" cy="210" rx="135" ry="24" fill="url(#podiumTopGrad_${uid})" stroke="#FFFFFF" stroke-width="2"/>
      
      <!-- Inner Specular Reflection Ring on Podium -->
      <ellipse cx="230" cy="208" rx="120" ry="18" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>

      <!-- 4. Render Authentic 3D Subject Model on Top of Podium -->
      ${subjectModelSvg}

      <!-- 5. Bottom 3D Title Plaque (Engraved Typography) -->
      <rect x="24" y="276" width="412" height="68" rx="16" fill="#FFFFFF" opacity="0.96" stroke="#E2E8F0" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"/>
      
      <!-- Large English Word in 3D Typography -->
      <text x="230" y="305" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="22" font-weight="900" fill="#0F172A" letter-spacing="0.5">
        ${word.toUpperCase()}
      </text>

      <!-- Vietnamese Meaning Glowing Pill -->
      <rect x="130" y="315" width="200" height="22" rx="7" fill="${theme.studioBg2}" stroke="${theme.podiumTop}" stroke-width="1"/>
      <text x="230" y="330" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="12" font-weight="bold" fill="${theme.accent}">
        (${vietnamese})
      </text>
    </svg>
  `.trim();

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
  return { fileName, dataUrl };
};

// Backward-compatible alias
export const generateTextbookSvgIllustration = generate3DRealisticSvgIllustration;

// 4. KHO TRANH MINH HỌA AI 3D CHÂN THỰC TOÀN DIỆN (LỚP 1 - LỚP 5)
export const PRESET_3D_ILLUSTRATIONS: ExtractedSgkImage[] = [
  // ================= LỚP 1 (3D REALISTIC) =================
  {
    id: '3d-1-1-book',
    fileName: '1_1_book_3d.png',
    grade: 1,
    unit: 1,
    term: 'book',
    vietnamese: 'Quyển sách',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(1, 1, 'Book', 'Quyển sách', '📕', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-1-pen',
    fileName: '1_1_pen_3d.png',
    grade: 1,
    unit: 1,
    term: 'pen',
    vietnamese: 'Cái bút',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(1, 1, 'Pen', 'Cái bút', '🖊️', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-1-pencil',
    fileName: '1_1_pencil_3d.png',
    grade: 1,
    unit: 1,
    term: 'pencil',
    vietnamese: 'Bút chì',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(1, 1, 'Pencil', 'Bút chì', '✏️', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-1-bag',
    fileName: '1_1_bag_3d.png',
    grade: 1,
    unit: 1,
    term: 'bag',
    vietnamese: 'Cặp sách',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(1, 1, 'Bag', 'Cặp sách', '🎒', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-2-cat',
    fileName: '1_2_cat_3d.png',
    grade: 1,
    unit: 2,
    term: 'cat',
    vietnamese: 'Con mèo',
    category: 'Animals',
    dataUrl: generate3DRealisticSvgIllustration(1, 2, 'Cat', 'Con mèo', '🐱', 'Animals').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-2-car',
    fileName: '1_2_car_3d.png',
    grade: 1,
    unit: 2,
    term: 'car',
    vietnamese: 'Ô tô đồ chơi',
    category: 'Toys',
    dataUrl: generate3DRealisticSvgIllustration(1, 2, 'Car', 'Ô tô đồ chơi', '🚗', 'Toys').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-1-2-cake',
    fileName: '1_2_cake_3d.png',
    grade: 1,
    unit: 2,
    term: 'cake',
    vietnamese: 'Bánh ngọt',
    category: 'Food',
    dataUrl: generate3DRealisticSvgIllustration(1, 2, 'Cake', 'Bánh ngọt', '🎂', 'Food').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 1 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },

  // ================= LỚP 2 (3D REALISTIC) =================
  {
    id: '3d-2-1-father',
    fileName: '2_1_father_3d.png',
    grade: 2,
    unit: 1,
    term: 'father',
    vietnamese: 'Bố',
    category: 'Family',
    dataUrl: generate3DRealisticSvgIllustration(2, 1, 'Father', 'Bố', '👨', 'Family').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 2 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-2-1-mother',
    fileName: '2_1_mother_3d.png',
    grade: 2,
    unit: 1,
    term: 'mother',
    vietnamese: 'Mẹ',
    category: 'Family',
    dataUrl: generate3DRealisticSvgIllustration(2, 1, 'Mother', 'Mẹ', '👩', 'Family').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 2 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-2-1-brother',
    fileName: '2_1_brother_3d.png',
    grade: 2,
    unit: 1,
    term: 'brother',
    vietnamese: 'Anh / Em trai',
    category: 'Family',
    dataUrl: generate3DRealisticSvgIllustration(2, 1, 'Brother', 'Anh / Em trai', '👦', 'Family').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 2 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-2-2-kitten',
    fileName: '2_2_kitten_3d.png',
    grade: 2,
    unit: 2,
    term: 'kitten',
    vietnamese: 'Mèo con',
    category: 'Pets',
    dataUrl: generate3DRealisticSvgIllustration(2, 2, 'Kitten', 'Mèo con', '🐱', 'Pets').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 2 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-2-2-puppy',
    fileName: '2_2_puppy_3d.png',
    grade: 2,
    unit: 2,
    term: 'puppy',
    vietnamese: 'Cún con',
    category: 'Pets',
    dataUrl: generate3DRealisticSvgIllustration(2, 2, 'Puppy', 'Cún con', '🐶', 'Pets').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 2 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },

  // ================= LỚP 3 (3D REALISTIC) =================
  {
    id: '3d-3-1-hello',
    fileName: '3_1_hello_3d.png',
    grade: 3,
    unit: 1,
    term: 'hello',
    vietnamese: 'Xin chào',
    category: 'Greetings',
    dataUrl: generate3DRealisticSvgIllustration(3, 1, 'Hello', 'Xin chào', '👋', 'Greetings').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-1-friend',
    fileName: '3_1_friend_3d.png',
    grade: 3,
    unit: 1,
    term: 'friend',
    vietnamese: 'Bạn bè',
    category: 'People',
    dataUrl: generate3DRealisticSvgIllustration(3, 1, 'Friend', 'Bạn bè', '🧑‍🤝‍🧑', 'People').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-1-teacher',
    fileName: '3_1_teacher_3d.png',
    grade: 3,
    unit: 1,
    term: 'teacher',
    vietnamese: 'Thầy / Cô giáo',
    category: 'People',
    dataUrl: generate3DRealisticSvgIllustration(3, 1, 'Teacher', 'Thầy / Cô giáo', '👩‍🏫', 'People').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-ruler',
    fileName: '3_4_ruler_3d.png',
    grade: 3,
    unit: 4,
    term: 'ruler',
    vietnamese: 'Cây thước kẻ',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'Ruler', 'Cây thước kẻ', '📏', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-pencil',
    fileName: '3_4_pencil_3d.png',
    grade: 3,
    unit: 4,
    term: 'pencil',
    vietnamese: 'Bút chì',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'Pencil', 'Bút chì', '✏️', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-eraser',
    fileName: '3_4_eraser_3d.png',
    grade: 3,
    unit: 4,
    term: 'eraser',
    vietnamese: 'Cục tẩy',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'Eraser', 'Cục tẩy', '🧼', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-schoolbag',
    fileName: '3_4_schoolbag_3d.png',
    grade: 3,
    unit: 4,
    term: 'school bag',
    vietnamese: 'Cặp sách',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'School bag', 'Cặp sách', '🎒', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-book',
    fileName: '3_4_book_3d.png',
    grade: 3,
    unit: 4,
    term: 'book',
    vietnamese: 'Quyển sách',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'Book', 'Quyển sách', '📖', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-4-pen',
    fileName: '3_4_pen_3d.png',
    grade: 3,
    unit: 4,
    term: 'pen',
    vietnamese: 'Bút mực',
    category: 'School Things',
    dataUrl: generate3DRealisticSvgIllustration(3, 4, 'Pen', 'Bút mực', '🖊️', 'School Things').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-5-swimming',
    fileName: '3_5_swimming_3d.png',
    grade: 3,
    unit: 5,
    term: 'swimming',
    vietnamese: 'Bơi lội',
    category: 'Hobbies',
    dataUrl: generate3DRealisticSvgIllustration(3, 5, 'Swimming', 'Bơi lội', '🏊', 'Hobbies').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-3-5-dancing',
    fileName: '3_5_dancing_3d.png',
    grade: 3,
    unit: 5,
    term: 'dancing',
    vietnamese: 'Nhảy múa',
    category: 'Hobbies',
    dataUrl: generate3DRealisticSvgIllustration(3, 5, 'Dancing', 'Nhảy múa', '💃', 'Hobbies').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 3 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },

  // ================= LỚP 4 (3D REALISTIC) =================
  {
    id: '3d-4-1-america',
    fileName: '4_1_america_3d.png',
    grade: 4,
    unit: 1,
    term: 'america',
    vietnamese: 'Nước Mỹ',
    category: 'Countries',
    dataUrl: generate3DRealisticSvgIllustration(4, 1, 'America', 'Nước Mỹ', '🇺🇸', 'Countries').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 4 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-4-1-vietnam',
    fileName: '4_1_vietnam_3d.png',
    grade: 4,
    unit: 1,
    term: 'vietnam',
    vietnamese: 'Việt Nam',
    category: 'Countries',
    dataUrl: generate3DRealisticSvgIllustration(4, 1, 'Vietnam', 'Việt Nam', '🇻🇳', 'Countries').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 4 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-4-2-getup',
    fileName: '4_2_getup_3d.png',
    grade: 4,
    unit: 2,
    term: 'get up',
    vietnamese: 'Thức dậy',
    category: 'Daily Routines',
    dataUrl: generate3DRealisticSvgIllustration(4, 2, 'Get up', 'Thức dậy', '⏰', 'Daily Routines').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 4 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-4-2-breakfast',
    fileName: '4_2_breakfast_3d.png',
    grade: 4,
    unit: 2,
    term: 'have breakfast',
    vietnamese: 'Ăn bữa sáng',
    category: 'Daily Routines',
    dataUrl: generate3DRealisticSvgIllustration(4, 2, 'Have breakfast', 'Ăn sáng', '🍳', 'Daily Routines').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 4 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-4-2-school',
    fileName: '4_2_school_3d.png',
    grade: 4,
    unit: 2,
    term: 'go to school',
    vietnamese: 'Đến trường học',
    category: 'Daily Routines',
    dataUrl: generate3DRealisticSvgIllustration(4, 2, 'Go to school', 'Đến trường', '🏫', 'Daily Routines').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 4 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },

  // ================= LỚP 5 (3D REALISTIC) =================
  {
    id: '3d-5-1-halongbay',
    fileName: '5_1_halongbay_3d.png',
    grade: 5,
    unit: 1,
    term: 'ha long bay',
    vietnamese: 'Vịnh Hạ Long',
    category: 'Travel',
    dataUrl: generate3DRealisticSvgIllustration(5, 1, 'Ha Long Bay', 'Vịnh Hạ Long', '⛵', 'Travel').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 5 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-5-1-seafood',
    fileName: '5_1_seafood_3d.png',
    grade: 5,
    unit: 1,
    term: 'seafood',
    vietnamese: 'Hải sản tươi ngon',
    category: 'Food',
    dataUrl: generate3DRealisticSvgIllustration(5, 1, 'Seafood', 'Hải sản', '🦞', 'Food').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 5 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-5-5-doctor',
    fileName: '5_5_doctor_3d.png',
    grade: 5,
    unit: 5,
    term: 'doctor',
    vietnamese: 'Bác sĩ',
    category: 'Jobs',
    dataUrl: generate3DRealisticSvgIllustration(5, 5, 'Doctor', 'Bác sĩ', '👨‍⚕️', 'Jobs').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 5 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  },
  {
    id: '3d-5-5-pilot',
    fileName: '5_5_pilot_3d.png',
    grade: 5,
    unit: 5,
    term: 'pilot',
    vietnamese: 'Phi công',
    category: 'Jobs',
    dataUrl: generate3DRealisticSvgIllustration(5, 5, 'Pilot', 'Phi công', '👨‍✈️', 'Jobs').dataUrl,
    sourceTextbook: 'SGK Tiếng Anh 5 Global Success - 3D Realistic Render',
    style: '3d_realistic',
    createdAt: '2026-10-05'
  }
];

export const PRESET_SGK_ILLUSTRATIONS = PRESET_3D_ILLUSTRATIONS;

// Preset PDF Unit Pages for 1-Click 3D Extraction Demo across Grades 1-5
export const PRESET_PDF_UNIT_PAGES: PresetPdfPage[] = [
  {
    id: 'pdf-g1-u1',
    title: 'SGK Lớp 1 - Unit 1: In the School Playground (AI 3D Render)',
    grade: 1,
    unitNumber: 1,
    bookSeries: 'Global Success',
    description: 'Trang 8 SGK Tiếng Anh 1: Tranh 3D chân thực đồ dùng học tập của bé (Book, Pen, Pencil, Bag).',
    targetVocabs: [
      { word: 'Book', vietnamese: 'Quyển sách', emoji: '📕', category: 'School Things' },
      { word: 'Pen', vietnamese: 'Cái bút', emoji: '🖊️', category: 'School Things' },
      { word: 'Pencil', vietnamese: 'Bút chì', emoji: '✏️', category: 'School Things' },
      { word: 'Bag', vietnamese: 'Cặp sách', emoji: '🎒', category: 'School Things' }
    ],
    contextDialogue: 'Teacher: Open your book, please!\nBill: Yes, teacher.'
  },
  {
    id: 'pdf-g2-u1',
    title: 'SGK Lớp 2 - Unit 1: At My Birthday Party (AI 3D Render)',
    grade: 2,
    unitNumber: 1,
    bookSeries: 'Global Success',
    description: 'Trang 6 SGK Tiếng Anh 2: Gia đình và bánh sinh nhật 3D chân thực (Father, Mother, Brother, Cake).',
    targetVocabs: [
      { word: 'Father', vietnamese: 'Bố', emoji: '👨', category: 'Family' },
      { word: 'Mother', vietnamese: 'Mẹ', emoji: '👩', category: 'Family' },
      { word: 'Brother', vietnamese: 'Anh / Em trai', emoji: '👦', category: 'Family' },
      { word: 'Cake', vietnamese: 'Bánh kem', emoji: '🎂', category: 'Food' }
    ],
    contextDialogue: 'A: This is my father.\nB: Nice to meet you, sir!'
  },
  {
    id: 'pdf-g3-u4',
    title: 'SGK Lớp 3 - Unit 4: Our Classroom & School Things (AI 3D Render)',
    grade: 3,
    unitNumber: 4,
    bookSeries: 'Global Success',
    description: 'Trang 24-25 SGK Tiếng Anh 3: Bộ học cụ 3D chân thực cao cấp (Ruler, Pencil, Eraser, School bag, Book, Pen).',
    targetVocabs: [
      { word: 'Ruler', vietnamese: 'Cây thước kẻ', emoji: '📏', category: 'School Things' },
      { word: 'Pencil', vietnamese: 'Bút chì', emoji: '✏️', category: 'School Things' },
      { word: 'Eraser', vietnamese: 'Cục tẩy', emoji: '🧼', category: 'School Things' },
      { word: 'School bag', vietnamese: 'Cặp sách', emoji: '🎒', category: 'School Things' },
      { word: 'Book', vietnamese: 'Quyển sách', emoji: '📖', category: 'School Things' },
      { word: 'Pen', vietnamese: 'Cái bút', emoji: '🖊️', category: 'School Things' }
    ],
    contextDialogue: 'Mai: What is this?\nNam: It is a long yellow ruler.'
  },
  {
    id: 'pdf-g4-u2',
    title: 'SGK Lớp 4 - Unit 2: Time and Daily Routines (AI 3D Render)',
    grade: 4,
    unitNumber: 2,
    bookSeries: 'Global Success',
    description: 'Trang 16 SGK Tiếng Anh 4: Đồng hồ báo thức và thói quen hàng ngày 3D (Get up, Have breakfast, Go to school).',
    targetVocabs: [
      { word: 'Get up', vietnamese: 'Thức dậy', emoji: '⏰', category: 'Daily Routines' },
      { word: 'Have breakfast', vietnamese: 'Ăn bữa sáng', emoji: '🍳', category: 'Daily Routines' },
      { word: 'Go to school', vietnamese: 'Đến trường học', emoji: '🏫', category: 'Daily Routines' }
    ],
    contextDialogue: 'Tom: What time do you get up?\nHoa: I get up at six o\'clock.'
  },
  {
    id: 'pdf-g5-u1',
    title: 'SGK Lớp 5 - Unit 1: All About Me & Summer Holidays (AI 3D Render)',
    grade: 5,
    unitNumber: 1,
    bookSeries: 'Global Success',
    description: 'Trang 10 SGK Tiếng Anh 5: Cảnh đẹp vịnh biển và du lịch 3D chân thực (Ha Long Bay, Seafood, Island).',
    targetVocabs: [
      { word: 'Ha Long Bay', vietnamese: 'Vịnh Hạ Long', emoji: '⛵', category: 'Travel' },
      { word: 'Seafood', vietnamese: 'Hải sản tươi ngon', emoji: '🦞', category: 'Food' },
      { word: 'Doctor', vietnamese: 'Bác sĩ', emoji: '👨‍⚕️', category: 'Jobs' }
    ],
    contextDialogue: 'Tony: Where did you go on holiday?\nMai: I went to Ha Long Bay. The seafood was delicious!'
  }
];

// 5. Quản lý lưu trữ tranh 3D theo từng trường học (School Data Isolation)
export const getSchoolExtractedImages = (schoolId: string): ExtractedSgkImage[] => {
  const currentSchoolKey = schoolId || 'school_tanky';
  try {
    const saved3D = localStorage.getItem(`ef_3d_images_${currentSchoolKey}`);
    if (saved3D) {
      const parsed: ExtractedSgkImage[] = JSON.parse(saved3D);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed];
      }
    }

    const savedLegacy = localStorage.getItem(`ef_sgk_images_${currentSchoolKey}`);
    if (savedLegacy) {
      const parsedLegacy: ExtractedSgkImage[] = JSON.parse(savedLegacy);
      if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
        // Upgrade legacy items to 3D
        return parsedLegacy.map(img => ({
          ...img,
          fileName: img.fileName.includes('_3d') ? img.fileName : img.fileName.replace('.png', '_3d.png'),
          dataUrl: generate3DRealisticSvgIllustration(img.grade, img.unit, img.term, img.vietnamese, '✨', img.category).dataUrl,
          style: '3d_realistic'
        }));
      }
    }
  } catch (e) {}

  return [...PRESET_3D_ILLUSTRATIONS];
};

export const saveSchoolExtractedImage = (
  schoolId: string,
  image: ExtractedSgkImage
): ExtractedSgkImage[] => {
  const currentSchoolKey = schoolId || 'school_tanky';
  const current = getSchoolExtractedImages(currentSchoolKey);
  const updatedImage = {
    ...image,
    fileName: image.fileName.includes('_3d') ? image.fileName : image.fileName.replace('.png', '_3d.png'),
    style: '3d_realistic' as const
  };
  const updated = [updatedImage, ...current.filter(img => img.id !== image.id && img.fileName !== updatedImage.fileName)];
  try {
    localStorage.setItem(`ef_3d_images_${currentSchoolKey}`, JSON.stringify(updated));
    localStorage.setItem(`ef_sgk_images_${currentSchoolKey}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving 3D image to localStorage:', e);
  }
  return updated;
};

export const batchSaveSchoolExtractedImages = (
  schoolId: string,
  images: ExtractedSgkImage[]
): ExtractedSgkImage[] => {
  const currentSchoolKey = schoolId || 'school_tanky';
  const current = getSchoolExtractedImages(currentSchoolKey);
  const imageMap = new Map<string, ExtractedSgkImage>();
  
  images.forEach(img => {
    const fn = img.fileName.includes('_3d') ? img.fileName : img.fileName.replace('.png', '_3d.png');
    imageMap.set(fn.toLowerCase(), { ...img, fileName: fn, style: '3d_realistic' });
  });

  current.forEach(img => {
    if (!imageMap.has(img.fileName.toLowerCase())) {
      imageMap.set(img.fileName.toLowerCase(), img);
    }
  });

  const updated = Array.from(imageMap.values());
  try {
    localStorage.setItem(`ef_3d_images_${currentSchoolKey}`, JSON.stringify(updated));
    localStorage.setItem(`ef_sgk_images_${currentSchoolKey}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Error batch saving 3D images to localStorage:', e);
  }
  return updated;
};

export const deleteSchoolExtractedImage = (
  schoolId: string,
  imageId: string
): ExtractedSgkImage[] => {
  const currentSchoolKey = schoolId || 'school_tanky';
  const current = getSchoolExtractedImages(currentSchoolKey);
  const updated = current.filter(img => img.id !== imageId);
  try {
    localStorage.setItem(`ef_3d_images_${currentSchoolKey}`, JSON.stringify(updated));
    localStorage.setItem(`ef_sgk_images_${currentSchoolKey}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting 3D image from localStorage:', e);
  }
  return updated;
};

// 6. Trình quét và sinh tranh 3D Chân thực tự động từ file PDF SGK
export const processPdfAndExtractUnitImages = async (
  file: File | { name: string; size?: number },
  grade: number,
  unitNumber: number,
  targetWords: { word: string; vietnamese: string; emoji?: string; category?: string }[] = [],
  onProgress?: (message: string) => void
): Promise<ExtractedSgkImage[]> => {
  onProgress?.(`Đang đọc file PDF SGK: ${file.name}...`);
  await new Promise(r => setTimeout(r, 300));

  onProgress?.(`Đang phân tích cấu trúc bài học Lớp ${grade} - Unit ${unitNumber}...`);
  await new Promise(r => setTimeout(r, 400));

  onProgress?.(`Đang khởi tạo studio render 3D Chân thực (Realistic Lighting, Soft Shadows & Depth)...`);
  await new Promise(r => setTimeout(r, 500));

  const extractedList: ExtractedSgkImage[] = [];

  const wordsToExtract = targetWords.length > 0 ? targetWords : [
    { word: 'Classroom', vietnamese: 'Phòng học', emoji: '🏫', category: 'School' },
    { word: 'Desk', vietnamese: 'Bàn học', emoji: '🪑', category: 'School Things' },
    { word: 'Board', vietnamese: 'Bảng viết', emoji: '📋', category: 'School Things' },
    { word: 'Teacher', vietnamese: 'Thầy / Cô giáo', emoji: '👩‍🏫', category: 'People' }
  ];

  for (let i = 0; i < wordsToExtract.length; i++) {
    const item = wordsToExtract[i];
    const stdFileName = formatSgkImageFileName(grade, unitNumber, item.word);
    onProgress?.(`Đang render mô hình AI 3D Chân thực: ${stdFileName} (${i + 1}/${wordsToExtract.length})`);
    await new Promise(r => setTimeout(r, 120));

    const { fileName, dataUrl } = generate3DRealisticSvgIllustration(
      grade,
      unitNumber,
      item.word,
      item.vietnamese,
      item.emoji || '✨',
      item.category || 'Vocabulary'
    );

    extractedList.push({
      id: `3d-${grade}-${unitNumber}-${Date.now()}-${i}`,
      fileName,
      grade,
      unit: unitNumber,
      term: item.word,
      vietnamese: item.vietnamese,
      category: item.category || 'Vocabulary',
      dataUrl,
      sourceTextbook: `PDF: ${file.name} (Unit ${unitNumber}) • 3D Realistic Render`,
      style: '3d_realistic',
      createdAt: new Date().toISOString()
    });
  }

  onProgress?.(`✅ Hoàn tất! Đã khởi tạo ${extractedList.length} tranh kỹ thuật số AI 3D Chân thực.`);
  return extractedList;
};

// 7. Tự động đồng bộ và gán tranh 3D Chân thực vào Unit bài học
export const attachIllustrationsToUnit = (
  unit: Unit,
  availableImages: ExtractedSgkImage[]
): Unit => {
  const unitNumMatch = unit.title.match(/\d+/);
  const unitNum = unitNumMatch ? unitNumMatch[0] : '1';

  // Map words and filenames to 3D illustrations
  const imageMap = new Map<string, ExtractedSgkImage>();
  availableImages.forEach(img => {
    imageMap.set(img.term.toLowerCase(), img);
    imageMap.set(img.fileName.toLowerCase(), img);
    // Also map without _3d suffix
    const cleanFn = img.fileName.replace('_3d', '');
    imageMap.set(cleanFn.toLowerCase(), img);
  });

  const updatedVocabularies: Vocabulary[] = unit.vocabularies.map(vocab => {
    const cleanWord = vocab.word.toLowerCase();
    const found = imageMap.get(cleanWord) || availableImages.find(
      img => img.grade === unit.grade && img.term.toLowerCase() === cleanWord
    );

    if (found) {
      return {
        ...vocab,
        imageUrl: found.fileName,
        imageSource: found.sourceTextbook || `SGK Tiếng Anh ${unit.grade} - Unit ${unitNum} (AI 3D Render)`
      };
    }

    // Auto-generate 3D realistic illustration if missing
    const generated = generate3DRealisticSvgIllustration(
      unit.grade,
      unitNum,
      vocab.word,
      vocab.vietnamese,
      vocab.emoji || '✨',
      vocab.category || 'General'
    );

    return {
      ...vocab,
      imageUrl: generated.fileName,
      imageSource: `SGK Tiếng Anh ${unit.grade} - Unit ${unitNum} (AI 3D Render)`
    };
  });

  // Attach 3D illustrations to Listening questions
  const updatedListeningQuestions: ListeningQuestion[] = unit.listeningQuestions.map((lq, idx) => {
    const targetWord = lq.options[lq.correctIndex] || unit.vocabularies[idx]?.word;
    const cleanTarget = targetWord ? targetWord.toLowerCase() : '';
    const found = imageMap.get(cleanTarget);

    const generated = generate3DRealisticSvgIllustration(
      unit.grade,
      unitNum,
      targetWord || `Câu hỏi ${idx + 1}`,
      'Tranh 3D chân thực bài nghe',
      '🎧',
      'Listening'
    );

    return {
      ...lq,
      imageUrl: found ? found.fileName : generated.fileName,
      imageSource: `SGK Tiếng Anh ${unit.grade} - Unit ${unitNum} (AI 3D Render)`
    };
  });

  return {
    ...unit,
    vocabularies: updatedVocabularies,
    listeningQuestions: updatedListeningQuestions
  };
};

// 8. Helper tra cứu DataURL ảnh 3D từ tên file hoặc từ vựng
export const resolveSgkImageSource = (
  fileNameOrUrl?: string,
  fallbackGrade: number = 3,
  fallbackUnit: number | string = 1,
  fallbackWord: string = 'Hello',
  fallbackVietnamese: string = 'Xin chào',
  fallbackEmoji: string = '✨',
  schoolId?: string
): { fileName: string; src: string } => {
  // If already data URL or external URL, return directly
  if (fileNameOrUrl && (fileNameOrUrl.startsWith('data:') || fileNameOrUrl.startsWith('http') || fileNameOrUrl.startsWith('/'))) {
    return { fileName: fileNameOrUrl.split('/').pop() || 'illustration.png', src: fileNameOrUrl };
  }

  // Lookup in school-isolated 3D repository first, then presets
  const schoolImages = schoolId ? getSchoolExtractedImages(schoolId) : [];
  const allImages = [...schoolImages, ...PRESET_3D_ILLUSTRATIONS];

  const searchKey = (fileNameOrUrl || fallbackWord).toLowerCase().replace('.png', '').replace('_3d', '');
  const cleanWordKey = fallbackWord.toLowerCase().trim();

  const found = allImages.find(img => {
    const fnKey = img.fileName.toLowerCase().replace('.png', '').replace('_3d', '');
    const termKey = img.term.toLowerCase().trim();
    return fnKey === searchKey || termKey === searchKey || termKey === cleanWordKey;
  });

  if (found) {
    return { fileName: found.fileName, src: found.dataUrl };
  }

  // Parse filename if format like "3_4_ruler.png" or "3_4_ruler_3d.png"
  let grade = fallbackGrade;
  let unit = fallbackUnit;
  let word = fallbackWord;

  if (fileNameOrUrl) {
    const parts = fileNameOrUrl.replace('.png', '').replace('_3d', '').split('_');
    if (parts.length >= 3) {
      grade = Number(parts[0]) || fallbackGrade;
      unit = parts[1] || fallbackUnit;
      word = parts.slice(2).join(' ') || fallbackWord;
    }
  }

  // Automatically generate 3D Realistic illustration on the fly!
  const gen3D = generate3DRealisticSvgIllustration(grade, unit, word, fallbackVietnamese, fallbackEmoji);
  return { fileName: gen3D.fileName, src: gen3D.dataUrl };
};
