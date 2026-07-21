"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navGroups, navItems, siteContent } from "@/lib/content";

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const headerGroups = navGroups.filter((group) => group.label !== "Site");

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <Link href="/" className="brand" aria-label={siteContent.siteName} onClick={() => setOpenGroup(null)}>
        <span className="brand-mark" aria-hidden="true">FT</span>
        <span className="brand-copy"><strong>Fate Trigger</strong><small>Guide</small></span>
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpenGroup(null)}>{item.label}</Link>
        ))}
        <Link href="/search" onClick={() => setOpenGroup(null)}>Search</Link>
        {headerGroups.map((group) => {
          const isOpen = openGroup === group.label;
          return (
            <div className={isOpen ? "nav-dropdown is-open" : "nav-dropdown"} key={group.label}>
              <button
                className="nav-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setOpenGroup(isOpen ? null : group.label)}
              >
                {group.label}
              </button>
              <div className="nav-menu" role="menu">
                <div className="nav-group">
                  <strong>{group.label}</strong>
                  {group.links.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" onClick={() => setOpenGroup(null)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </header>
  );
}
