import { supabase } from './supabase.js'; 

// Fetch the user profile and session based on userId
const fetchUser = async (userId) => {
    try {
        // Fetch user profile
        console.log('USERID: ', userId);
        
        if(!userId) return;
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', userId)
            .single();

        // Fetch session
        const { data: session } = await supabase.auth.getSession(); 

        if (profileError) {
            console.log('Error fetching profile:', profileError.message);
            return null;
        }

        // Return both username and session user
        return { username: profile.username, user: session.user };
    } catch (error) {
        console.log('Error in fetching user: ', error);
        return null;
    }
};


// Sign-up function
const signUp = async (email, password) => {
    try {
        // Sign up the user
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log('Error during sign-up:', error.message);
            return null;
        }

        // Fetch session after successful sign-up
        const { data: session } = await supabase.auth.getSession(); 
        console.log('User signed up:', session);

        return session;
    } catch (error) {
        console.log('Error in signup: ', error);
        return null;
    }
};

// Sign-in function
const signIn = async (email, password) => {
    try {
        // Sign in the user
        const { user, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log('Error during sign-in:', error.message);
            return null;
        }

        // Fetch the profile after successful sign-in
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.log('Error fetching profile:', profileError.message);
            return null;
        }

        console.log('User signed in:', user, 'Username:', profile.username);

        // Return user and username
        return { user, username: profile.username };
    } catch (error) {
        console.log('Error during sign-in:', error);
        return null;
    }
};

// Sign-out function
const signOut = async () => {
    try {
        await supabase.auth.signOut();
        console.log('User signed out');
    } catch (error) {
        console.log('Error during sign-out:', error);
    }
};

const insertUser = async(username) => {
    try {

        const { data: session } = await supabase.auth.getSession(); 
        console.log('User current session:', session);

        const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .insert([{ id: session.session.user.id, username }]);
    
            if (profileError) {
                console.log('Error creating profile:', profileError.message);
                return null;
            }
            return profile;
    } catch (error) {
        console.log('Error in inserting: ', error);
        
    }
}

export { signUp, signIn, signOut, fetchUser, insertUser };
