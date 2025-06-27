'use client';

import { useState } from 'react';
import { Upload, Settings, Play, Monitor, Github, Instagram, Youtube, Facebook, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import FileUploader from './components/FileUploader';
import TextEditor from './components/TextEditor';
import SettingsPanel from './components/SettingsPanel';
import TeleprompterView from './components/TeleprompterView';

export type TeleprompterSettings = {
  scrollSpeed: number;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  fontFamily: string;
  lineHeight: number;
  pauseBetweenSentences: number;
  highlightSpeed: number;
  highlightColor: string;
  highlightEnabled: boolean;
};

export default function Home() {
  const [currentView, setCurrentView] = useState<'upload' | 'edit' | 'teleprompter'>('upload');
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<TeleprompterSettings>({
    scrollSpeed: 50,
    fontSize: 24,
    fontColor: '#ffffff',
    backgroundColor: '#000000',
    fontFamily: 'Arial',
    lineHeight: 1.5,
    pauseBetweenSentences: 500,
    highlightSpeed: 300,
    highlightColor: '#ffff00',
    highlightEnabled: true,
  });

  // เพิ่มข้อความทดสอบถ้าไม่มีข้อความ
  const testText = `สวัสดีครับ ยินดีต้อนรับสู่ PIXTRO Teleprompter
ระบบ teleprompter ที่ทันสมัยและใช้งานง่าย
คุณสามารถปรับความเร็วในการเลื่อน
และปรับแต่งการแสดงผลได้ตามต้องการ
ขอให้สนุกกับการใช้งาน`;

  const displayText = text || testText;

  const handleFileUpload = (extractedText: string) => {
    setText(extractedText);
    setCurrentView('edit');
  };

  const handleStartTeleprompter = () => {
    console.log('Starting teleprompter with text:', displayText.length, 'characters');
    setCurrentView('teleprompter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 animate-gradient-x">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 shadow-xl border-b border-orange-300 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center group">
                <div className="rounded-lg mr-3 transform group-hover:scale-110 transition-all duration-300 ease-in-out">
                <a 
                  href="https://www.youtube.com/@PixTroTH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                  src="/logo_Pixtro.jpg" 
                  alt="PIXTRO Logo" 
                  className="h-8 w-8 object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  />
                </a>
                </div>
                <a 
                href="https://www.youtube.com/@PixTroTH" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-bold text-white drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 cursor-pointer hover:text-yellow-200"
                >
                PIXTRO Teleprompter
                </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/guide">
                <button className="group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0 text-white hover:bg-white hover:text-green-600 hover:shadow-2xl backdrop-blur-sm border-2 border-transparent hover:border-green-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <HelpCircle className="h-4 w-4 mr-2 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125" />
                  <span className="relative z-10 group-hover:font-bold transition-all duration-300">คู่มือ</span>
                </button>
              </Link>
              
              <button
                onClick={() => setCurrentView('upload')}
                className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0 ${
                  currentView === 'upload' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-xl scale-105 animate-bounce' 
                    : 'text-white hover:bg-white hover:text-red-600 hover:shadow-2xl backdrop-blur-sm border-2 border-transparent hover:border-red-300'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Upload className="h-4 w-4 mr-2 transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 group-active:rotate-45" />
                <span className="relative z-10 group-hover:font-bold transition-all duration-300">อัปโหลด</span>
              </button>
              
              <button
                onClick={() => setCurrentView('edit')}
                className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0 ${
                  currentView === 'edit' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl scale-105 animate-bounce' 
                    : 'text-white hover:bg-white hover:text-blue-600 hover:shadow-2xl backdrop-blur-sm border-2 border-transparent hover:border-blue-300'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Settings className="h-4 w-4 mr-2 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125 group-active:rotate-360" />
                <span className="relative z-10 group-hover:font-bold transition-all duration-300">แก้ไข</span>
              </button>
              
              {/* แสดงปุ่มเริ่มอ่านเสมอ สำหรับการทดสอบ */}
              <button
                onClick={handleStartTeleprompter}
                className="group relative flex items-center px-6 py-2 bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:via-red-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 active:scale-95 active:translate-y-0 animate-pulse hover:animate-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                <Play className="h-4 w-4 mr-2 relative z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125 group-active:scale-150 group-hover:drop-shadow-lg" />
                <span className="relative z-10 group-hover:font-bold group-hover:tracking-wide transition-all duration-300">
                  เริ่มอ่าน {!text && '(ทดสอบ)'}
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in">
        <div className="transition-all duration-500 ease-in-out">
          {currentView === 'upload' && (
            <div className="animate-float">
              <FileUploader onFileUpload={handleFileUpload} />
            </div>
          )}
          
          {currentView === 'edit' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-slide-up">
              <div className="lg:col-span-3 hover-lift">
                <TextEditor text={displayText} onTextChange={setText} settings={settings} />
              </div>
              <div className="lg:col-span-1 hover-lift">
                <SettingsPanel settings={settings} onSettingsChange={setSettings} />
              </div>
            </div>
          )}
          
          {currentView === 'teleprompter' && (
            <div className="animate-bounce-gentle">
              <TeleprompterView
                text={displayText}
                settings={settings}
                onBack={() => setCurrentView('edit')}
                onSettingsChange={setSettings}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-orange-500 via-yellow-500 to-red-500 shadow-2xl mt-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='53' cy='7' r='2'/%3E%3Ccircle cx='7' cy='53' r='2'/%3E%3Ccircle cx='53' cy='53' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 py-10">
          {/* Main Content */}
          <div className="text-center">
            {/* Logo and Title Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center group mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20">
                    <a 
                      href="https://www.youtube.com/@JaoPedTuNoi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img 
                        src="/ped.png" 
                        alt="Chaopedtunoi Logo" 
                        className="h-12 w-12 object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </a>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://www.youtube.com/@JaoPedTuNoi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-3xl font-black text-white drop-shadow-2xl hover:text-yellow-200 transition-all duration-300 block mb-2"
              >
                Chaopedtunoi
              </a>
              
              <p className="text-white/80 text-base max-w-xl mx-auto">
                Content Creator & Developer • เพื่อการเรียนรู้ที่ไม่มีที่สิ้นสุด
              </p>
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-8">
              <a 
                href="https://www.youtube.com/@JaoPedTuNoi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                  <Youtube className="h-6 w-6 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white text-sm font-medium block">YouTube</span>
                </div>
              </a>
              
              <a 
                href="https://www.instagram.com/chaopedtunoi"
                target="_blank"
                rel="noopener noreferrer"  
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                  <Instagram className="h-6 w-6 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white text-sm font-medium block">Instagram</span>
                </div>
              </a>
              
              <a 
                href="https://github.com/chaopedtunoi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                  <Github className="h-6 w-6 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white text-sm font-medium block">GitHub</span>
                </div>
              </a>
              
              <a 
                href="https://www.facebook.com/chaopedtunoi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105">
                  <Facebook className="h-6 w-6 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-white text-sm font-medium block">Facebook</span>
                </div>
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-white/20 pt-6">
            <div className="text-center">
              <p className="text-white font-bold text-base mb-2">
                © 2025 <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Chaopedtunoi</span> สงวนลิขสิทธิ์ทุกรูปแบบ
              </p>
              <div className="flex items-center justify-center space-x-2 text-white/70 text-sm">
                <span>พัฒนาด้วย</span>
                <div className="flex items-center space-x-1">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 rounded text-xs font-medium">Next.js</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-200 rounded text-xs font-medium">Tailwind CSS</span>
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-200 rounded text-xs font-medium">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

