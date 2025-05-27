
import { useEffect, useState } from 'react';
import { supabase } from "../integrations/supabase/client";

export type HandicapLevel = "beginner" | "novice" | "intermediate" | "advanced" | "expert" | "pro";

export const useProfile = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  
  const [handicap, setHandicap] = useState<HandicapLevel | null>(null);
  const [goals, setGoals] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [scoreGoal, setScoreGoal] = useState<number | null>(null);
  const [handicapGoal, setHandicapGoal] = useState<number | null>(null);

  const saveProfile = async (profileData: { 
    handicap?: HandicapLevel; 
    goals?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    selected_goals?: string[];
    score_goal?: number | null;
    handicap_goal?: number | null;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      console.log("Saving profile for user:", user.id, "with data:", profileData);

      const { error } = await supabase
        .from('profiles')
        .update({
          handicap_level: profileData.handicap,
          goals: profileData.goals,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          avatar_url: profileData.avatarUrl,
          has_onboarded: true,
          selected_goals: profileData.selected_goals,
          score_goal: profileData.score_goal,
          handicap_goal: profileData.handicap_goal
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error saving profile:", error);
        throw error;
      }
      
      console.log("Profile saved successfully");
      
      if (profileData.handicap) setHandicap(profileData.handicap);
      if (profileData.goals) setGoals(profileData.goals);
      if (profileData.firstName) setFirstName(profileData.firstName);
      if (profileData.lastName) setLastName(profileData.lastName);
      if (profileData.avatarUrl) setAvatarUrl(profileData.avatarUrl);
      if (profileData.score_goal !== undefined) setScoreGoal(profileData.score_goal);
      if (profileData.handicap_goal !== undefined) setHandicapGoal(profileData.handicap_goal);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    const checkProfile = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        console.log("Checking profile for user:", user.id);

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('has_onboarded, handicap_level, goals, first_name, last_name, avatar_url, selected_goals, score_goal, handicap_goal')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setIsFirstVisit(true);
        } else if (!profileData) {
          console.log("No profile found, creating a new profile");
          setIsFirstVisit(true);
          
          // Create a new profile if one doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              has_onboarded: false
            });
            
          if (insertError) console.error("Error creating profile:", insertError);
        } else {
          console.log("Profile data:", profileData);
          setIsFirstVisit(profileData.has_onboarded === false);
          if (profileData.handicap_level) {
            setHandicap(profileData.handicap_level as HandicapLevel);
          }
          setGoals(profileData.goals);
          setFirstName(profileData.first_name);
          setLastName(profileData.last_name);
          setAvatarUrl(profileData.avatar_url);
          setScoreGoal(profileData.score_goal);
          setHandicapGoal(profileData.handicap_goal);
        }

        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('is_premium')
          .eq('user_id', user.id)
          .single();

        if (!subscriptionError && subscriptionData) {
          setIsPremium(subscriptionData.is_premium);
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, []);

  return { 
    isFirstVisit, 
    loading, 
    isPremium,
    handicap,
    goals,
    firstName,
    lastName,
    avatarUrl,
    scoreGoal,
    handicapGoal,
    setHandicap,
    setGoals,
    saveProfile 
  };
};
