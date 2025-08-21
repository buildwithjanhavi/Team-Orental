"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { Edit, Mail, MapPin, Calendar, Star, Package, DollarSign, Eye } from "lucide-react"

export default function ProfilePage() {
  const [trustScore, setTrustScore] = useState(85)

  // Simulate dynamic trust score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrustScore((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newScore = prev + change
        return Math.max(0, Math.min(100, newScore))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const userListings = [
    {
      id: 1,
      name: "Professional Camera",
      price: 299,
      image: "/professional-camera.png",
      status: "active",
      views: 45,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Mountain Bike",
      price: 450,
      image: "/mountain-bike-trail.png",
      status: "sold",
      views: 78,
      category: "Sports",
    },
    {
      id: 3,
      name: "Gaming Laptop",
      price: 899,
      image: "/gaming-laptop.png",
      status: "active",
      views: 123,
      category: "Electronics",
    },
  ]

  const recentActivity = [
    { action: "Listed", item: "Professional Camera", date: "2 days ago" },
    { action: "Sold", item: "Mountain Bike", date: "1 week ago" },
    { action: "Updated", item: "Gaming Laptop", date: "3 days ago" },
    { action: "Received review", item: "Vintage Guitar", date: "1 week ago" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/professional-headshot.png" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white">
                      JS
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">John Smith</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Mail className="w-4 h-4" />
                  john.smith@email.com
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trust Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Trust Score</span>
                    <span className="text-sm font-bold text-gray-900">{trustScore}/100</span>
                  </div>
                  <Progress value={trustScore} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Items Sold</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Member since March 2023
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4" />
                    24 reviews
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium text-gray-900">{activity.action}</span>
                        <span className="text-gray-600 ml-1">{activity.item}</span>
                      </div>
                      <span className="text-gray-500">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="listings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                  <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600">
                    <Package className="w-4 h-4 mr-2" />
                    Add New Listing
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {userListings.map((listing) => (
                    <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge
                            className={`absolute top-2 right-2 ${
                              listing.status === "active"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-500 hover:bg-gray-600"
                            }`}
                          >
                            {listing.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg font-semibold text-gray-900">{listing.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {listing.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            ${listing.price}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            {listing.views} views
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            {listing.status === "active" ? "Pause" : "Reactivate"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="purchases" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                      <p className="text-gray-600 mb-4">Start browsing our marketplace to find great deals!</p>
                      <Button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600">
                        Browse Items
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">As a Seller</CardTitle>
                      <CardDescription>Reviews from buyers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-3xl font-bold">4.8</div>
                        <div>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">18 reviews</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-8">5★</span>
                          <Progress value={75} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">15</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-8">4★</span>
                          <Progress value={20} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">3</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-8">3★</span>
                          <Progress value={0} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">As a Buyer</CardTitle>
                      <CardDescription>Reviews from sellers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-3xl font-bold">4.9</div>
                        <div>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">6 reviews</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-8">5★</span>
                          <Progress value={85} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">5</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm w-8">4★</span>
                          <Progress value={15} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">1</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
