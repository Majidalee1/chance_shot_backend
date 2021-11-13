import { IMemberAttributes } from "../interfaces/models/user";
import * as profileRepo from "../repositories/profile";
import { setEmptyToNull } from "../helpers/auth";
import { hashSync } from "bcryptjs";
// getprofile
export const getProfile = async (payload: IMemberAttributes) => {
  return await profileRepo.getProfile(payload);
};

// editProfile;
export const editProfile = async (
  id: number,
  payload: Partial<IMemberAttributes>
) => {
  payload = setEmptyToNull(payload);
  delete payload?.id;
  payload.password &&= await hashSync(payload.password, 10);

  return await profileRepo.editProfile(id, payload);
};
