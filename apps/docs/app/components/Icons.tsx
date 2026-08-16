import React from "react";

export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function TwitterXIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ReactIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TailwindIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C9.337,13.382,7.976,12,6.001,12z" />
    </svg>
  );
}

export function TypeScriptIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#3178C6">
      <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21l-1.5-1.5v-21zm10.74 13.53h-3.48v8.97h-2.91v-8.97h-3.48v-2.52h9.87zm10.02 5.07c0 2.4-1.83 3.96-4.71 3.96-1.53 0-3-.42-3.99-1.05l.93-2.31c.78.48 1.95.93 3.03.93 1.23 0 1.83-.54 1.83-1.29 0-.84-.75-1.17-2.19-1.71-2.07-.75-3.33-1.83-3.33-3.69 0-2.34 1.86-3.75 4.47-3.75 1.44 0 2.61.36 3.48.81l-.9 2.25c-.66-.36-1.59-.69-2.58-.69-1.08 0-1.62.48-1.62 1.14 0 .78.78 1.08 2.22 1.62 2.22.84 3.45 1.89 3.45 3.78z" />
    </svg>
  );
}

export function NpmIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#CB3837">
      <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21l-1.5-1.5v-21zm2.5 4v16h8v-12h4v12h4v-16z" />
    </svg>
  );
}

export function LucideIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F56565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4.5v9L12 22l-8-4.5v-9L12 2z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v10" />
      <path d="M12 12L4 7.5" />
    </svg>
  );
}

/**
 * Inaikode Official Brand Logo
 */
export function InaicodeLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 164 170"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>inaikode logo</title>
      <g
        transform="translate(-31.512914,181.840672) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M1035 1809 c-320 -41 -544 -221 -621 -499 -29 -102 -26 -348 4 -456 l23 -80 -37 -40 c-21 -21 -49 -64 -63 -94 -22 -47 -26 -69 -26 -155 0 -90 3 -106 29 -159 39 -79 102 -140 184 -179 l67 -32 530 0 530 0 66 31 c127 60 209 173 229 312 33 239 -104 439 -330 482 -29 5 -201 10 -382 10 -360 0 -374 -2 -397 -58 -16 -37 -5 -77 26 -102 25 -19 42 -20 372 -20 263 -1 355 -4 384 -14 100 -36 152 -116 151 -231 -1 -150 -105 -245 -269 -245 -122 0 -446 130 -638 257 -202 133 -297 310 -297 551 1 160 44 282 136 381 62 67 138 111 249 143 113 32 352 32 468 0 109 -30 188 -75 252 -143 64 -70 93 -141 101 -247 8 -110 11 -120 44 -137 42 -22 77 -19 105 10 23 22 25 32 25 117 0 167 -49 289 -159 398 -79 79 -146 119 -266 159 -142 47 -320 61 -490 40z m-265 -1422 c47 -30 105 -65 130 -78 l45 -24 -30 -3 c-16 -2 -84 -2 -150 0 -126 4 -161 14 -213 62 -59 53 -80 160 -46 232 l17 35 81 -85 c47 -48 117 -107 166 -139z" />
        <path d="M895 1331 c-63 -26 -80 -106 -31 -148 l28 -24 283 3 c257 3 285 5 303 21 27 25 36 64 21 99 -22 55 -43 58 -326 57 -142 0 -267 -4 -278 -8z" />
      </g>
    </svg>
  );
}

// Alias for compatibility
export const AiKitLogo = InaicodeLogo;
