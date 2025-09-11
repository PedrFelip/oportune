import SidebarAluno from "./Sidebar";
import HeaderAluno from "./HeaderAluno";

export function Template({ children }) {
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
      <HeaderAluno />
      { children }
    </div>
  );
}
