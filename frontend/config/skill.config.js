import { supabase } from "./supabase.js";

const insertSkill = async(userID, title, description, videoUrl) => {
    try {
        //video url is optional
        if (!videoUrl) {
            videoUrl = null;
        }
        const { error: skillError } = await supabase
            .from('skills')
            .insert([{ userid: userID, title, description, video_url: videoUrl }]);
    
        if (skillError) {
            console.log('Error creating skill:', skillError.message);
            return null;
        }
        return true;
    } catch (error) {
        console.log('Error in inserting: ', error);
        return false;
    }
}

const fetchSkills = async() => {
    try {
        const { data: skills, error: skillsError  } = await supabase
                                    .from('skills')
                                    .select(`
                                        id,
                                        title,
                                        description,
                                        video_url,
                                        votes,
                                        profiles (username)
                                    `);
    
        if (skillsError) {
            console.log('Error fetching skills:', skillsError.message);
            return null;
        }
        console.log('Skills fetched:', skills);
        return skills;
    } catch (error) {
        console.log('Error in fetching: ', error);
        return null;
    }
}

const fetchSkillById = async(id) => {
    try {
        const { data: skill, error: skillError } = await supabase
            .from('skills')
            .select('*')
            .eq('id', id);
    
        if (skillError) {
            console.log('Error fetching skill:', skillError.message);
            return null;
        }
        console.log('Skill fetched:', skill);
        return skill;
    } catch (error) {
        console.log('Error in fetching: ', error);
        return null;
    }
}

// Vote for a skill
export const voteForSkill = async (skillId, userId) => {
  try {
    // Fetch current votes
    const { data: skill, error: fetchError } = await supabase
      .from('skills')
      .select('votes')
      .eq('id', skillId)
      .single();

    if (fetchError) throw fetchError;

    const currentVotes = skill.votes || [];

    // Avoid duplicate votes
    if (currentVotes.includes(userId)) {
      return skill; // Already voted
    }

    const updatedVotes = [...currentVotes, userId];

    // Update skill with new votes
    const { data, error } = await supabase
      .from('skills')
      .update({ votes: updatedVotes })
      .eq('id', skillId)
      .select('*, profiles(username)')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error voting for skill:', error);
    return null;
  }
};

// Remove vote from a skill
export const removeVoteFromSkill = async (skillId, userId) => {
  try {
    // Fetch current votes
    const { data: skill, error: fetchError } = await supabase
      .from('skills')
      .select('votes')
      .eq('id', skillId)
      .single();

    if (fetchError) throw fetchError;

    const currentVotes = skill.votes || [];
    const updatedVotes = currentVotes.filter(v => v !== userId);

    const { data, error } = await supabase
      .from('skills')
      .update({ votes: updatedVotes })
      .eq('id', skillId)
      .select('*, profiles(username)')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error removing vote from skill:', error);
    return null;
  }
};



export { insertSkill, fetchSkills, fetchSkillById };