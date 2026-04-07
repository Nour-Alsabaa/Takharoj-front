import React, { useState, useRef, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import './support.css';
// تم دمج القائمة الجانبية هنا ليتمكن المتصفح من تشغيل الواجهة بدون أخطاء الاستيراد

export default function Support() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "لماذا لا استطيع تسجيل الدخول",
      sender: "user", 
      footer: "منذ 20 دقيقة"
    },
    {
      id: 2,
      text: "سنتابع مع الفريق التقني ان شاء الله",
      sender: "support", 
      footer: "تم الرد من قبل Hasan"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault(); 
    
    if (inputText.trim() === "") return; 

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      footer: "الآن"
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <>
      {/* دمج ملف الـ CSS هنا مباشرة لضمان العمل بدون أخطاء استيراد */}
      

      <div className="support-container" dir="rtl">
        
        {/* القائمة الجانبية */}
        <SideBar />

        <main className="support-main">
          {/* الخلفية المائية */}
          <div className="support-watermark"></div>

          {/* منطقة عرض الرسائل */}
          <div className="messages-area">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message-wrapper ${msg.sender === 'user' ? 'message-user' : 'message-support'}`}
              >
                <div className={`message-bubble ${msg.sender === 'user' ? 'bubble-user' : 'bubble-support'}`}>
                  {msg.text}
                </div>
                
                <span className={`message-footer ${msg.sender === 'user' ? 'footer-user' : 'footer-support'}`}>
                  {msg.footer}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* منطقة إدخال الرسالة */}
          <div className="input-area">
            <form onSubmit={handleSendMessage} className="input-form">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="chat-input"
              />
              
              <button type="submit" className="send-button">
                {/* أيقونة الإرسال معكوسة لتناسب اللغة العربية */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'scaleX(-1)' }}>
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>

        </main>
      </div>
    </>
  );
}