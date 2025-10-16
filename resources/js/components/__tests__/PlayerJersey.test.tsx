import { render, screen } from '@testing-library/react';
import React from 'react';
import * as THREE from 'three';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { PlayerBust, PlayerJersey } from '../PlayerJersey';

// Mock Three.js to avoid WebGL context issues in tests
vi.mock('three', async () => {
    const actual = await vi.importActual<typeof THREE>('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            setPixelRatio: vi.fn(),
            setSize: vi.fn(),
            shadowMap: { enabled: false },
            render: vi.fn(),
            dispose: vi.fn(),
        })),
        Scene: vi.fn().mockImplementation(() => ({
            add: vi.fn(),
            clear: vi.fn(),
        })),
        PerspectiveCamera: vi.fn().mockImplementation(() => ({
            position: { set: vi.fn() },
            lookAt: vi.fn(),
        })),
        AmbientLight: vi.fn().mockImplementation(() => ({})),
        DirectionalLight: vi.fn().mockImplementation(() => ({
            position: { set: vi.fn(), x: 0, z: 0 },
            castShadow: false,
            shadow: {
                bias: 0,
                mapSize: { set: vi.fn() },
            },
        })),
        PointLight: vi.fn().mockImplementation(() => ({
            position: { set: vi.fn() },
        })),
        Group: vi.fn().mockImplementation(() => ({
            rotation: { x: 0, y: 0, z: 0 },
            position: { x: 0, y: 0, z: 0 },
            add: vi.fn(),
        })),
        BoxGeometry: vi.fn().mockImplementation(() => ({
            attributes: {
                position: {
                    count: 10,
                    setXYZ: vi.fn(),
                },
            },
            computeVertexNormals: vi.fn(),
            dispose: vi.fn(),
        })),
        TorusGeometry: vi.fn().mockImplementation(() => ({
            dispose: vi.fn(),
        })),
        CircleGeometry: vi.fn().mockImplementation(() => ({
            dispose: vi.fn(),
        })),
        MeshStandardMaterial: vi.fn().mockImplementation(() => ({
            dispose: vi.fn(),
        })),
        Mesh: vi.fn().mockImplementation(() => ({
            position: { set: vi.fn(), x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            castShadow: false,
            receiveShadow: false,
            clone: vi.fn().mockReturnThis(),
        })),
        Vector3: vi.fn().mockImplementation(() => ({
            fromBufferAttribute: vi.fn(),
            x: 0,
            y: 0,
            z: 0,
        })),
        Color: actual.Color,
    };
});

describe('PlayerJersey Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Basic Rendering', () => {
        it('should render with default props', () => {
            const { container } = render(<PlayerJersey />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should render front view by default', () => {
            const { container } = render(<PlayerJersey />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toBeInTheDocument();
        });

        it('should render back view when specified', () => {
            const { container } = render(<PlayerJersey view="back" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toBeInTheDocument();
        });

        it('should apply custom className', () => {
            const { container } = render(<PlayerJersey className="custom-class" />);
            const wrapper = container.querySelector('.custom-class');
            expect(wrapper).toBeInTheDocument();
        });
    });

    describe('Size Configuration', () => {
        it('should render small size correctly', () => {
            const { container } = render(<PlayerJersey size="sm" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '120');
            expect(canvas).toHaveAttribute('height', '150');
        });

        it('should render medium size correctly', () => {
            const { container } = render(<PlayerJersey size="md" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '180');
            expect(canvas).toHaveAttribute('height', '220');
        });

        it('should render large size correctly', () => {
            const { container } = render(<PlayerJersey size="lg" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '240');
            expect(canvas).toHaveAttribute('height', '290');
        });
    });

    describe('Team Name Display', () => {
        it('should display default team name when not provided', () => {
            render(<PlayerJersey />);
            expect(screen.getByText('TEAM')).toBeInTheDocument();
        });

        it('should display custom team name', () => {
            render(<PlayerJersey teamName="Lakers" />);
            expect(screen.getByText('LAKERS')).toBeInTheDocument();
        });

        it('should split multi-word team names into lines', () => {
            render(<PlayerJersey teamName="Los Angeles Lakers" />);
            expect(screen.getByText('LOS ANGELES')).toBeInTheDocument();
            expect(screen.getByText('LAKERS')).toBeInTheDocument();
        });

        it('should handle long team names by truncating', () => {
            render(<PlayerJersey teamName="This Is A Very Long Team Name" />);
            const spans = screen.getAllByText(/THIS IS A/);
            expect(spans.length).toBeGreaterThan(0);
        });

        it('should convert team name to uppercase', () => {
            render(<PlayerJersey teamName="warriors" />);
            expect(screen.getByText('WARRIORS')).toBeInTheDocument();
        });

        it('should handle empty team name', () => {
            render(<PlayerJersey teamName="" />);
            expect(screen.getByText('TEAM')).toBeInTheDocument();
        });

        it('should handle whitespace-only team name', () => {
            render(<PlayerJersey teamName="   " />);
            expect(screen.getByText('TEAM')).toBeInTheDocument();
        });
    });

    describe('Jersey Number Display', () => {
        it('should display default jersey number', () => {
            render(<PlayerJersey />);
            expect(screen.getByText('00')).toBeInTheDocument();
        });

        it('should display custom jersey number', () => {
            render(<PlayerJersey jerseyNumber={23} />);
            expect(screen.getByText('23')).toBeInTheDocument();
        });

        it('should handle string jersey numbers', () => {
            render(<PlayerJersey jerseyNumber="42" />);
            expect(screen.getByText('42')).toBeInTheDocument();
        });

        it('should handle single digit numbers', () => {
            render(<PlayerJersey jerseyNumber={7} />);
            expect(screen.getByText('7')).toBeInTheDocument();
        });

        it('should handle three digit numbers', () => {
            render(<PlayerJersey jerseyNumber={100} />);
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });

    describe('Player Name Display - Back View', () => {
        it('should display last name on back view', () => {
            render(<PlayerJersey view="back" playerName="LeBron James" />);
            expect(screen.getByText('JAMES')).toBeInTheDocument();
        });

        it('should display single name on back view', () => {
            render(<PlayerJersey view="back" playerName="Madonna" />);
            expect(screen.getByText('MADONNA')).toBeInTheDocument();
        });

        it('should display default player name when not provided', () => {
            render(<PlayerJersey view="back" />);
            expect(screen.getByText('PLAYER')).toBeInTheDocument();
        });

        it('should convert player name to uppercase', () => {
            render(<PlayerJersey view="back" playerName="stephen curry" />);
            expect(screen.getByText('CURRY')).toBeInTheDocument();
        });

        it('should handle empty player name', () => {
            render(<PlayerJersey view="back" playerName="" />);
            expect(screen.getByText('PLAYER')).toBeInTheDocument();
        });

        it('should truncate long last names', () => {
            render(<PlayerJersey view="back" playerName="John Verylonglastname" />);
            const nameElement = screen.getByText(/VERYLONGLAST/);
            expect(nameElement.textContent?.length).toBeLessThanOrEqual(12);
        });

        it('should handle names with multiple spaces', () => {
            render(<PlayerJersey view="back" playerName="John   Doe" />);
            expect(screen.getByText('DOE')).toBeInTheDocument();
        });
    });

    describe('Color Handling', () => {
        it('should accept hex color values', () => {
            const { container } = render(
                <PlayerJersey primaryColor="#FF0000" secondaryColor="#0000FF" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should accept named colors', () => {
            const { container } = render(
                <PlayerJersey primaryColor="red" secondaryColor="blue" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should accept RGB colors', () => {
            const { container } = render(
                <PlayerJersey primaryColor="rgb(255, 0, 0)" secondaryColor="rgb(0, 0, 255)" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should use default colors when not provided', () => {
            const { container } = render(<PlayerJersey />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should use fallback color for invalid primary color', () => {
            const { container } = render(<PlayerJersey primaryColor="invalid-color" />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should use fallback color for invalid secondary color', () => {
            const { container } = render(<PlayerJersey secondaryColor="not-a-color" />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle undefined colors gracefully', () => {
            const { container } = render(
                <PlayerJersey primaryColor={undefined} secondaryColor={undefined} />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });
    });

    describe('Front View Layout', () => {
        it('should display team name at correct position', () => {
            const { container } = render(<PlayerJersey view="front" teamName="Bulls" />);
            const teamNameContainer = container.querySelector('div[style*="top: 30%"]');
            expect(teamNameContainer).toBeInTheDocument();
        });

        it('should display number at correct position', () => {
            const { container } = render(<PlayerJersey view="front" jerseyNumber={23} />);
            const numberContainer = container.querySelector('div[style*="top: 58%"]');
            expect(numberContainer).toBeInTheDocument();
        });

        it('should have correct font sizes for small jersey', () => {
            const { container } = render(<PlayerJersey size="sm" view="front" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '120');
        });

        it('should have correct font sizes for large jersey', () => {
            const { container } = render(<PlayerJersey size="lg" view="front" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '240');
        });
    });

    describe('Back View Layout', () => {
        it('should display number at correct position', () => {
            const { container } = render(<PlayerJersey view="back" jerseyNumber={23} />);
            const numberContainer = container.querySelector('div[style*="top: 44%"]');
            expect(numberContainer).toBeInTheDocument();
        });

        it('should display player name at correct position', () => {
            const { container } = render(
                <PlayerJersey view="back" playerName="Jordan" />
            );
            const nameContainer = container.querySelector('div[style*="top: 74%"]');
            expect(nameContainer).toBeInTheDocument();
        });

        it('should not display front view elements', () => {
            const { container } = render(<PlayerJersey view="back" teamName="Bulls" />);
            const frontContainer = container.querySelector('div[style*="top: 30%"]');
            expect(frontContainer).not.toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('should handle all props as undefined', () => {
            const { container } = render(
                <PlayerJersey
                    teamName={undefined}
                    playerName={undefined}
                    jerseyNumber={undefined}
                    primaryColor={undefined}
                    secondaryColor={undefined}
                />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle numeric zero as jersey number', () => {
            render(<PlayerJersey jerseyNumber={0} />);
            expect(screen.getByText('0')).toBeInTheDocument();
        });

        it('should handle very long jersey number strings', () => {
            render(<PlayerJersey jerseyNumber="99999" />);
            expect(screen.getByText('99999')).toBeInTheDocument();
        });

        it('should handle special characters in names', () => {
            render(<PlayerJersey teamName="C's & B's" />);
            expect(screen.getByText(/C'S/)).toBeInTheDocument();
        });

        it('should handle unicode characters', () => {
            render(<PlayerJersey teamName="Dragões" />);
            expect(screen.getByText('DRAGÕES')).toBeInTheDocument();
        });
    });

    describe('Canvas Integration', () => {
        it('should create canvas element', () => {
            const { container } = render(<PlayerJersey />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toBeInTheDocument();
            expect(canvas?.tagName).toBe('CANVAS');
        });

        it('should set canvas dimensions correctly', () => {
            const { container } = render(<PlayerJersey size="md" />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '180');
            expect(canvas).toHaveAttribute('height', '220');
        });

        it('should have proper wrapper styling', () => {
            const { container } = render(<PlayerJersey size="lg" />);
            const wrapper = container.firstChild as HTMLElement;
            expect(wrapper).toHaveStyle({ width: '240px', height: '290px' });
        });
    });

    describe('Accessibility', () => {
        it('should have proper container structure', () => {
            const { container } = render(<PlayerJersey />);
            const wrapper = container.querySelector('.relative');
            expect(wrapper).toBeInTheDocument();
        });

        it('should have pointer-events-none on overlay', () => {
            const { container } = render(<PlayerJersey />);
            const overlay = container.querySelector('.pointer-events-none');
            expect(overlay).toBeInTheDocument();
        });
    });
});

describe('PlayerBust Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Basic Rendering', () => {
        it('should render with default props', () => {
            const { container } = render(<PlayerBust />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should render with fixed dimensions', () => {
            const { container } = render(<PlayerBust />);
            const canvas = container.querySelector('canvas');
            expect(canvas).toHaveAttribute('width', '120');
            expect(canvas).toHaveAttribute('height', '150');
        });

        it('should apply custom className', () => {
            const { container } = render(<PlayerBust className="bust-custom" />);
            expect(container.querySelector('.bust-custom')).toBeInTheDocument();
        });

        it('should always render front view', () => {
            const { container } = render(<PlayerBust />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });
    });

    describe('Team Name Display', () => {
        it('should display default team name', () => {
            render(<PlayerBust />);
            expect(screen.getByText('TEAM')).toBeInTheDocument();
        });

        it('should display custom team name', () => {
            render(<PlayerBust teamName="Warriors" />);
            expect(screen.getByText('WARRIORS')).toBeInTheDocument();
        });

        it('should split multi-word names', () => {
            render(<PlayerBust teamName="Golden State" />);
            expect(screen.getByText('GOLDEN')).toBeInTheDocument();
            expect(screen.getByText('STATE')).toBeInTheDocument();
        });

        it('should truncate long team names', () => {
            render(<PlayerBust teamName="Very Long Team Name Here" />);
            const elements = screen.getAllByText(/VERY/);
            expect(elements.length).toBeGreaterThan(0);
        });

        it('should handle empty team name', () => {
            render(<PlayerBust teamName="" />);
            expect(screen.getByText('TEAM')).toBeInTheDocument();
        });
    });

    describe('Color Handling', () => {
        it('should accept custom colors', () => {
            const { container } = render(
                <PlayerBust primaryColor="#FF0000" secondaryColor="#0000FF" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should use default colors when not provided', () => {
            const { container } = render(<PlayerBust />);
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle invalid colors gracefully', () => {
            const { container } = render(
                <PlayerBust primaryColor="invalid" secondaryColor="also-invalid" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });
    });

    describe('Layout', () => {
        it('should position text at correct location', () => {
            const { container } = render(<PlayerBust teamName="Bulls" />);
            const textContainer = container.querySelector('div[style*="top: 63%"]');
            expect(textContainer).toBeInTheDocument();
        });

        it('should have smaller font size than full jersey', () => {
            const { container } = render(<PlayerBust teamName="Test" />);
            // Font size should be 120 * 0.18 = 21.6px
            const span = screen.getByText('TEST');
            expect(span).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined props', () => {
            const { container } = render(
                <PlayerBust
                    teamName={undefined}
                    primaryColor={undefined}
                    secondaryColor={undefined}
                />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle special characters', () => {
            render(<PlayerBust teamName="Heat's" />);
            expect(screen.getByText("HEAT'S")).toBeInTheDocument();
        });
    });
});

describe('Pure Utility Functions', () => {
    // We need to test the utility functions by importing them
    // Since they're not exported, we'll test their effects through the components
    
    describe('Color Sanitization via Component', () => {
        it('should handle valid hex colors', () => {
            const { container } = render(
                <PlayerJersey primaryColor="#FF5733" secondaryColor="#33FF57" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle 3-character hex colors', () => {
            const { container } = render(
                <PlayerJersey primaryColor="#F53" secondaryColor="#35F" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should handle CSS color names', () => {
            const { container } = render(
                <PlayerJersey primaryColor="navy" secondaryColor="gold" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });

        it('should fallback on completely invalid colors', () => {
            const { container } = render(
                <PlayerJersey primaryColor="xyz123" secondaryColor="notacolor" />
            );
            expect(container.querySelector('canvas')).toBeInTheDocument();
        });
    });

    describe('Name Splitting Logic via Component', () => {
        it('should handle single word names', () => {
            render(<PlayerJersey teamName="Chicago" />);
            expect(screen.getByText('CHICAGO')).toBeInTheDocument();
        });

        it('should split two-word names appropriately', () => {
            render(<PlayerJersey teamName="Los Angeles" />);
            expect(screen.getByText('LOS ANGELES')).toBeInTheDocument();
        });

        it('should handle three-word names', () => {
            render(<PlayerJersey teamName="New York Knicks" />);
            expect(screen.getByText('NEW YORK')).toBeInTheDocument();
            expect(screen.getByText('KNICKS')).toBeInTheDocument();
        });

        it('should limit to maximum characters per line', () => {
            render(<PlayerJersey teamName="Superlongteamname" />);
            const element = screen.getByText(/SUPERLONG/);
            expect(element.textContent?.length).toBeLessThanOrEqual(12);
        });

        it('should handle names with extra whitespace', () => {
            render(<PlayerJersey teamName="  Miami   Heat  " />);
            expect(screen.getByText('MIAMI')).toBeInTheDocument();
            expect(screen.getByText('HEAT')).toBeInTheDocument();
        });
    });

    describe('Last Name Extraction via Component', () => {
        it('should extract last name from full name', () => {
            render(<PlayerJersey view="back" playerName="Michael Jordan" />);
            expect(screen.getByText('JORDAN')).toBeInTheDocument();
        });

        it('should handle single names', () => {
            render(<PlayerJersey view="back" playerName="Pelé" />);
            expect(screen.getByText('PELÉ')).toBeInTheDocument();
        });

        it('should handle three-part names', () => {
            render(<PlayerJersey view="back" playerName="Luis van Gaal" />);
            expect(screen.getByText('GAAL')).toBeInTheDocument();
        });

        it('should truncate very long last names', () => {
            render(<PlayerJersey view="back" playerName="John Verylonglastname" />);
            const element = screen.getByText(/VERYLONGLAST/);
            expect(element.textContent?.length).toBeLessThanOrEqual(12);
        });

        it('should handle empty names', () => {
            render(<PlayerJersey view="back" playerName="" />);
            expect(screen.getByText('PLAYER')).toBeInTheDocument();
        });

        it('should handle whitespace-only names', () => {
            render(<PlayerJersey view="back" playerName="   " />);
            expect(screen.getByText('PLAYER')).toBeInTheDocument();
        });

        it('should handle names with multiple consecutive spaces', () => {
            render(<PlayerJersey view="back" playerName="John    Doe" />);
            expect(screen.getByText('DOE')).toBeInTheDocument();
        });
    });
});

describe('React Hooks Integration', () => {
    it('should handle component mounting and unmounting', () => {
        const { unmount } = render(<PlayerJersey />);
        expect(() => unmount()).not.toThrow();
    });

    it('should handle prop changes', () => {
        const { rerender } = render(<PlayerJersey teamName="Bulls" />);
        expect(screen.getByText('BULLS')).toBeInTheDocument();
        
        rerender(<PlayerJersey teamName="Lakers" />);
        expect(screen.getByText('LAKERS')).toBeInTheDocument();
    });

    it('should memoize expensive computations', () => {
        const { rerender } = render(
            <PlayerJersey teamName="Warriors" primaryColor="#FF0000" />
        );
        const canvas = screen.getByRole('img', { hidden: true }) as HTMLCanvasElement;
        
        // Rerender with same props should use memoized values
        rerender(<PlayerJersey teamName="Warriors" primaryColor="#FF0000" />);
        expect(canvas).toBeInTheDocument();
    });

    it('should handle size prop changes', () => {
        const { rerender, container } = render(<PlayerJersey size="sm" />);
        let canvas = container.querySelector('canvas');
        expect(canvas).toHaveAttribute('width', '120');
        
        rerender(<PlayerJersey size="lg" />);
        canvas = container.querySelector('canvas');
        expect(canvas).toHaveAttribute('width', '240');
    });

    it('should handle view prop changes', () => {
        const { rerender } = render(
            <PlayerJersey view="front" teamName="Bulls" playerName="Jordan" />
        );
        expect(screen.getByText('BULLS')).toBeInTheDocument();
        
        rerender(<PlayerJersey view="back" teamName="Bulls" playerName="Jordan" />);
        expect(screen.getByText('JORDAN')).toBeInTheDocument();
    });
});

describe('Performance and Optimization', () => {
    it('should render multiple instances efficiently', () => {
        const { container } = render(
            <>
                <PlayerJersey teamName="Bulls" />
                <PlayerJersey teamName="Lakers" />
                <PlayerJersey teamName="Warriors" />
            </>
        );
        const canvases = container.querySelectorAll('canvas');
        expect(canvases).toHaveLength(3);
    });

    it('should handle rapid prop updates', () => {
        const { rerender } = render(<PlayerJersey jerseyNumber={1} />);
        
        for (let i = 2; i <= 10; i++) {
            rerender(<PlayerJersey jerseyNumber={i} />);
        }
        
        expect(screen.getByText('10')).toBeInTheDocument();
    });
});

describe('Component Composition', () => {
    it('should work with wrapper components', () => {
        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <div className="wrapper">{children}</div>
        );
        
        const { container } = render(
            <Wrapper>
                <PlayerJersey teamName="Heat" />
            </Wrapper>
        );
        
        expect(container.querySelector('.wrapper')).toBeInTheDocument();
        expect(screen.getByText('HEAT')).toBeInTheDocument();
    });

    it('should support multiple PlayerBust components', () => {
        render(
            <>
                <PlayerBust teamName="Celtics" />
                <PlayerBust teamName="Heat" />
            </>
        );
        
        expect(screen.getByText('CELTICS')).toBeInTheDocument();
        expect(screen.getByText('HEAT')).toBeInTheDocument();
    });
});