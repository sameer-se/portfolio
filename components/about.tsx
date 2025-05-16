"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code2,
  Server,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  Cpu,
  Database,
  Globe,
  Github,
  Layers,
  Terminal,
  Zap,
  Monitor,
  FileCode,
  Package,
  BarChart,
  Cloud,
} from "lucide-react";

// Updated skill data focusing on MERN stack
const skills = [
  {
    name: "React",
    category: "frontend",
    icon: <Zap className="h-5 w-5 text-blue-500" />,
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: <Globe className="h-5 w-5 text-black dark:text-white" />,
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: <FileCode className="h-5 w-5 text-blue-600" />,
  },
  {
    name: "Redux",
    category: "frontend",
    icon: <Layers className="h-5 w-5 text-purple-500" />,
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icon: <Monitor className="h-5 w-5 text-cyan-500" />,
  },

  {
    name: "Node.js",
    category: "backend",
    icon: <Server className="h-5 w-5 text-green-600" />,
  },
  {
    name: "Express",
    category: "backend",
    icon: <Terminal className="h-5 w-5 text-gray-600" />,
  },
  {
    name: "MongoDB",
    category: "backend",
    icon: <Database className="h-5 w-5 text-green-700" />,
  },
  {
    name: "PostgreSQL",
    category: "backend",
    icon: <Database className="h-5 w-5 text-blue-700" />,
  },
  {
    name: "REST API",
    category: "backend",
    icon: <Layers className="h-5 w-5 text-orange-500" />,
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: <Globe className="h-5 w-5 text-pink-600" />,
  },

  {
    name: "AWS",
    category: "devops",
    icon: <Cloud className="h-5 w-5 text-yellow-600" />,
  },
  {
    name: "Docker",
    category: "devops",
    icon: <Package className="h-5 w-5 text-blue-500" />,
  },
  {
    name: "CI/CD",
    category: "devops",
    icon: <Cpu className="h-5 w-5 text-green-500" />,
  },
  {
    name: "Vercel",
    category: "devops",
    icon: <Zap className="h-5 w-5 text-black dark:text-white" />,
  },

  {
    name: "Git",
    category: "tools",
    icon: <Github className="h-5 w-5 text-orange-600" />,
  },
  {
    name: "Jest",
    category: "tools",
    icon: <Terminal className="h-5 w-5 text-red-500" />,
  },
  {
    name: "Cypress",
    category: "tools",
    icon: <Monitor className="h-5 w-5 text-teal-500" />,
  },
  {
    name: "Data Viz",
    category: "tools",
    icon: <BarChart className="h-5 w-5 text-blue-500" />,
  },
  {
    name: "Performance",
    category: "tools",
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
  },
];

const categories = [
  { id: "frontend", name: "Frontend", icon: <Code2 className="h-4 w-4" /> },
  { id: "backend", name: "Backend", icon: <Server className="h-4 w-4" /> },
  { id: "devops", name: "DevOps", icon: <Cloud className="h-4 w-4" /> },
  { id: "tools", name: "Tools", icon: <Wrench className="h-4 w-4" /> },
];

// Updated experience for MERN stack developer
const experiences = [
  // {
  //   title: "Senior Full Stack Developer",
  //   company: "Tech Innovations Inc.",
  //   period: "2021 - Present",
  //   description:
  //     "Developing and maintaining enterprise applications using MERN stack (MongoDB, Express, React, Node.js) with Next.js for server-side rendering. Implementing PostgreSQL databases for relational data storage and optimizing performance with efficient query strategies.",
  // },
  // {
  //   title: "Backend Developer",
  //   company: "Data Systems Ltd.",
  //   period: "2019 - 2021",
  //   description:
  //     "Designed and developed RESTful APIs using Node.js and Express, integrated with MongoDB and PostgreSQL databases. Implemented authentication systems, data validation, and API documentation with Swagger.",
  // },
  {
    title: "MERN Stack Developer Certification",
    company: "Mindrisers Institute of Technology",
    period: "2024",
    description: "",
  },
];

const education = [
  {
    degree: "B.Sc Hons. Computing (BIT)",
    institution: "IIMS College",
    period: "2021 - 2025",
    description: `Web Development, Database Management, Software Engineering,
Networking, SDLC Methodology`,
  },
  {
    degree: "Higher Secondary Education (Science-Physics)",
    institution: "St. Lawrence College",
    period: "2018 - 2020",
    description: "",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [isInView, setIsInView] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState(
    skills.filter((skill) => skill.category === "frontend")
  );

  useEffect(() => {
    setFilteredSkills(
      skills.filter((skill) => skill.category === selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experienced full-stack developer specializing in MERN stack with
            Next.js and PostgreSQL, dedicated to creating scalable and
            high-performance web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
                <h3 className="text-2xl font-bold mb-2">Who I Am</h3>
                <div className="w-12 h-1 bg-primary mb-4 rounded-full"></div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm a full-stack developer with over 2 years of experience
                  specializing in the MERN stack (MongoDB, Express, React,
                  Node.js) augmented with Next.js for server-side rendering and
                  PostgreSQL for relational data management.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  My expertise includes building scalable APIs, implementing
                  complex database solutions, creating responsive and accessible
                  front-end interfaces, and deploying applications to cloud
                  platforms like AWS and Vercel.
                </p>

                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      5+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Years of Experience
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      40+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Projects Completed
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      15+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Database Solutions
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">
                      10+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      API Integrations
                    </div>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="border-none shadow-lg h-full">
              <Tabs
                defaultValue="skills"
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full"
              >
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
                  <TabsList className="grid grid-cols-3 bg-background/50 backdrop-blur-sm">
                    <TabsTrigger
                      value="skills"
                      onClick={() => setActiveTab("skills")}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Skills
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      onClick={() => setActiveTab("experience")}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Experience
                    </TabsTrigger>
                    <TabsTrigger
                      value="education"
                      onClick={() => setActiveTab("education")}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Education
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="skills" className="p-6 m-0">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={
                          selectedCategory === category.id
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer px-3 py-1.5 text-sm flex items-center gap-1.5"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon}
                        {category.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {isInView &&
                      filteredSkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors group h-full">
                            <div className="p-2 rounded-md bg-background shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                              {skill.icon}
                            </div>
                            <span className="font-medium text-sm sm:text-base truncate">
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="p-6 m-0">
                  <div className="space-y-8">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary"
                      >
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-1.5"></div>
                        <h4 className="text-xl font-bold">{exp.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {exp.company}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {exp.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="p-6 m-0">
                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary"
                      >
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-1.5"></div>
                        <h4 className="text-xl font-bold">{edu.degree}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {edu.institution}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {edu.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
