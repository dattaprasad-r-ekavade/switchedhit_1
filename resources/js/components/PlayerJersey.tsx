import React from 'react';

interface PlayerJerseyProps {
    teamName?: string;
    playerName?: string;
    jerseyNumber?: number | string;
    primaryColor?: string;
    secondaryColor?: string;
    view?: 'front' | 'back';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function PlayerJersey({
    teamName = 'TEAM',
    playerName = 'PLAYER',
    jerseyNumber = '00',
    primaryColor = '#000000',
    secondaryColor = '#FFFFFF',
    view = 'front',
    size = 'md',
    className = '',
}: PlayerJerseyProps) {
    // Size configurations
    const sizes = {
        sm: { width: 100, height: 100, fontSize: 7, numberSize: 14, scale: 0.01 },
        md: { width: 150, height: 150, fontSize: 11, numberSize: 22, scale: 0.015 },
        lg: { width: 200, height: 200, fontSize: 14, numberSize: 28, scale: 0.02 },
    };

    const config = sizes[size];

    // Use defaults if colors are not provided
    const primary = primaryColor || '#000000';
    const secondary = secondaryColor || '#FFFFFF';

    return (
        <svg
            width={config.width}
            height={config.height}
            viewBox="0 0 1000 1000"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={`jersey-gradient-${view}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: primary, stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: primary, stopOpacity: 0.95 }} />
                    <stop offset="100%" style={{ stopColor: primary, stopOpacity: 0.9 }} />
                </linearGradient>
                <filter id={`shadow-${view}-${size}`}>
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="0" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {view === 'front' ? (
                <g transform="translate(0, -110)">
                    {/* T-Shirt Body - Using the provided SVG path */}
                    <g transform="scale(1.0, 1.0)">
                        <path
                            d="M2886.3,4377.7c-136.3-80.7-420.5-247.7-629.8-366.8c-796.9-462.8-1242.4-877.5-1728.2-1609.1c-170.9-261.1-376.4-622.2-416.7-737.4c-32.6-97.9,3.8-180.5,109.5-245.8c44.2-26.9,497.3-261.2,1008.1-518.5c781.5-395.6,937.1-468.5,983.1-457c34.6,9.6,74.9,49.9,122.9,119.1c38.4,59.5,71,103.7,74.9,101.8c23-25-190.1-2302.4-387.9-4145.8c-38.4-364.8-65.3-685.5-57.6-714.3c28.8-115.2-151.7-109.5,3043.6-109.5h2918.8l53.8,46.1l51.9,46.1l-51.9,697c-138.3,1826.1-282.3,3898-282.3,4067v78.7l92.2-96c53.8-55.7,109.5-96,132.5-96c38.4,0,445.5,217,1470.9,785.4c387.9,217,495.4,284.2,505,320.7c13.4,53.8-101.8,278.4-330.3,645.2c-364.8,585.7-637.5,939-927.5,1205.9c-291.9,270.8-445.5,370.6-942.8,624.1c-259.2,130.6-547.3,282.3-641.4,336c-261.1,151.7-232.3,149.8-478.1,28.8c-251.6-121-591.4-238.1-877.5-301.5c-176.7-38.4-255.4-44.2-643.3-44.2c-386,0-468.5,5.8-658.6,44.2c-366.8,73-781.5,224.7-1044.6,380.2c-63.4,36.5-136.3,65.3-165.1,63.4C3160.9,4525.5,3024.5,4458.3,2886.3,4377.7z"
                            fill={`url(#jersey-gradient-${view}-${size})`}
                            stroke={secondary}
                            strokeWidth="20"
                            transform="translate(0, 511) scale(0.1, -0.1)"
                            filter={`url(#shadow-${view}-${size})`}
                        />
                    </g>
                    
                    {/* Collar Overlay */}
                    <ellipse
                        cx="500"
                        cy="180"
                        rx="80"
                        ry="40"
                        fill={secondary}
                        stroke={secondary}
                        strokeWidth="2"
                    />

                    {/* Team Name on Front - Split into multiple lines if spaces exist */}
                    {(() => {
                        const words = teamName.trim().split(' ').filter(w => w.length > 0);
                        const lineHeight = 90;
                        const startY = 380;
                        
                        if (words.length === 1) {
                            // Single word - show as is
                            return (
                                <text
                                    x="500"
                                    y="450"
                                    textAnchor="middle"
                                    fill={secondary}
                                    fontSize="80"
                                    fontWeight="bold"
                                    fontFamily="Arial, sans-serif"
                                    style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
                                >
                                    {words[0].substring(0, 12)}
                                </text>
                            );
                        } else {
                            // Multiple words - split into lines
                            return (
                                <g>
                                    {words.map((word, index) => (
                                        <text
                                            key={index}
                                            x="500"
                                            y={startY + (index * lineHeight)}
                                            textAnchor="middle"
                                            fill={secondary}
                                            fontSize="80"
                                            fontWeight="bold"
                                            fontFamily="Arial, sans-serif"
                                            style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
                                        >
                                            {word.substring(0, 10)}
                                        </text>
                                    ))}
                                </g>
                            );
                        }
                    })()}

                    {/* Small number on front chest */}
                    <text
                        x="500"
                        y="650"
                        textAnchor="middle"
                        fill={secondary}
                        fontSize="120"
                        fontWeight="bold"
                        fontFamily="Arial, sans-serif"
                    >
                        {jerseyNumber}
                    </text>
                </g>
            ) : (
                <g transform="translate(0, -110)">
                    {/* T-Shirt Body - Back View */}
                    <g transform="scale(1.0, 1.0)">
                        <path
                            d="M2886.3,4377.7c-136.3-80.7-420.5-247.7-629.8-366.8c-796.9-462.8-1242.4-877.5-1728.2-1609.1c-170.9-261.1-376.4-622.2-416.7-737.4c-32.6-97.9,3.8-180.5,109.5-245.8c44.2-26.9,497.3-261.2,1008.1-518.5c781.5-395.6,937.1-468.5,983.1-457c34.6,9.6,74.9,49.9,122.9,119.1c38.4,59.5,71,103.7,74.9,101.8c23-25-190.1-2302.4-387.9-4145.8c-38.4-364.8-65.3-685.5-57.6-714.3c28.8-115.2-151.7-109.5,3043.6-109.5h2918.8l53.8,46.1l51.9,46.1l-51.9,697c-138.3,1826.1-282.3,3898-282.3,4067v78.7l92.2-96c53.8-55.7,109.5-96,132.5-96c38.4,0,445.5,217,1470.9,785.4c387.9,217,495.4,284.2,505,320.7c13.4,53.8-101.8,278.4-330.3,645.2c-364.8,585.7-637.5,939-927.5,1205.9c-291.9,270.8-445.5,370.6-942.8,624.1c-259.2,130.6-547.3,282.3-641.4,336c-261.1,151.7-232.3,149.8-478.1,28.8c-251.6-121-591.4-238.1-877.5-301.5c-176.7-38.4-255.4-44.2-643.3-44.2c-386,0-468.5,5.8-658.6,44.2c-366.8,73-781.5,224.7-1044.6,380.2c-63.4,36.5-136.3,65.3-165.1,63.4C3160.9,4525.5,3024.5,4458.3,2886.3,4377.7z"
                            fill={`url(#jersey-gradient-${view}-${size})`}
                            stroke={secondary}
                            strokeWidth="20"
                            transform="translate(0, 511) scale(0.1, -0.1)"
                            filter={`url(#shadow-${view}-${size})`}
                        />
                    </g>
                    
                    {/* Back Collar */}
                    <rect
                        x="420"
                        y="150"
                        width="160"
                        height="50"
                        fill={secondary}
                        stroke={secondary}
                        strokeWidth="2"
                        rx="5"
                    />

                    {/* Large Number on Back */}
                    <text
                        x="500"
                        y="500"
                        textAnchor="middle"
                        fill={secondary}
                        fontSize="250"
                        fontWeight="bold"
                        fontFamily="Arial, sans-serif"
                        stroke={secondary}
                        strokeWidth="2"
                    >
                        {jerseyNumber}
                    </text>

                    {/* Player Name on Back */}
                    {(() => {
                        // Get last name (or full name if single word)
                        const nameParts = playerName.split(' ').filter(w => w.length > 0);
                        const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : playerName;
                        
                        return (
                            <text
                                x="500"
                                y="750"
                                textAnchor="middle"
                                fill={secondary}
                                fontSize="70"
                                fontWeight="bold"
                                fontFamily="Arial, sans-serif"
                                style={{ textTransform: 'uppercase', letterSpacing: '3px' }}
                            >
                                {lastName.substring(0, 10)}
                            </text>
                        );
                    })()}
                </g>
            )}

            {/* Shadow/3D effect */}
            <ellipse
                cx={config.width * 0.5}
                cy={config.height * 0.92}
                rx={config.width * 0.35}
                ry={config.height * 0.05}
                fill="rgba(0,0,0,0.2)"
            />
        </svg>
    );
}

// Smaller bust version for dashboard
export function PlayerBust({
    teamName,
    primaryColor,
    secondaryColor,
    className = '',
}: {
    teamName?: string;
    primaryColor?: string;
    secondaryColor?: string;
    className?: string;
}) {
    const primary = primaryColor || '#000000';
    const secondary = secondaryColor || '#FFFFFF';

    return (
        <svg
            width="60"
            height="70"
            viewBox="0 0 1000 1000"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="bust-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: primary, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: primary, stopOpacity: 0.85 }} />
                </linearGradient>
                <filter id="bust-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
                </filter>
            </defs>

            <g transform="translate(0, -110)">
                {/* T-Shirt Body - Bust View */}
                <g transform="scale(1.0, 1.0)">
                    <path
                        d="M2886.3,4377.7c-136.3-80.7-420.5-247.7-629.8-366.8c-796.9-462.8-1242.4-877.5-1728.2-1609.1c-170.9-261.1-376.4-622.2-416.7-737.4c-32.6-97.9,3.8-180.5,109.5-245.8c44.2-26.9,497.3-261.2,1008.1-518.5c781.5-395.6,937.1-468.5,983.1-457c34.6,9.6,74.9,49.9,122.9,119.1c38.4,59.5,71,103.7,74.9,101.8c23-25-190.1-2302.4-387.9-4145.8c-38.4-364.8-65.3-685.5-57.6-714.3c28.8-115.2-151.7-109.5,3043.6-109.5h2918.8l53.8,46.1l51.9,46.1l-51.9,697c-138.3,1826.1-282.3,3898-282.3,4067v78.7l92.2-96c53.8-55.7,109.5-96,132.5-96c38.4,0,445.5,217,1470.9,785.4c387.9,217,495.4,284.2,505,320.7c13.4,53.8-101.8,278.4-330.3,645.2c-364.8,585.7-637.5,939-927.5,1205.9c-291.9,270.8-445.5,370.6-942.8,624.1c-259.2,130.6-547.3,282.3-641.4,336c-261.1,151.7-232.3,149.8-478.1,28.8c-251.6-121-591.4-238.1-877.5-301.5c-176.7-38.4-255.4-44.2-643.3-44.2c-386,0-468.5,5.8-658.6,44.2c-366.8,73-781.5,224.7-1044.6,380.2c-63.4,36.5-136.3,65.3-165.1,63.4C3160.9,4525.5,3024.5,4458.3,2886.3,4377.7z"
                        fill="url(#bust-gradient)"
                        stroke={secondary}
                        strokeWidth="20"
                        transform="translate(0, 511) scale(0.1, -0.1)"
                        filter="url(#bust-shadow)"
                    />
                </g>
                
                {/* Collar */}
                <ellipse
                    cx="500"
                    cy="180"
                    rx="80"
                    ry="40"
                    fill={secondary}
                    stroke={secondary}
                    strokeWidth="2"
                />

                {/* Team Name - Split into multiple lines if spaces exist */}
                {(() => {
                    const name = teamName || 'TEAM';
                    const words = name.trim().split(' ').filter(w => w.length > 0);
                    const lineHeight = 90;
                    const startY = 380;
                    
                    if (words.length === 1) {
                        return (
                            <text
                                x="500"
                                y="450"
                                textAnchor="middle"
                                fill={secondary}
                                fontSize="80"
                                fontWeight="bold"
                                fontFamily="Arial, sans-serif"
                                style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
                            >
                                {words[0].substring(0, 8)}
                            </text>
                        );
                    } else {
                        return (
                            <g>
                                {words.map((word, index) => (
                                    <text
                                        key={index}
                                        x="500"
                                        y={startY + (index * lineHeight)}
                                        textAnchor="middle"
                                        fill={secondary}
                                        fontSize="70"
                                        fontWeight="bold"
                                        fontFamily="Arial, sans-serif"
                                        style={{ textTransform: 'uppercase', letterSpacing: '2px' }}
                                    >
                                        {word.substring(0, 8)}
                                    </text>
                                ))}
                            </g>
                        );
                    }
                })()}
            </g>
        </svg>
    );
}
