"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Sample product data
const products = [
  {
    id: 1,
    name: "Professional Camera",
    price: 299,
    image: "/professional-camera.png",
    description: "High-quality DSLR camera perfect for photography enthusiasts. Includes lens kit and carrying case.",
    category: "Electronics",
    condition: "Like New",
  },
  {
    id: 2,
    name: "Mountain Bike",
    price: 450,
    image: "/mountain-bike-trail.png",
    description: "Sturdy mountain bike with 21-speed transmission. Great for trails and city riding.",
    category: "Sports",
    condition: "Good",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 899,
    image: "/gaming-laptop.png",
    description: "High-performance gaming laptop with RTX graphics card. Perfect for gaming and work.",
    category: "Electronics",
    condition: "Excellent",
  },
  {
    id: 4,
    name: "Vintage Guitar",
    price: 650,
    image: "/vintage-acoustic-guitar.png",
    description: "Beautiful vintage acoustic guitar with rich, warm tone. Includes hard case.",
    category: "Music",
    condition: "Very Good",
  },
  {
    id: 5,
    name: "Designer Sofa",
    price: 1200,
    image: "/modern-designer-sofa.png",
    description: "Comfortable 3-seater designer sofa in excellent condition. Perfect for modern living rooms.",
    category: "Furniture",
    condition: "Like New",
  },
  {
    id: 6,
    name: "Power Tools Set",
    price: 180,
    image: "/placeholder-4buh2.png",
    description: "Complete power tools set including drill, saw, and accessories. Great for DIY projects.",
    category: "Tools",
    condition: "Good",
  },
]

export default function BuyPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Items</h1>
          <p className="text-gray-600">Discover amazing products from trusted sellers in our marketplace.</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">{product.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {product.condition}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Buy Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Product details and purchase information
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                          <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900">Category</h4>
                            <p className="text-gray-600">{product.category}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Condition</h4>
                            <p className="text-gray-600">{product.condition}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                              ${product.price}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600">
                              Purchase Now
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Seller Information</h3>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                          JS
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">John Smith</p>
                          <p className="text-sm text-gray-600">Trust Score: 4.8/5 ⭐</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
