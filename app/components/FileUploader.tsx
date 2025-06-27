'use client';

import { useState, useRef } from 'react';
import * as mammoth from 'mammoth';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (text: string) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    setIsProcessing(true);

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.txt')) {
      handleTextFile(file);
    } else if (fileName.endsWith('.docx') || fileType.includes('wordprocessingml')) {
      handleWordFile(file);
    } else if (fileName.endsWith('.pdf') || fileType === 'application/pdf') {
      handlePDFFile(file);
    } else {
      setError('รองรับเฉพาะไฟล์ .txt, .docx, และ .pdf เท่านั้น');
      setIsProcessing(false);
    }
  };

  const handleTextFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileUpload(text);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์');
      setIsProcessing(false);
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleWordFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      onFileUpload(result.value);
      setIsProcessing(false);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์ Word');
      setIsProcessing(false);
    }
  };

  const handlePDFFile = async (file: File) => {
    try {
      // Dynamic import PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set the worker source for PDF.js (using the .js file we created)
      pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
          
        fullText += pageText + '\n\n';
      }
      
      if (fullText.trim()) {
        onFileUpload(fullText.trim());
        setIsProcessing(false);
      } else {
        setError('ไม่พบข้อความในไฟล์ PDF หรือไฟล์เป็นรูปภาพ');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('PDF processing error:', err);
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์ PDF กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและมีข้อความที่สามารถอ่านได้');
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          อัปโหลดไฟล์สำหรับ Teleprompter
        </h2>
        <p className="text-lg text-gray-600">
          รองรับไฟล์ Word (.docx), PDF และข้อความ (.txt)
        </p>
      </div>

      <div
        className={`group border-2 border-dashed rounded-xl p-12 text-center transition-all duration-500 transform hover:scale-105 ${
          isDragOver
            ? 'border-blue-400 bg-blue-50 scale-105 shadow-xl animate-pulse'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg'
        } ${isProcessing ? 'animate-bounce' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-6 shadow-lg"></div>
            <p className="text-xl text-gray-600 font-medium animate-pulse">กำลังประมวลผลไฟล์...</p>
            <p className="text-sm text-gray-500 mt-2">กรุณารอสักครู่</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-6 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              ลากไฟล์มาวางที่นี่
            </h3>
            <p className="text-gray-600 mb-6 text-lg">หรือ</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-lg transform hover:scale-105 hover:shadow-xl active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative z-10 group-hover:font-bold transition-all duration-300">เลือกไฟล์</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer"></div>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center animate-slide-up hover:bg-red-100 transition-colors duration-300">
          <AlertCircle className="h-6 w-6 text-red-600 mr-3 animate-pulse" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.docx,.pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
        <div className="group flex items-center p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
          <FileText className="h-10 w-10 text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">ไฟล์ข้อความ</h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-700">.txt</p>
          </div>
        </div>
        
        <div className="group flex items-center p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
          <FileText className="h-10 w-10 text-green-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-green-600 transition-colors duration-300">Microsoft Word</h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-700">.docx</p>
          </div>
        </div>
        
        <div className="group flex items-center p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
          <FileText className="h-10 w-10 text-red-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
          <div>
            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-red-600 transition-colors duration-300">PDF</h4>
            <p className="text-sm text-gray-600 group-hover:text-gray-700">.pdf</p>
          </div>
        </div>
      </div>
    </div>
  );
}
