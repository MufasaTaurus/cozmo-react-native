import React from 'react';

export default function Image({ className, onClick }) {
    const icon =
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="619" height="371" viewBox="0 0 619 371">
    <defs>
        <rect id="a" width="101" height="15" x="317" y="197" rx="4"/>
        <rect id="b" width="20" height="27" x="358" y="93" rx="3"/>
    </defs>
    <g fill="none" fill-rule="evenodd" transform="translate(0 -2)">
        <path fill="#FFCF06" d="M443 37a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
        <path fill="#3598F8" d="M489 121a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
        <path fill="#000" fill-rule="nonzero" d="M441 36.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0zm3 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zM488 120.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0zm3 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        <path fill="#10BDA5" d="M152.5 86.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
        <path fill="#000" fill-rule="nonzero" d="M151 86.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0zm3 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        <use fill="#D8D8D8" xlink:href="#a"/>
        <rect width="98" height="12" x="318.5" y="198.5" stroke="#000" stroke-width="3" rx="4"/>
        <path fill="#000" fill-rule="nonzero" d="M184 169.947v176.106h22V169.947h-22zM181 165h28v186h-28V165z"/>
        <rect width="67" height="22" x="161" y="349" fill="#3598F8" rx="3"/>
        <path fill="#000" fill-rule="nonzero" d="M163 348h63a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-63a3 3 0 0 1-3-3v-18a3 3 0 0 1 3-3zm0 3v18h63v-18h-63zM184.818 72.818v20.364h20.364V72.818h-20.364zM181 69h28v28h-28V69zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M184.818 96.818v20.364h20.364V96.818h-20.364zM181 93h28v28h-28V93zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M184.818 120.818v20.364h20.364v-20.364h-20.364zM181 117h28v28h-28v-28zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M184.818 144.818v20.364h20.364v-20.364h-20.364zM181 141h28v28h-28v-28zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958zM184.818 48.818v20.364h20.364V48.818h-20.364zM181 45h28v28h-28V45zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M184.818 24.818v20.364h20.364V24.818h-20.364zM181 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M208.818 24.818v20.364h20.364V24.818h-20.364zM205 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M232.818 24.818v20.364h20.364V24.818h-20.364zM229 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M256.818 24.818v20.364h20.364V24.818h-20.364zM253 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M280.818 24.818v20.364h20.364V24.818h-20.364zM277 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#000" fill-rule="nonzero" d="M304.818 24.818v20.364h20.364V24.818h-20.364zM301 21h28v28h-28V21zm.885 4.41l2.672-2.726 24.332 23.848-2.672 2.727-24.332-23.849zm24.48-4.073l2.71 2.69-24.773 24.958-2.71-2.69 24.773-24.958z"/>
        <path fill="#D8D8D8" d="M326 21l73.335 12.445A2 2 0 0 1 401 35.416V47a2 2 0 0 1-2 2h-73V21z"/>
        <path fill="#000" fill-rule="nonzero" d="M329 46h69v-9.739l-69-11.709V46zm-3-25l73.335 12.445A2 2 0 0 1 401 35.416V47a2 2 0 0 1-2 2h-73V21z"/>
        <path fill="#D8D8D8" d="M184 21v28H64a2 2 0 0 1-2-2V35.53a2 2 0 0 1 1.792-1.99L184 21z"/>
        <path fill="#000" fill-rule="nonzero" d="M65 36.43V46h116V24.33L65 36.43zM184 21v28H64a2 2 0 0 1-2-2V35.53a2 2 0 0 1 1.792-1.99L184 21z"/>
        <path stroke="#000" stroke-width="3" d="M368 48v68.007M367.5 118.075l-44.943 80.418h89.886L367.5 118.075z"/>
        <path fill="#FFCF06" d="M185.758 17.202l6.295-10.747a3 3 0 0 1 5.177 0l6.296 10.747a3 3 0 0 1-2.589 4.516h-12.59a3 3 0 0 1-2.59-4.516z"/>
        <path fill="#000" fill-rule="nonzero" d="M194.843 5.697l-9.176 15.271 17.623.197-8.447-15.468zm2.633-1.438l8.447 15.468a3 3 0 0 1-2.666 4.438l-17.623-.197a3 3 0 0 1-2.538-4.545l9.176-15.27a3 3 0 0 1 5.204.106z"/>
        <use fill="#FFCF06" xlink:href="#b"/>
        <rect width="17" height="24" x="359.5" y="94.5" stroke="#000" stroke-width="3" rx="3"/>
        <path fill="#000" fill-rule="nonzero" d="M.5 372.5v-3h617.598v3z"/>
        <path fill="#000" fill-rule="nonzero" d="M270 236v134h208V236H270zm-3-3h214v140H267V233z"/>
        <path d="M348 289h55v55h-55z"/>
        <path fill="#3598F8" fill-rule="nonzero" d="M373.208 293.583v45.834c-11.618-1.146-20.625-10.977-20.625-22.917 0-11.94 9.007-21.77 20.625-22.917zm4.652 0v20.602h20.557c-1.077-10.862-9.717-19.525-20.557-20.602zm0 25.232v20.602c10.863-1.077 19.48-9.74 20.557-20.602H377.86z"/>
        <circle cx="281" cy="248" r="5" fill="#D0021B"/>
        <circle cx="297" cy="248" r="5" fill="#F5A623"/>
        <circle cx="313" cy="248" r="5" fill="#6CC40B"/>
        <path fill="#000" fill-rule="nonzero" d="M281 254.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm0-3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM297 254.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm0-3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM313 254.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm0-3a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
        <path fill="#000" fill-rule="nonzero" d="M270 236v23h208v-23H270zm-3-3h214v29H267v-29z"/>
        <path fill="#3598F8" d="M367 178h22v22h-22z"/>
        <path fill="#3598F8" d="M353 172h17v28h-17z"/>
        <path fill="#000" fill-rule="nonzero" d="M370 181v16h16v-16h-16zm-3-3h22v22h-22v-22z"/>
        <path fill="#000" fill-rule="nonzero" d="M356 175v22h11v-22h-11zm-3-3h17v28h-17v-28z"/>
        <path fill="#10BDA5" d="M259.24 354c4.166 0 7.601 3.095 8.154 7.109a4.792 4.792 0 1 1 1.406 9.37 4.785 4.785 0 0 1-4.005-2.166 8.203 8.203 0 0 1-5.555 2.166 8.24 8.24 0 0 1-8.24-8.24 8.239 8.239 0 0 1 8.24-8.239M484.351 354c-4.166 0-7.601 3.095-8.154 7.109a4.792 4.792 0 1 0-1.406 9.37 4.785 4.785 0 0 0 4.005-2.166 8.203 8.203 0 0 0 5.555 2.166 8.24 8.24 0 0 0 8.24-8.24 8.239 8.239 0 0 0-8.24-8.239"/>
        <path fill="#282828" fill-rule="nonzero" d="M258.74 356a6.74 6.74 0 1 0 0 13.479 6.7 6.7 0 0 0 4.543-1.773 1.5 1.5 0 0 1 2.266.283 3.29 3.29 0 1 0 1.785-4.946 1.5 1.5 0 0 1-1.926-1.23A6.736 6.736 0 0 0 258.74 356zm0 16.479a9.74 9.74 0 0 1-9.74-9.74 9.737 9.737 0 1 1 19.051-2.836 6.292 6.292 0 1 1 .249 12.576 6.272 6.272 0 0 1-4.204-1.613 9.674 9.674 0 0 1-5.356 1.613zM483.851 356a6.74 6.74 0 1 1 0 13.479 6.7 6.7 0 0 1-4.543-1.773 1.5 1.5 0 0 0-2.266.283 3.29 3.29 0 1 1-1.785-4.946 1.5 1.5 0 0 0 1.926-1.23 6.736 6.736 0 0 1 6.668-5.813zm0 16.479a9.74 9.74 0 0 0 9.74-9.74 9.737 9.737 0 1 0-19.051-2.836 6.292 6.292 0 1 0-.249 12.576c1.585 0 3.07-.593 4.204-1.613a9.674 9.674 0 0 0 5.356 1.613zM574 273v2.5a1.5 1.5 0 0 1-3 0V273h-2.5a1.5 1.5 0 0 1 0-3h2.5v-2.5a1.5 1.5 0 0 1 3 0v2.5h2.5a1.5 1.5 0 0 1 0 3H574zM308 153v2.5a1.5 1.5 0 0 1-3 0V153h-2.5a1.5 1.5 0 0 1 0-3h2.5v-2.5a1.5 1.5 0 0 1 3 0v2.5h2.5a1.5 1.5 0 0 1 0 3H308zM69 234v2.5a1.5 1.5 0 0 1-3 0V234h-2.5a1.5 1.5 0 0 1 0-3H66v-2.5a1.5 1.5 0 0 1 3 0v2.5h2.5a1.5 1.5 0 0 1 0 3H69z"/>
        <path fill="#10BDA5" d="M535.804 306.63c1.074-2.4 1.696-5.171 1.696-8.13 0-6-2.531-11.235-6.304-14.123 2.025-2.562 3.304-6.256 3.304-10.377 0-7.732-4.477-14-10-14s-10 6.268-10 14c0 4.121 1.28 7.815 3.304 10.377-3.773 2.888-6.304 8.123-6.304 14.123 0 2.959.621 5.73 1.696 8.13-4.954 3.536-8.196 9.319-8.196 15.87 0 10.77 8.73 19.5 19.5 19.5 10.769 0 19.5-8.73 19.5-19.5 0-6.551-3.241-12.334-8.196-15.87M127.804 306.63c1.074-2.4 1.696-5.171 1.696-8.13 0-6-2.531-11.235-6.304-14.123 2.025-2.562 3.304-6.256 3.304-10.377 0-7.732-4.477-14-10-14s-10 6.268-10 14c0 4.121 1.28 7.815 3.304 10.377-3.773 2.888-6.304 8.123-6.304 14.123 0 2.959.621 5.73 1.696 8.13-4.954 3.536-8.196 9.319-8.196 15.87 0 10.77 8.73 19.5 19.5 19.5 10.769 0 19.5-8.73 19.5-19.5 0-6.551-3.241-12.334-8.196-15.87"/>
        <path fill="#000" fill-rule="nonzero" d="M545 323c0 11.598-9.402 21-21 21s-21-9.402-21-21c0-6.457 2.947-12.419 7.869-16.368A21.61 21.61 0 0 1 509.5 299c0-5.731 2.176-11.012 5.785-14.377-1.782-2.785-2.785-6.35-2.785-10.123 0-8.473 5.02-15.5 11.5-15.5s11.5 7.027 11.5 15.5c0 3.774-1.003 7.339-2.785 10.123 3.61 3.365 5.785 8.646 5.785 14.377 0 2.67-.473 5.26-1.37 7.632 4.923 3.949 7.87 9.91 7.87 16.368zm-11.065-16.483c1.019-2.276 1.565-4.846 1.565-7.517 0-5.394-2.219-10.255-5.716-12.932l-1.21-.926.945-1.195c1.874-2.37 2.981-5.77 2.981-9.447 0-6.991-3.935-12.5-8.5-12.5-4.565 0-8.5 5.509-8.5 12.5 0 3.676 1.108 7.076 2.981 9.447l.944 1.195-1.21.926c-3.496 2.677-5.715 7.538-5.715 12.932 0 2.673.546 5.242 1.565 7.517l.502 1.12-1 .714C508.853 311.716 506 317.117 506 323c0 9.942 8.058 18 18 18 9.94 0 18-8.059 18-18 0-5.884-2.853-11.284-7.567-14.649l-1-.713.502-1.12zM137 323c0 11.598-9.402 21-21 21s-21-9.402-21-21c0-6.457 2.947-12.419 7.869-16.368A21.61 21.61 0 0 1 101.5 299c0-5.731 2.176-11.012 5.785-14.377-1.782-2.785-2.785-6.35-2.785-10.123 0-8.473 5.02-15.5 11.5-15.5s11.5 7.027 11.5 15.5c0 3.774-1.003 7.339-2.785 10.123 3.61 3.365 5.785 8.646 5.785 14.377 0 2.67-.473 5.26-1.37 7.632 4.923 3.949 7.87 9.91 7.87 16.368zm-11.065-16.483c1.019-2.276 1.565-4.846 1.565-7.517 0-5.394-2.219-10.255-5.716-12.932l-1.21-.926.945-1.195c1.874-2.37 2.981-5.77 2.981-9.447 0-6.991-3.935-12.5-8.5-12.5-4.565 0-8.5 5.509-8.5 12.5 0 3.676 1.108 7.076 2.981 9.447l.944 1.195-1.21.926c-3.496 2.677-5.715 7.538-5.715 12.932 0 2.673.546 5.242 1.565 7.517l.502 1.12-1 .714C100.853 311.716 98 317.117 98 323c0 9.942 8.058 18 18 18 9.94 0 18-8.059 18-18 0-5.884-2.853-11.284-7.567-14.649l-1-.713.502-1.12z"/>
        <path fill="#000" fill-rule="nonzero" d="M522.582 334.603V298h3v25.905l10.522-9.043 1.956 2.276-12.478 10.722V372h-3v-33.23l-.082.079-7.5-7.81 2.164-2.078 5.418 5.642zM114.582 334.603V298h3v25.905l10.522-9.043 1.956 2.276-12.478 10.722V372h-3v-33.23l-.082.079-7.5-7.81 2.164-2.078 5.418 5.642z"/>
    </g>
</svg>`;

    return (
        <span className={ className } onClick={ onClick } dangerouslySetInnerHTML={{ __html: icon }} />
    );
}
