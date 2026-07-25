import { createContext, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const AuthContext = createContext(undefined);

const LOCAL_ADMIN_KEY = "dapper_admin_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Fetch active session from Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      // Listen for auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Check local storage for mock admin session if Supabase is not configured
      const savedAdmin = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (savedAdmin) {
        try {
          setUser(JSON.parse(savedAdmin));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        throw error;
      }

      setUser(data.user);
      toast.success("Successfully logged in!");
      return data.user;
    } else {
      // Fallback local admin authentication for demonstration/testing
      if (email === "admin@dapper.com" && password === "admin123") {
        const mockUser = {
          id: "admin-local-1",
          email: "admin@dapper.com",
          role: "admin",
          user_metadata: { name: "Store Admin" },
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success("Logged in as Admin (Local Mode)");
        return mockUser;
      } else {
        const err = new Error("Invalid credentials");
        toast.error(err.message);
        throw err;
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
