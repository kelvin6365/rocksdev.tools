import AdUnit from "./ad-units";

export function Footer() {
  return (
    <footer className="container py-6 flex flex-col gap-4">
      <AdUnit
        adSlot="2962196569"
        adFormat="auto"
        style={{ width: "100%", height: "110px", display: "block" }}
      />
      <div className="flex items-center justify-center">
        <p>© 2024 RocksDev.Tools</p>
      </div>
    </footer>
  );
}
