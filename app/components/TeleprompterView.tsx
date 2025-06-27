'use client';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, Settings } from 'lucide-react';
import { TeleprompterSettings } from '../page';
import SettingsPanel from './SettingsPanel';

interface TeleprompterViewProps {
  text: string;
  settings: TeleprompterSettings;
  onBack: () => void;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export default function TeleprompterView({ text, settings, onBack, onSettingsChange }: TeleprompterViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const highlightIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // แปลงข้อความเป็นประโยคและคำสำหรับการแสดงผล
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  // แยกคำโดยใช้ space และ "/" เป็น separator
  const words = text.split(/[\s\/]+/).filter(word => word.trim().length > 0);

  // คำนวณ word index จาก scroll position
  const calculateCurrentWordIndex = (scrollPos: number) => {
    if (!textContainerRef.current) return 0;
    
    const container = textContainerRef.current;
    const totalHeight = container.scrollHeight - container.clientHeight;
    const scrollPercentage = totalHeight > 0 ? scrollPos / totalHeight : 0;
    
    return Math.floor(scrollPercentage * words.length);
  };

  useEffect(() => {
    if (isPlaying) {
      // Scroll interval
      intervalRef.current = setInterval(() => {
        setScrollPosition(prev => {
          const maxScroll = textContainerRef.current ? 
            textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight : 0;
          
          if (prev >= maxScroll) {
            setIsPlaying(false);
            return prev;
          }
          
          const scrollIncrement = settings.scrollSpeed / 5;
          const newScrollPos = prev + scrollIncrement;
          
          return newScrollPos;
        });
      }, 50);

      // Highlight interval - separate timing (only if highlighting is enabled)
      if (settings.highlightEnabled) {
        highlightIntervalRef.current = setInterval(() => {
          setCurrentWordIndex(prev => {
            if (prev >= words.length - 1) {
              return prev;
            }
            return prev + 1;
          });
        }, settings.highlightSpeed);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
      }
    };
  }, [isPlaying, settings.scrollSpeed, settings.highlightSpeed, settings.highlightEnabled, words.length]);

  // อัปเดต scroll position ในเอเลเมนต์
  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      lastActivityRef.current = Date.now();
      setShowControls(true);
    };

    const hideControlsTimer = setInterval(() => {
      if (Date.now() - lastActivityRef.current > 3000) {
        setShowControls(false);
      }
    }, 1000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(hideControlsTimer);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    lastActivityRef.current = Date.now();
    setShowControls(true);
    
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowUp':
        e.preventDefault();
        scrollUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        scrollDown();
        break;
      case 'Home':
        restart();
        break;
      case 'Escape':
        onBack();
        break;
      case 's':
      case 'S':
        e.preventDefault();
        setShowSettings(prev => !prev);
        break;
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const scrollUp = () => {
    setScrollPosition(prev => Math.max(0, prev - 100));
  };

  const scrollDown = () => {
    setScrollPosition(prev => {
      const maxScroll = textContainerRef.current ? 
        textContainerRef.current.scrollHeight - textContainerRef.current.clientHeight : 0;
      return Math.min(maxScroll, prev + 100);
    });
  };

  const restart = () => {
    setScrollPosition(0);
    setCurrentPosition(0);
    setCurrentWordIndex(0);
    setIsPlaying(false);
  };

  // ฟังก์ชันสำหรับแสดงข้อความพร้อม highlight
  const renderTextWithHighlight = () => {
    const lines = text.split('\n');
    let globalWordIndex = 0;

    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <div key={lineIndex} className="mb-4" style={{ height: '1em' }}></div>;
      }

      // แยกคำและ "/" ในบรรทัด
      const lineWords = line.split(/[\s\/]+/).filter(word => word.trim().length > 0);
      const startWordIndex = globalWordIndex;
      globalWordIndex += lineWords.length;

      return (
        <div
          key={lineIndex}
          className="mb-4 transition-all duration-300"
          style={{
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
            color: settings.fontColor,
            textAlign: 'left',
          }}
        >
          {lineWords.map((word, wordIndex) => {
            const absoluteWordIndex = startWordIndex + wordIndex;
            const isCurrentWord = settings.highlightEnabled && absoluteWordIndex === currentWordIndex;
            
            return (
              <span
                key={wordIndex}
                className={`transition-all duration-200 ${
                  isCurrentWord ? 'px-1 py-0.5 rounded' : ''
                }`}
                style={{
                  backgroundColor: isCurrentWord ? settings.highlightColor : 'transparent',
                  color: isCurrentWord ? '#000' : settings.fontColor,
                  fontWeight: isCurrentWord ? 'bold' : 'normal',
                }}
              >
                {word}
                {wordIndex < lineWords.length - 1 && ' '}
              </span>
            );
          })}
        </div>
      );
    });
  };

  if (sentences.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">กำลังเตรียมข้อความ...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 ${
        showControls ? '' : 'cursor-none'
      }`}
      style={{ backgroundColor: settings.backgroundColor }}
    >
      {/* Controls */}
      <div className={`transition-all duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="bg-black bg-opacity-75 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center px-3 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </button>
              
              <div className="text-sm">
                ตำแหน่ง: {Math.round((scrollPosition / (textContainerRef.current?.scrollHeight || 1)) * 100)}%
              </div>
              
              <div className="text-sm">
                คำ: {currentWordIndex + 1}/{words.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(prev => !prev)}
                className={`p-2 rounded hover:opacity-80 ${
                  showSettings ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                title="การตั้งค่า (S)"
              >
                <Settings className="h-4 w-4" />
              </button>
              
              <button
                onClick={restart}
                className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                title="เริ่มใหม่ (Home)"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              
              <button
                onClick={scrollUp}
                className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                title="เลื่อนขึ้น (↑)"
              >
                ↑
              </button>
              
              <button
                onClick={togglePlayPause}
                className={`p-2 rounded hover:opacity-80 ${
                  isPlaying ? 'bg-red-600' : 'bg-green-600'
                }`}
                title={isPlaying ? 'หยุด (Space)' : 'เล่น (Space)'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              
              <button
                onClick={scrollDown}
                className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                title="เลื่อนลง (↓)"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl z-50">
          <div className="p-3 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">การตั้งค่าระหว่างการอ่าน</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-3">
            <SettingsPanel 
              settings={settings} 
              onSettingsChange={onSettingsChange}
            />
          </div>
        </div>
      )}

      {/* Main Text Display */}
      <div className="flex-1 overflow-hidden">
        <div 
          ref={textContainerRef}
          className="h-full overflow-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="px-8 py-16">
            {/* พื้นที่ว่างด้านบน */}
            <div style={{ height: '50vh' }}></div>
            
            {/* ข้อความหลักพร้อม highlight */}
            <div className="max-w-4xl mx-auto">
              {renderTextWithHighlight()}
            </div>
            
            {/* พื้นที่ว่างด้านล่าง */}
            <div style={{ height: '50vh' }}></div>
          </div>
        </div>
        
        {/* Reading Guideline */}
        <div 
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '30%',
            height: '4px',
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
            zIndex: 10
          }}
        >
          <div className="absolute left-4 top-[-4px]  bg-red-500 opacity-70"></div>
          <div className="absolute right-4 top-[-4px]  bg-red-500  opacity-70"></div>
        </div>

        <div 
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: '80%',
            height: '4px',
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
            zIndex: 10
          }}
        >
          <div className="absolute left-4 top-[-4px]  bg-red-500 opacity-70"></div>
          <div className="absolute right-4 top-[-4px]  bg-red-500  opacity-70"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`transition-all duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-black bg-opacity-75 p-2">
          <div className="bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentWordIndex / words.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {showControls && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded text-xs">
          <div>Space: เล่น/หยุด</div>
          <div>S: การตั้งค่า</div>
          <div>↑/↓: เลื่อนข้อความ</div>
          <div>Home: เริ่มใหม่</div>
          <div>Esc: กลับ</div>
        </div>
      )}
    </div>
  );
}
