function GreenLeafPlant({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 260"
      className={className}
      fill="none"
    >
      {/* EN: Soft plant stems */}
      <path
        d="M92 220C92 165 82 112 52 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />
      <path
        d="M104 220C108 160 124 104 160 48"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />
      <path
        d="M100 220C96 150 108 95 112 36"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/25"
      />

      {/* EN: Large soft green leaves */}
      {/* JP: 大きめのやわらかい緑の葉 */}
      <path
        d="M54 62C28 66 18 90 22 116C48 108 64 88 54 62Z"
        fill="currentColor"
        className="text-bloom-forest/40"
      />
      <path
        d="M112 38C86 46 78 72 86 98C112 88 126 62 112 38Z"
        fill="currentColor"
        className="text-bloom-forest/35"
      />
      <path
        d="M162 52C134 52 118 74 118 102C146 100 166 78 162 52Z"
        fill="currentColor"
        className="text-bloom-forest/38"
      />
      <path
        d="M75 126C46 126 30 148 30 176C60 172 80 150 75 126Z"
        fill="currentColor"
        className="text-bloom-mint/40"
      />
      <path
        d="M138 112C112 116 98 138 104 164C132 158 148 136 138 112Z"
        fill="currentColor"
        className="text-bloom-mint/38"
      />
      <path
        d="M174 124C146 122 128 142 126 170C156 170 176 150 174 124Z"
        fill="currentColor"
        className="text-bloom-forest/35"
      />

      {/* EN: Simple plant pot */}
      {/* JP: シンプルな植木鉢 */}
      <path
        d="M62 216H150L140 248H72L62 216Z"
        fill="currentColor"
        className="text-bloom-forest/25"
      />
      <path
        d="M56 210H156"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />
    </svg>
  );
}

function LeafSprig({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 220"
      className={className}
      fill="none"
    >
      {/* EN: Thin botanical stem */}
      {/* JP: 細い植物の茎 */}
      <path
        d="M88 198C86 150 90 96 108 30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-bloom-forest/25"
      />

      {/* EN: Small leaf shapes like a soft sprig */}
      {/* JP: やわらかい小枝のような葉っぱ */}
      <path
        d="M88 156C58 148 42 128 38 104C66 108 84 128 88 156Z"
        fill="currentColor"
        className="text-bloom-mint/35"
      />
      <path
        d="M92 132C122 122 140 100 146 76C116 80 96 102 92 132Z"
        fill="currentColor"
        className="text-bloom-forest/30"
      />
      <path
        d="M90 100C62 92 48 72 44 50C72 54 88 74 90 100Z"
        fill="currentColor"
        className="text-bloom-mint/30"
      />
      <path
        d="M98 78C124 68 138 48 142 28C116 32 100 52 98 78Z"
        fill="currentColor"
        className="text-bloom-forest/28"
      />
    </svg>
  );
}

function SmallLeafAccent({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={className}
      fill="none"
    >
      {/* EN: Simple leaf accent */}
      {/* JP: シンプルな葉っぱのアクセント */}
      <path
        d="M60 104C58 74 62 46 78 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-bloom-forest/25"
      />
      <path
        d="M62 72C38 68 24 52 20 34C44 36 60 52 62 72Z"
        fill="currentColor"
        className="text-bloom-mint/30"
      />
      <path
        d="M66 54C88 48 100 32 104 16C82 18 68 34 66 54Z"
        fill="currentColor"
        className="text-bloom-forest/28"
      />
    </svg>
  );
}

function BloomBackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden lg:block"
    >
      {/* EN: Soft green wash for calm depth */}
      {/* JP: 落ち着いた奥行きを出すための淡い緑のぼかし */}
      <div className="absolute -right-24 top-12 h-96 w-96 rounded-full bg-bloom-mint/20 blur-3xl dark:bg-bloom-mint/5" />

      {/* EN: Main left plant inspired by the Bloom illustration */}
      {/* JP: Bloomイラスト風の左側メイン植物 */}
      <GreenLeafPlant className="absolute -left-8 top-[12%] h-96 w-80 -rotate-6 opacity-25" />

      {/* EN: Softer right plant for balance */}
      {/* JP: バランス用の右側の植物 */}
      <GreenLeafPlant className="absolute -right-10 top-[48%] h-80 w-64 rotate-6 opacity-35" />

      {/* EN: Tall leafy sprig near the top-right */}
      {/* JP: 右上の縦長の葉っぱ装飾 */}
      <LeafSprig className="absolute right-12 top-20 h-72 w-56 rotate-12 opacity-45" />

      {/* EN: Small botanical detail near the lower-left */}
      {/* JP: 左下の小さな植物装飾 */}
      <LeafSprig className="absolute bottom-4 left-82 h-64 w-48 -rotate-12 opacity-35" />

      {/* EN: Very subtle floating leaf accents */}
      {/* JP: とても控えめな浮かぶ葉っぱのアクセント */}
      <SmallLeafAccent className="absolute right-[30%] top-[24%] h-28 w-28 rotate-12 opacity-30" />
      <SmallLeafAccent className="absolute left-[42%] bottom-[18%] h-24 w-24 -rotate-6 opacity-25" />

      {/* EN: Warm neutral wash to match the illustration palette without flowers */}
      {/* JP: 花を使わずにイラストの雰囲気に合わせる淡い暖色ぼかし */}
      <div className="absolute bottom-24 right-1/4 h-64 w-64 rounded-full bg-[#f3c7b8]/15 blur-3xl dark:bg-[#f3c7b8]/5" />
    </div>
  );
}

export default BloomBackgroundDecor;