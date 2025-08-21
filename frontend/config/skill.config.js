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
        const { data: skills, error: skillsError } = await supabase
            .from('skills')
            .select('*');
    
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

//vote for a skill


export { insertSkill, fetchSkills, fetchSkillById };