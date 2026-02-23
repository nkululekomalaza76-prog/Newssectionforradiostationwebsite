import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Pause, 
  Music, 
  Heart, 
  Download,
  Volume2,
  SkipForward,
  SkipBack,
  Calendar,
  Clock,
  Headphones
} from 'lucide-react';

import { useLanguage } from './context/LanguageContext';

interface TraditionalSong {
  id: number;
  title: string;
  titleSesotho: string;
  artist: string;
  category: 'traditional' | 'modern-fusion' | 'ceremonial' | 'storytelling';
  duration: string;
  description: string;
  descriptionSesotho: string;
  image: string;
  isPlaying?: boolean;
  likes: number;
  downloads: number;
  event?: string;
}

interface CulturalEvent {
  id: number;
  name: string;
  nameSesotho: string;
  date: string;
  description: string;
  descriptionSesotho: string;
  image: string;
  type: 'festival' | 'ceremony' | 'competition';
}

const traditionalSongs: TraditionalSong[] = [
  {
    id: 1,
    title: "Mokorotlo ea Lesotho",
    titleSesotho: "Mokorotlo ea Lesotho",
    artist: "Mahlathini le Mahotella",
    category: "traditional",
    duration: "4:23",
    description: "A traditional song celebrating the Basotho hat and national identity",
    descriptionSesotho: "Pina ea setso e ketekang mokorotlo le boitsebiso ba naha",
    image: "https://images.unsplash.com/photo-1692303365672-3f04586f5deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGFmcmljYW4lMjBtdXNpYyUyMGluc3RydW1lbnRzfGVufDF8fHx8MTc1NTU4OTI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 324,
    downloads: 89,
    event: "Independence Day"
  },
  {
    id: 2,
    title: "Leseli la Maheng",
    titleSesotho: "Leseli la Maheng",
    artist: "Puseletso Seema",
    category: "storytelling",
    duration: "6:12",
    description: "Mountain stories told through song and traditional instruments",
    descriptionSesotho: "Lipale tsa lintaba tse phethehileng ka pina le likhoele tsa setso",
    image: "https://images.unsplash.com/photo-1751708692623-44fe44b6bcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBkYW5jZXxlbnwxfHx8fDE3NTU1ODkyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 156,
    downloads: 43,
    event: "Morija Arts Festival"
  },
  {
    id: 3,
    title: "Litokolosi tsa Booa",
    titleSesotho: "Litokolosi tsa Booa",
    artist: "Mpho Mohapi",
    category: "ceremonial",
    duration: "5:45",
    description: "Ceremonial songs for the autumn harvest celebrations",
    descriptionSesotho: "Lipina tsa mokete oa kotulo ea lijalo ka lekhomo",
    image: "https://images.unsplash.com/photo-1692303365672-3f04586f5deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGFmcmljYW4lMjBtdXNpYyUyMGluc3RydW1lbnRzfGVufDF8fHx8MTc1NTU4OTI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 89,
    downloads: 22,
    event: "Harvest Festival"
  },
  {
    id: 4,
    title: "Morena Moshoeshoe",
    titleSesotho: "Morena Moshoeshoe",
    artist: "Tau ea Matseko",
    category: "traditional",
    duration: "7:18",
    description: "Epic praise song honoring King Moshoeshoe I, founder of Lesotho",
    descriptionSesotho: "Lithoko tsa khosi Moshoeshoe I, mo-thei-morena oa Lesotho",
    image: "https://images.unsplash.com/photo-1751708692623-44fe44b6bcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBkYW5jZXxlbnwxfHx8fDE3NTU1ODkyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 445,
    downloads: 127,
    event: "Moshoeshoe Day"
  }
];

const culturalEvents: CulturalEvent[] = [
  {
    id: 1,
    name: "Morija Arts & Cultural Festival",
    nameSesotho: "Mokete oa Bonono le Setso sa Morija",
    date: "2025-09-15",
    description: "Annual celebration of Basotho arts, crafts, and traditional music",
    descriptionSesotho: "Mokete oa selemo le selemo oa bonono, mesebetsi ea matsoho le lipina tsa setso",
    image: "https://images.unsplash.com/photo-1751708692623-44fe44b6bcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBkYW5jZXxlbnwxfHx8fDE3NTU1ODkyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "festival"
  },
  {
    id: 2,
    name: "Blanket Festival",
    nameSesotho: "Mokete oa Kobo",
    date: "2025-10-04",
    description: "Celebrating the iconic Basotho blanket and mountain heritage",
    descriptionSesotho: "Ho keteka kobo ea setso ea Basotho le khaohelo ea lintaba",
    image: "https://images.unsplash.com/photo-1733472107207-547dc85e1d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNvdGhvJTIwYmxhbmtldCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NTU4OTE2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    type: "festival"
  }
];

export function TraditionalMusic() {
  const { language, setLanguage } = useLanguage();
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set());

  const togglePlay = (songId: number) => {
    setCurrentPlaying(currentPlaying === songId ? null : songId);
  };

  const toggleLike = (songId: number) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'traditional': return 'bg-amber-500';
      case 'modern-fusion': return 'bg-purple-500';
      case 'ceremonial': return 'bg-green-500';
      case 'storytelling': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      en: {
        traditional: 'Traditional',
        'modern-fusion': 'Modern Fusion',
        ceremonial: 'Ceremonial',
        storytelling: 'Storytelling'
      },
      st: {
        traditional: 'Setso',
        'modern-fusion': 'Kopanelo ea Kajeno',
        ceremonial: 'Mokete',
        storytelling: 'Lipale'
      }
    };
    return labels[language][category as keyof typeof labels.en] || category;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-amber-50 to-green-50 dark:from-amber-950/20 dark:to-green-950/20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === 'en' ? 'Traditional Music & Culture' : 'Lipina tsa Setso le Moetlo'}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Discover the rich musical heritage of the Basotho people - from ancient praise songs to contemporary interpretations'
            : 'Sibolla khaohelo e ruileng ea lipina tsa Basotho - ho tloha lithokon tsa kgale ho ea ho tlhalosoong ea kajeno'
          }
        </p>
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setLanguage(language === 'en' ? 'st' : 'en')}
            className="rounded-full border-amber-200 hover:bg-amber-50"
          >
            {language === 'en' ? 'Sesotho' : 'English'}
          </Button>
        </div>
      </div>

      {/* Traditional Pattern Border */}
      <div className="w-full h-4 bg-gradient-to-r from-blue-600 via-white via-green-600 via-white to-yellow-600 rounded-lg mb-12 shadow-sm"></div>

      {/* Featured Songs */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
          <Headphones className="w-6 h-6 text-amber-600" />
          {language === 'en' ? 'Featured Traditional Songs' : 'Lipina tsa Setso tse Kgethileng'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traditionalSongs.map((song) => (
            <Card key={song.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Album Art / Image */}
                  <div className="relative flex-shrink-0">
                    <ImageWithFallback
                      src={song.image}
                      alt={song.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => togglePlay(song.id)}
                    >
                      {currentPlaying === song.id ? 
                        <Pause className="w-4 h-4" /> : 
                        <Play className="w-4 h-4" />
                      }
                    </Button>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground truncate">
                          {language === 'en' ? song.title : song.titleSesotho}
                        </h4>
                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                      </div>
                      <Badge className={`${getCategoryColor(song.category)} text-white text-xs`}>
                        {getCategoryLabel(song.category)}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {language === 'en' ? song.description : song.descriptionSesotho}
                    </p>

                    {song.event && (
                      <div className="flex items-center gap-1 text-xs text-amber-600 mb-3">
                        <Calendar className="w-3 h-3" />
                        {language === 'en' ? `Featured in: ${song.event}` : `E bonts'itsoe ho: ${song.event}`}
                      </div>
                    )}

                    {/* Audio Player */}
                    {currentPlaying === song.id && (
                      <div className="mb-3 p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm">
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => togglePlay(song.id)}>
                            <Pause className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <SkipForward className="w-4 h-4" />
                          </Button>
                          <div className="flex-1 bg-amber-200 rounded-full h-2">
                            <div className="bg-amber-600 h-full rounded-full w-1/3 transition-all duration-1000"></div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {song.duration}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(song.id)}
                          className={`gap-1 ${likedSongs.has(song.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                        >
                          <Heart className={`w-4 h-4 ${likedSongs.has(song.id) ? 'fill-current' : ''}`} />
                          {song.likes + (likedSongs.has(song.id) ? 1 : 0)}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                          <Download className="w-4 h-4" />
                          {song.downloads}
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">
                        {language === 'en' ? 'Play Full' : 'Bapala Kaofela'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cultural Events */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-green-600" />
          {language === 'en' ? 'Upcoming Cultural Events' : 'Mekete ea Setso e Tlang'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {culturalEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                  {event.type}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-bold text-lg mb-1">
                    {language === 'en' ? event.name : event.nameSesotho}
                  </h4>
                  <p className="text-sm opacity-90">
                    {new Date(event.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {language === 'en' ? event.description : event.descriptionSesotho}
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {language === 'en' ? 'Learn More' : 'Ithute Haholoanyane'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-amber-600 to-green-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Preserve Our Musical Heritage' : 'Boloka Lefa la Lipina tsa Rona'}
          </h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            {language === 'en' 
              ? 'Help us document and share the traditional songs of Lesotho. Submit recordings, stories, or information about our musical heritage.'
              : 'Re thuse ho ngola le ho abelana lipina tsa setso tsa Lesotho. Romelisang lihatiso, lipale kapa tlhahisoleseding mabapi le lefa la lipina tsa rona.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" className="bg-white text-amber-600 hover:bg-gray-100">
              {language === 'en' ? 'Submit a Song' : 'Romelisetsa Pina'}
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              {language === 'en' ? 'Learn More' : 'Ithute Haholoanyane'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}