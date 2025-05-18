"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClipboardList,
  FileText,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  ChevronDown,
  Calculator,
  Download,
  Eye,
  PenTool
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Link from "next/link";

export default function QuotesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock quote data
  const quotes = [
    {
      id: "QUO-512",
      name: "Heat-Resistant Gloves Bulk Order",
      status: "Pending Approval",
      date: "18/09/2023",
      expiry: "18/10/2023",
      items: 5,
      total: "£4,820.00"
    },
    {
      id: "QUO-498",
      name: "Custom Chemical Resistance Package",
      status: "Draft",
      date: "02/09/2023",
      expiry: "02/10/2023",
      items: 2,
      total: "£950.00"
    },
    {
      id: "QUO-486",
      name: "Annual Supply Contract - Cut Resistant",
      status: "Approved",
      date: "24/08/2023",
      expiry: "24/09/2023",
      items: 8,
      total: "£12,450.00"
    },
    {
      id: "QUO-475",
      name: "Specialist Laboratory Protection",
      status: "Expired",
      date: "15/08/2023",
      expiry: "15/09/2023",
      items: 3,
      total: "£2,340.00"
    },
    {
      id: "QUO-456",
      name: "Branded Safety Gloves - Engineering Dept",
      status: "Rejected",
      date: "01/08/2023",
      expiry: "01/09/2023",
      items: 4,
      total: "£3,680.00"
    }
  ];

  // Mock templates data
  const quoteTemplates = [
    {
      id: 1,
      name: "Standard Bulk Order",
      description: "Template for ordering multiple standard items with volume discounts",
      lastUsed: "05/09/2023"
    },
    {
      id: 2,
      name: "Custom Branded Products",
      description: "Template for requesting custom branded safety equipment",
      lastUsed: "22/08/2023"
    },
    {
      id: 3,
      name: "Annual Supply Contract",
      description: "Long-term supply agreement with scheduled deliveries",
      lastUsed: "10/07/2023"
    }
  ];

  // Filter quotes by search query and status
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || quote.status.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge for a quote
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>;
      case "Approved":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Draft":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
      case "Expired":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
      case "Rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get status icon for a quote
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Draft":
        return <PenTool className="h-4 w-4 text-blue-500" />;
      case "Expired":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <ClipboardList className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quote Management</h1>
          <p className="text-muted-foreground">
            Request, track and manage your custom quotes
          </p>
        </div>

        <Button className="bg-[#F28C38] hover:bg-[#F28C38]/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Quote Request
        </Button>
      </div>

      <Tabs defaultValue="quotes" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="quotes">Quote History</TabsTrigger>
          <TabsTrigger value="templates">Quote Templates</TabsTrigger>
          <TabsTrigger value="calculator">Volume Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search quotes..."
                className="pl-8 md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Quote ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No quotes found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredQuotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell className="font-medium">{quote.id}</TableCell>
                        <TableCell>{quote.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {getStatusIcon(quote.status)}
                            {getStatusBadge(quote.status)}
                          </div>
                        </TableCell>
                        <TableCell>{quote.date}</TableCell>
                        <TableCell>{quote.expiry}</TableCell>
                        <TableCell className="text-right">{quote.items}</TableCell>
                        <TableCell className="text-right font-medium">{quote.total}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4 text-[#F28C38]" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            {quote.status === "Approved" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Download className="h-4 w-4 text-[#F28C38]" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Download Quote</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" className="text-[#F28C38] border-[#F28C38]">
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quoteTemplates.map((template) => (
              <Card key={template.id} className="border-[#F28C38]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>Last used: {template.lastUsed}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <Button variant="default" className="w-full bg-[#F28C38] hover:bg-[#F28C38]/90">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volume Discount Calculator</CardTitle>
              <CardDescription>
                Calculate your bulk order discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Product Category</label>
                      <Select defaultValue="heat-resistant">
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heat-resistant">Heat-Resistant Gloves</SelectItem>
                          <SelectItem value="cut-resistant">Cut-Resistant Gloves</SelectItem>
                          <SelectItem value="chemical">Chemical-Resistant Gloves</SelectItem>
                          <SelectItem value="general">General Purpose Gloves</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Quantity</label>
                      <Input type="number" defaultValue="100" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Base Price Per Unit (£)</label>
                      <Input type="number" defaultValue="12.99" />
                    </div>
                    
                    <Button className="mt-2 bg-[#F28C38] hover:bg-[#F28C38]/90 w-full">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Discount
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-[#F5EFE0]/50 dark:bg-gray-800/20">
                  <h3 className="font-medium text-lg mb-4">Discount Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm">Base Price (Per Unit)</span>
                      <span className="font-medium">£12.99</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quantity</span>
                      <span className="font-medium">100 units</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-medium">£1,299.00</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 text-green-600">
                      <span className="text-sm">Volume Discount (15%)</span>
                      <span className="font-medium">-£194.85</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 text-green-600">
                      <span className="text-sm">Loyalty Discount (5%)</span>
                      <span className="font-medium">-£64.95</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Discounted Price (Per Unit)</span>
                      <span className="font-medium">£10.39</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t font-semibold text-lg">
                      <span>Total</span>
                      <span>£1,039.20</span>
                    </div>
                    
                    <div className="pt-2 text-sm text-muted-foreground">
                      Save £259.80 (20% off) with this volume order
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-[#F28C38] hover:bg-[#F28C38]/90">
                    Request Quote with This Discount
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-[#F5EFE0] dark:bg-gray-800/20 rounded-lg p-6 border border-[#F28C38]/20">
        <h2 className="text-xl font-semibold mb-4">Need Assistance with Quotes?</h2>
        <p className="mb-4 text-muted-foreground">
          Our team is ready to help you create custom quotes tailored to your specific requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Quote Request Options</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Custom product specifications</li>
              <li>Volume-based pricing</li>
              <li>Multi-year supply contracts</li>
              <li>Regular scheduled deliveries</li>
              <li>Custom testing and certification</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Contact Our Sales Team</h3>
            <p className="text-muted-foreground mb-4">Speak with our specialists for personalised quotations and advice.</p>
            <Button variant="outline" className="text-[#F28C38] border-[#F28C38]">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 