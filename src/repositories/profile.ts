import { IUserAttributes } from "../interfaces/models/user";
import { Models } from "../models/index";
// getProfile

const Member = Models.user;

export const getProfile = async (payload: IUserAttributes) => {
  return Member.findById(payload.id);
};

// editProfilebyId
export const editProfile = async (
  id: string,
  payload: Partial<IUserAttributes>
) => {
  return Member.update(payload, { where: { id } });
};

export const getUsersByAdmin = async () =>
  await Member.findAll({
    include: [
      {
        model: Models.userRole,
        as: "userRole",
        required: true,
        where: {
          role: "user",
        },
      },
    ],
  });
