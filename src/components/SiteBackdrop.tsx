"use client";

export function SiteBackdrop() {
  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <div className="site-backdrop__aurora" />
      </div>
      <div className="site-aurora-overlay" aria-hidden="true" />
    </>
  );
}
