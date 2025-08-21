import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../../config/supabase.js';
import { fetchUser } from '../../config/auth.config.js';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      console.log('Initial session:', currentSession);
      setSession(currentSession);
      
      if (currentSession?.user) {
        try {
          const { username } = await fetchUser(currentSession.user.id) || {};
          console.log('User data:', { username });
          setUser({ ...currentSession.user, username });
        } catch (fetchError) {
          console.error('Error fetching user data:', fetchError);
          setUser(currentSession.user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error in getSession:', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session on component mount
    
    getSession();

    // Store subscription in a variable to properly clean up
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   async (event, newSession) => {
    //     console.log('Auth state changed:', event);
    //     console.log('New session:', newSession);
        
    //     try {
    //       setSession(newSession);
          
    //       if (newSession?.user) {
    //         try {
    //           const { username } = await fetchUser(newSession.user.id) || {};
    //           console.log('User data:', { username });
    //           setUser({ ...newSession.user, username });
    //         } catch (fetchError) {
    //           console.error('Error fetching user data during auth state change:', fetchError);
    //           setUser(newSession.user);
    //         }
    //       } else {
    //         console.log('No user found in new session');
    //         setUser(null);
    //       }
    //     } catch (error) {
    //       console.error('Error in auth state change:', error);
    //       setUser(newSession?.user || null);
    //     } finally {
    //         console.log('Auth state change completed');
    //       setLoading(false);
    //     }
    //   },
    //   (error) => {
    //     console.error('Auth subscription error:', error);
    //     setLoading(false);
    //   }
    // );

    // Cleanup subscription when component unmounts
    // return () => {
    //   if (subscription?.unsubscribe) {
    //     subscription.unsubscribe();
    //   }
    // };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
