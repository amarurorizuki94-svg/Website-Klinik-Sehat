import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Share2, 
  X, 
  ArrowRight, 
  Eye, 
  Sparkles,
  Tag
} from 'lucide-react';
import { HealthArticle } from '../types/clinic';

interface ArticlesSectionProps {
  articles: HealthArticle[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<HealthArticle | null>(null);

  const categories = ['Semua', 'Ibu & Anak', 'Gigi & Mulut', 'Tips Kesehatan', 'Gizi & Nutrisi'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="artikel" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Edukasi & Informasi Medis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Artikel & Tips Kesehatan Terpercaya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Dapatkan wawasan medis langsung yang ditulis dan ditinjau oleh tim dokter ahli Klinik Medika Harmony.
          </p>

          {/* Search Bar & Category Chips */}
          <div className="pt-4 space-y-3 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Cari kata kunci artikel (misal: imunisasi, gizi, gigi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-2xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs">
                    {article.category}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 
                    onClick={() => setActiveArticleModal(article)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition cursor-pointer line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read Action */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-3 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={article.authorAvatar}
                    alt={article.authorName}
                    className="w-8 h-8 rounded-full object-cover object-top border border-emerald-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{article.authorName}</div>
                    <div className="text-[10px] text-slate-500">{article.authorRole}</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticleModal(article)}
                  className="text-emerald-700 hover:text-emerald-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Baca</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-auto animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {activeArticleModal.category}
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-2 mb-3 leading-snug">
              {activeArticleModal.title}
            </h2>

            {/* Author Meta Bar */}
            <div className="flex items-center justify-between border-y border-slate-100 py-3 my-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={activeArticleModal.authorAvatar}
                  alt={activeArticleModal.authorName}
                  className="w-10 h-10 rounded-full object-cover object-top border"
                />
                <div>
                  <div className="font-bold text-slate-900">{activeArticleModal.authorName}</div>
                  <div className="text-[10px] text-emerald-700 font-medium">{activeArticleModal.authorRole}</div>
                </div>
              </div>

              <div className="text-right text-slate-500 text-[11px]">
                <div>{activeArticleModal.date}</div>
                <div>{activeArticleModal.readTime}</div>
              </div>
            </div>

            {/* Featured Image */}
            <img
              src={activeArticleModal.imageUrl}
              alt={activeArticleModal.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm"
            />

            {/* Content Body */}
            <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-6">
              {activeArticleModal.content}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 mb-6">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {activeArticleModal.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-xs cursor-pointer"
              >
                Tutup Artikel
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: activeArticleModal.title,
                      text: activeArticleModal.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    alert('Link artikel tersalin!');
                  }
                }}
                className="bg-blue-900 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Artikel</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
