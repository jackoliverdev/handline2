"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { 
  ClipboardList, FileText, ShoppingBag, AlertTriangle, 
  Calendar, CheckCircle, Clock, Package, FileCheck,
  BarChart, ChevronRight, Flame, Scissors, Filter, ShieldAlert
} from "lucide-react";
import Image from "next/image";
import { getFeaturedProducts, Product } from "@/lib/products-service";
import { MiniProductCard } from "@/components/app/mini-product-card";
import { useLanguage } from "@/lib/context/language-context";

export default function DashboardPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured products when component mounts
  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        const { products } = await getFeaturedProducts(language);
        setRecommendedProducts(products);
      } catch (error) {
        console.error("Error loading recommended products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecommendedProducts();
  }, [language]);

  // Sample data for the customer dashboard
  const recentOrders = [
    { id: "ORD-2401", date: "12/09/2023", status: "Delivered", items: 12, total: "£4,320.50" },
    { id: "ORD-2389", date: "28/08/2023", status: "Processing", items: 3, total: "£890.25" },
    { id: "ORD-2376", date: "14/08/2023", status: "Delivered", items: 8, total: "£2,145.00" },
  ];

  const pendingQuotes = [
    { id: "QUO-512", date: "18/09/2023", status: "Awaiting Approval", items: 5, expiry: "18/10/2023" },
    { id: "QUO-498", date: "02/09/2023", status: "Draft", items: 2, expiry: "02/10/2023" },
  ];

  const documents = [
    { id: 1, name: "Safety Compliance Certificate", type: "PDF", date: "05/09/2023" },
    { id: 2, name: "Product Specifications Sheet", type: "PDF", date: "10/08/2023" },
    { id: 3, name: "ISO 9001 Documentation", type: "PDF", date: "22/07/2023" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#F5EFE0] rounded-xl p-6 shadow-sm border border-[#F28C38]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1E1E1E]">Welcome to your HandLine Portal</h1>
            <p className="text-[#5A5A5A] mt-1">Your industrial safety glove management centre</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-[#F28C38] hover:bg-[#F28C38]/90 text-white">
            Request a Quote
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#F28C38]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-[#F28C38]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Processing for delivery</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#F28C38]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quote Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-[#F28C38]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Pending your review</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#F28C38]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-[#F28C38]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Technical specifications</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#F28C38]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protection Status</CardTitle>
            <ShieldAlert className="h-4 w-4 text-[#F28C38]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">Safety compliance level</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your latest purchases and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={order.status === "Delivered" ? "outline" : "default"} className={order.status === "Delivered" ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200" : ""}>
                          {order.status}
                        </Badge>
                        <div className="text-right">
                          <div className="font-medium">{order.total}</div>
                          <div className="text-xs text-muted-foreground">{order.items} items</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <Link href="/dashboard/orders" className="flex items-center justify-center">
                      View All Orders
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recommended Products</CardTitle>
                <CardDescription>
                  Tailored to your industry needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F28C38]"></div>
                  </div>
                ) : recommendedProducts.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">No recommended products available.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recommendedProducts.slice(0, 3).map((product) => (
                      <Link href={`/products/${encodeURIComponent(product.name)}`} key={product.id}>
                        <MiniProductCard 
                          product={product} 
                          showRemoveButton={false}
                        />
                      </Link>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                      <Link href="/products" className="flex items-center justify-center">
                        Browse Catalogue
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track all your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground py-8">
                  This tab would display a comprehensive order history table
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote Management</CardTitle>
              <CardDescription>
                Review and approve your quotes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pendingQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{quote.id}</p>
                      <p className="text-sm text-muted-foreground">Created: {quote.date}</p>
                      <p className="text-xs text-muted-foreground">Expires: {quote.expiry}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        {quote.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="bg-[#F28C38] hover:bg-[#F28C38]/90">Approve</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Documentation</CardTitle>
              <CardDescription>
                Access safety certificates and product specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <FileCheck className="h-5 w-5 text-[#F28C38] mr-3" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Updated: {doc.date}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Safety Compliance Section */}
      {activeTab === "overview" && (
        <Card>
          <CardHeader>
            <CardTitle>Safety Compliance Centre</CardTitle>
            <CardDescription>Track your safety standards and certification status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">EN 388 (Cut Protection)</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">EN 407 (Heat Protection)</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">EN 374 (Chemical Protection)</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-[#F28C38]" />
                  Safety Alerts
                </h3>
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
                    <p className="text-sm font-medium text-amber-800">Chemical Resistance Update</p>
                    <p className="text-xs text-amber-700 mt-1">
                      New ISO standards for chemical resistance will be effective from 01/01/2024.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                    <p className="text-sm font-medium text-blue-800">Certification Renewal</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your EN 388 certification needs renewal by 15/12/2023.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
