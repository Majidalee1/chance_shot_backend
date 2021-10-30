import { IMemberAttributes } from "../interfaces/models/user";
import { Models } from "../models/index";
// getProfile

const Member = Models.user;

export const getProfile = async (payload: IMemberAttributes) => {
  return Member.findById(payload.id);
};

// editProfilebyId
export const editProfile = async (
  id: number,
  payload: Partial<IMemberAttributes>
) => {
  return Member.update(payload, { where: { id } });
};
