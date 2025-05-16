"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MapPin, Send, Globe } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out using the form below or connect with me on
            social media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-none shadow-lg h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Contact Me</h3>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </p>

                {isSubmitted ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-500 font-medium">
                      Thank you for your message! I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-muted h-12"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-muted h-12"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-muted resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out through any of these platforms.
                </p>

                <div className="space-y-6">
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center group"
                  >
                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium group-hover:text-primary transition-colors">
                        sameerkhadka2008@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/sameer-se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                      <Github className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium group-hover:text-primary transition-colors">
                        github.com/sameer-se
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/sameer-khadka2008"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium group-hover:text-primary transition-colors">
                        linkedin.com/in/sameer-khadka2008
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Location</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Based in Kathmandu, NEPAL
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Available for remote work and collaborations worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
