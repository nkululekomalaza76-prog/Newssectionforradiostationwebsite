import { useState, useEffect } from 'react';
import { Badge } from "./ui/badge";
import { AlertTriangle, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BreakingNews {
  id: number;
  title: string;
  titleSesotho: string;
  timestamp: string;
  priority: 'urgent' | 'important' | 'normal';
}

const breakingNewsItems: BreakingNews[] = [
  {
    id: 1,
    title: "Weather Alert: Snow expected in highlands tonight",
    titleSesotho: "Temoso ea Boemo ba Leholimo: Lehloa le lebelletsoeng lintabeng kajeno bosiu",
    timestamp: "2025-08-19T14:30:00Z",
    priority: "urgent"
  },
  {
    id: 2,
    title: "Parliament session extended to discuss education budget",
    titleSesotho: "Kopano ea Parliament e atolositsoe ho buisana ka tekanyetso ea thuto",
    timestamp: "2025-08-19T13:15:00Z",
    priority: "important"
  },
  {
    id: 3,
    title: "Maseru Festival preparations underway this weekend",
    titleSesotho: "Litokisetso tsa Mokete oa Maseru li tsoela pele mafelemapelung",
    timestamp: "2025-08-19T11:45:00Z",
    priority: "normal"
  }
];

export function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNewsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentNews = breakingNewsItems[currentIndex];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'important':
        return <Zap className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-600 text-white';
      case 'important':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return language === 'en' ? `${diffInMinutes}m ago` : `${diffInMinutes}m tse fetileng`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return language === 'en' ? `${hours}h ago` : `${hours}h tse fetileng`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return language === 'en' ? `${days}d ago` : `${days}d tse fetileng`;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'st' : 'en');
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white overflow-hidden shadow-lg">
      <div className="flex items-center py-2.5 px-4">
        <div className="flex items-center gap-2 flex-shrink-0 mr-4 animate-pulse">
          <Badge className={getPriorityColor(currentNews.priority)}>
            {getPriorityIcon(currentNews.priority)}
            <span className="ml-1 font-bold">
              {language === 'en' ? 'BREAKING' : 'LITABA TSE CHA'}
            </span>
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0 overflow-hidden">
          <div 
            className="whitespace-nowrap animate-marquee"
          >
            <span className="text-lg font-medium">
              {language === 'en' ? currentNews.title : currentNews.titleSesotho}
            </span>
            <span className="mx-4 text-white/70">•</span>
            <span className="text-sm text-white/80">
              {timeAgo(currentNews.timestamp)}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 ml-4">
          <button
            onClick={toggleLanguage}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 font-semibold"
          >
            {language === 'en' ? 'ST' : 'EN'}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}