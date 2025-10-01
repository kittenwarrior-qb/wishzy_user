import React from "react";

interface WishzyLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const WishzyLogo: React.FC<WishzyLogoProps> = ({
  width = "auto",
  height = 40,
  className = "",
}) => {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 862.21 380.67"
      width={width}
      height={height}
      className={className}
      style={{ width: `${width}px`, height: "auto" }}
    >
      <defs>
        <style>
          {`
              @font-face {
      font-family: 'Stargod';
      src: url('/Stargod-Font/Stargod.woff') format('woff'),
           url('/Stargod-Font/Stargod.ttf') format('truetype'),
           url('/Stargod-Font/Stargod.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
            .cls-7 {
              font-family: Stargod, Stargod;
              font-size: 119.88px;
            }
            .cls-8, .cls-5 {
              letter-spacing: -.02em;
            }
            .cls-2 {
              letter-spacing: -.02em;
            }
            .cls-3 {
              letter-spacing: -.02em;
            }
            .cls-9 {
              stroke-width: 0px;
            }
            .cls-4 {
              letter-spacing: 0em;
            }
            .cls-10 {
              letter-spacing: -.03em;
            }
            .cls-11 {
              letter-spacing: -.02em;
            }
            .cls-6 {
              letter-spacing: -.02em;
            }
            .cls-1, 
            .cls-4, 
            .cls-5, 
            .cls-7, 
            .cls-9, 
            .cls-11,
            .cls-12,
            .cls-13 {
              fill: var(--color-primary) !important;
            }
            .cls-1,
            .cls-4,
            .cls-5,
            .cls-2,
            .cls-3, 
            .cls-6 {
              fill: #fff !important;
            }
          `}
        </style>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1">
        <circle className="cls-9" cx="190.34" cy="190.34" r="190.34" />
        <text
          className="cls-7"
          transform="translate(28.51 219.06) scale(1.09 1)"
        >
          <tspan className="cls-6" x="0" y="0">
            w
          </tspan>
          <tspan className="cls-3" x="81.76" y="0">
            i
          </tspan>
          <tspan className="cls-1" x="105.26" y="0">
            s
          </tspan>
          <tspan className="cls-2" x="147.81" y="0">
            h
          </tspan>
          <tspan className="cls-4" x="208.11" y="0">
            z
          </tspan>
          <tspan className="cls-5" x="264.22" y="0">
            y
          </tspan>
          <tspan className="cls-12" x="326.79" y="0">
            Le
          </tspan>
          <tspan className="cls-8" x="429.41" y="0">
            a
          </tspan>
          <tspan className="cls-12" x="486.23" y="0">
            r
          </tspan>
          <tspan className="cls-10" x="533.83" y="0">
            n
          </tspan>
          <tspan className="cls-12" x="589.81" y="0">
            i
          </tspan>
          <tspan className="cls-11" x="615.59" y="0">
            n
          </tspan>
          <tspan className="cls-12" x="672.89" y="0">
            g.
          </tspan>
        </text>
      </g>
    </svg>
  );
};
