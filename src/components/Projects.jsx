import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Hotel-Booking ",
    url: "https://github.com/karan0207/Hotelbooking/blob/main/README.md",
    image: "projects/home1.png",
    description: "A FullStack Hotel booking web-app build with mern stack using best practices and optimizations",
  },
  {
    title: "Animix Osu",
    url: "https://karan0207.github.io/AnimixOsu.in/",
    image: "projects/newcopy.png",
    description: "An anime web-app built with html,css and javascript to post latest content and information about anime.",
  },
  {
    title: "Iphone promotion",
    url: "https://karan0207.github.io/iphone-store/",
    image: "projects/iphone.png",
    description: "A Landing page build with react.js, gsap,Three.js to promote Iphone brand. ",
  },
  {
    title: "Organized Events",
    url: "https://github.com/karan0207/Tournaments/blob/main/Tournament.md",
    image: "projects/pubg.png",
    description: "Organized collaborative tournament events to grow company social media accounts. ",
  },
  {
    title: "CR Tourney",
    url: "https://github.com/karan0207/Tournaments/blob/main/ClashRoyale.md",
    image: "projects/clash.webp",
    description: "Create a loading screen for your r3f projects",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
