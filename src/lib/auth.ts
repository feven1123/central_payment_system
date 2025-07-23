export function login(email: string, password: string) {
    if (email === "admin@centralpay.com" && password === "admin123") {
      return { token: "fake-token", name: "Admin" }
    }
    return null
  }
  
  export function logout() {
    // Clear any stored tokens/session data
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token")
    }
  }
  
  export function isAuthenticated() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth-token") !== null
    }
    return false
  }
  