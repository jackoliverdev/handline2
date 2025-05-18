"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  Package,
  FileText,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { MiniProductCard } from "@/components/app/mini-product-card";
import { getFeaturedProducts, Product } from "@/lib/products-service";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useLanguage } from "@/lib/context/language-context";

// Define types for our order data structure
interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  total: string;
  tracking?: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  invoiceNumber?: string;
}

export default function OrdersPage() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Load products and create mock orders
  useEffect(() => {
    const loadProductsAndOrders = async () => {
      try {
        const { products } = await getFeaturedProducts(language);
        setProducts(products);

        // Create mock orders using the real products
        if (products.length > 0) {
          // Helper function to get random products
          const getRandomProducts = (count: number) => {
            const randomProducts: OrderItem[] = [];
            for (let i = 0; i < count; i++) {
              const randomProduct = products[Math.floor(Math.random() * products.length)];
              const existingItem = randomProducts.find(item => item.product.id === randomProduct.id);
              
              // Calculate a price based on product name
              const productPrice = 
                (randomProduct.name?.includes("Therm") ? 129.99 : 
                randomProduct.name?.includes("Cut") ? 89.99 : 
                randomProduct.name?.includes("Chem") ? 109.99 : 99.99);
              
              if (existingItem) {
                existingItem.quantity += 1;
              } else {
                randomProducts.push({
                  product: randomProduct,
                  quantity: 1,
                  price: productPrice,
                });
              }
            }
            return randomProducts;
          };

          // Create mock orders
          const mockOrders: Order[] = [
            {
              id: "ORD-2401",
              date: "12/09/2023",
              status: "Delivered",
              items: getRandomProducts(4),
              total: "£4,320.50",
              tracking: "TRK-12345678",
              estimatedDelivery: "14/09/2023",
              shippingAddress: "Unit 5, Industrial Park, Manchester, M12 4WD, United Kingdom",
              invoiceNumber: "INV-20230912-2401",
            },
            {
              id: "ORD-2389",
              date: "28/08/2023",
              status: "Processing",
              items: getRandomProducts(3),
              total: "£890.25",
              estimatedDelivery: "05/09/2023",
              shippingAddress: "Building 7A, Science Park, Cambridge, CB4 0FX, United Kingdom",
            },
            {
              id: "ORD-2376",
              date: "14/08/2023",
              status: "Delivered",
              items: getRandomProducts(8),
              total: "£2,145.00",
              tracking: "TRK-87654321",
              estimatedDelivery: "18/08/2023",
              shippingAddress: "Factory Unit 12, Industrial Estate, Birmingham, B6 7EU, United Kingdom",
              invoiceNumber: "INV-20230814-2376",
            },
            {
              id: "ORD-2350",
              date: "25/07/2023",
              status: "Shipped",
              items: getRandomProducts(5),
              total: "£1,780.75",
              tracking: "TRK-56781234",
              estimatedDelivery: "01/08/2023",
              shippingAddress: "Warehouse 3, Distribution Centre, Glasgow, G1 5QE, United Kingdom",
              invoiceNumber: "INV-20230725-2350",
            },
            {
              id: "ORD-2342",
              date: "18/07/2023",
              status: "Delivered",
              items: getRandomProducts(2),
              total: "£450.25",
              tracking: "TRK-43215678",
              estimatedDelivery: "22/07/2023",
              shippingAddress: "Production Facility, Trading Estate, Leeds, LS9 8RY, United Kingdom",
              invoiceNumber: "INV-20230718-2342",
            },
          ];

          setOrders(mockOrders);
        }
      } catch (error) {
        console.error("Error loading products and orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductsAndOrders();
  }, [language]);

  // Toggle expanded order
  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Calculate total items in an order
  const getTotalItems = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Filter orders based on search query and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge variant
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      case "Shipped":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Delivered":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Cancelled":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Cancelled":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage your orders and shipments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-[#F28C38] border-[#F28C38]" asChild>
            <Link href="/dashboard">
              <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <TabsList className="mb-4 md:mb-0">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="delivered">Completed</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F28C38]"></div>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No orders found</h3>
                  <p className="mt-1 text-muted-foreground">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "You haven't placed any orders yet."}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Order ID</TableHead>
                      <TableHead className="w-[120px]">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <React.Fragment key={order.id}>
                        <TableRow
                          onClick={() => toggleOrderExpand(order.id)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                              {order.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(order.status)}
                              {getStatusBadge(order.status)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{getTotalItems(order.items)}</TableCell>
                          <TableCell className="text-right font-medium">{order.total}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              {order.invoiceNumber && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4 text-[#F28C38]" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Download Invoice</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleOrderExpand(order.id);
                                }}
                              >
                                {expandedOrder === order.id ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedOrder === order.id && (
                          <TableRow className="bg-muted/30 border-b">
                            <TableCell colSpan={6} className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-7 space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center">
                                      <Package className="mr-1.5 h-4 w-4 text-[#F28C38]" />
                                      Order Items
                                    </h4>
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4">
                                      {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                          <MiniProductCard
                                            product={item.product}
                                            showRemoveButton={false}
                                          />
                                          <div className="flex flex-col items-end ml-auto">
                                            <div className="text-sm font-medium">
                                              {(item.price * item.quantity).toLocaleString('en-GB', {
                                                style: 'currency',
                                                currency: 'GBP',
                                              })}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                              {item.quantity} × {item.price.toLocaleString('en-GB', {
                                                style: 'currency',
                                                currency: 'GBP',
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="md:col-span-5 space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center">
                                      <Truck className="mr-1.5 h-4 w-4 text-[#F28C38]" />
                                      Shipping Details
                                    </h4>
                                    <div className="border rounded-md p-3 bg-white dark:bg-gray-950">
                                      <p className="text-sm whitespace-pre-wrap">{order.shippingAddress}</p>
                                      
                                      {order.tracking && (
                                        <div className="mt-3 pt-3 border-t">
                                          <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">Tracking Number</span>
                                            <span className="text-xs font-medium">{order.tracking}</span>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {order.estimatedDelivery && (
                                        <div className="mt-2">
                                          <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">Estimated Delivery</span>
                                            <span className="text-xs font-medium">{order.estimatedDelivery}</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {order.invoiceNumber && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2 flex items-center">
                                        <FileText className="mr-1.5 h-4 w-4 text-[#F28C38]" />
                                        Invoice
                                      </h4>
                                      <div className="border rounded-md p-3 bg-white dark:bg-gray-950">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm">{order.invoiceNumber}</span>
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="h-8 text-[#F28C38] border-[#F28C38] hover:bg-[#F28C38]/5"
                                          >
                                            <Download className="mr-1.5 h-3.5 w-3.5" />
                                            Download
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="border rounded-md p-3 bg-white dark:bg-gray-950">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm text-muted-foreground">Subtotal</span>
                                      <span className="text-sm font-medium">
                                        {(parseFloat(order.total.replace(/[^0-9.-]+/g, "")) * 0.8).toLocaleString('en-GB', {
                                          style: 'currency',
                                          currency: 'GBP',
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm text-muted-foreground">VAT (20%)</span>
                                      <span className="text-sm font-medium">
                                        {(parseFloat(order.total.replace(/[^0-9.-]+/g, "")) * 0.2).toLocaleString('en-GB', {
                                          style: 'currency',
                                          currency: 'GBP',
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-border">
                                      <span className="text-sm font-medium">Total</span>
                                      <span className="text-sm font-medium">
                                        {order.total}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-end mt-4 gap-2">
                                {order.status === "Delivered" && (
                                  <Button size="sm" variant="outline">
                                    Reorder
                                  </Button>
                                )}
                                {order.tracking && (
                                  <Button size="sm" className="bg-[#F28C38] hover:bg-[#F28C38]/90">
                                    Track Package
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="m-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Active orders are those with "Processing" or "Shipped" status.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delivered" className="m-0">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Completed orders are those with "Delivered" status.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 