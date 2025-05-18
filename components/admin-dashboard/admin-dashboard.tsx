import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/demo-dashboard/main-nav";

export const AdminDashboard: FC = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex items-end justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h2>
      </div>
      <div className="flex h-16 items-center bg-muted px-6 rounded-xl">
        <MainNav />
      </div>
      <div className="flex-1 space-y-4 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">182</div>
              <p className="text-sm text-muted-foreground">
                +22 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-sm text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Premium Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">
                +5 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,430</div>
              <p className="text-sm text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="font-medium">User List</div>
                  <div className="text-sm text-muted-foreground">
                    In a real app, this would list users from Firestore
                  </div>
                  <Button className="mt-2" variant="outline">Manage Users</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 