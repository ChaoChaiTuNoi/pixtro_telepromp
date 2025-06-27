'use client';

import { TeleprompterSettings } from '../page';

interface SettingsPanelProps {
  settings: TeleprompterSettings;
  onSettingsChange: (settings: TeleprompterSettings) => void;
}

export default function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  const updateSetting = (key: keyof TeleprompterSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Impact', label: 'Impact' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">การตั้งค่า</h3>
        <p className="text-sm text-gray-600 mt-1">
          ปรับแต่งการแสดงผลใน Teleprompter
        </p>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Scroll Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ความเร็วการเลื่อน
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={settings.scrollSpeed}
            onChange={(e) => updateSetting('scrollSpeed', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>ช้า</span>
            <span>{settings.scrollSpeed}</span>
            <span>เร็ว</span>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ขนาดตัวอักษร
          </label>
          <input
            type="range"
            min="16"
            max="72"
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>16px</span>
            <span>{settings.fontSize}px</span>
            <span>72px</span>
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            แบบอักษร
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => updateSetting('fontFamily', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Line Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ระยะห่างบรรทัด
          </label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1.0</span>
            <span>{settings.lineHeight}</span>
            <span>3.0</span>
          </div>
        </div>

        {/* Font Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สีตัวอักษร
          </label>
          <input
            type="color"
            value={settings.fontColor}
            onChange={(e) => updateSetting('fontColor', e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
          />
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สีพื้นหลัง
          </label>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) => updateSetting('backgroundColor', e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
          />
        </div>

        {/* Pause Between Sentences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หยุดระหว่างประโยค (มิลลิวินาที)
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={settings.pauseBetweenSentences}
            onChange={(e) => updateSetting('pauseBetweenSentences', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0ms</span>
            <span>{settings.pauseBetweenSentences}ms</span>
            <span>2000ms</span>
          </div>
        </div>

        {/* Highlight Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ความเร็วไฮไลต์คำ (มิลลิวินาที)
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="50"
            value={settings.highlightSpeed}
            onChange={(e) => updateSetting('highlightSpeed', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>เร็ว</span>
            <span>{settings.highlightSpeed}ms</span>
            <span>ช้า</span>
          </div>
        </div>

        {/* Highlight Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สีไฮไลต์
          </label>
          <input
            type="color"
            value={settings.highlightColor}
            onChange={(e) => updateSetting('highlightColor', e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
            disabled={!settings.highlightEnabled}
          />
        </div>

        {/* Highlight Enabled Toggle */}
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>เปิดใช้งานไฮไลต์คำ</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.highlightEnabled}
                onChange={(e) => updateSetting('highlightEnabled', e.target.checked)}
                className="sr-only"
              />
              <div
                onClick={() => updateSetting('highlightEnabled', !settings.highlightEnabled)}
                className={`block w-14 h-8 rounded-full cursor-pointer transition-colors duration-200 ${
                  settings.highlightEnabled ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                    settings.highlightEnabled ? 'transform translate-x-6' : ''
                  }`}
                />
              </div>
            </div>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            เปิด/ปิดการไฮไลต์คำขณะเล่น
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 border-t bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">ตัวอย่าง</h4>
        <div
          className="p-4 rounded-md border"
          style={{
            fontSize: `${Math.min(settings.fontSize, 18)}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
            color: settings.fontColor,
            backgroundColor: settings.backgroundColor,
          }}
        >
          นี่คือตัวอย่างข้อความใน Teleprompter
        </div>
      </div>
    </div>
  );
}
