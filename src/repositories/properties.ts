import { Models } from "../models/index";
import { IUserRegister } from "../interfaces/auth";
import {
  IPropertyCreate,
  IPropertyUpdate,
  IPropertyGet,
} from "../interfaces/property";
import { IPropertyAttributes } from "../interfaces/models/properties";

const Property = Models.property;
// create property
export const createProperty = async (data: IPropertyAttributes) => {
  const property = Property.create(data);
  return property;
};

// get all properties
export const getAllProperties = async (payload: IPropertyGet) => {
  const where = {
    memberId: payload.memberId,
  };
  return Property.findAll({
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
