"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Camera, MapPin, Users, Coffee, Home, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

interface WelcomeFlowProps {
  userRole: "tourist" | "host" | "guide"
  userName: string
}

export default function WelcomeFlow({ userRole, userName }: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const getRoleConfig = () => {
    switch (userRole) {
      case "tourist":
        return {
          icon: Camera,
          color: "bg-blue-500",
          title: "Welcome, Explorer!",
          subtitle: "Ready to discover authentic Ethiopian culture?",
          steps: [
            {
              title: "Discover Authentic Experiences",
              description: "Browse unique cultural experiences hosted by local families",
              features: [
                "Traditional coffee ceremonies",
                "Home-cooked meals",
                "Cultural storytelling",
                "Local crafts workshops",
              ],
            },
            {
              title: "Connect with Local Families",
              description: "Meet warm Ethiopian families eager to share their culture",
              features: [
                "Verified host families",
                "Real reviews from travelers",
                "Direct messaging",
                "Cultural exchange",
              ],
            },
            {
              title: "Book Your Adventure",
              description: "Easy booking with flexible cancellation policies",
              features: ["Secure payments", "Instant confirmation", "Travel insurance options", "24/7 support"],
            },
          ],
        }
      case "host":
        return {
          icon: Heart,
          color: "bg-red-500",
          title: "Welcome, Host Family!",
          subtitle: "Share your beautiful culture with the world",
          steps: [
            {
              title: "Create Your Experience",
              description: "Showcase what makes your family and culture special",
              features: ["Photo galleries", "Experience descriptions", "Pricing tools", "Availability calendar"],
            },
            {
              title: "Welcome Guests",
              description: "Connect with travelers seeking authentic experiences",
              features: ["Guest messaging", "Booking management", "Review system", "Payment processing"],
            },
            {
              title: "Earn & Share",
              description: "Generate income while sharing your heritage",
              features: ["Competitive earnings", "Fast payouts", "Host community", "Cultural pride"],
            },
          ],
        }
      case "guide":
        return {
          icon: MapPin,
          color: "bg-green-500",
          title: "Welcome, Cultural Guide!",
          subtitle: "Lead travelers on unforgettable journeys",
          steps: [
            {
              title: "Share Your Expertise",
              description: "Create tours that showcase Ethiopian heritage",
              features: ["Tour builder tools", "Route planning", "Cultural insights", "Historical knowledge"],
            },
            {
              title: "Guide Adventures",
              description: "Lead groups through authentic cultural experiences",
              features: ["Group management", "Safety protocols", "Communication tools", "Emergency support"],
            },
            {
              title: "Build Your Reputation",
              description: "Grow your guiding business with great reviews",
              features: ["Professional profile", "Certification badges", "Repeat bookings", "Referral rewards"],
            },
          ],
        }
    }
  }

  const config = getRoleConfig()
  const IconComponent = config.icon

  const nextStep = () => {
    if (currentStep < config.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = config.steps[currentStep]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Image
                src="/images/hulet-fish-logo.png"
                alt="Hulet Fish Tourism"
                width={80}
                height={80}
                className="rounded-full shadow-lg"
              />
              <div className={`absolute -top-2 -right-2 ${config.color} text-white rounded-full p-1`}>
                <IconComponent className="h-4 w-4" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">{config.title}</h1>
          <p className="text-muted-foreground text-lg">
            Hello {userName}! {config.subtitle}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {config.steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep ? "bg-primary" : index < currentStep ? "bg-primary/60" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className={`${config.color} rounded-full p-4`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">{currentStepData.title}</CardTitle>
            <CardDescription className="text-lg">{currentStepData.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Cultural Touch */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg text-center">
              <div className="flex justify-center space-x-4 mb-3">
                <Coffee className="h-6 w-6 text-accent" />
                <Home className="h-6 w-6 text-accent" />
                <Users className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Hospitality is not about convenience, it's about generosity" - Ethiopian Wisdom
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 bg-transparent"
              >
                <span>Previous</span>
              </Button>

              <Badge variant="secondary" className="px-3 py-1">
                {currentStep + 1} of {config.steps.length}
              </Badge>

              {currentStep < config.steps.length - 1 ? (
                <Button onClick={nextStep} className="flex items-center space-x-2 bg-primary hover:bg-primary/90">
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => console.log("Complete onboarding")}
                  className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => console.log("Skip onboarding")}
            className="text-muted-foreground hover:text-primary"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  )
}
