import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Globe, 
  Cloud, 
  Sun, 
  CloudRain,
  Wind,
  Thermometer,
  Radio,
  Users,
  Calendar,
  ChevronDown,
  Check
} from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  description: string;
}

interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  description: string;
}

export function RadioHeader() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentProgram, setCurrentProgram] = useState("Mokorotlo Morning Show");
  const [currentStation, setCurrentStation] = useState<string>('main');
  const [weather, setWeather] = useState<WeatherData>({
    location: 'Maseru',
    temperature: 18,
    condition: 'sunny',
    description: 'Clear mountain air'
  });

  const radioStations: RadioStation[] = [
    {
      id: 'main',
      name: language === 'en' ? 'Radio Lesotho' : 'Leselinyana la Basotho',
      frequency: '103.5 FM',
      description: language === 'en' ? 'Main Station' : 'Seteishene sa Mantlha'
    },
    {
      id: 'news',
      name: language === 'en' ? 'Radio Lesotho News' : 'Litaba tsa Lesotho',
      frequency: '96.3 FM',
      description: language === 'en' ? 'News & Current Affairs' : 'Litaba tsa Hajoa'
    },
    {
      id: 'traditional',
      name: language === 'en' ? 'Traditional Music' : 'Lipina tsa Setso',
      frequency: '99.1 FM',
      description: language === 'en' ? 'Traditional Basotho Music' : 'Lipina tsa Sesotho'
    },
    {
      id: 'youth',
      name: language === 'en' ? 'Youth Voice' : 'Lentsoe la Bacha',
      frequency: '101.7 FM',
      description: language === 'en' ? 'Youth & Culture' : 'Bacha le Setso'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLanguageChange = (newLanguage: 'en' | 'st') => {
    setLanguage(newLanguage);
  };

  const handleStationChange = (stationId: string) => {
    setCurrentStation(stationId);
    setIsPlaying(false); // Reset playing state when changing station
  };

  const getSelectedStation = () => {
    return radioStations.find(s => s.id === currentStation) || radioStations[0];
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'windy': return <Wind className="w-4 h-4 text-gray-400" />;
      default: return <Sun className="w-4 h-4 text-yellow-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const translations = {
    en: {
      liveNow: 'Live Now',
      weather: 'Weather',
      listeners: 'Listeners',
      onAir: 'On Air'
    },
    st: {
      liveNow: 'Hajoa Hona',
      weather: 'Bozahole',
      listeners: 'Mamelo',
      onAir: 'Mohlahleng'
    }
  };

  const t = translations[language];

  return (
    <div className="relative">
      {/* Mountain Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1566840021288-88c4f8877b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXNvdGhvJTIwbW91bnRhaW5zJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTU4OTE1OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Lesotho Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/45 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-green-900/40" />
      </div>

      {/* Header Content */}
      <header className="relative z-10 border-b border-white/20 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Navigation Bar - Simplified */}
          <div className="flex items-center justify-between mb-6">
            {/* Logo & Branding */}
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {getSelectedStation().name}
                </h1>
                <p className="text-xs text-white/70">
                  {getSelectedStation().frequency}
                </p>
              </div>
            </div>

            {/* Simple Navigation Controls */}
            <div className="flex items-center gap-2">
              {/* Channels Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <Radio className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Channels' : 'Liseteishene'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-md shadow-2xl border-blue-200">
                  <DropdownMenuLabel>
                    {language === 'en' ? 'Radio Channels' : 'Liseteishene tsa Leselinyana'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {radioStations.map((station) => (
                    <DropdownMenuItem 
                      key={station.id}
                      onClick={() => handleStationChange(station.id)}
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">{station.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {station.frequency} • {station.description}
                          </span>
                        </div>
                        {currentStation === station.id && <Check className="w-4 h-4 ml-2 flex-shrink-0 text-blue-600" />}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLanguageChange(language === 'en' ? 'st' : 'en')}
                className="text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'en' ? 'ST' : 'EN'}
              </Button>
            </div>
          </div>

          {/* Live Radio Player & Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Live Radio Player */}
            <Card className="lg:col-span-2 bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <Badge variant="secondary" className="bg-red-500 text-white shadow-lg shadow-red-500/50">
                        {t.liveNow}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-semibold">1,247 {t.listeners}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {currentProgram}
                  </h3>
                  <p className="text-sm text-white/80">
                    {language === 'en' 
                      ? 'Traditional music and community stories from across the mountain kingdom'
                      : 'Lipina tsa setso le litaba tsa sechaba ho tsoa naheng eohle ea lintabeng'
                    }
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-400 to-green-400 h-full rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {getWeatherIcon(weather.condition)}
                  <h3 className="font-semibold text-white">{t.weather}</h3>
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="w-4 h-4" />
                    <span className="text-2xl font-bold">{weather.temperature}°C</span>
                  </div>
                  <p className="text-sm text-white/80 mb-1">{weather.location}</p>
                  <p className="text-xs text-white/70">{weather.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Now Playing */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-white" />
                  <h3 className="font-semibold text-white">{t.onAir}</h3>
                </div>
                <div className="text-white">
                  <p className="font-medium mb-1">Mokorotlo Morning</p>
                  <p className="text-sm text-white/80 mb-2">06:00 - 10:00</p>
                  <p className="text-xs text-white/70">
                    {language === 'en' 
                      ? 'Next: Sesotho Stories at 10:00'
                      : 'Se latelang: Lipale tsa Sesotho ka 10:00'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>
    </div>
  );
}
