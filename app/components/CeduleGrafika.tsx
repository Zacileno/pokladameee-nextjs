// Adam + cedule s názvem kraje / města (styly .cedule-* v globals.css)
export default function CeduleGrafika({ text }: { text: string }) {
  return (
    <div className="cedule-grafika">
      <div className="cedule-drzak">
        <div className="cedule">{text}</div>
      </div>
      <div className="cedule-tyc" />
      <div className="cedule-foto">
        <img src="/assets/adam-cedule.jpg" alt="Adam Hajdušek z pokládámeee.cz" width={420} height={292} />
      </div>
      <div className="cedule-odznak">
        <span style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.1 }}>Zaměření<br />zdarma!</span>
        <span className="cedule-odznak-pill">do 48 hodin</span>
      </div>
    </div>
  )
}
