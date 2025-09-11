import SidebarAluno from "./Sidebar";
import HeaderAluno from "./Header";

export default function Template({ children, title }) {
  
  return (
    <div
      className="min-h-screen bg-slate-900 grid"
      style={{
        gridTemplateAreas: `
          "sidebar header"
          "sidebar main"
        `,
        gridTemplateColumns: "260px 1fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <SidebarAluno />
      <HeaderAluno title={title} />
      <main style={{ gridArea: "main" }} className="p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
