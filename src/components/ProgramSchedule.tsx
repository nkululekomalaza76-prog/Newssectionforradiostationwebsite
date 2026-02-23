import { useState, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Clock, 
  Calendar, 
  Radio, 
  Music, 
  Mic, 
  Users, 
  Globe,
  Bell,
  PlayCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Program {
  id: number;
  name: string;
  nameSesotho: string;
  host: string;
  hostSesotho: string;
  startTime: string;
  endTime: string;
  description: string;
  descriptionSesotho: string;
  category: 'news' | 'music' | 'talk' | 'traditional' | 'community' | 'weather';
  isLive?: boolean;
  language: 'en' | 'st' | 'both';
  listeners?: number;
}

interface DaySchedule {
  day: string;
  daySesotho: string;
  date: string;
  programs: Program[];
}

const weekSchedule: DaySchedule[] = [
  {
    day: 'Monday',
    daySesotho: 'Mantaha',
    date: '2025-08-19',
    programs: [
      {
        id: 1,
        name: 'Morning Mountain Mist',
        nameSesotho: 'Moholi oa Hosasa',
        host: 'Thabo Mofolo',
        hostSesotho: 'Thabo Mofolo',
        startTime: '06:00',
        endTime: '09:00',
        description: 'Start your day with traditional Sesotho music, weather updates, and community news from across the mountain kingdom.',
        descriptionSesotho: 'Qala letsatsi la hao ka lipina tsa Sesotho tsa setso, tlhahisoleseding ea boemo ba leholimo le litaba tsa sechaba ho tloha mmuso oohle oa lintaba.',
        category: 'traditional',
        isLive: true,
        language: 'both',
        listeners: 1247
      },
      {
        id: 2,
        name: 'Workplace Wednesday',
        nameSesotho: 'Mosebetsi oa Laboraro',
        host: 'Pulane Motaung',
        hostSesotho: 'Pulane Motaung',
        startTime: '09:00',
        endTime: '12:00',
        description: 'Modern hits and workplace discussions to keep you energized through the morning.',
        descriptionSesotho: 'Lipina tsa kajeno le puisano ea mosebetsi ho u boloka u mafolofolo hosasa ho seng.',
        category: 'music',
        language: 'both'
      },
      {
        id: 3,
        name: 'Midday Moments',
        nameSesotho: 'Mehla ea Motshehare',
        host: 'Neo Ramokoena',
        hostSesotho: 'Neo Ramokoena',
        startTime: '12:00',
        endTime: '14:00',
        description: 'Community stories, interviews with local leaders, and traditional wisdom sharing.',
        descriptionSesotho: 'Lipale tsa sechaba, puisano le baetapele ba lehae le kabo ea bohlale ba setso.',
        category: 'community',
        language: 'both'
      },
      {
        id: 4,
        name: 'Afternoon Drive',
        nameSesotho: 'Mofuthu oa Motshehare',
        host: 'Mpho Letsie',
        hostSesotho: 'Mpho Letsie',
        startTime: '14:00',
        endTime: '18:00',
        description: 'High-energy music mix perfect for your afternoon commute and work wind-down.',
        descriptionSesotho: 'Motswako oa lipina tse mafolofolo tse loketseng leeto la hao la motshehare le ho phomola mosebetsing.',
        category: 'music',
        language: 'both'
      },
      {
        id: 5,
        name: 'Evening Reflections',
        nameSesotho: 'Linahano tsa Mantsiboea',
        host: 'Ntate Mokheseng',
        hostSesotho: 'Ntate Mokheseng',
        startTime: '18:00',
        endTime: '21:00',
        description: 'Thoughtful discussions, traditional praise poetry, and peaceful music for evening relaxation.',
        descriptionSesotho: 'Lipuisano tse nahanang, lithoko tsa setso le lipina tse khutsitseng bakeng sa boikhutso ba mantsiboea.',
        category: 'traditional',
        language: 'both'
      },
      {
        id: 6,
        name: 'Night Serenade',
        nameSesotho: 'Pina ea Bosiu',
        host: 'Automated',
        hostSesotho: 'Iketsetsa',
        startTime: '21:00',
        endTime: '06:00',
        description: 'Gentle music and overnight programming for peaceful sleep.',
        descriptionSesotho: 'Lipina tse bonolo le mananeo a bosiu bakeng sa boroko bo khutsitseng.',
        category: 'music',
        language: 'both'
      }
    ]
  }
  // Add more days here - simplified for demo
];

export function ProgramSchedule() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reminders, setReminders] = useState<Set<number>>(new Set());
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const getCurrentProgram = (programs: Program[]) => {
    const now = currentTime.toTimeString().slice(0, 5);
    return programs.find(program => {
      return now >= program.startTime && now < program.endTime;
    });
  };

  const isUpcoming = (program: Program) => {
    const now = currentTime.toTimeString().slice(0, 5);
    const timeDiff = program.startTime.localeCompare(now);
    const endDiff = program.endTime.localeCompare(now);
    return timeDiff > 0 && endDiff > 0;
  };

  const toggleReminder = (programId: number) => {
    setReminders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(programId)) {
        newSet.delete(programId);
      } else {
        newSet.add(programId);
      }
      return newSet;
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news': return <Globe className="w-4 h-4" />;
      case 'music': return <Music className="w-4 h-4" />;
      case 'talk': return <Mic className="w-4 h-4" />;
      case 'traditional': return <Users className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-red-500';
      case 'music': return 'bg-purple-500';
      case 'talk': return 'bg-blue-500';
      case 'traditional': return 'bg-amber-500';
      case 'community': return 'bg-green-500';
      case 'weather': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      en: {
        news: 'News',
        music: 'Music',
        talk: 'Talk Show',
        traditional: 'Traditional',
        community: 'Community',
        weather: 'Weather'
      },
      st: {
        news: 'Litaba',
        music: 'Lipina',
        talk: 'Puisano',
        traditional: 'Setso',
        community: 'Sechaba',
        weather: 'Bozaholo'
      }
    };
    return labels[language][category as keyof typeof labels.en] || category;
  };

  const currentSchedule = weekSchedule[selectedDay];
  const currentProgram = getCurrentProgram(currentSchedule.programs);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Radio className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === 'en' ? 'Program Schedule' : 'Lenane la Mananeo'}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Your daily companion through music, news, and community voices across the Kingdom of Lesotho'
            : 'Moya oa letsatsi la hao ka lipina, litaba le lentsoe la sechaba ho pholletsa le Mmuso oa Lesotho'
          }
        </p>
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setLanguage(language === 'en' ? 'st' : 'en')}
            className="rounded-full"
          >
            {language === 'en' ? 'Sesotho' : 'English'}
          </Button>
        </div>
      </div>

      {/* Current Program Highlight */}
      {currentProgram && (
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <Badge variant="secondary" className="bg-red-500 text-white">
                {language === 'en' ? 'LIVE NOW' : 'HAJOA HONA'}
              </Badge>
              {currentProgram.listeners && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {currentProgram.listeners.toLocaleString()} {language === 'en' ? 'listeners' : 'ba utloang'}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {language === 'en' ? currentProgram.name : currentProgram.nameSesotho}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {language === 'en' ? `Hosted by ${currentProgram.host}` : `E'tsamaisitoeng ke ${currentProgram.hostSesotho}`}
                </p>
                <p className="text-muted-foreground">
                  {language === 'en' ? currentProgram.description : currentProgram.descriptionSesotho}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Clock className="w-5 h-5" />
                  {currentProgram.startTime} - {currentProgram.endTime}
                </div>
                <Badge className={`${getCategoryColor(currentProgram.category)} text-white w-fit`}>
                  {getCategoryIcon(currentProgram.category)}
                  <span className="ml-2">{getCategoryLabel(currentProgram.category)}</span>
                </Badge>
                <Button className="w-full">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Listen Live' : 'Utloa Hajoa'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" size="sm">
          <ChevronLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Previous Day' : 'Letsatsi le Fetileng'}
        </Button>
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground">
            {language === 'en' ? currentSchedule.day : currentSchedule.daySesotho}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(currentSchedule.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <Button variant="outline" size="sm">
          {language === 'en' ? 'Next Day' : 'Letsatsi le Latelang'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Program Schedule Grid */}
      <div className="space-y-4">
        {currentSchedule.programs.map((program, index) => {
          const isLive = program.isLive;
          const upcoming = isUpcoming(program);
          const hasReminder = reminders.has(program.id);

          return (
            <Card 
              key={program.id} 
              className={`group hover:shadow-md transition-all duration-300 ${
                isLive ? 'border-primary bg-primary/5' : 
                upcoming ? 'border-amber-200 bg-amber-50/50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Time */}
                  <div className="flex-shrink-0 text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {program.startTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {program.endTime}
                    </div>
                    {isLive && (
                      <Badge variant="secondary" className="bg-red-500 text-white text-xs mt-1">
                        LIVE
                      </Badge>
                    )}
                  </div>

                  {/* Program Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {language === 'en' ? program.name : program.nameSesotho}
                        </h4>
                        <p className="text-sm text-primary">
                          {language === 'en' ? program.host : program.hostSesotho}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getCategoryColor(program.category)} text-white`}>
                          {getCategoryIcon(program.category)}
                          <span className="ml-1">{getCategoryLabel(program.category)}</span>
                        </Badge>
                        {program.language !== 'both' && (
                          <Badge variant="outline" className="text-xs">
                            {program.language === 'en' ? 'English' : 'Sesotho'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {language === 'en' ? program.description : program.descriptionSesotho}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isLive ? (
                          <Button size="sm">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'Listen Now' : 'Utloa Hona'}
                          </Button>
                        ) : upcoming ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleReminder(program.id)}
                            className={hasReminder ? 'bg-amber-50 border-amber-300' : ''}
                          >
                            <Bell className={`w-4 h-4 mr-2 ${hasReminder ? 'text-amber-600' : ''}`} />
                            {hasReminder 
                              ? (language === 'en' ? 'Reminder Set' : 'Sekopano se Behiloe')
                              : (language === 'en' ? 'Set Reminder' : 'Beha Sekopano')
                            }
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" disabled>
                            {language === 'en' ? 'Ended' : 'E Felletse'}
                          </Button>
                        )}
                      </div>
                      {program.listeners && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {program.listeners.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {language === 'en' ? 'Full Weekly Schedule' : 'Lenane la Beke Kaofela'}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {language === 'en' 
                ? 'View the complete weekly programming schedule'
                : 'Sheba lenane le feletseng la mananeo a beke'
              }
            </p>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'View Schedule' : 'Sheba Lenane'}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Mic className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {language === 'en' ? 'Program Podcast' : 'Mananeo a Podcast'}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {language === 'en' 
                ? 'Listen to missed programs anytime'
                : 'Utloa mananeo a u sa a utluang nako efe kapa efe'
              }
            </p>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'Browse Podcasts' : 'Sheba li-Podcast'}
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Bell className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              {language === 'en' ? 'Program Alerts' : 'Litsebiso tsa Mananeo'}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {language === 'en' 
                ? 'Get notified about your favorite shows'
                : 'Fumana litsebiso mabapi le mananeo a u a ratang'
              }
            </p>
            <Button variant="outline" className="w-full">
              {language === 'en' ? 'Manage Alerts' : 'Laola Litsebiso'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}