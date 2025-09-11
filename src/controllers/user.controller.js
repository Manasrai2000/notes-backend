// Controller for handling user profile operations
const profileModel = require('../models/profile.model');

/**
 * Get the profile of the authenticated user
 */
async function getProfile(req, res) {
  try {
    const profile = await profileModel.getProfileById(req.user);
    if (!profile) return res.status(404).json({ message: 'User not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Update the profile of the authenticated user
 */
async function updateProfile(req, res) {
  const { name, email } = req.body;
  try {
    const changes = await profileModel.updateProfileById(req.user, name, email);
    if (changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export controller functions
module.exports = { getProfile, updateProfile };