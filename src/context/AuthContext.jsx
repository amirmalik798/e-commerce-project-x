import { createContext, useActionState } from "react";
import { useState, useContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [user, setUser] = useState(localStorage.getItem('currentuseremail') ? { email: localStorage.getItem('currentuseremail')}: null);

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            return {success: false, error: 'Email already exists'};
        }
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setUser({email})
        localStorage.setItem('currentuseremail', email);
        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = (users.find(u => u.email === email && u.password === password));

        if (!user) {
            return { success: false, error: "Invalid email or password"};
        }

        localStorage.setItem('currentuseremail', email);
        setUser({email});
        return { success: true };
    }

    function logout() {
        localStorage.removeItem('currentuseremail');
        setUser(null);
    }

    return <AuthContext.Provider value={{signUp, user, logout, login}}>
        {children}
    </AuthContext.Provider>    
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}