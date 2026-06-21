function FlowerCluster({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 220"
      className={className}
      fill="none"
    >
      {/* EN: Soft flower stems */}
      {/* JP: やわらかい花の茎 */}
      <path
        d="M110 190C108 150 112 112 136 78"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-bloom-forest/35"
      />
      <path
        d="M96 188C90 145 76 118 48 88"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />

      {/* EN: Leaves */}
      {/* JP: 葉っぱ */}
      <path
        d="M112 136C136 126 150 108 154 88C132 92 116 108 112 136Z"
        fill="currentColor"
        className="text-bloom-mint/45"
      />
      <path
        d="M91 142C66 132 52 114 48 94C72 98 88 114 91 142Z"
        fill="currentColor"
        className="text-bloom-mint/40"
      />

      {/* EN: Main flower */}
      {/* JP: メインの花 */}
      <g className="text-[#e8b9a8]/55" fill="currentColor">
        <circle cx="146" cy="66" r="13" />
        <circle cx="128" cy="72" r="13" />
        <circle cx="136" cy="52" r="13" />
        <circle cx="154" cy="48" r="13" />
        <circle cx="162" cy="68" r="13" />
      </g>

      <circle
        cx="146"
        cy="61"
        r="8"
        fill="currentColor"
        className="text-[#f5df9b]/70"
      />

      {/* EN: Smaller flower */}
      {/* JP: 小さい花 */}
      <g className="text-[#f2c6d3]/55" fill="currentColor">
        <circle cx="45" cy="78" r="10" />
        <circle cx="31" cy="84" r="10" />
        <circle cx="38" cy="66" r="10" />
        <circle cx="55" cy="64" r="10" />
        <circle cx="60" cy="82" r="10" />
      </g>

      <circle
        cx="45"
        cy="76"
        r="6"
        fill="currentColor"
        className="text-[#f5df9b]/70"
      />
    </svg>
  )
}

function GreenLeafPlant({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 260"
      className={className}
      fill="none"
    >
      {/* EN: Plant stems inspired by the Bloom illustration */}
      {/* JP: Bloomイラスト風の植物の茎 */}
      <path
        d="M92 220C92 165 82 112 52 56"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/35"
      />
      <path
        d="M104 220C108 160 124 104 160 48"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/35"
      />
      <path
        d="M100 220C96 150 108 95 112 36"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />

      {/* EN: Large soft green leaves */}
      {/* JP: 大きめのやわらかい緑の葉 */}
      <path
        d="M54 62C28 66 18 90 22 116C48 108 64 88 54 62Z"
        fill="currentColor"
        className="text-bloom-forest/45"
      />
      <path
        d="M112 38C86 46 78 72 86 98C112 88 126 62 112 38Z"
        fill="currentColor"
        className="text-bloom-forest/40"
      />
      <path
        d="M162 52C134 52 118 74 118 102C146 100 166 78 162 52Z"
        fill="currentColor"
        className="text-bloom-forest/42"
      />
      <path
        d="M75 126C46 126 30 148 30 176C60 172 80 150 75 126Z"
        fill="currentColor"
        className="text-bloom-mint/45"
      />
      <path
        d="M138 112C112 116 98 138 104 164C132 158 148 136 138 112Z"
        fill="currentColor"
        className="text-bloom-mint/42"
      />
      <path
        d="M174 124C146 122 128 142 126 170C156 170 176 150 174 124Z"
        fill="currentColor"
        className="text-bloom-forest/40"
      />

      {/* EN: Simple pot shape */}
      {/* JP: シンプルな植木鉢 */}
      <path
        d="M62 216H150L140 248H72L62 216Z"
        fill="currentColor"
        className="text-bloom-forest/30"
      />
      <path
        d="M56 210H156"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-bloom-forest/35"
      />
    </svg>
  )
}

function SmallBloomSprig({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 180"
      className={className}
      fill="none"
    >
      <path
        d="M76 160C78 120 75 78 92 34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-bloom-forest/30"
      />

      <path
        d="M78 110C52 100 40 82 36 62C62 66 76 84 78 110Z"
        fill="currentColor"
        className="text-bloom-mint/35"
      />

      <path
        d="M83 86C108 76 120 58 124 38C100 42 86 60 83 86Z"
        fill="currentColor"
        className="text-bloom-mint/35"
      />

      <g className="text-[#e8b9a8]/45" fill="currentColor">
        <circle cx="98" cy="30" r="9" />
        <circle cx="86" cy="36" r="9" />
        <circle cx="92" cy="20" r="9" />
        <circle cx="106" cy="18" r="9" />
        <circle cx="112" cy="34" r="9" />
      </g>
    </svg>
  )
}

function BloomBackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block"
    >
      {/* EN: Soft colour wash behind the top-right flowers */}
      {/* JP: 右上の花の後ろにやわらかい色を入れます */}
      <div className="absolute -right-24 top-12 h-96 w-96 rounded-full bg-bloom-mint/20 blur-3xl dark:bg-bloom-mint/5" />

      {/* EN: Top-right floral cluster inspired by the Bloom illustration */}
      {/* JP: Bloomのイラスト風の右上フラワー装飾 */}
      <FlowerCluster className="absolute -right-8 top-20 h-72 w-72 rotate-12 opacity-75" />

      {/* EN: Bottom-left floral cluster */}
      {/* JP: 左下のフラワー装飾 */}
      <FlowerCluster className="absolute -bottom-10 -left-10 h-80 w-80 -rotate-12 opacity-55" />

      {/* EN: Green plant detail inspired by the Bloom illustration */}
      {/* JP: Bloomイラスト風の緑の植物装飾 */}
      <GreenLeafPlant className="absolute left-4 top-[18%] h-72 w-60 -rotate-6 opacity-45" />

      {/* EN: Second green plant detail for balance */}
      {/* JP: バランス用の2つ目の緑の植物装飾 */}
      <GreenLeafPlant className="absolute right-2 top-[58%] h-64 w-56 rotate-6 opacity-35" />

      {/* EN: Small right-side botanical sprig */}
      {/* JP: 右側の小さな植物装飾 */}
      <SmallBloomSprig className="absolute right-10 top-[42%] h-52 w-44 rotate-6 opacity-45" />

      {/* EN: Warm soft accent matching the illustration palette */}
      {/* JP: イラストの雰囲気に合わせた淡い暖色アクセント */}
      <div className="absolute bottom-24 right-1/4 h-64 w-64 rounded-full bg-[#f3c7b8]/25 blur-3xl dark:bg-[#f3c7b8]/5" />
    </div>
  )
}

export default BloomBackgroundDecor