
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }
      
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      if (event !== 'INITIAL_SESSION') {
         setLoading(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId) => {
    if (!userId) {
      setUserProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, full_name, role, email')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error.message);
        if (error.code === 'PGRST116') { // "PGRST116" is for "Query returned no rows"
          setUserProfile(null); // User exists in auth.users but not user_profiles yet
        } else {
           setUserProfile(null);
        }
      } else {
        setUserProfile(data);
      }
    } catch (error) {
        console.error('Unexpected error fetching user profile:', error);
        setUserProfile(null);
    }
  };
  
  const psychologistEmails = [
    'mario.cordova@example.com',
    'erick.altamirano@example.com',
    'yolotli.flores@example.com',
    'maria.ortega@example.com',
    'iliana.ruvalcaba@example.com'
  ];

  const value = {
    user,
    userProfile,
    loading,
    signIn: async (email, password) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (data.user) {
        await fetchUserProfile(data.user.id);
         // Check if the signed-in user is one of the predefined psychologists
        if (psychologistEmails.includes(data.user.email)) {
            // Potentially update role if it wasn't set correctly during initial seed or sign up
            const { data: profileData, error: profileError } = await supabase
                .from('user_profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (profileData && profileData.role !== 'psychologist') {
                await supabase
                    .from('user_profiles')
                    .update({ role: 'psychologist' })
                    .eq('id', data.user.id);
                await fetchUserProfile(data.user.id); // Re-fetch profile
            } else if (!profileData && !profileError) { // Profile might not exist if trigger failed or user was created before trigger
                 await supabase.from('user_profiles').insert([{id: data.user.id, email: data.user.email, role: 'psychologist' }]);
                 await fetchUserProfile(data.user.id);
            }
        }
      }
      setLoading(false);
      return { data, error };
    },
    signUp: async (email, password, fullName) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      // The trigger handle_new_user should create the profile with 'patient' role.
      // If it's a psychologist email, their role can be updated post-signup manually or via a special flow.
      if (data.user) {
         await fetchUserProfile(data.user.id); // Fetch after signup ensures profile is loaded
      }
      setLoading(false);
      return { data, error };
    },
    signOut: async () => {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      setLoading(false);
      return { error };
    },
    fetchUserProfile // expose this function
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
