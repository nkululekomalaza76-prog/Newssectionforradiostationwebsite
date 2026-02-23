import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock, Share2, Facebook, Twitter, MessageCircle, Mountain, Users, Globe } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  titleSesotho?: string;
  excerpt: string;
  excerptSesotho?: string;
  image: string;
  category: 'Local' | 'Political' | 'Sports' | 'Culture' | 'Business' | 'Weather';
  date: string;
  readTime: string;
  featured?: boolean;
  location?: string;
  author?: string;
}

const mockNewsData: NewsArticle[] = [
  {
    id: 1,
    title: "Mountain Shepherds Report Early Snow in Mokhotlong",
    titleSesotho: "Balisa ba Lintaba ba Tlaleha Lehloa le Tsoang Pele Mokhotlong",
    excerpt: "Traditional herders in the high mountain regions of Mokhotlong district have reported the earliest snowfall in over a decade, prompting concerns about livestock safety and winter preparations.",
    excerptSesotho: "Balisa ba setso mafuteng a lintaba tse phahameng a setereke sa Mokhotlong ba tlaletse ka lehloa le tsoang pele ho feta lilemo tse leshome, se bakang matšoenyeho ka polokeho ea liphoofolo le litokisetso tsa mariha.",
    image: "https://images.unsplash.com/photo-1682270828041-37751474a2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXNvdGhvJTIwc2hlcGhlcmQlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU1NTg5NDMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Weather",
    date: "2025-08-15",
    readTime: "4 min read",
    featured: true,
    location: "Mokhotlong",
    author: "Thabo Molapo"
  },
  {
    id: 2,
    title: "King Letsie III Opens New University Campus in Maseru",
    titleSesotho: "Morena Letsie III o Bula Kampase e Ncha ea Univesithi Maseru",
    excerpt: "His Majesty King Letsie III officially inaugurated the new science and technology campus of the National University of Lesotho, emphasizing the importance of education in national development.",
    excerptSesotho: "Morena Letsie III o bule ka mokhoa o motle kampase e ncha ea mahlale le theknoloji ea Univesithi ea Naha ea Lesotho, a hatisa bohlokoa ba thuto ntlafatsong ea naha.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
    category: "Political",
    date: "2025-08-14",
    readTime: "6 min read",
    featured: true,
    location: "Maseru",
    author: "Lineo Sekepe"
  },
  {
    id: 3,
    title: "Morija Festival Celebrates 150 Years of Cultural Heritage",
    titleSesotho: "Mokete oa Morija o Keteka Lilemo tse 150 tsa Khaohelo ea Setso",
    excerpt: "The historic Morija Arts and Cultural Festival marks its 150th anniversary with performances from across Southern Africa, showcasing traditional music, dance, and storytelling.",
    excerptSesotho: "Mokete oa bohale oa Bonono le Setso oa Morija o keteka selemo sa 150 ka lipapiso ho tloha Afrika Boroa kaofela, o bontša lipina tsa setso, metlae le ho pheta lipale.",
    image: "https://images.unsplash.com/photo-1751708692623-44fe44b6bcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBkYW5jZXxlbnwxfHx8fDE3NTU1ODkyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Culture",
    date: "2025-08-13",
    readTime: "5 min read",
    featured: true,
    location: "Morija",
    author: "Mpho Mthembu"
  },
  {
    id: 4,
    title: "Traditional Village Banking Helps Rural Communities Thrive",
    titleSesotho: "Banka ea Motse ea Setso e Thusa Mechaba ea Mahaeng ho Atlega",
    excerpt: "A traditional rotating credit system called 'ho-kotana' is being modernized with mobile banking technology, helping rural communities access financial services in remote mountain areas.",
    excerptSesotho: "Mokho oa setso oa ho tsamaisana ka chelete o bitsoang 'ho-kotana' o ntlafatsoa ka theknoloji ea banka ea mohala, ho thusa mechaba ea mahaeng ho fumana litšebeletso tsa lichelete mafuteng a hole a lintaba.",
    image: "https://images.unsplash.com/photo-1662281208885-15822c6fd794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXNvdGhvJTIwdHJhZGl0aW9uYWwlMjBodXRzJTIwdmlsbGFnZXxlbnwxfHx8fDE3NTU1ODk0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Business",
    date: "2025-08-12",
    readTime: "3 min read",
    location: "Thaba-Tseka",
    author: "Matiisetso Mohapi"
  },
  {
    id: 5,
    title: "Parliament Debates New Mountain Conservation Laws",
    titleSesotho: "Parliament e Buisana ka Melao e Mecha ea Paballo ea Lintaba",
    excerpt: "Members of Parliament are discussing comprehensive legislation to protect Lesotho's fragile mountain ecosystems while supporting traditional grazing practices of local communities.",
    excerptSesotho: "Litho tsa Parliament li buisana ka molao o pharaletseng oa ho sireletsa tikoloho e bonolo ea lintaba tsa Lesotho ha li ntse li tšehetsa mekho ea setso ea ho lisa ha mechaba ea lehae.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=300&fit=crop",
    category: "Political",
    date: "2025-08-11",
    readTime: "7 min read",
    location: "Maseru",
    author: "Tšepo Ramahloko"
  },
  {
    id: 6,
    title: "Young Basotho Athletes Excel at Commonwealth Games",
    titleSesotho: "Bapapali ba Bacha ba Basotho ba Phahama Papaling ea Commonwealth",
    excerpt: "Lesotho's rising stars in athletics are making their mark on the international stage, with three medals secured at the junior Commonwealth Games held in Australia.",
    excerptSesotho: "Naleli tse nyolohelang tsa Lesotho papalong li etsa sesupo sa bona bohareng ba machabeng, ka metlaku e meraro e jajuoeng Papaling ea Commonwealth ea bacha e neng e tšoaroloa Australia.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=300&fit=crop",
    category: "Sports",
    date: "2025-08-10",
    readTime: "4 min read",
    location: "Perth, Australia",
    author: "Bokang Ntsane"
  },
  {
    id: 7,
    title: "Solar Power Initiative Lights Up Remote Mountain Villages",
    titleSesotho: "Morero oa Matla a Letsatsi o Khanyang Metsana e Hole ea Lintaba",
    excerpt: "A new solar energy project brings electricity to 15 remote villages in the Maluti Mountains, transforming daily life and enabling children to study after dark.",
    excerptSesotho: "Morero o mocha oa matla a letsatsi o tlisa motlakase metseng e 15 e hole Lintabeng tsa Maluti, o fetola bophelo ba letsatsi le letsatsi mme a lumella bana ho ithuta ha ho fifi.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop",
    category: "Local",
    date: "2025-08-09",
    readTime: "5 min read",
    location: "Butha-Buthe",
    author: "Mamello Letsie"
  },
  {
    id: 8,
    title: "Traditional Healers Conference Preserves Ancient Knowledge",
    titleSesotho: "Kopano ea Bongaka ba Setso e Boloka Tsebo ea Boholo-holo",
    excerpt: "Traditional healers from across Lesotho gather to document medicinal plant knowledge and discuss sustainable harvesting practices in changing mountain ecosystems.",
    excerptSesotho: "Bongaka ba setso ho tloha Lesotho kaofela ba kopane ho ngola tsebo ea limela tsa bongaka le ho buisana ka mekho ea kotulo e tsitsitseng tikolohong e fetohang ea lintaba.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop",
    category: "Culture",
    date: "2025-08-08",
    readTime: "6 min read",
    location: "Qacha's Nek",
    author: "Ntate Mofokeng"
  }
];

export function NewsSection() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Local' | 'Political' | 'Sports' | 'Culture' | 'Business' | 'Weather'>('All');
  const { language, setLanguage } = useLanguage();

  const featuredNews = mockNewsData.filter(article => article.featured);
  const regularNews = mockNewsData.filter(article => !article.featured);
  
  const filteredNews = activeFilter === 'All' 
    ? regularNews 
    : regularNews.filter(article => article.category === activeFilter);

  const categories = ['All', 'Local', 'Political', 'Sports', 'Culture', 'Business', 'Weather'] as const;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleShare = (article: NewsArticle, platform: string) => {
    const url = encodeURIComponent(window.location.href + '/article/' + article.id);
    const text = encodeURIComponent(language === 'en' ? article.title : (article.titleSesotho || article.title));
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Local': return 'bg-green-600';
      case 'Political': return 'bg-blue-600';
      case 'Sports': return 'bg-orange-600';
      case 'Culture': return 'bg-purple-600';
      case 'Business': return 'bg-teal-600';
      case 'Weather': return 'bg-cyan-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      en: {
        Local: 'Local',
        Political: 'Political',
        Sports: 'Sports',
        Culture: 'Culture',
        Business: 'Business',
        Weather: 'Weather'
      },
      st: {
        Local: 'Lehae',
        Political: 'Lipolotiki',
        Sports: 'Lipapali',
        Culture: 'Setso',
        Business: 'Khoebo',
        Weather: 'Bozaholo'
      }
    };
    return labels[language][category as keyof typeof labels.en] || category;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mountain className="w-8 h-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {language === 'en' ? 'News from the Mountain Kingdom' : 'Litaba ho tloha Musong oa Lintaba'}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Stay informed with authentic news from across Lesotho - from bustling Maseru to remote mountain villages'
            : 'Lula u tseba litaba tsa nnete ho tloha Lesotho kaofela - ho tloha Maseru e matla ho ea metseng e hole ea lintaba'
          }
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setLanguage(language === 'en' ? 'st' : 'en')}
            className="rounded-full"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Sesotho' : 'English'}
          </Button>
        </div>
      </div>

      {/* Traditional Border */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-600 via-white via-green-600 via-white to-yellow-600 rounded-full mb-12 opacity-60"></div>

      {/* Featured News Carousel */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          {language === 'en' ? 'Featured Stories' : 'Lipale tse Kgethileng'}
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredNews.map((article) => (
              <CarouselItem key={article.id}>
                <Card className="relative overflow-hidden group cursor-pointer">
                  <div className="relative h-[400px] md:h-[500px]">
                    <ImageWithFallback
                      src={article.image}
                      alt={language === 'en' ? article.title : (article.titleSesotho || article.title)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge 
                      className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white`}
                    >
                      {getCategoryLabel(article.category)}
                    </Badge>
                    {article.location && (
                      <Badge 
                        variant="outline"
                        className="absolute top-4 right-4 bg-white/90 text-slate-800 border-white/50"
                      >
                        {article.location}
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-4 text-sm mb-3 opacity-90">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {article.author}
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                        {language === 'en' ? article.title : (article.titleSesotho || article.title)}
                      </h3>
                      <p className="text-base md:text-lg opacity-90 mb-4 line-clamp-2">
                        {language === 'en' ? article.excerpt : (article.excerptSesotho || article.excerpt)}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
                          {language === 'en' ? 'Read More' : 'Bala Haholoanyane'}
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(article, 'facebook');
                            }}
                          >
                            <Facebook className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(article, 'twitter');
                            }}
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(article, 'whatsapp');
                            }}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Category Filters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">
            {language === 'en' ? 'Latest News' : 'Litaba tsa Morao-rao'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="rounded-full"
              >
                {language === 'en' ? category : getCategoryLabel(category)}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Card 
              key={article.id} 
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4"
              style={{borderLeftColor: getCategoryColor(article.category).includes('bg-green') ? '#059669' : 
                     getCategoryColor(article.category).includes('bg-blue') ? '#2563eb' :
                     getCategoryColor(article.category).includes('bg-orange') ? '#ea580c' :
                     getCategoryColor(article.category).includes('bg-purple') ? '#9333ea' :
                     getCategoryColor(article.category).includes('bg-teal') ? '#0d9488' :
                     getCategoryColor(article.category).includes('bg-cyan') ? '#0891b2' : '#4b5563'}}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={language === 'en' ? article.title : (article.titleSesotho || article.title)}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge 
                  className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white`}
                >
                  {getCategoryLabel(article.category)}
                </Badge>
                {article.location && (
                  <Badge 
                    variant="outline"
                    className="absolute top-3 right-3 bg-white/90 text-slate-800 border-white/50 text-xs"
                  >
                    {article.location}
                  </Badge>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(article, 'facebook');
                      }}
                    >
                      <Facebook className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(article, 'twitter');
                      }}
                    >
                      <Twitter className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(article, 'whatsapp');
                      }}
                    >
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {language === 'en' ? article.title : (article.titleSesotho || article.title)}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {language === 'en' ? article.excerpt : (article.excerptSesotho || article.excerpt)}
                </p>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {language === 'en' ? 'Read More' : 'Bala Haholoanyane'}
                  </Button>
                  {article.author && (
                    <span className="text-xs text-muted-foreground">
                      {article.author}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'en' 
                ? `No articles found in the ${activeFilter} category.`
                : `Ha ho na lipale tse fumanoang karolong ea ${getCategoryLabel(activeFilter)}.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}