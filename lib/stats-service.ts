import { supabase } from './supabase';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  alertsCount: number;
  securityIssuesCount: number;
  totalProducts: number;
  totalMessages: number;
  latestBlogDate: string | null;
  systemStatus: 'operational' | 'degraded' | 'down';
}

/**
 * Fetches all dashboard statistics from various tables
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    console.log('Fetching dashboard statistics...');
    
    // Default stats object with fallback values
    const stats: DashboardStats = {
      totalUsers: 0,
      activeUsers: 0,
      alertsCount: 0,
      securityIssuesCount: 0,
      totalProducts: 0,
      totalMessages: 0,
      latestBlogDate: null,
      systemStatus: 'operational'
    };
    
    // Get total users count from users table
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (!usersError && totalUsers !== null) {
      stats.totalUsers = totalUsers;
      // Estimate active users (for demo purposes we'll say 70% of users are active)
      stats.activeUsers = Math.round(totalUsers * 0.7);
    } else {
      console.error('Error fetching users count:', usersError);
    }
    
    // Get total products count
    const { count: totalProducts, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('in_stock', true);
    
    if (!productsError && totalProducts !== null) {
      stats.totalProducts = totalProducts;
    } else {
      console.error('Error fetching products count:', productsError);
    }
    
    // Get total messages count
    const { count: totalMessages, error: messagesError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });
    
    if (!messagesError && totalMessages !== null) {
      stats.totalMessages = totalMessages;
    } else {
      console.error('Error fetching messages count:', messagesError);
    }
    
    // Get latest blog post date
    const { data: latestBlog, error: blogError } = await supabase
      .from('blogs')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (!blogError && latestBlog) {
      stats.latestBlogDate = latestBlog.created_at;
    } else {
      console.error('Error fetching latest blog:', blogError);
    }
    
    // Set alerts count (for demo - we'll say 1 alert for every 50 users)
    stats.alertsCount = Math.max(1, Math.floor(stats.totalUsers / 50));
    
    // Set security issues count (for demo - random between 0-3)
    stats.securityIssuesCount = Math.floor(Math.random() * 3);
    
    // Check system status (simple check)
    const { error: healthCheckError } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact', head: true });
    
    if (healthCheckError) {
      stats.systemStatus = 'degraded';
      if (healthCheckError.message.includes('connect')) {
        stats.systemStatus = 'down';
      }
    }
    
    console.log('Dashboard statistics fetched successfully:', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    // Return defaults in case of error
    return {
      totalUsers: 0,
      activeUsers: 0,
      alertsCount: 3,
      securityIssuesCount: 2,
      totalProducts: 0,
      totalMessages: 0,
      latestBlogDate: null,
      systemStatus: 'degraded'
    };
  }
}

/**
 * Fetches count of failed login attempts in the last 24 hours
 * This is a mock implementation as we don't have this table in the schema
 */
export async function getFailedLoginAttempts(): Promise<number> {
  // In a real implementation, you would query a security_events or auth_logs table
  // For demo purposes, return a random number between 0 and 20
  return Math.floor(Math.random() * 20);
}

/**
 * Gets system metrics like CPU usage, memory usage, etc.
 * This is a mock implementation
 */
export async function getSystemMetrics(): Promise<{
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: number;
}> {
  // In a real implementation, you would query system metrics
  // For demo purposes, return realistic-looking random values
  return {
    cpuUsage: Math.floor(Math.random() * 50) + 10, // 10-60%
    memoryUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
    diskUsage: Math.floor(Math.random() * 30) + 20, // 20-50%
    uptime: Math.floor(Math.random() * 30) + 1 // 1-31 days
  };
} 