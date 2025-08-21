"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { CheckCircle, Upload, X, Shield, Mail, CreditCard, FileText } from "lucide-react"

export default function VerifyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedId, setUploadedId] = useState<File | null>(null)
  const [idPreview, setIdPreview] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ id: "Please upload an image file (JPG, PNG, etc.)" })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ id: "File size must be less than 5MB" })
        return
      }

      setUploadedId(file)
      setErrors({})

      const reader = new FileReader()
      reader.onload = (e) => {
        setIdPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeId = () => {
    setUploadedId(null)
    setIdPreview(null)
    setErrors({})
  }

  const handleStep1Continue = () => {
    if (!uploadedId) {
      setErrors({ id: "Please upload your ID document" })
      return
    }
    setCurrentStep(2)
  }

  const handleOtpVerify = async () => {
    if (!otpCode.trim()) {
      setErrors({ otp: "Please enter the verification code" })
      return
    }

    if (otpCode.length !== 6) {
      setErrors({ otp: "Verification code must be 6 digits" })
      return
    }

    setIsVerifying(true)
    setErrors({})

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      setShowSuccess(true)
    }, 2000)
  }

  const handleSendOtp = () => {
    // Simulate sending OTP
    alert("Verification code sent to your email!")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Complete!</h1>
              <p className="text-gray-600 mb-6">
                Your account has been successfully verified. You've earned 200 credits as a welcome bonus!
              </p>

              <Alert className="mb-6 border-green-200 bg-green-50">
                <CreditCard className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  🎉 200 credits have been added to your account!
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Verified Account</h3>
                  <p className="text-sm text-gray-600">Enhanced trust and security</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">200 Credits</h3>
                  <p className="text-sm text-gray-600">Ready to use for purchases</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Higher Limits</h3>
                  <p className="text-sm text-gray-600">Increased selling limits</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600">
                  Start Shopping
                </Button>
                <Button variant="outline" className="bg-transparent">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
          <p className="text-gray-600">Complete verification to unlock all features and earn 200 credits.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 2</span>
            <span className="text-sm text-gray-500">{currentStep === 1 ? "Upload ID" : "Verify Email"}</span>
          </div>
          <Progress value={currentStep === 1 ? 50 : 100} className="h-2" />
        </div>

        {/* Step 1: Upload ID */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Step 1: Upload ID Document
              </CardTitle>
              <CardDescription>
                Upload a clear photo of your government-issued ID (driver's license, passport, or national ID).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>ID Document *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  {idPreview ? (
                    <div className="relative">
                      <img
                        src={idPreview || "/placeholder.svg"}
                        alt="ID Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeId}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="mt-4 text-sm text-gray-600">
                        <p className="font-medium">{uploadedId?.name}</p>
                        <p>{uploadedId && (uploadedId.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, PDF up to 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleIdUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Document must be clearly visible and readable</li>
                  <li>• All four corners must be visible</li>
                  <li>• No glare or shadows covering text</li>
                  <li>• Document must be current and not expired</li>
                </ul>
              </div>

              <Button
                onClick={handleStep1Continue}
                className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
                size="lg"
              >
                Continue to Email Verification
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Email OTP */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Step 2: Email Verification
              </CardTitle>
              <CardDescription>Enter the 6-digit verification code sent to your email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-4">
                  We've sent a verification code to <strong>john.smith@email.com</strong>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code *</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    if (errors.otp) setErrors({})
                  }}
                  className={`text-center text-2xl tracking-widest ${errors.otp ? "border-red-500" : ""}`}
                  maxLength={6}
                />
                {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                <Button variant="link" onClick={handleSendOtp} className="text-blue-600 hover:text-blue-800">
                  Resend Code
                </Button>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-transparent"
                  disabled={isVerifying}
                >
                  Back
                </Button>
                <Button
                  onClick={handleOtpVerify}
                  disabled={isVerifying}
                  className="flex-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
                >
                  {isVerifying ? "Verifying..." : "Verify Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Verification Benefits</CardTitle>
            <CardDescription>What you'll get after completing verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">200 Welcome Credits</h4>
                  <p className="text-sm text-gray-600">Use for purchases and premium features</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Verified Badge</h4>
                  <p className="text-sm text-gray-600">Build trust with other users</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Higher Selling Limits</h4>
                  <p className="text-sm text-gray-600">List more items and higher values</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Priority Support</h4>
                  <p className="text-sm text-gray-600">Get help faster when you need it</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
