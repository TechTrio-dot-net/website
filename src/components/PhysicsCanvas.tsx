"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const PhysicsCanvas = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Function to handle input submission
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      createBox(inputValue);
      setInputValue(""); // Clear input after submission
    }
  };

  // Function to create a new box
  const createBox = (text: string) => {
    if (!sceneRef.current) return;

    const width = window.innerWidth;
    const box = Matter.Bodies.rectangle(width / 2, 50, 100, 50, {
      restitution: 0.6,
      render: {
        fillStyle: "#ffffff",
        text: {
          content: text,
          size: 14,
          color: "#000000",
        },
      },
    });

    // Add the box to the world
    const world = Matter.Engine.create().world;
    Matter.World.add(world, box);
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create engine and runner
    const engine = Matter.Engine.create();
    const world = engine.world;
    const runner = Matter.Runner.create();

    // Create renderer with themed background
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "linear-gradient(to bottom, #1a1a2e, #16213e)", // Themed background
        wireframes: false,
      },
    });

    // Create walls to prevent objects from going out
    const walls = [
      Matter.Bodies.rectangle(width / 2, height, width, 20, { isStatic: true, render: { fillStyle: "#0f3460" } }), // Ground
      Matter.Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true, render: { fillStyle: "#0f3460" } }), // Ceiling
      Matter.Bodies.rectangle(0, height / 2, 20, height, { isStatic: true, render: { fillStyle: "#0f3460" } }), // Left wall
      Matter.Bodies.rectangle(width, height / 2, 20, height, { isStatic: true, render: { fillStyle: "#0f3460" } }), // Right wall
    ];

    // Preload images
    const boxImage = new Image();
    const ballImage = new Image();
    boxImage.src = "https://a.storyblok.com/f/198185/400x400/463c1ffd8a/physics-hatch.png/m/0x0/";
    ballImage.src = "https://a.storyblok.com/f/198185/400x316/fd675bb564/physics-development.png/m/0x0/";

    let objectsCreated = false;

    // Function to create objects when images are loaded
    const createObjects = () => {
      if (objectsCreated) return;
      objectsCreated = true;

      const box = Matter.Bodies.rectangle(width / 2, 50, 100, 100, {
        restitution: 0.6,
        render: {
          sprite: {
            texture: boxImage.src,
            xScale: 0.3,
            yScale: 0.3,
          },
        },
      });

      const ball = Matter.Bodies.circle(width / 3, 80, 50, {
        restitution: 0.8,
        render: {
          sprite: {
            texture: ballImage.src,
            xScale: 0.4,
            yScale: 0.4,
          },
        },
      });

      // Add mouse interaction
      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.1,
          render: { visible: false },
        },
      });

      render.mouse = mouse;

      // Add objects to the world
      Matter.World.add(world, [...walls, box, ball, mouseConstraint]);

      // Run engine and renderer
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    };

    // Ensure images are loaded before creating objects
    if (boxImage.complete && ballImage.complete) {
      createObjects();
    } else {
      boxImage.onload = createObjects;
      ballImage.onload = createObjects;
    }

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      render.canvas.width = width;
      render.canvas.height = height;

      // Update wall positions
      walls[0].position.x = width / 2; // Ground
      walls[0].position.y = height;
      walls[1].position.x = width / 2; // Ceiling
      walls[1].position.y = 0;
      walls[2].position.x = 0; // Left wall
      walls[2].position.y = height / 2;
      walls[3].position.x = width; // Right wall
      walls[3].position.y = height / 2;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
      window.removeEventListener("resize", handleResize);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputSubmit}
          placeholder="Type and press Enter..."
          className="px-4 py-2 rounded-lg bg-white bg-opacity-90 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Canvas */}
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default PhysicsCanvas;