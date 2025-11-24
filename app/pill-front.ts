import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Star, 
  Menu, 
  X,
  Heart, 
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  Smartphone,
  Stethoscope,
  Map,
  Navigation,
  CreditCard,
  Truck,
  Clock,
  Calendar,
  ShieldCheck,
  Pill,
  MessageCircle,
  Package,
  Home
} from 'lucide-react';

export default function PillPortal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('comprehensive');
  const [diagnosisStep, setDiagnosisStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // 構造化データ (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ピルミライ",
    "url": "https://pill-mirai.example.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pill-mirai.example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // 簡易診断データ
  const diagnosisQuestions = [
    {
      question: "ピルを検討している目的は？",
      options: ["確実な避妊", "生理痛・PMSの改善", "生理日の移動", "肌荒れの改善"]
    },
    {
      question: "もっとも重視するポイントは？",
      options: ["価格の安さ", "医師の診療・安心感", "配送の早さ", "バレない梱包"]
    }
  ];

  // クリニックデータ
  const clinics = [
    {
      id: 1,
      name: "レディースケア・オンライン",
      price: "2,200",
      tags: ["初診料0円", "当日発送", "定期配送オフ"],
      features: ["LINEで相談無料", "吐き気止め処方可"],
      image: "bg-rose-50", 
      category: "comprehensive",
      campaign: "初月1,000円OFF"
    },
    {
      id: 2,
      name: "スマルナ・クリニック",
      price: "1,980",
      tags: ["業界最安級", "学割プラン", "アプリ完結"],
      features: ["診察予約不要", "後払い決済OK"],
      image: "bg-indigo-50", 
      category: "price",
      campaign: null
    },
    {
      id: 3,
      name: "クイックピルExpress",
      price: "2,500",
      tags: ["バイク便対応(都内)", "365日診療", "ポスト投函"],
      features: ["最短1時間でお届け", "プライバシー梱包"],
      image: "bg-orange-50", 
      category: "speed",
      campaign: "当日便無料"
    }
  ];

  const areaGroups = [
    { region: "関東", prefs: ["東京", "神奈川", "埼玉", "千葉", "茨城", "栃木", "群馬"] },
    { region: "関西", prefs: ["大阪", "兵庫", "京都", "滋賀", "奈良", "和歌山"] },
    { region: "北海道・東北", prefs: ["北海道", "宮城", "青森", "岩手", "秋田", "山形", "福島"] },
    { region: "中部・北陸", prefs: ["愛知", "静岡", "新潟", "山梨", "長野", "石川", "富山", "福井", "岐阜"] },
    { region: "中国・四国", prefs: ["広島", "岡山", "山口", "島根", "鳥取", "香川", "愛媛", "徳島", "高知"] },
    { region: "九州・沖縄", prefs: ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"] }
  ];

  const faqs = [
    { q: "未成年でも購入できますか？", a: "クリニックによりますが、多くの場所で保護者の同意があれば処方可能です。まずは無料相談を活用することをおすすめします。" },
    { q: "副作用が心配です", a: "飲み始めに吐き気や頭痛が起きることがありますが、2-3ヶ月で治まることが一般的です。医師が体質に合った種類を提案してくれます。" },
    { q: "家族にバレずに受け取れますか？", a: "多くのオンラインクリニックが「雑貨」や「サプリメント」などの品名で、中身がわからないように配送してくれます。" },
    { q: "保険は適用されますか？", a: "避妊目的の場合は自費診療となります。月経困難症などの治療目的であれば保険適用となる場合もありますが、オンライン診療では自費診療が一般的です。" }
  ];

  return (
    // Google Font "Zen Maru Gothic" を読み込み、全体に適用
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap');
    `}</style>
    <div className="min-h-screen bg-rose-50/30 font-['Zen_Maru_Gothic',_sans-serif] text-slate-800 pb-20 md:pb-0">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} 
      />

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="bg-rose-500 text-white p-1.5 rounded-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-300">
                <Heart size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">ピルミライ</span>
            </div>

            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-500">
              {["ピルの基礎知識", "クリニック検索", "種類・料金", "Q&A"].map((item) => (
                <a key={item} href="#" className="hover:text-rose-500 transition py-2 border-b-2 border-transparent hover:border-rose-500">{item}</a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {/* ログインボタンを削除 */}
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                <Smartphone size={16} />
                オンライン診療予約
              </button>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-rose-50 rounded-lg transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div className={`md:hidden absolute w-full bg-white border-t border-slate-100 shadow-xl z-50 transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
          <div className="p-4 space-y-2">
            {["ピルの基礎知識", "クリニック検索", "種類・料金"].map(item => (
              <a key={item} href="#" className="block px-4 py-3 rounded-lg hover:bg-rose-50 text-slate-700 font-bold">{item}</a>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold shadow-md">
                オンライン診療予約
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative bg-white overflow-hidden pb-16 pt-10 sm:pt-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-50 rounded-full opacity-60"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-center md:text-left space-y-7">
            <div className="inline-flex items-center gap-2 bg-white border border-rose-100 rounded-full px-4 py-1.5 text-xs font-bold text-rose-600 tracking-wide uppercase shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              医師監修・ピル総合ガイド
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-slate-800">
              ワタシの体は、<br/>
              <span className="text-rose-500">ワタシ自身</span>で選ぶ。
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-medium">
              生理痛、PMS、避妊、肌荒れ...。<br className="hidden sm:block"/>
              あなたの悩みに寄り添う、最適なピルとクリニックが見つかります。
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-100 max-w-md mx-auto md:mx-0 flex flex-col sm:flex-row gap-2 border border-slate-100">
              <div className="flex-1 flex items-center px-4 h-12 sm:h-14 bg-slate-50 rounded-xl border border-transparent focus-within:border-rose-400 focus-within:bg-white transition group">
                <MapPin className="text-slate-400 group-focus-within:text-rose-500 transition mr-3" size={18} />
                <input 
                  type="text" 
                  placeholder="エリア・駅名 (例: 大阪)" 
                  className="bg-transparent w-full outline-none text-slate-800 placeholder-slate-400 font-medium text-sm"
                />
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 h-12 sm:h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-rose-200 text-sm active:scale-95">
                <Search size={18} />
                検索
              </button>
            </div>
            
            {/* Mobile Only Diagnosis Button */}
            <div className="md:hidden pt-4">
              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 flex items-center justify-center gap-2 animate-pulse">
                <AlertCircle size={20} />
                30秒で完了！あなたに合うピル診断
              </button>
            </div>

            <div className="hidden md:flex items-center justify-center md:justify-start gap-8 text-sm font-bold text-slate-400 pt-2">
               {/* Micro-interactions */}
              <button className="flex items-center gap-2 hover:text-rose-500 transition group py-1">
                <div className="bg-slate-50 p-1.5 rounded-full group-hover:bg-rose-50 transition"><MapPin size={14} className="text-slate-500 group-hover:text-rose-500 transition"/></div>
                現在地から探す
              </button>
              <button className="flex items-center gap-2 hover:text-rose-500 transition group py-1">
                <div className="bg-slate-50 p-1.5 rounded-full group-hover:bg-rose-50 transition"><Smartphone size={14} className="text-slate-500 group-hover:text-rose-500 transition"/></div>
                オンライン診療
              </button>
            </div>
          </div>

          {/* Hero Visual - Interactive Diagnosis Widget (PC) */}
          <div className="hidden md:block flex-1 relative perspective-1000">
            <div className="bg-white text-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-100 max-w-sm mx-auto border border-slate-50 relative z-10 transition-all hover:translate-y-[-5px]">
              
              <div className="flex items-center justify-between mb-8 border-b border-dashed border-slate-100 pb-4">
                <div>
                  <div className="text-xs font-bold text-rose-500 mb-1 tracking-wider">SELF CHECK</div>
                  <div className="text-xl font-bold text-slate-800">ピル処方・相性診断</div>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                  <Heart size={24} fill="currentColor" className="text-rose-400" />
                </div>
              </div>

              {diagnosisStep < diagnosisQuestions.length ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="font-bold text-lg mb-5 text-slate-800 leading-snug">
                    Q{diagnosisStep + 1}. <br/>{diagnosisQuestions[diagnosisStep].question}
                  </p>
                  <div className="space-y-3">
                    {diagnosisQuestions[diagnosisStep].options.map((option, i) => (
                      <button 
                        key={i}
                        onClick={() => setDiagnosisStep(prev => prev + 1)}
                        className="w-full text-left px-5 py-3.5 rounded-xl border border-slate-100 hover:border-rose-400 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-bold transition duration-200 flex items-center justify-between group bg-white shadow-sm hover:shadow-md"
                      >
                        {option}
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-rose-500 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-center gap-2">
                     {[0, 1].map(step => (
                       <div key={step} className={`h-1.5 rounded-full transition-all duration-300 ${diagnosisStep >= step ? 'w-8 bg-rose-500' : 'w-2 bg-slate-200'}`}></div>
                     ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-rose-50">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">診断完了！</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">あなたの目的に合ったピルと<br/>おすすめの処方方法を表示します。</p>
                  <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-rose-200 transition active:scale-95">
                    診断結果を見る
                  </button>
                  <button 
                    onClick={() => setDiagnosisStep(0)}
                    className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
                  >
                    もう一度やり直す
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- How it Works (New Section) --- */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
           <div className="text-center mb-12">
             <span className="text-rose-500 font-bold text-xs tracking-widest uppercase">EASY STEPS</span>
             <h2 className="text-2xl font-bold text-slate-800 mt-2">オンライン診療の流れ</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-[16%] w-[68%] h-0.5 bg-slate-100 -z-10"></div>
             
             {[
               { title: "スマホで予約・問診", desc: "24時間いつでも予約可能。\n事前の問診でスムーズに。", icon: Smartphone },
               { title: "ビデオ/チャット診療", desc: "スキマ時間に医師と相談。\n顔出しなし対応の病院も。", icon: MessageCircle },
               { title: "ポストにお届け", desc: "最短翌日に到着。\n中身が分からない梱包で安心。", icon: Package }
             ].map((step, i) => (
               <div key={i} className="flex flex-col items-center text-center bg-white p-4">
                 <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-6 relative border-4 border-white shadow-lg shadow-rose-100">
                    <step.icon size={32} />
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-slate-800 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                      {i + 1}
                    </div>
                 </div>
                 <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                 <p className="text-sm text-slate-500 whitespace-pre-line leading-relaxed">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- Online Recommended Section --- */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">おすすめクリニック</h2>
              <p className="text-slate-500 text-sm font-medium">通院不要でポストに届く。編集部が厳選したリスト</p>
            </div>
            {/* Tabs */}
            <div className="flex bg-white p-1.5 rounded-xl overflow-x-auto border border-slate-100 shadow-sm">
              {[
                { id: 'comprehensive', label: '総合おすすめ' },
                { id: 'price', label: '価格重視' },
                { id: 'speed', label: '即日発送' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-rose-500 text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clinic List */}
          <div className="space-y-6">
            {clinics.map((clinic, idx) => (
              <div key={clinic.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 group relative overflow-hidden">
                {/* Campaign Badge */}
                {clinic.campaign && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {clinic.campaign}
                  </div>
                )}
                
                {/* Ranking Badge */}
                <div className="absolute top-0 left-0 bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-br-lg z-10">
                  {idx + 1}位
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mt-2">
                  {/* Image */}
                  <div className={`w-full sm:w-48 h-36 ${clinic.image} rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-50 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                    <div className="text-center z-10">
                      <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-white/60 backdrop-blur flex items-center justify-center shadow-sm">
                        <Heart size={18} className="text-rose-400" />
                      </div>
                      <span className="opacity-70">NO IMAGE</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 pr-16">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-rose-600 transition">{clinic.name}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {clinic.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] sm:text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-y-1 gap-x-4 mb-3">
                        {clinic.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                            <CheckCircle2 size={13} className="text-rose-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-dashed border-slate-100 mt-2">
                      <div>
                        <span className="text-xs text-slate-400 block mb-0.5 font-medium">ピル1シート目安</span>
                        <div className="text-rose-500 font-bold text-2xl tracking-tight leading-none">
                          <span className="text-sm text-slate-500 mr-1.5 font-normal">月額</span>
                          ¥{clinic.price}
                          <span className="text-xs text-slate-500 font-normal ml-1">~</span>
                        </div>
                      </div>
                      <button className="bg-slate-800 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group-hover:shadow-rose-200 group-hover:translate-x-1">
                        公式サイトへ <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
             <button className="text-slate-500 font-bold text-sm border-b border-slate-300 hover:border-slate-800 hover:text-slate-800 pb-1 transition">
               ランキングをもっと見る
             </button>
          </div>
        </div>
      </section>

      {/* --- Area List Section --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Map size={24} className="text-rose-500" />
              都道府県から探す
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              お住まいの地域・職場の近くの婦人科を検索
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaGroups.map((group, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-transparent hover:border-rose-100 hover:bg-rose-50/30 transition-colors">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Navigation size={16} className="text-rose-500" />
                  {group.region}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.prefs.map((pref, i) => (
                    <a 
                      key={i} 
                      href="#" 
                      className="text-sm text-slate-600 hover:text-rose-600 hover:bg-white hover:shadow-sm px-3 py-1.5 rounded-lg transition-all duration-200 bg-white border border-slate-100 font-medium"
                    >
                      {pref}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <ShieldCheck className="text-rose-300" />
                近くに婦人科がない・行く時間がない方へ
              </h3>
              <p className="text-slate-300 text-sm">
                「オンライン診療」なら、待ち時間0分。<br className="md:hidden"/>全国どこからでもスマホで受診可能です。
              </p>
            </div>
            <button className="relative z-10 bg-white text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-rose-50 hover:text-rose-600 transition shadow-lg whitespace-nowrap flex items-center gap-2 active:scale-95">
              オンライン診療特集を見る <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* --- FAQ Section (Accordion) --- */}
      <section className="py-20 bg-rose-50/30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800">よくある質問</h2>
            <p className="text-slate-500 text-sm mt-2">はじめてのピル利用の不安を解消します</p>
          </div>
          
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:border-rose-200 transition-colors">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-slate-800 hover:text-rose-600 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-rose-500 bg-rose-50 w-6 h-6 rounded flex items-center justify-center text-xs">Q</span>
                    {item.q}
                  </span>
                  {openFaqIndex === idx ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-slate-600 leading-relaxed pl-9 border-l-2 border-slate-100">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-24 md:pb-8 text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xl mb-6">
              <div className="bg-rose-500 p-1.5 rounded-lg text-white">
                <Heart size={20} fill="currentColor" />
              </div>
              ピルミライ
            </div>
            <p className="text-xs leading-relaxed mb-6">
              ピルミライは、女性の健康課題を解決するための総合情報ポータルサイトです。<br/>
              信頼できる医療機関の情報と、正しい知識の発信に努めています。
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-800 font-bold mb-6 text-base">コンテンツ</h4>
            <ul className="space-y-3">
              {["ピル基礎知識・効果", "オンライン診療ランキング", "ピルの種類一覧", "ユーザー体験談"].map((link, i) => (
                <li key={i}><a href="#" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12}/> {link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6 text-base">エリア検索</h4>
            <ul className="space-y-3">
              {["東京の婦人科", "大阪の婦人科", "名古屋の婦人科", "全国のオンライン診療"].map((link, i) => (
                 <li key={i}><a href="#" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12}/> {link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6 text-base">サイト情報</h4>
            <ul className="space-y-3">
              {["運営会社", "プライバシーポリシー", "医療広告ガイドライン", "お問い合わせ"].map((link, i) => (
                 <li key={i}><a href="#" className="hover:text-rose-500 transition flex items-center gap-2"><ChevronRight size={12}/> {link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
          &copy; 2025 Pill Mirai. All Rights Reserved.
        </div>
      </footer>

      {/* --- Mobile Bottom Navigation --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-6 py-2 pb-safe">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          <a href="#" className="flex flex-col items-center gap-1 text-rose-500">
            <Home size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-bold">ホーム</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition">
            <Search size={24} />
            <span className="text-[10px] font-bold">検索</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition">
            <MessageCircle size={24} />
            <span className="text-[10px] font-bold">相談</span>
          </a>
          {/* マイページを削除 */}
        </div>
      </div>

    </div>
    </>
  );
}