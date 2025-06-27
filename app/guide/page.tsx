'use client';

import { ArrowLeft, Home, Youtube, Instagram, Github, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 animate-gradient-x">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 shadow-xl border-b border-orange-300 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                กลับหน้าหลัก
              </Link>
            </div>
            <h1 className="text-xl font-bold text-white">คู่มือการใช้งาน PIXTRO Teleprompter</h1>
            <div className="w-32"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Title Section */}
          <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">📖 คู่มือการใช้งาน PIXTRO Teleprompter</h1>
            <p className="text-xl opacity-90">เรียนรู้การใช้งานเว็บแอปพลิเคชันทีละขั้นตอน</p>
          </div>

          {/* Content */}
          <div className="p-8 prose prose-lg max-w-none">
            
            {/* ภาพรวม */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                🎯 ภาพรวม
              </h2>
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                <p className="text-gray-700 leading-relaxed">
                  PIXTRO Teleprompter เป็นเว็บแอปพลิเคชันสำหรับแสดงข้อความแบบ teleprompter ที่ออกแบบมาเพื่อช่วยในการนำเสนอ การอ่านข่าว หรือการพูดในที่สาธารณะ
                </p>
              </div>
            </section>

            {/* คุณสมบัติหลัก */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">✨ คุณสมบัติหลัก</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">📄 รองรับไฟล์หลากหลาย</h3>
                  <p className="text-gray-700">รองรับการอัปโหลดไฟล์ PDF และ TXT</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3">✏️ แก้ไขได้แบบ Real-time</h3>
                  <p className="text-gray-700">แก้ไขข้อความได้ทันทีในหน้าแก้ไข</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3">⚙️ ปรับแต่งได้หลากหลาย</h3>
                  <p className="text-gray-700">ปรับความเร็ว สี ฟอนต์ และการแสดงผล</p>
                </div>
                <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                  <h3 className="font-semibold text-pink-800 mb-3">📱 ใช้งานได้ทุกอุปกรณ์</h3>
                  <p className="text-gray-700">รองรับการใช้งานบนคอมพิวเตอร์และมือถือ</p>
                </div>
              </div>
            </section>

            {/* วิธีการใช้งาน */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🚀 วิธีการใช้งาน</h2>
              
              <div className="space-y-8">
                {/* ขั้นตอนที่ 1 */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-2xl font-bold text-red-800 mb-4">ขั้นตอนที่ 1: อัปโหลดไฟล์ข้อความ</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>คลิกปุ่ม <strong>"อัปโหลด"</strong> บนแถบนำทาง</li>
                    <li>เลือกไฟล์ที่ต้องการ: <strong>PDF</strong> หรือ <strong>TXT</strong></li>
                    <li>ลากไฟล์ลงในพื้นที่อัปโหลด</li>
                    <li>รอให้ระบบประมวลผลและแยกข้อความออกมา</li>
                  </ol>
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>เคล็ดลับ:</strong> หากไม่มีไฟล์ ระบบจะใช้ข้อความทดสอบให้อัตโนมัติ
                    </p>
                  </div>
                </div>

                {/* ขั้นตอนที่ 2 */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-2xl font-bold text-orange-800 mb-4">ขั้นตอนที่ 2: แก้ไขข้อความ</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>คลิกปุ่ม <strong>"แก้ไข"</strong> เพื่อเข้าสู่โหมดแก้ไข</li>
                    <li><strong>พื้นที่แก้ไขข้อความ</strong> (ด้านซ้าย): แก้ไขเนื้อหาได้โดยตรง</li>
                    <li><strong>แผงตั้งค่า</strong> (ด้านขวา): ปรับแต่งการแสดงผล</li>
                  </ol>
                </div>

                {/* ขั้นตอนที่ 3 */}
                <div className="bg-gradient-to-r from-yellow-50 to-red-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4">ขั้นตอนที่ 3: ปรับแต่งการแสดงผล</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-2">🎛️ การตั้งค่าข้อความ</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ขนาดตัวอักษร</li>
                        <li>• สีตัวอักษร</li>
                        <li>• แบบอักษร</li>
                        <li>• ระยะห่างบรรทัด</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-2">🎨 การตั้งค่าพื้นหลัง</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• สีพื้นหลัง</li>
                        <li>• ความโปร่งใส</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-2">⚡ การตั้งค่าการเคลื่อนไหว</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ความเร็วการเลื่อน</li>
                        <li>• หยุดระหว่างประโยค</li>
                        <li>• ไฮไลท์ข้อความ</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ขั้นตอนที่ 4 */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-2xl font-bold text-red-800 mb-4">ขั้นตอนที่ 4: เริ่มใช้งาน Teleprompter</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>คลิกปุ่ม <strong>"เริ่มอ่าน"</strong> สีแดงเพื่อเข้าสู่โหมด teleprompter</li>
                    <li>ข้อความจะเริ่มเลื่อนขึ้นโดยอัตโนมัติ</li>
                    <li>ใช้การควบคุมต่างๆ ขณะอ่าน</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* การควบคุมขณะใช้งาน */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🎮 การควบคุมขณะใช้งาน</h2>
              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-3">⌨️ ปุ่มลัดคีย์บอร์ด</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-mono bg-orange-100 px-2 py-1 rounded">Space</span>
                        <span className="text-gray-600">หยุด/เล่นต่อ</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-mono bg-orange-100 px-2 py-1 rounded">↑↓</span>
                        <span className="text-gray-600">เพิ่ม/ลดความเร็ว</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-mono bg-orange-100 px-2 py-1 rounded">Esc</span>
                        <span className="text-gray-600">กลับไปหน้าแก้ไข</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-mono bg-orange-100 px-2 py-1 rounded">F11</span>
                        <span className="text-gray-600">เข้า/ออกจากโหมดเต็มจอ</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-3">🖱️ การควบคุมด้วยเมาส์</h3>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-semibold">คลิก:</span> หยุด/เล่นต่อ
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-orange-200">
                        <span className="font-semibold">ปุ่มควบคุม:</span> ใช้ปุ่มบนหน้าจอ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* เคล็ดลับการใช้งาน */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">💡 เคล็ดลับการใช้งาน</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">📺 สำหรับการนำเสนอ</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• ใช้ขนาดตัวอักษรใหญ่ (32-48px)</li>
                    <li>• เลือกสีที่ตัดกัน (ขาวบนดำ)</li>
                    <li>• ตั้งความเร็วให้เหมาะกับจังหวะ</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3">🎤 สำหรับการอ่านข่าว</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• ใช้ฟอนต์ที่อ่านง่าย (Arial)</li>
                    <li>• ตั้งค่าการหยุดระหว่างประโยค</li>
                    <li>• เปิดใช้งานไฮไลท์</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3">🌙 สำหรับที่มีแสงน้อย</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• ใช้พื้นหลังสีดำ ตัวอักษรสีขาว</li>
                    <li>• เพิ่มขนาดตัวอักษร</li>
                    <li>• ลดความเร็วการเลื่อน</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* คำถามที่พบบ่อย */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">❓ คำถามที่พบบ่อย</h2>
              <div className="space-y-4">
                <div className="bg-white border border-orange-200 rounded-xl p-6">
                  <h3 className="font-semibold text-orange-800 mb-2">Q: ไฟล์ PDF ที่อัปโหลดไม่แสดงข้อความ</h3>
                  <p className="text-gray-600"><strong>A:</strong> ตรวจสอบว่าไฟล์ PDF เป็นไฟล์ที่มีข้อความ ไม่ใช่ภาพสแกน หากเป็นภาพสแกน ควรใช้โปรแกรม OCR แปลงก่อน</p>
                </div>
                <div className="bg-white border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">Q: ข้อความเลื่อนเร็วหรือช้าเกินไป</h3>
                  <p className="text-gray-600"><strong>A:</strong> ปรับค่า "ความเร็วการเลื่อน" ในแผงตั้งค่า หรือใช้ปุ่มลูกศรขณะใช้งาน</p>
                </div>
                <div className="bg-white border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-800 mb-2">Q: ไม่สามารถเห็นข้อความชัดเจน</h3>
                  <p className="text-gray-600"><strong>A:</strong> ลองปรับขนาดตัวอักษร เปลี่ยนสีข้อความ หรือสีพื้นหลัง</p>
                </div>
                <div className="bg-white border border-pink-200 rounded-xl p-6">
                  <h3 className="font-semibold text-pink-800 mb-2">Q: ต้องการย้อนกลับไปแก้ไขข้อความ</h3>
                  <p className="text-gray-600"><strong>A:</strong> กดปุ่ม Esc หรือคลิกปุ่ม "กลับ" เพื่อกลับไปหน้าแก้ไข</p>
                </div>
              </div>
            </section>

            {/* ข้อกำหนดระบบ */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🖥️ ข้อกำหนดระบบ</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">🌐 เบราว์เซอร์ที่รองรับ</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chrome 90+</li>
                    <li>• Firefox 88+</li>
                    <li>• Safari 14+</li>
                    <li>• Edge 90+</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-3">📱 ความละเอียดหน้าจอ</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>ขั้นต่ำ:</strong> 1024x768</li>
                    <li>• <strong>แนะนำ:</strong> 1920x1080 หรือสูงกว่า</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* การแก้ไขปัญหา */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🆘 การแก้ไขปัญหา</h2>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-3">🔧 ปัญหาการแสดงผล</h3>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                      <li>รีเฟรชหน้าเว็บ</li>
                      <li>ล้างแคชเบราว์เซอร์</li>
                      <li>ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-3">📁 ปัญหาการอัปโหลดไฟล์</h3>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                      <li>ตรวจสอบขนาดไฟล์ (ไม่เกิน 10MB)</li>
                      <li>ตรวจสอบรูปแบบไฟล์ (PDF หรือ TXT)</li>
                      <li>ลองอัปโหลดไฟล์อื่น</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 text-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">👨‍💻 ผู้พัฒนา</h2>
              <p className="text-xl mb-6">พัฒนาโดย <strong>Chaopedtunoi</strong></p>
              
              <div className="flex justify-center space-x-6 mb-6">
                <a 
                  href="https://www.youtube.com/@JaoPedTuNoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
                >
                  <Youtube className="h-5 w-5 mr-2" />
                  YouTube
                </a>
                <a 
                  href="https://www.instagram.com/chaopedtunoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Instagram
                </a>
                <a 
                  href="https://github.com/chaopedtunoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
                <a 
                  href="https://www.facebook.com/chaopedtunoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-yellow-200 transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </a>
              </div>
              
              <div className="text-center opacity-75">
                <p>หากมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม</p>
                <p>กรุณาติดต่อผ่านช่องทางที่ระบุไว้ข้างต้น</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
