"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileDown } from "lucide-react";
import * as THREE from "three";
import { useMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";
import { Suspense } from "react";

// Colorful shooting star implementation
function ShootingStars() {
  const { theme } = useTheme();
  const linesRef = useRef<THREE.Group | null>(null);
  const { mouse, viewport } = useThree();
  const isMobile = useMobile();

  // Pre-allocate reusable objects for animation calculations
  const tempVector = useMemo(() => new THREE.Vector3(), []);
  const lastUpdateTime = useRef(0);

  // Theme-specific color palettes
  const colorPalettes = useMemo(() => {
    return {
      dark: [
        // Vibrant colors for dark theme - blues, purples, cyans
        new THREE.Color(0.3, 0.8, 1.0), // Bright cyan
        new THREE.Color(0.5, 0.3, 1.0), // Purple
        new THREE.Color(0.2, 0.4, 1.0), // Blue
        new THREE.Color(0.7, 0.2, 1.0), // Magenta
        new THREE.Color(0.0, 1.0, 0.8), // Teal
        new THREE.Color(0.1, 0.7, 1.0), // Sky blue
        new THREE.Color(0.5, 0.8, 1.0), // Light blue
        new THREE.Color(0.8, 0.3, 0.8), // Pink
      ],
      light: [
        // Subtle colors for light theme - pastels and soft colors
        new THREE.Color(0.3, 0.5, 0.8), // Soft blue
        new THREE.Color(0.8, 0.3, 0.5), // Soft rose
        new THREE.Color(0.5, 0.3, 0.7), // Soft purple
        new THREE.Color(0.3, 0.7, 0.5), // Soft teal
        new THREE.Color(0.7, 0.5, 0.3), // Soft amber
        new THREE.Color(0.5, 0.6, 0.3), // Soft olive
        new THREE.Color(0.3, 0.6, 0.7), // Soft sky
        new THREE.Color(0.6, 0.4, 0.6), // Soft lavender
      ],
    };
  }, []);

  // Create a group of lines for shooting stars - memoized for performance
  const starGroup = useMemo(() => {
    const group = new THREE.Group();
    // Adjust star count based on device - optimized for better performance
    const starCount = isMobile ? 80 : 150;

    const isDark = theme === "dark";
    const palette = isDark ? colorPalettes.dark : colorPalettes.light;
    const baseOpacity = isDark ? 0.8 : 0.5; // Higher opacity in dark mode

    // Create individual shooting stars
    for (let i = 0; i < starCount; i++) {
      // Random position - wider distribution
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5 - 2;

      // Random direction (always diagonal down-left)
      const dirX = -Math.random() * 0.5 - 0.3;
      const dirY = -Math.random() * 0.5 - 0.3;

      // Create trail geometry (optimized with fewer segments)
      const trailLength = Math.random() * 1.2 + 0.6;
      const segments = isMobile ? 3 : 5;
      const points = [];

      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        points.push(
          new THREE.Vector3(
            x - dirX * trailLength * t,
            y - dirY * trailLength * t,
            z
          )
        );
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Select random color from theme palette
      const colorIndex = Math.floor(Math.random() * palette.length);
      const color = palette[colorIndex];

      // Create colors array with gradient effect
      const colors = new Float32Array((segments + 1) * 3);

      for (let j = 0; j <= segments; j++) {
        // Create a gradient effect from head to tail
        const normalizedPos = j / segments;

        // Different opacity algorithms for dark/light themes
        let opacity;
        if (isDark) {
          // More pronounced gradient in dark mode - brighter head, fading tail
          opacity = Math.pow(1 - normalizedPos, 1.5);
        } else {
          // More subtle bell curve effect for light mode
          opacity = Math.sin(normalizedPos * Math.PI) * 0.8;
        }

        // Apply the color with gradient opacity
        colors[j * 3] = color.r * opacity;
        colors[j * 3 + 1] = color.g * opacity;
        colors[j * 3 + 2] = color.b * opacity;
      }

      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Create material with appropriate settings
      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: baseOpacity + Math.random() * 0.2,
        linewidth: isDark ? 1.5 : 1,
      });

      // Create line and add to group
      const line = new THREE.Line(geometry, material);

      // Add custom properties for animation
      line.userData = {
        speed: Math.random() * 0.2 + 0.1,
        dirX: dirX,
        dirY: dirY,
        originalX: x,
        originalY: y,
        originalZ: z,
        color: color.clone(), // Store the original color for potential animations
      };

      group.add(line);
    }

    return group;
  }, [theme, isMobile, colorPalettes]);

  // Reset function moved outside animation loop to avoid creating functions during rendering
  const resetStar = useCallback(
    (line: THREE.Line, isDark: boolean) => {
      line.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 5 - 2
      );

      // Optionally refresh the color when star resets
      const palette = isDark ? colorPalettes.dark : colorPalettes.light;
      const colorIndex = Math.floor(Math.random() * palette.length);

      // Update stored color in userData
      line.userData.color = palette[colorIndex].clone();

      // Update the color attribute in the geometry
      const geometry = line.geometry as THREE.BufferGeometry;
      const colors = geometry.attributes.color as THREE.BufferAttribute;
      const segments = colors.count - 1;

      for (let j = 0; j <= segments; j++) {
        const normalizedPos = j / segments;
        let opacity;

        if (isDark) {
          opacity = Math.pow(1 - normalizedPos, 1.5);
        } else {
          opacity = Math.sin(normalizedPos * Math.PI) * 0.8;
        }

        colors.setXYZ(
          j,
          line.userData.color.r * opacity,
          line.userData.color.g * opacity,
          line.userData.color.b * opacity
        );
      }

      colors.needsUpdate = true;
    },
    [colorPalettes]
  );

  // Animation with mouse interaction - optimized with frame skipping
  useFrame((state, delta) => {
    if (!linesRef.current) return;

    // Skip frames for better performance
    const currentTime = state.clock.elapsedTime;
    if (currentTime - lastUpdateTime.current < 0.03) return;
    lastUpdateTime.current = currentTime;

    const isDark = theme === "dark";

    // Calculate mouse influence (normalized coordinates)
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    // Batch processing of stars with fewer calculations
    const children = linesRef.current.children;
    const childCount = children.length;

    for (let i = 0; i < childCount; i++) {
      const line = children[i] as THREE.Line;
      const userData = line.userData;

      // Calculate distance to mouse using reused vector to avoid allocations
      tempVector.set(line.position.x - mouseX, line.position.y - mouseY, 0);
      const distance = tempVector.length();

      // Adjust speed based on mouse proximity
      const mouseInfluence = Math.max(0, 1 - distance / 3);
      const speedMultiplier = 1 + mouseInfluence * 2;

      // Move line with optimized delta time calculation
      const timeScale = delta * 10;
      line.position.x +=
        userData.dirX * userData.speed * speedMultiplier * timeScale;
      line.position.y +=
        userData.dirY * userData.speed * speedMultiplier * timeScale;

      // Reset position when out of view
      if (line.position.x < -10 || line.position.y < -10) {
        resetStar(line, isDark);
      }
    }
  });

  return <primitive ref={linesRef} object={starGroup} />;
}

// Scene with optimized settings
function Scene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]} // Reduced pixel ratio for better performance
      performance={{ min: 0.5 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false, // Disable alpha for better performance
        depth: false, // Disable depth testing as it's not needed
        stencil: false, // Disable stencil buffer as it's not needed
      }}
    >
      <color attach="background" args={[isDark ? "#000000" : "#ffffff"]} />
      <Suspense fallback={null}>
        <ShootingStars />
      </Suspense>
    </Canvas>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 z-0 ${isDark ? "bg-black" : "bg-white"}`}
      >
        <Scene />
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            className="text-primary inline-block"
          >
            Sameer Khadka
          </motion.span>
        </motion.h1>

        <AnimatedText
          text="Full Stack Web Developer | Software Developer"
          className={`text-xl md:text-2xl lg:text-3xl font-light mb-8 ${
            isDark ? "text-white" : "text-black"
          }`}
          delay={0.8}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className={`max-w-md mb-8 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Building robust web applications with MongoDB, Express, React,
          Next.js, Node.js, and PostgreSQL for scalable and high-performance
          solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="group glow-button">
              <a href="#projects">
                View My Work
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glow-button-outline"
            >
              <a href="/SameerKhadkaCV.pdf" download>
                <motion.div
                  initial={{ y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mr-2"
                >
                  <FileDown className="h-4 w-4" />
                </motion.div>
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
