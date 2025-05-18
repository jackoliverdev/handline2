"use client";
   
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { UserRole, getUserRole } from "@/lib/auth";
import { useUser } from "reactfire";

interface RoleContextType {
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType>({
  role: "user",
  isAdmin: false,
  isLoading: true,
});

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, status } = useUser();
  const [role, setRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      if (user) {
        const userRole = await getUserRole(user);
        setRole(userRole);
      }
      setIsLoading(false);
    };

    if (status === "success") {
      loadRole();
    }
  }, [user, status]);

  return (
    <RoleContext.Provider 
      value={{ 
        role, 
        isAdmin: role === "admin", 
        isLoading 
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext); 