import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote, Play, Heart, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CommunityStory {
  id: number;
  name: string;
  location: string;
  story: string;
  storySessionotho?: string;
  avatar: string;
  category: 'tradition' | 'community' | 'personal';
  audioUrl?: string;
  likes: number;
  hasAudio: boolean;
}

const communityStories: CommunityStory[] = [
  {
    id: 1,
    name: "Ntate Moleleki",
    location: "Ha Abia, Maseru",
    story: "Radio Lesotho has been the voice of our community for generations. Every morning, I listen to the traditional songs that remind me of my childhood in the mountains.",
    storySessionotho: "Radio Lesotho e bile lentsoe la sechaba sa rona melokong e mengata. Hosasa le hosasa, ke utloa lipina tsa setso tse nkhoposang bana ba ka lintabeng.",
    avatar: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc1NTU4OTIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "tradition",
    likes: 147,
    hasAudio: true
  },
  {
    id: 2,
    name: "Mme Pulane",
    location: "Mohale's Hoek",
    story: "When the floods came last year, Radio Lesotho was our lifeline. They coordinated rescue efforts and kept us informed when all other communication failed.",
    storySessionotho: "Ha mebu e ne e tla selemo se fetileng, Radio Lesotho e ne e le mohala oa rona oa bophelo. Ba ile ba kopanela liteko tsa pholoso mme ba re bolella ha puisano tsohle tse ling li ne li sa sebetse.",
    avatar: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc1NTU4OTIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "community",
    likes: 203,
    hasAudio: false
  },
  {
    id: 3,
    name: "Mpho Lebona",
    location: "Butha-Buthe",
    story: "As a young person living in the mountains, Radio Lesotho connects me to opportunities and education programs I wouldn't know about otherwise.",
    storySessionotho: "Joaloka moocha ea lulang lintabeng, Radio Lesotho e nkopanya le menyetla le mananeo a thuto ao ke keng ka a tseba ka tsela e 'ngoe.",
    avatar: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc1NTU4OTIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "personal",
    likes: 89,
    hasAudio: true
  },
  {
    id: 4,
    name: "Ntate Thabo",
    location: "Qacha's Nek",
    story: "The weather reports have saved my livestock many times. In the mountains, knowing when storms are coming is a matter of survival.",
    storySessionotho: "Litlaleho tsa boemo ba leholimo li bolokile liphoofolo tsa ka makhetlo a mangata. Lintabeng, ho tseba hore mafefo a atang nako e feng ke taba ea ho phela.",
    avatar: "https://images.unsplash.com/photo-1655720359248-eeace8c709c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwY29tbXVuaXR5fGVufDF8fHx8MTc1NTU4OTIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "community",
    likes: 156,
    hasAudio: false
  }
];

export function CommunityVoices() {
  const [likedStories, setLikedStories] = useState<Set<number>>(new Set());

  const toggleLike = (storyId: number) => {
    setLikedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'tradition': return 'bg-amber-500 text-white';
      case 'community': return 'bg-green-500 text-white';
      case 'personal': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      en: {
        tradition: 'Heritage',
        community: 'Community',
        personal: 'Personal'
      },
      st: {
        tradition: 'Khaohelo',
        community: 'Sechaba',
        personal: 'Motho'
      }
    };
    return labels[language][category as keyof typeof labels.en] || category;
  };

  const { language } = useLanguage();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Quote className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === 'en' ? 'Community Voices' : 'Lentsoe la Sechaba'}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Hear the stories that shape our kingdom - from the mountains of Mokhotlong to the valleys of Quthing'
            : 'Utloa lipale tse ipolang mmuso oa rona - ho tloha lintabeng tsa Mokhotlong ho isa maloaleng a Quthing'
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

      {/* Traditional Pattern Divider */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 rounded-full mb-12 opacity-20"></div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communityStories.map((story) => (
          <Card key={story.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <ImageWithFallback
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  {story.hasAudio && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{story.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {story.location}
                  </div>
                  <Badge className={getCategoryBadgeColor(story.category)}>
                    {getCategoryLabel(story.category)}
                  </Badge>
                </div>
              </div>

              {/* Story Content */}
              <div className="mb-6">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-foreground italic leading-relaxed">
                  "{language === 'en' ? story.story : (story.storySessionotho || story.story)}"
                </p>
              </div>

              {/* Audio Player */}
              {story.hasAudio && (
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Play className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {language === 'en' ? 'Listen to story' : 'Utloa pale'}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-full rounded-full w-0 group-hover:w-1/4 transition-all duration-1000"></div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2:34</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(story.id)}
                    className={`gap-2 ${likedStories.has(story.id) ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                    {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    {language === 'en' ? 'Reply' : 'Araba'}
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Share Story' : 'Abelana Pale'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Share Your Story' : 'Abelana ka Pale ea Hao'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Have a story that could inspire others? We want to hear from you. Your voice matters in our community.'
                : 'Na u na le pale e ka susumetsoang ba bang? Re batla ho u utloa. Lentsoe la hao le bohlokoa sechabeng sa rona.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                {language === 'en' ? 'Record Your Story' : 'Hatisa Pale ea Hao'}
              </Button>
              <Button variant="outline">
                {language === 'en' ? 'Write Your Story' : 'Ngola Pale ea Hao'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}