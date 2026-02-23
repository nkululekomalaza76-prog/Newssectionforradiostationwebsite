import { RadioHeader } from "./components/RadioHeader";
import { BreakingNewsTicker } from "./components/BreakingNewsTicker";
import { NewsSection } from "./components/NewsSection";
import { CommunityVoices } from "./components/CommunityVoices";
import { TraditionalMusic } from "./components/TraditionalMusic";
import { ProgramSchedule } from "./components/ProgramSchedule";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { LanguageProvider } from './contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { 
  Radio, 
  Heart, 
  Users, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background relative">
        {/* Breaking News Ticker */}
        <BreakingNewsTicker />

        {/* Enhanced Header with Live Radio */}
        <RadioHeader />

        {/* Main Content with fade-in animations */}
        <main className="space-y-0">
          {/* News Section */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <NewsSection />
          </div>
          
          {/* Traditional Music & Culture */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <TraditionalMusic />
          </div>
          
          {/* Community Voices */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CommunityVoices />
          </div>
          
          {/* Program Schedule */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-450">
            <ProgramSchedule />
          </div>
        </main>

        {/* Enhanced Footer with Lesotho Feel */}
        <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white mt-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1596626417050-39c7f6ddd2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBwYXR0ZXJuc3xlbnwxfHx8fDE3NTU1ODkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Traditional patterns"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            {/* Traditional Border with animation */}
            <div className="w-full h-2 bg-gradient-to-r from-blue-600 via-white via-green-600 via-white to-yellow-600 animate-pulse"></div>
            
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Station Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Radio className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        Radio Lesotho
                        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                      </h3>
                      <p className="text-blue-200">103.5 FM • Leselinyana la Basotho</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Broadcasting from the heart of the Mountain Kingdom, Radio Lesotho has been the voice of the Basotho people for over three decades. We bring you authentic news, traditional music, and community stories that connect our mountain villages to the world.
                  </p>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm italic">
                    Ho tloha moleng oa 'Muso oa Lintaba, Radio Lesotho e bile lentsoe la Basotho lilemo tse fetang leshome. Re u tlisetsa litaba tsa nnete, lipina tsa setso le lipale tsa sechaba tse kopanyang metsana ea rona ea lintaba le lefatše.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Users className="w-6 h-6 text-blue-400" />
                        <div>
                          <div className="font-semibold text-white">50,000+</div>
                          <div className="text-xs text-gray-300">Daily Listeners</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                        <div>
                          <div className="font-semibold text-white">30+ Years</div>
                          <div className="text-xs text-gray-300">Serving Basotho</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-white">Lisebelisoa tse Potlakileng</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                      <Radio className="w-4 h-4 group-hover:animate-pulse" /> Live Stream</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                      <Globe className="w-4 h-4 group-hover:animate-spin" /> Lenane la Mananeo</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                      <Users className="w-4 h-4" /> Sechaba sa Rona</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Lipina tsa Setso</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Ka Rona</a></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-white">Reka Hokolang</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">Radio House, Kingsway<br />Maseru 100, Lesotho</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">+266 2231 2345</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">info@radiolesotho.co.ls</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <Radio className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">103.5 FM • 1440 AM</span>
                    </li>
                  </ul>

                  {/* Social Media */}
                  <div className="mt-6">
                    <h5 className="font-medium text-white mb-3">Latela Rona</h5>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                        <Facebook className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                        <Twitter className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                        <Instagram className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-400 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                        <Youtube className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-white/20 mt-12 pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-gray-300 text-sm">
                      &copy; 2026 Radio Lesotho. Litokelo tsohle li bolokiloe.
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      "Lentsoe la Basotho, Mohala oa Lefatše" - Voice of the Basotho, Bridge to the World
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Advertising</a>
                  </div>
                </div>

                {/* Frequency Band */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white font-medium">Now Broadcasting on 103.5 FM</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-8 right-8 z-50 rounded-full shadow-2xl bg-primary hover:bg-primary/90 animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>
    </LanguageProvider>
  );
}