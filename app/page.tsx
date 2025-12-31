"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthenticGallery } from "@/components/authentic-gallery"
import { AITourismAssistant } from "@/components/ai-tourism-assistant"
import {
  Heart,
  Star,
  Users,
  Coffee,
  Utensils,
  Music,
  Award,
  Shield,
  Clock,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="container relative z-10 px-4 mx-auto">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              {/* Logo */}
              <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-transform">
                  <Image
                    src="/images/hulet-fish-logo.png"
                    alt="Hulet Fish Tourism"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>

              {/* Headline */}
              <div
                className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: "200ms" }}
              >
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Authentic Ethiopian Experiences
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Welcome Home to
                  <span className="block mt-2 bg-gradient-to-r from-white via-accent-foreground to-white bg-clip-text text-transparent">
                    Ethiopian Hospitality
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: "400ms" }}
              >
                Step into authentic Ethiopian homes and experience the warmth of our culture. Share meals, stories, and
                traditions with local families who welcome you like their own.
              </p>

              {/* Trust Indicators */}
              <div
                className="flex flex-wrap justify-center gap-6 text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: "600ms" }}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span className="font-medium">1,200+ Happy Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span className="font-medium">4.9 Average Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">300+ Host Families</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: "800ms" }}
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all text-lg px-8 h-14 font-semibold group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm shadow-xl text-lg px-8 h-14 font-semibold bg-transparent"
                  >
                    Explore Experiences
                  </Button>
                </Link>
              </div>

              {/* Coffee Ceremony Mention */}
              <div
                className="flex items-center justify-center gap-2 text-white/80 animate-in fade-in duration-1000"
                style={{ animationDelay: "1000ms" }}
              >
                <Coffee className="w-5 h-5" />
                <p className="text-sm italic">Every journey begins with traditional Ethiopian coffee</p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-accent/5">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Why Choose Us</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Experience Authentic Ethiopia
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with real families, share authentic meals, and create lasting memories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Family Welcome",
                  description: "Be treated like family in genuine Ethiopian homes",
                  color: "text-red-500",
                },
                {
                  icon: Utensils,
                  title: "Traditional Meals",
                  description: "Enjoy home-cooked Ethiopian dishes made with love",
                  color: "text-orange-500",
                },
                {
                  icon: Coffee,
                  title: "Coffee Ceremony",
                  description: "Experience the sacred Ethiopian coffee tradition",
                  color: "text-amber-600",
                },
                {
                  icon: Music,
                  title: "Cultural Exchange",
                  description: "Share stories, music, and traditions",
                  color: "text-purple-500",
                },
                {
                  icon: Shield,
                  title: "Verified Hosts",
                  description: "All families are carefully vetted and verified",
                  color: "text-green-500",
                },
                {
                  icon: Award,
                  title: "Quality Guaranteed",
                  description: "Premium experiences backed by our promise",
                  color: "text-blue-500",
                },
                {
                  icon: Globe,
                  title: "Local Guides",
                  description: "Connect with knowledgeable local experts",
                  color: "text-teal-500",
                },
                {
                  icon: Clock,
                  title: "Flexible Timing",
                  description: "Book experiences that fit your schedule",
                  color: "text-indigo-500",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <CardContent className="p-6 space-y-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} from-current to-current/80 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-accent/5">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Simple Process</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Journey in 3 Steps</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose Your Experience",
                  description: "Browse authentic experiences hosted by local Ethiopian families",
                },
                {
                  step: "02",
                  title: "Book & Connect",
                  description: "Reserve your spot and connect with your host family",
                },
                {
                  step: "03",
                  title: "Experience & Share",
                  description: "Enjoy authentic hospitality and create lasting memories",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <AuthenticGallery />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent text-white">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Experience Real Ethiopia?</h2>
              <p className="text-xl text-white/90">
                Join thousands of travelers who have discovered the warmth of Ethiopian hospitality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14 font-semibold shadow-xl"
                  >
                    Get Started Today
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 h-14 font-semibold bg-transparent"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <AITourismAssistant />
    </div>
  )
}
