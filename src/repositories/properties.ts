import { Models } from "../models/index";
import { IUserRegister } from "../interfaces/auth";
import {
  IPropertyCreate,
  IPropertyUpdate,
  IPropertyGet,
} from "../interfaces/property";
import { IPropertyAttributes } from "../interfaces/models/properties";

const Property = Models.property;
const User = Models.user;
// create property
export const createProperty = async (data: IPropertyAttributes) => {
  const propertyCount = await Property.count({
    where: { memberId: data.memberId },
  });
  // check if user is subscribed
  const UserSubscription = await User.findOne({
    attributes: ["subscribed"],
    where: { id: data.memberId },
  }).then((userSubscription) => !!userSubscription?.dataValues.subscribed);

  if (!UserSubscription && propertyCount >= 3) {
    throw new Error("You can only have 3 properties");
  }
  const property = Property.create(data);
  return property;
};

// get all properties
export const getAllProperties = async (payload: IPropertyGet) => {
  const where = {
    memberId: payload.memberId,
  };
  return Property.findAndCountAll({
    where,
    order: [payload.sortBy],
  });
};

// get property by id
export const getPropertyById = async (id: number) => {
  const property = await Property.findById(id);
  return property;
};

// update property
export const updateProperty = async (
  propertyId: number,
  data: IPropertyUpdate
) => {
  const property = await Property.update(data, {
    where: { propertyId },
  });
  return property;
};
