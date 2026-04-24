import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  LocateFixed, 
  Loader2, 
  AlertTriangle, 
  RefreshCcw, 
  MapPin,
  Activity,
  Info
} from 'lucide-react';

class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full bg-[#051320] flex items-center justify-center p-8 text-center text-white font-sans">
          <div className="max-w-md">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-xl font-bold mb-2">حدث خطأ في عرض الخريطة</h2>
            <p className="text-gray-400 text-sm mb-6">{this.state.error?.message}</p>
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 mx-auto bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              <RefreshCcw size={18} /> تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const normalizeArabic = (text) => {
  if (!text) return "";
  return text.toString().toLowerCase()
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[يى]/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '');
};

const MapAreaContent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const searchIndexRef = useRef([]); 
  const isMounted = useRef(true);
  
  // مرجع لطبقة المحافظات لتعديل ألوانها لاحقاً
  const govLayerRef = useRef(null);

  const [isLeafletReady, setIsLeafletReady] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("جاري جلب محرك الخرائط...");
  const [clickedCoord, setClickedCoord] = useState(null);

  // حالة الرادار الوبائي المرتبط بالباك-إند (تلقائي)
  const [epidemicData, setEpidemicData] = useState(null);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const styles = {
    admin1: { color: "#0ea5e9", weight: 2, fillOpacity: 0.1, fillColor: "#0ea5e9" },
    neighborhoods: { color: "#10b981", weight: 1.5, fillOpacity: 0.15 }
  };

  const getAdminContext = (p, label) => {
    if (label === 'المحافظة') return { name: p.adm1_name1 || p.name_ar || p.name || "محافظة غير مسماة", context: "سوريا" };
    if (label === 'الحي') return { name: p.adm4_name1 || p.adm4_ar || p.NAME_AR || p.name_ar || "حي", context: "" };
    return { name: "غير مسمى", context: "" };
  };

  useEffect(() => {
    isMounted.current = true;
    if (window.L) { setIsLeafletReady(true); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => { if (isMounted.current) setIsLeafletReady(true); };
    document.body.appendChild(script);
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!isLeafletReady || !mapRef.current || mapInstance.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([34.8, 38.5], 7);
    mapInstance.current = map;

    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
    const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; Esri' });

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setClickedCoord({ lat, lng });
      L.popup().setLatLng(e.latlng).setContent(`
        <div class="text-right p-1 font-sans">
          <div class="font-bold text-gray-800 border-b mb-1 pb-1">إحداثيات الموقع</div>
          <div class="text-xs text-gray-600 font-mono select-all mb-2">${lat.toFixed(6)}, ${lng.toFixed(6)}</div>
          <button class="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded transition-colors" onclick="navigator.clipboard.writeText('${lat},${lng}')">نسخ الإحداثيات</button>
        </div>
      `).openOn(map);
    });

    const loadInitialData = async () => {
      setStatusMsg("جاري تحميل التقسيمات الإدارية...");
      const overlays = {};
      const localSearchBuffer = [];

      try {
        const resGov = await fetch(`/data/syr_admin1.geojson`);
        if (resGov.ok) {
           const dataGov = await resGov.json();
           const govLayer = L.geoJSON(dataGov, {
             style: styles.admin1,
             onEachFeature: (f, l) => {
               const { name } = getAdminContext(f.properties, 'المحافظة');
               l.feature.properties.arabicName = name; 
               l.bindPopup(`<b>المحافظة:</b> ${name}`);
               if (name !== "محافظة غير مسماة") {
                 localSearchBuffer.push({ name, fullName: name, type: 'المحافظة', searchKey: normalizeArabic(name), bounds: l.getBounds() });
               }
             }
           });
           overlays['المحافظات'] = govLayer;
           govLayerRef.current = govLayer; 
           govLayer.addTo(map);
        }

        const resNeigh = await fetch(`/data/syr_neighborhoods.geojson`);
        if (resNeigh.ok) {
           const dataNeigh = await resNeigh.json();
           const neighLayer = L.geoJSON(dataNeigh, {
             style: styles.neighborhoods,
             onEachFeature: (f, l) => {
               const { name } = getAdminContext(f.properties, 'الحي');
               l.bindPopup(`<b>الحي:</b> ${name}`);
             }
           });
           overlays['الأحياء'] = neighLayer;
        }
      } catch (e) { console.error("Error loading geojson files", e); }

      const baseMaps = { "خريطة الشوارع": streetMap, "الأقمار الصناعية": satelliteMap };
      searchIndexRef.current = localSearchBuffer;
      L.control.layers(baseMaps, overlays, { position: 'topright' }).addTo(map);
      
      setLoading(false);
    };

    loadInitialData();

    return () => { if (mapInstance.current) mapInstance.current.remove(); };
  }, [isLeafletReady]);

  // -------------------------------------------------------------
  // الجلب التلقائي للبيانات من الباك-إند كل ثانيتين
  // -------------------------------------------------------------
  const fetchEpidemicData = async () => {
    setIsFetchingData(true);
    try {
      const response = await fetch('http://localhost:5000/api/epidemic-status');
      if (!response.ok) throw new Error("فشل الاتصال");
      const data = await response.json();
      setEpidemicData(data.regions);
    } catch (err) {
      // تجاوز الخطأ بصمت وإلغاء البيانات لتعود الخريطة للوضع الافتراضي
      setEpidemicData(null);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    // جلب أولي للبيانات
    fetchEpidemicData();
    // تكرار الجلب كل ثانيتين
    const interval = setInterval(fetchEpidemicData, 2000); 
    return () => clearInterval(interval);
  }, []);

  // تلوين المحافظات بناءً على بيانات الباك-إند التلقائية
  useEffect(() => {
    if (!govLayerRef.current) return;

    govLayerRef.current.eachLayer((layer) => {
      const name = layer.feature.properties.arabicName;
      
      if (epidemicData && epidemicData[name]) {
        const info = epidemicData[name];
        layer.setStyle({
          fillColor: info.color,
          fillOpacity: 0.65,
          color: "#fff",
          weight: 1
        });
        
        layer.bindPopup(`
          <div class="text-right font-sans min-w-[160px]">
            <div class="font-bold border-b pb-1 mb-2 text-lg">${name}</div>
            <div class="flex justify-between mb-1 text-sm"><span>الحالات:</span> <span class="font-bold font-mono text-red-600">${info.active_cases}</span></div>
            <div class="flex justify-between mb-1 text-sm"><span>الخطورة:</span> <span class="font-bold" style="color:${info.color}">${info.status}</span></div>
            <div class="flex justify-between mb-1 text-sm"><span>مؤشر الذكاء الاصطناعي:</span> <span class="font-bold font-mono">${info.score}%</span></div>
            <div class="text-[9px] text-gray-400 mt-2 text-left">آخر تحديث من القاعدة: ${info.last_updated}</div>
          </div>
        `);
      } else {
        // العودة للوضع الافتراضي إذا لم يكن هناك بيانات أو انقطع الاتصال
        layer.setStyle({ color: "#0ea5e9", weight: 2, fillOpacity: 0.1, fillColor: "#0ea5e9" });
        layer.bindPopup(`<b>المحافظة:</b> ${name}`);
      }
    });
  }, [epidemicData]);


  const handleSearch = (val) => {
    setQuery(val);
    if (val.trim().length < 2) { setResults([]); setShowResults(false); return; }
    
    const normalizedQuery = normalizeArabic(val.trim());
    const filtered = searchIndexRef.current.filter(item => 
      item?.searchKey?.includes(normalizedQuery)
    ).slice(0, 15); 
    
    setResults(filtered);
    setShowResults(true);
  };

  return (
    <div className="relative w-full h-full bg-[#051320] font-sans overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-[2000] flex flex-col items-center justify-center bg-[#051320] text-white">
          <Loader2 className="animate-spin mb-4 text-blue-500" size={48} />
          <p className="text-lg animate-pulse">{statusMsg}</p>
        </div>
      )}

      {/* شريط البحث */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-lg px-4 pointer-events-none">
        <div className="relative pointer-events-auto">
          <div className="bg-[#0a1f33]/95 backdrop-blur-md border border-white/10 rounded-2xl flex items-center px-4 py-3 shadow-2xl transition-all focus-within:ring-2 focus-within:ring-blue-500">
            <Search size={20} className="text-blue-400 ml-3" />
            <input
              type="text"
              placeholder="ابحث عن محافظة..."
              className="bg-transparent border-none outline-none flex-grow text-white text-right text-sm placeholder-gray-500"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => query.length >= 2 && setShowResults(true)}
              dir="rtl"
            />
          </div>
          
          {showResults && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-[#0a1f33] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-[70vh] overflow-y-auto scrollbar-hide">
              {results.map((res, i) => (
                <div key={i} className="p-3 hover:bg-blue-600/30 cursor-pointer border-b border-white/5 text-right flex justify-between items-center transition-colors" onMouseDown={() => {
                  mapInstance.current.fitBounds(res.bounds, { padding: [20, 20], maxZoom: 12 });
                  setQuery(res.name); setShowResults(false);
                }}>
                  <span className="text-[9px] px-2 py-0.5 rounded uppercase font-bold border shrink-0 ml-2 bg-blue-900 text-blue-300 border-blue-500/30">{res.type}</span>
                  <div className="flex flex-col"><span className="text-sm text-white font-medium">{res.name}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* زر تحديد الموقع فقط */}
      <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-3">
        <button onClick={() => navigator.geolocation.getCurrentPosition(p => mapInstance.current.setView([p.coords.latitude, p.coords.longitude], 10))} className="bg-[#0a1f33] p-3 rounded-full shadow-2xl text-blue-400 border border-blue-500/50 hover:bg-blue-900/50 transition-all flex items-center justify-center" title="تحديد موقعي">
          <LocateFixed size={24} />
        </button>
      </div>

      {/* مفتاح الألوان (يظهر فقط عند وجود بيانات الوباء) */}
      {epidemicData && (
        <div className="absolute bottom-6 left-6 z-[1000] bg-[#0a1f33]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl text-white font-sans w-56 animate-in slide-in-from-bottom-5">
          <h3 className="font-bold text-sm mb-3 border-b border-white/10 pb-2 flex items-center gap-2">
            <Activity size={16} className="text-red-400" /> رادار التنبؤ الوبائي
          </h3>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]"></span> تفشي وبائي</span><span>&gt; 80%</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f97316]"></span> إنذار مبكر</span><span>50 - 80%</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#eab308]"></span> حالات اشتباه</span><span>20 - 50%</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#22c55e]"></span> وضع آمن</span><span>&lt; 20%</span></div>
          </div>
          <div className="mt-3 text-[9px] text-blue-300 text-center flex items-center justify-center gap-1 bg-blue-900/30 py-1 rounded">
            {isFetchingData ? <Loader2 size={10} className="animate-spin" /> : <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
            اتصال حي بالخادم (تحديث آلي)
          </div>
        </div>
      )}

      {/* لوحة الإحداثيات السريعة */}
      {clickedCoord && !epidemicData && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-[#0a1f33]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-[11px] font-mono shadow-xl flex items-center gap-2">
           <MapPin size={14} className="text-blue-400" />
           Lat: {clickedCoord.lat.toFixed(5)} | Lng: {clickedCoord.lng.toFixed(5)}
        </div>
      )}

      <div ref={mapRef} className="w-full h-full z-0 outline-none bg-[#051320]"></div>
    </div>
  );
};

const MapArea = () => (
  <MapErrorBoundary>
    <MapAreaContent />
  </MapErrorBoundary>
);

export default MapArea;