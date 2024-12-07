import AdUnit from "./ad-units";

export function Footer() {
  return (
    <footer className="container py-6 flex flex-col gap-4">
      <div className="mx-auto">
        <AdUnit
          adSlot="2962196569"
          adFormat={null}
          style={{ width: "728px", height: "90px" }}
        />
      </div>
      <div className="flex items-center justify-center">
        <p>© 2024 RocksDev.Tools</p>
      </div>
    </footer>
  );
}
