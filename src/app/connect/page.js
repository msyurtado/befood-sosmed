'use client';
import { useState } from "react";

const B = { blue:"#2B5DAD", gold:"#F5A623", midBlue:"#1A3F7A", lightBlue:"#E8F0FB", pale:"#F4F6FB" };
const C = { success:"#16A34A" };

export default function ConnectPage() {
  const [igConnected, setIgConnected] = useState(false);
  const [ttConnected, setTtConnected] = useState(false);
  const [loading, setLoading] = useState(null);
  const [done, setDone] = useState(false);

  const connect = (platform) => {
    setLoading(platform);
    setTimeout(() => {
      setLoading(null);
      if (platform === "ig") setIgConnected(true);
      else setTtConnected(true);
    }, 2000);
  };

  if (done) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:B.pale,fontFamily:"system-ui,sans-serif"}}>
      <div style={{textAlign:"center",background:"#fff",padding:"40px",borderRadius:20,border:`1px solid ${B.lightBlue}`,maxWidth:400}}>
        <div style={{fontSize:48,marginBottom:16}}>🎉</div>
        <h2 style={{color:B.midBlue,margin:"0 0 8px"}}>Berhasil Terhubung!</h2>
        <p style={{color:"#888",fontSize:13}}>Akun sosmed cabang kamu sudah terdaftar di dashboard pusat Befood.</p>
        <p style={{color:"#aaa",fontSize:12}}>Halaman ini bisa ditutup sekarang.</p>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:B.pale,fontFamily:"system-ui,sans-serif",padding:16}}>
      <style>{`*{box-sizing:border-box;}@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#fff",padding:"8px 16px",borderRadius:99,border:`1px solid ${B.lightBlue}`}}>
            <div style={{width:24,height:24,borderRadius:6,background:`linear-gradient(135deg,${B.blue},${B.midBlue})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 12C3 7 7 3 12 3s9 4 9 9-4 9-9 9-9-4-9-9z" stroke="#fff" strokeWidth="2"/><path d="M8 12l2.5 2.5L16 9" stroke={B.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{fontWeight:800,fontSize:14,color:B.midBlue}}>befood</span>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:20,border:`1px solid ${B.lightBlue}`,overflow:"hidden",boxShadow:"0 4px 24px rgba(43,93,173,0.08)"}}>
          <div style={{background:`linear-gradient(135deg,${B.midBlue},${B.blue})`,padding:"28px 28px 24px"}}>
            <h1 style={{margin:0,fontSize:20,fontWeight:800,color:"#fff"}}>Hubungkan Akun Sosmed</h1>
            <p style={{margin:"8px 0 0",fontSize:13,color:"#93C5FD",lineHeight:1.6}}>Proses ini hanya sekali. Data kamu akan otomatis terpantau oleh tim pusat.</p>
          </div>
          <div style={{padding:"24px 28px 28px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>Pilih platform</div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
              {[
                {key:"ig",label:"Hubungkan Instagram",color:"#E1306C",bg:"#FFF0F5",done:igConnected},
                {key:"tt",label:"Hubungkan TikTok",color:"#111",bg:"#F8F8F8",done:ttConnected},
              ].map(btn=>(
                <button key={btn.key} onClick={()=>!btn.done&&connect(btn.key)} disabled={!!loading} style={{width:"100%",padding:"13px",borderRadius:12,border:`2px solid ${btn.done?C.success:btn.color}`,background:btn.done?"#F0FDF4":btn.bg,color:btn.done?C.success:btn.color,fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:800,cursor:btn.done?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  {loading===btn.key
                    ? <><div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${btn.color}44`,borderTop:`2px solid ${btn.color}`,animation:"spin 0.8s linear infinite"}}/> Menghubungkan...</>
                    : btn.done ? `✓ ${btn.key==="ig"?"Instagram":"TikTok"} Terhubung`
                    : btn.label}
                </button>
              ))}
            </div>
            {(igConnected||ttConnected)&&(
              <div style={{background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:12,color:"#166534"}}>
                ✅ Berhasil! Klik tombol di bawah untuk menyelesaikan.
              </div>
            )}
            <button onClick={()=>(igConnected||ttConnected)&&setDone(true)} disabled={!igConnected&&!ttConnected} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:(igConnected||ttConnected)?`linear-gradient(135deg,${B.blue},${B.midBlue})`:"#E2E8F0",color:(igConnected||ttConnected)?"#fff":"#aaa",fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:800,cursor:(igConnected||ttConnected)?"pointer":"default"}}>
              Selesaikan Pendaftaran →
            </button>
            <div style={{textAlign:"center",marginTop:14,fontSize:11,color:"#aaa"}}>
              Butuh bantuan? <a href="mailto:sosmed@befood.id" style={{color:B.blue,fontWeight:700}}>sosmed@befood.id</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
