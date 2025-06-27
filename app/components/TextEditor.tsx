'use client';

import { TeleprompterSettings } from '../page';

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
  settings: TeleprompterSettings;
}

export default function TextEditor({ text, onTextChange, settings }: TextEditorProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">แก้ไขข้อความ</h3>
        <p className="text-sm text-gray-600 mt-1">
          ปรับแต่งข้อความที่จะใช้ใน Teleprompter
        </p>
      </div>
      
      <div className="p-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="พิมพ์หรือวางข้อความที่นี่..."
          className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
            color: settings.fontColor === '#ffffff' ? '#000000' : settings.fontColor,
          }}
        />
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <span>จำนวนคำ: {text.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>จำนวนอักขระ: {text.length}</span>
        </div>
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">เครื่องมือช่วยเหลือ</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTextChange(text.replace(/\n\n+/g, '\n\n'))}
            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            จัดย่อหน้า
          </button>
          <button
            onClick={() => onTextChange(text.replace(/\s+/g, ' ').trim())}
            className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            ลบช่องว่างเกิน
          </button>
          <button
            onClick={() => onTextChange(text.toUpperCase())}
            className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            ตัวพิมพ์ใหญ่
          </button>
          <button
            onClick={() => onTextChange(text.toLowerCase())}
            className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
          >
            ตัวพิมพ์เล็ก
          </button>
        </div>
      </div>
    </div>
  );
}
