import { IMemberAttributes } from "../interfaces/models/user";
import * as profileRepo from "../repositories/profile";
// getprofile
export const getProfile = async (payload: IMemberAttributes) => {
  return await profileRepo.getProfile(payload);
};

// editProfile;
export const editProfile = async (
  id: number,
  payload: Partial<IMemberAttributes>
) => {
  delete payload?.id;
  delete payload?.password;
  return await profileRepo.editProfile(id, payload);
};
