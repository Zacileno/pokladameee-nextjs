// Adam stojí, za ním cedule s názvem kraje / města (styly .cedule-* v globals.css)
// postavaUrl = postava ze Studia (Obecné nastavení → Postava na stránkách lokalit), jinak Adam
export default function CeduleGrafika({ text, postavaUrl }: { text: string; postavaUrl?: string | null }) {
  return (
    <div className="cedule-grafika">
      <div className="cedule-drzak">
        <div className="cedule">{text}</div>
        <div className="cedule-tyc" />
      </div>
      <img src={postavaUrl || '/assets/adam-postava.png'} alt={postavaUrl ? 'Specialista z pokládámeee.cz' : 'Adam Hajdušek z pokládámeee.cz'} width={469} height={900} className="cedule-postava" />
      <div className="cedule-odznak">
        <span style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.1 }}>Zaměření<br />zdarma!</span>
        <span className="cedule-odznak-pill">do 48 hodin</span>
      </div>
    </div>
  )
}
