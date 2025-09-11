const profileModel = require('../models/profile.model');

/**
 * Get the profile of the authenticated user
 */
async function getProfile(req, res) {
  try {
    const profile = await profileModel.getProfileById(req.userId);
    if (!profile) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error("Get Profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Update the profile of the authenticated user
 */
async function updateProfile(req, res) {
  const { name, email } = req.body;
  try {
    const { changes } = await profileModel.updateProfileById(req.userId, name, email);
    if (changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error("Update Profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getProfile, updateProfile };