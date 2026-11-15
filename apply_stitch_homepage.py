import os
import re
from bs4 import BeautifulSoup

def process_html():
    with open(r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\stitch-homepage.html", "r", encoding="utf-8") as f:
        html = f.read()

    soup = BeautifulSoup(html, "html.parser")
    body = soup.body
    if not body:
        print("No body found")
        return

    # Remove the script tag
    script_tag = body.find("script")
    if script_tag:
        script_tag.extract()

    # Convert to string and handle JSX replacements
    body_str = ""
    for child in body.children:
        body_str += str(child)

    # Basic conversions
    body_str = body_str.replace('class=', 'className=')
    body_str = body_str.replace('tabindex=', 'tabIndex=')
    body_str = body_str.replace('<!--', '{/*')
    body_str = body_str.replace('-->', '*/}')
    
    # Self close tags
    body_str = re.sub(r'<input([^>]*?)>', r'<input\1 />', body_str)
    
    # We also need to fix the logo to use the generated image instead of just icon.
    # In the header, let's inject the Image component.
    # The header has: 
    # <span className="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">build</span>
    # <span className="tracking-tight">ToolPixa</span>
    # We can replace this with our custom logo!

    # Fix style attributes which use strings in HTML to objects in React
    body_str = body_str.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{ fontVariationSettings: \"'FILL' 1\" }}")
    
    # Let's wrap it in a React component
    react_code = f"""'use client';

import React, {{ useEffect }} from 'react';
import Image from 'next/image';

export default function Home() {{
  useEffect(() => {{
    const handleKeyDown = (e: KeyboardEvent) => {{
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {{
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }}
    }};
    document.addEventListener('keydown', handleKeyDown);

    const cards = document.querySelectorAll('.glass-card') as NodeListOf<HTMLElement>;
    const mouseMoveHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();
    const mouseLeaveHandlers = new Map<HTMLElement, () => void>();

    cards.forEach(card => {{
      const moveHandler = (e: MouseEvent) => {{
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) scale(1.02) rotateX(${{rotateX}}deg) rotateY(${{rotateY}}deg)`;
      }};
      
      const leaveHandler = () => {{
        card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
      }};

      card.addEventListener('mousemove', moveHandler);
      card.addEventListener('mouseleave', leaveHandler);
      
      mouseMoveHandlers.set(card, moveHandler);
      mouseLeaveHandlers.set(card, leaveHandler);
    }});

    return () => {{
      document.removeEventListener('keydown', handleKeyDown);
      cards.forEach(card => {{
        const moveHandler = mouseMoveHandlers.get(card);
        const leaveHandler = mouseLeaveHandlers.get(card);
        if (moveHandler) card.removeEventListener('mousemove', moveHandler);
        if (leaveHandler) card.removeEventListener('mouseleave', leaveHandler);
      }});
    }};
  }}, []);

  return (
    <>
      {body_str}
    </>
  );
}}
"""
    # Let's add the Logo image in place of the build icon.
    react_code = react_code.replace(
        '<span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "\'FILL\' 1" }}>build</span>\n<span className="tracking-tight">ToolPixa</span>',
        '<Image src="/logo.png" alt="ToolPixa Logo" width={40} height={40} className="mr-2" />\n<span className="tracking-tight">ToolPixa</span>'
    )
    
    with open(r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\app\page.tsx", "w", encoding="utf-8") as f:
        f.write(react_code)
    
    print("Successfully generated src/app/page.tsx")

if __name__ == "__main__":
    process_html()
