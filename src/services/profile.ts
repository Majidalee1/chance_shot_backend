import { hashSync } from "bcryptjs";
import { setEmptyToNull } from "../helpers/auth";
import { IUserAttributes } from "../interfaces/models/user";
import * as profileRepo from "../repositories/profile";
// getprofile
export const getProfile = async (payload: IUserAttributes) => {
  return await profileRepo.getProfile(payload);
};

// editProfile;
export const editProfile = async (
  id: string,
  payload: Partial<IUserAttributes>
) => {
  payload = setEmptyToNull(payload);
  delete payload?.id;
  payload.password &&= await hashSync(payload.password, 10);

  return await profileRepo.editProfile(id, payload);
};

export const getUsersByAdmin = async () => await profileRepo.getUsersByAdmin();
