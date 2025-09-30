// src/components/shared/ThreeDCanvas.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface ThreeDCanvasProps {
  isInteractiveMode: boolean;
  isRocketLaunched: boolean;
}

interface CanvasWithScene extends HTMLCanvasElement {
  __threeScene?: THREE.Scene;
}

const ThreeDCanvas = ({
  isInteractiveMode,
  isRocketLaunched,
}: ThreeDCanvasProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null); 
  const starsRef = useRef<THREE.Points | null>(null); 
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  
  const initialSceneColor = useRef(new THREE.Color('#FFF8F0')); 
  const interactiveSceneColor = useRef(new THREE.Color('#000000'));

  const cleanup = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    
    if (modelRef.current) {
      gsap.killTweensOf(modelRef.current.rotation);
      gsap.killTweensOf(modelRef.current.position);
    }
    if (cameraRef.current) {
      gsap.killTweensOf(cameraRef.current.position);
    }
    gsap.killTweensOf(initialSceneColor.current);
    
    if (controlsRef.current) {
      controlsRef.current.dispose();
    }
    
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    
    if (mountRef.current && rendererRef.current?.domElement) {
      const canvas = rendererRef.current.domElement;
      if (mountRef.current.contains(canvas)) {
        mountRef.current.removeChild(canvas);
      }
    }
    
    modelRef.current = null;
    cameraRef.current = null;
    controlsRef.current = null;
    rendererRef.current = null;
    sceneRef.current = null;
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isInteractiveMode) {
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInteractiveMode]);

  useEffect(() => {
    if (!mountRef.current || mountRef.current.querySelector("canvas")) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = initialSceneColor.current;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 1.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const canvas = renderer.domElement as CanvasWithScene;
    canvas.__threeScene = scene;

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 10, 100);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 50;
    scene.add(pointLight);

    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: initialSceneColor.current,
      transparent: true,
      opacity: 0,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;
    scene.add(plane);
    planeRef.current = plane;

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 200;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    starsRef.current = stars;

    const loader = new GLTFLoader();
    loader.load(
      "/models/rocket/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -1, 0);
        scene.add(model);
        modelRef.current = model;
        setIsModelLoaded(true);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error("Lỗi khi tải mô hình GLTF:", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enabled = false;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (starsRef.current) {
        starsRef.current.position.y -= 0.05;
        if (starsRef.current.position.y < -50) {
          starsRef.current.position.y = 50;
        }
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (modelRef.current && !isInteractiveMode && !isRocketLaunched) {
        const normalizedX = (mouseRef.current.x / window.innerWidth) * 2 - 1;
        const normalizedY = -(mouseRef.current.y / window.innerHeight) * 2 + 1;
        
        // Di chuyển mô hình nhẹ nhàng theo chuột
        const targetPositionX = normalizedX * 0.1;
        const targetPositionY = normalizedY * 0.05;

        modelRef.current.position.x += (targetPositionX - modelRef.current.position.x) * 0.05;
        modelRef.current.position.y += (targetPositionY - modelRef.current.position.y) * 0.05;
      }
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const newWidth = mountRef.current.clientWidth || 800;
      const newHeight = mountRef.current.clientHeight || 600;
      
      rendererRef.current.setSize(newWidth, newHeight);
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    const controls = controlsRef.current;
    const model = modelRef.current;
    const canvas = mountRef.current?.querySelector("canvas") as CanvasWithScene | null;
    const plane = planeRef.current;
    const stars = starsRef.current;
    
    if (controls && model) {
      if (isInteractiveMode) {
        controls.enabled = true;
        
        const interactiveTimeline = gsap.timeline();
        
        interactiveTimeline.to(cameraRef.current!.position, {
          x: 0,
          y: 0.5,
          z: 1.5,
          duration: 1.5,
          ease: "power2.inOut",
        }, 0)
        .to(initialSceneColor.current, {
          r: interactiveSceneColor.current.r, 
          g: interactiveSceneColor.current.g, 
          b: interactiveSceneColor.current.b,
          duration: 0.5,
          onUpdate: () => {
            if (canvas?.__threeScene) {
              canvas.__threeScene.background = initialSceneColor.current;
            }
          }
        }, 0)
        .to(plane!.material as THREE.MeshStandardMaterial, {
          opacity: 1,
          duration: 1.5,
        }, 0)
        .to(stars!.material, {
          opacity: 1,
          duration: 2,
        }, 0);
        
        controls.target.set(model.position.x, model.position.y, model.position.z);
        controls.update();
        
      } else {
        controls.enabled = false;
        
        const exitTimeline = gsap.timeline();

        exitTimeline.to(cameraRef.current!.position, {
          x: 0.5,
          y: 0.5,
          z: 2.5,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (modelRef.current && !isInteractiveMode) {
              gsap.to(modelRef.current.rotation, {
                y: Math.PI * 2,
                duration: 90,
                ease: "none",
                repeat: -1,
              });
            }
          },
        }, 0)
        .to(initialSceneColor.current, {
          r: 1, g: 0.97, b: 0.94, 
          duration: 1.5,
          onUpdate: () => {
            if (canvas?.__threeScene) {
              canvas.__threeScene.background = initialSceneColor.current;
            }
          }
        }, 0)
        .to(plane!.material as THREE.MeshStandardMaterial, {
          opacity: 0,
          duration: 1.5,
        }, 0)
        .to(stars!.material, {
          opacity: 0,
          duration: 1.5,
        }, 0);
        
      }
    }
  }, [isInteractiveMode, isModelLoaded]);

  useEffect(() => {
    const model = modelRef.current;
    const camera = cameraRef.current;
    
    if (isRocketLaunched && model && camera && !hasLaunched) {
      setHasLaunched(true);
      
      const launchTimeline = gsap.timeline();
      
      launchTimeline.to(model.position, {
        y: 100,
        duration: 10,
        ease: "power2.in",
      });

      launchTimeline.to(camera.position, {
        y: 100,
        duration: 10,
        ease: "power2.in",
        onUpdate: () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
        }
      }, "<");
    }

    if (!isRocketLaunched && hasLaunched) {
      setHasLaunched(false);
      
      if (model) {
        gsap.killTweensOf(model.position);
        gsap.to(model.position, { 
          y: -1, 
          duration: 1,
          ease: "power2.out"
        });
      }
      
      if (camera) {
        gsap.killTweensOf(camera.position);
        gsap.to(camera.position, { 
          x: 0,
          y: 0.5,
          z: 1.5,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            if (controlsRef.current) {
              controlsRef.current.update();
            }
          }
        });
      }
    }
  }, [isRocketLaunched, hasLaunched]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '400px'
      }}
      aria-hidden={!isInteractiveMode}
    />
  );
};

export default ThreeDCanvas; 