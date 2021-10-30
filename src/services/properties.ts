import {
  IPropertyCreate,
  IPropertyUpdate,
  IPropertyGet,
} from "../interfaces/property";
import { propertyCreationMapper } from "../helpers/property-mapper";
import * as propertyRepo from "../repositories/properties";
import { IPropertyAttributes } from "../interfaces/models/properties";

// arrow function create with return type of promise
export const create = async (payload: IPropertyCreate) => {
  const formatedPayload = propertyCreationMapper(payload);
  return await propertyRepo.createProperty(formatedPayload);
  //   return formatedPayload;
};

// getALLproperties;
export const getAll = async (payload: IPropertyGet) => {
  return await propertyRepo.getAllProperties(payload);
};

// update

export const update = async (payload: IPropertyUpdate) => {
  // handle validation
  const popertyId = payload.propertyId;
  delete payload.propertyId;
  return await propertyRepo.updateProperty(popertyId!, payload);
};

// getById;
export const getById = async (id: number) => {
  return await propertyRepo.getPropertyById(id);
};
