"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { AnimatedText } from "./animated-text";

// Updated projects with MERN stack focus
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack MERN application with Next.js and FastAPI integration for online shopping.",
    image: "/p3.png?height=600&width=800",
    tags: ["Next.js", "MongoDB", "Express", "Node.js", "Vercel"],
    category: "fullstack",
    demoUrl: "https://next-ecommerce-gamma-three.vercel.app",
    githubUrl: "https://github.com/sameer-se/next-ecommerce",
  },
  {
    id: 2,
    title: "Portfolio Website - NEXT.Js",
    description:
      "MERN stack application with real-time updates and JWT authentication.",
    image: "/p4.png?height=600&width=800",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion", "Vercel"],
    category: "frontend",
    demoUrl: "https://next-portfolio-smoky-iota.vercel.app/",
    githubUrl: "https://github.com/sameer-se/next-portfolio",
  },
  {
    id: 3,
    title: "Classroom Management System",
    description:
      "MERN stack application with real-time updates and JWT authentication.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "MongoDB", "Express", "Node.js", "FastAPI"],
    category: "fullstack",
    demoUrl: "#",
    githubUrl: "https://github.com/sameer-se/FYP-PROJECT",
  },
  {
    id: 4,
    title: "LasesVPN UI",
    description: "Landing Page for LaslesVPN with responsive Design",
    image: "/p1.png?height=600&width=800",
    tags: ["HTML", "CSS", "JAVASCRIPT", "Netlify"],
    category: "frontend",
    demoUrl: "https://laslesvpn-build.netlify.app/",
    githubUrl: "https://github.com/sameer-se/laslesvpn-website",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Portfolio website using only HTML, CSS and JavaScript with animation",
    image: "/p2.png?height=600&width=800",
    tags: ["HTML", "CSS", "JAVASCRIPT", "Netlify"],
    category: "frontend",
    demoUrl: "https://sameer-se.netlify.app/",
    githubUrl: "https://github.com/sameer-se/portfolio-website",
  },
  {
    id: 6,
    title: "Blog APIs",
    description:
      "Backend Project for Blog APIs with to get, create, update and delete Blog posts",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Node.Js", "Express", "MongoDB"],
    category: "backend",
    demoUrl: "#",
    githubUrl:
      "https://github.com/sameer-se/blog-APIs/blob/main/controllers/blog.controller.js",
  },
];

const categories = [
  { id: "all", name: "All" },
  { id: "fullstack", name: "Full Stack" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get filtered projects based on selected category
  const getFilteredProjects = () => {
    if (selectedCategory === "all") {
      return projectsData;
    }
    return projectsData.filter(
      (project) => project.category === selectedCategory
    );
  };

  const filteredProjects = getFilteredProjects();

  // Handle category change
  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;

    setIsLoading(true);
    setSelectedCategory(category);

    // Short timeout for loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <AnimatedText
            text="A showcase of my work across full-stack development using the MERN stack, Next.js, and PostgreSQL, demonstrating my ability to build complete, scalable web applications."
            className="text-muted-foreground max-w-2xl mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Badge
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-muted-foreground">Loading projects...</p>
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card
                    className="overflow-hidden h-full flex flex-col"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <motion.div
                      className="relative overflow-hidden aspect-video"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                        animate={{
                          scale: hoveredProject === project.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                    <CardContent className="p-6 flex-grow">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="w-full"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button asChild size="sm" className="w-full">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No projects found in this category.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleCategoryChange("all")}
              >
                View All Projects
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
