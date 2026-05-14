import React, { useState, useEffect, useRef } from 'react';
import pic1 from './assets/Pic1.jpeg';
import pic2 from './assets/Pic2.jpeg';
import mergeImg from './assets/Merge image.png';

const useReveal = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
};

const R = ({ children, delay = 0, cls = '' }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={cls} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(36px)', transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [typed, setTyped] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const text = 'Ek dusre ki aadat, ek dusre ki kahani ✨';

  useEffect(() => {
    setReady(true);
    let i = 0;
    const t = setInterval(() => { i++; setTyped(text.slice(0, i)); if (i >= text.length) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / tot) * 100);
      setScrolled(window.scrollY > 50);
      ['hero','cuteLines','aboutUs','whoWeAre','future'].reverse().some(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); return true; }
        return false;
      });
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { id: 'hero', icon: '❤️', label: 'Home' },
    { id: 'cuteLines', icon: '😤', label: 'Cute Anger' },
    { id: 'aboutUs', icon: '✨', label: 'Our Story' },
    { id: 'whoWeAre', icon: '⭐', label: 'Ladoo & AG' },
    { id: 'future', icon: '🏠', label: 'Our Future' },
  ];

  const quotes = [
    "Aapka gussa bhi itna cute hota hai ki kabhi kabhi mann karta hai bas dekhte hi rahu… phir yaad aata hai jaan bhi bachani hai. 😭❤️",
    "Aap meri life ki wo habit ban chuki ho… jo ek din baat na ho to dil khud bolta hai 'system hang ho gaya.' 😭❤️",
    "Hamare jhagde temporary hote hain… kyuki dil ko pata hai 'final destination' to ek dusre ke paas hi hai. 🫶❤️",
    "Aapse shaadi karne ka ek fayda to pakka hai… roz subah uthte hi meri favourite insaan aur meri permanent headache dono ek hi jagah mil jayengi. 😂❤️",
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#fff0f3,#ffe4e8,#ffd6e0)' }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 z-50 h-1 transition-all duration-150" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#e11d48,#ec4899)', boxShadow: '0 0 8px #f43f5e' }} />

      {/* Floating bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="absolute float" style={{ left: `${(i*10+4)%100}%`, top: `${(i*9+8)%90}%`, fontSize: `${14+(i%4)*8}px`, opacity: .15, animationDelay: `${i*.6}s`, animationDuration: `${7+i*.7}s` }}>❤️</span>
        ))}
        {[...Array(7)].map((_, i) => (
          <span key={i} className="absolute twinkle" style={{ left: `${(i*14+7)%100}%`, top: `${(i*12+4)%95}%`, fontSize: `${10+(i%3)*6}px`, opacity: .2, animationDelay: `${i*.4}s`, animationDuration: `${1.5+i*.3}s` }}>✨</span>
        ))}
      </div>

      {/* Nav */}
      <nav className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 border-b border-pink-100 ${scrolled ? 'shadow-lg' : ''}`} style={{ background: scrolled ? 'rgba(255,255,255,0.93)' : 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="scrollbar-hide flex justify-center items-center h-13 gap-1 overflow-x-auto" style={{ height: 52 }}>
            {navItems.map(s => (
              <button key={s.id} onClick={() => go(s.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap cursor-pointer border-none" style={{ background: active===s.id ? 'linear-gradient(135deg,#e11d48,#ec4899)' : 'transparent', color: active===s.id ? '#fff' : '#9ca3af', boxShadow: active===s.id ? '0 4px 14px rgba(225,29,72,.35)' : 'none', transform: active===s.id ? 'scale(1.07)' : 'scale(1)' }}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-14">

        {/* HERO */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="text-center max-w-3xl w-full">
            <div className="relative inline-block mb-8" style={{ transform: ready ? 'scale(1)' : 'scale(0)', transition: 'transform .8s cubic-bezier(.34,1.56,.64,1)' }}>
              <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full overflow-hidden mx-auto heartbeat" style={{ border: '4px solid white', boxShadow: '0 20px 60px rgba(225,29,72,.35)' }}>
                <img src={mergeImg} alt="us" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
              </div>
              <div className="absolute inset-0 rounded-full spin-slow" style={{ border: '2px solid rgba(244,63,94,.25)', margin: -8 }} />
              <div className="absolute inset-0 rounded-full pulse-ring" style={{ margin: -8, background: 'rgba(244,63,94,.1)' }} />
              <span className="absolute -top-2 right-2 text-2xl twinkle">✨</span>
              <span className="absolute -bottom-1 -left-3 text-xl float" style={{ animationDuration: '3s' }}>💫</span>
            </div>

            <h1 className="ds shimmer-text fadeUp" style={{ fontSize: 'clamp(52px,11vw,90px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>
              Ladoo & AG
            </h1>

            <div className="h-9 mb-8">
              <p className="text-lg text-gray-500 font-light">{typed}<span className="border-r-2 border-rose-400 ml-0.5 heartbeat">&nbsp;</span></p>
            </div>

            <R delay={400} cls="flex justify-center gap-3 mb-10 flex-wrap">
              {[['❤️','Ek Dil'],['📖','Ek Kahani'],['♾️','Hamesha']].map(([e,l],i) => (
                <div key={i} className="glass rounded-2xl px-5 py-3 text-center" style={{ boxShadow: '0 4px 16px rgba(244,63,94,.1)' }}>
                  <div className="text-2xl mb-1">{e}</div>
                  <div className="text-xs text-gray-400 font-medium">{l}</div>
                </div>
              ))}
            </R>

            <R delay={550} cls="flex gap-3 justify-center flex-wrap">
              <button onClick={() => go('aboutUs')} className="px-8 py-3 rounded-full text-white font-semibold text-sm cursor-pointer border-none transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg,#e11d48,#ec4899)', boxShadow: '0 8px 24px rgba(225,29,72,.4)' }}>Our Journey →</button>
              <button onClick={() => go('future')} className="glass px-8 py-3 rounded-full font-semibold text-sm cursor-pointer transition-transform hover:scale-105" style={{ color: '#e11d48', border: '1.5px solid rgba(225,29,72,.25)' }}>Our Future ❤️</button>
            </R>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 text-center text-xs float cursor-pointer" onClick={() => go('cuteLines')}>
            <div className="text-xl">↓</div>Scroll
          </div>
        </section>

        {/* CUTE ANGER */}
        <section id="cuteLines" className="py-24 px-4" style={{ background: 'linear-gradient(135deg,rgba(255,228,230,.6),rgba(255,255,255,.8))' }}>
          <div className="max-w-5xl mx-auto">
            <R cls="text-center mb-14">
              <div className="text-5xl mb-3">😤</div>
              <h2 className="ds text-5xl font-bold text-gray-800 mb-2">Her Cute Anger</h2>
              <p className="text-rose-400">Jhagde bhi pyaare, nakhre bhi pyaare ❤️</p>
              <div className="w-14 h-0.5 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg,#e11d48,#ec4899)' }} />
            </R>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quotes.map((q, i) => (
                <R key={i} delay={i*100} cls="glass rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 cursor-default" style={{ boxShadow: '0 8px 28px rgba(244,63,94,.1)' }}>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg" style={{ background: 'linear-gradient(135deg,#e11d48,#ec4899)', boxShadow: '0 4px 12px rgba(225,29,72,.3)' }}>❤️</div>
                    <p className="text-gray-700 text-sm leading-relaxed">{q}</p>
                  </div>
                  <div className="mt-4 text-right text-sm opacity-40">❤️ ❤️</div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section id="aboutUs" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <R cls="text-center mb-14">
              <div className="text-5xl mb-3">✨</div>
              <h2 className="ds text-5xl font-bold text-gray-800 mb-2">Our Story</h2>
              <p className="text-rose-400">Woh pehli nazar se aaj tak… ❤️</p>
              <div className="w-14 h-0.5 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg,#e11d48,#ec4899)' }} />
            </R>

            <R delay={150} cls="flex gap-5 justify-center mb-10 flex-wrap">
              {[pic1, pic2].map((src, i) => (
                <div key={i} className="w-64 h-80 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:rotate-0" style={{ border: '3px solid white', boxShadow: '0 16px 48px rgba(225,29,72,.25)', transform: i===0 ? 'rotate(-3deg)' : 'rotate(3deg)' }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </R>

            <R delay={250} cls="glass rounded-3xl p-8 md:p-12" style={{ boxShadow: '0 20px 60px rgba(244,63,94,.12)', border: '1px solid rgba(244,63,94,.15)' }}>
              <div className="space-y-7">
                {[
                  ['🏫','Kuch log zindagi me achanak nahi aate… wo shayad pehle se hi hamari kahani ka hissa hote hain. ✨'],
                  ['💭','Mai jab 9th class me tha, tabhi se aap mujhe pasand thi. Aapko dekhkar dil me ek alag si feeling aati thi… par dil ne aapko kabhi kisi aur ki tarah treat hi nahi kiya. ❤️'],
                  ['🌟','Phir ek din kismat ne hume dobara milaya. Us din laga jaise meri adhuri story ko uska favourite character wapas mil gaya ho. 🫶'],
                  ['🌙','Ek normal si conversation kab late night talks me badal gayi, kab aap meri aadat ban gayi… pata hi nahi chala.'],
                ].map(([e,t],i,arr) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg,#fff0f3,#ffd6e0)', boxShadow: '0 4px 12px rgba(0,0,0,.06)' }}>{e}</div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-sm">{t}</p>
                      {i < arr.length-1 && <div className="mt-5 h-px" style={{ background: 'linear-gradient(90deg,rgba(244,63,94,.2),transparent)' }} />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl p-5 border-l-4 border-rose-400" style={{ background: 'linear-gradient(135deg,#fff0f3,#ffd6e0)' }}>
                <p className="ds text-rose-800 text-xl font-semibold italic text-center">"Jo insaan aapki kismat me hota hai, usse duniya ki koi bhi taakat rok nahi sakti…" ❤️</p>
              </div>
            </R>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section id="whoWeAre" className="py-24 px-4" style={{ background: 'linear-gradient(135deg,rgba(255,228,230,.7),rgba(252,231,243,.7))' }}>
          <div className="max-w-4xl mx-auto">
            <R cls="text-center mb-14">
              <div className="text-5xl mb-3">⭐</div>
              <h2 className="ds text-5xl font-bold text-gray-800 mb-2">Ladoo & AG</h2>
              <p className="text-rose-400">Dono ek dusre ke liye bane hain ❤️</p>
              <div className="w-14 h-0.5 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg,#e11d48,#ec4899)' }} />
            </R>
            <R delay={150} cls="glass rounded-3xl p-8 md:p-12" style={{ boxShadow: '0 20px 60px rgba(244,63,94,.15)', border: '2px solid rgba(244,63,94,.15)' }}>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <div className="inline-block rounded-full px-5 py-2 mb-5 text-sm font-semibold" style={{ background: 'linear-gradient(135deg,#fff0f3,#ffd6e0)', color: '#e11d48' }}>✨ Made for each other ✨</div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">Hum do log nahi, ek dusre ki aadat hain. Ek taraf meri <span className="ds text-rose-500 text-lg font-bold">Ladoo</span> hai jo meri har smile ki wajah hai, aur dusri taraf unke <span className="ds text-rose-500 text-lg font-bold">AG</span> jo usse har situation me pyaar karte rahenge.</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">Hamari story perfect nahi hai — jhagde bhi hote hain, misunderstandings bhi… lekin har baar dil sirf ek dusre ke paas hi laut kar aata hai.</p>
                  <p className="text-gray-700 text-sm leading-relaxed">Ladoo aur AG sirf naam nahi, ek feeling hain… har din aur zyada special hoti ja rahi hai. ❤️</p>
                </div>
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <div className="relative w-64 h-64">
                    <div className="w-full h-full rounded-full overflow-hidden heartbeat" style={{ border: '4px solid white', boxShadow: '0 20px 50px rgba(225,29,72,.35)' }}>
                      <img src={mergeImg} alt="us" className="w-full h-full" style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
                    </div>
                    <div className="absolute rounded-full spin-slow" style={{ inset: -8, border: '2px solid rgba(244,63,94,.25)' }} />
                    <span className="absolute -top-2 -right-1 text-xl twinkle">✨</span>
                    <span className="absolute -bottom-1 -left-2 text-lg float">💫</span>
                  </div>
                  <p className="ds text-rose-500 text-2xl font-bold">Hamesha</p>
                  <p className="text-gray-400 text-xs">Forever & Always</p>
                </div>
              </div>
            </R>
          </div>
        </section>

        {/* FUTURE */}
        <section id="future" className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <R cls="text-center mb-14">
              <div className="text-5xl mb-3">🏠</div>
              <h2 className="ds text-5xl font-bold text-gray-800 mb-2">Our Future</h2>
              <p className="text-rose-400">Sapno ki duniya, ek saath ❤️</p>
              <div className="w-14 h-0.5 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg,#e11d48,#ec4899)' }} />
            </R>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {[
                ['📅','Ek Din Aisa Bhi Aayega','Jab sirf hum nahi, hamare saath dono families ki khushiyan bhi hongi… aur hamari shaadi ek sapna pura hone jaisi lagegi. ✨','linear-gradient(135deg,#fff0f3,#ffd6e0)'],
                ['🏠','Choti Si Duniya','Hamari choti si duniya… jahan subah aapki smile se hogi aur raat aapke saath khatam. Pyaar aur pagalpan se bana ghar. ❤️','linear-gradient(135deg,#fdf2f8,#fce7f3)'],
                ['🎁','4 Chote Bacche 🫶','Us ghar me hamare 4 chote chote bacche bhi honge jo bilkul aapki tarah cute aur mere jaise shararti honge.','linear-gradient(135deg,#fff7ed,#ffedd5)'],
                ['☕','Simple Joys of Life','Movies, family trips, late night maggi, aur kabhi bina wajah ek dusre ko dekh kar smile karna… bas aisi hi hogi hamari life.','linear-gradient(135deg,#fffbeb,#fef9c3)'],
              ].map(([icon,title,text,bg],i) => (
                <R key={i} delay={i*100} cls="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 cursor-default" style={{ background: bg, border: '1px solid rgba(255,255,255,.7)', boxShadow: '0 8px 28px rgba(0,0,0,.07)' }}>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl mb-4" style={{ boxShadow: '0 4px 12px rgba(0,0,0,.08)' }}>{icon}</div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </R>
              ))}
            </div>
            <R delay={200} cls="rounded-3xl p-10 text-white text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#e11d48,#f43f5e,#ec4899)', boxShadow: '0 20px 60px rgba(225,29,72,.4)' }}>
              <div className="absolute inset-0 pointer-events-none opacity-10">
                {[...Array(6)].map((_,i) => <span key={i} className="absolute text-4xl" style={{ left:`${i*17}%`, top:`${20+(i%2)*50}%` }}>❤️</span>)}
              </div>
              <span className="text-5xl heartbeat inline-block">❤️</span>
              <p className="ds text-2xl md:text-3xl font-bold italic mt-4 relative">"Pyaar sirf saath rehne ka naam nahi hota… pyaar wo hota hai jiske saath puri zindagi jeene ka mann kare."</p>
              <div className="flex justify-center gap-5 mt-5 text-2xl">
                {['🎵','📷','✨'].map((e,i) => <span key={i} className="float" style={{ animationDelay:`${i*.4}s` }}>{e}</span>)}
              </div>
            </R>
          </div>
        </section>

        {/* FOOTER */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-md mx-auto">
            <R cls="glass rounded-3xl p-10 relative overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(244,63,94,.12)', border: '1px solid rgba(244,63,94,.15)', background: 'linear-gradient(135deg,rgba(255,240,243,.6),rgba(252,231,243,.6))' }}>
              <div className="text-5xl heartbeat inline-block mb-3">💌</div>
              <p className="ds text-2xl font-bold text-gray-700 mb-2">To my forever Ladoo,</p>
              <p className="text-gray-500 text-sm leading-relaxed">You are my today and all of my tomorrows.<br />I love you more than all the stars in the sky. ❤️</p>
              <div className="flex justify-center gap-2 mt-6">
                {[...Array(5)].map((_,i) => <span key={i} className="text-rose-400 text-xl heartbeat" style={{ animationDelay:`${i*.2}s` }}>❤️</span>)}
              </div>
              <div className="w-20 h-px mx-auto my-5" style={{ background: 'linear-gradient(90deg,transparent,rgba(244,63,94,.4),transparent)' }} />
              <p className="ds text-rose-500 text-2xl font-bold">Forever yours, AG 🫶</p>
            </R>
          </div>
        </section>
      </main>
    </div>
  );
}
