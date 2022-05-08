// creteDraw

import Joi = require("joi");
// create validation schema for draw from IDrawAttributes
export const createDrawSchema = Joi.object()
  .keys({
    name: Joi.string().required().label("Name"),
    drawCode: Joi.string().required().label("Draw Code"),
    typeId: Joi.number().required().label("Type Id"),
    totalTickets: Joi.number().required().label("Total Tickets"),
    ticketsAvaliable: Joi.number().required().label("Tickets Avaliable"),
    drawInfo: Joi.object()
      .keys({
        city: Joi.string().required().label("City"),
        country: Joi.string().required().label("Country"),
        address: Joi.string().required().label("Address"),
        area: Joi.string().required().label("Area"),
        noOfBedrooms: Joi.number().optional().label("No Of Bedrooms"),
        description: Joi.string().optional().label("Description"),
        videoUrls: Joi.array().optional().label("Video Urls"),
        imagesUrls: Joi.array().optional().label("Images Urls"),
        longitude: Joi.number().optional().label("Longitude"),
        latitude: Joi.number().optional().label("Latitude"),
      })
      .label("Draw Info"),
    status: Joi.string().required().label("Status"),
    winnerEntryId: Joi.string().optional().label("Winner Entry Id"),
  })
  .unknown(false);

// edit drawSchema
export const updateDrawSchema = Joi.object().keys({
  name: Joi.string().optional().label("Name"),
  typeId: Joi.number().optional().label("Type Id"),
  totalTickets: Joi.number().optional().label("Total Tickets"),
  status: Joi.string().optional().label("Status"),
  drawInfo: Joi.object()
    .keys({
      city: Joi.string().optional().label("City"),
      country: Joi.string().optional().label("Country"),
      address: Joi.string().optional().label("Address"),
      area: Joi.string().optional().label("Area"),
      noOfBedrooms: Joi.number().optional().label("No Of Bedrooms"),
      description: Joi.string().optional().label("Description"),
      videoUrls: Joi.array().optional().label("Video Urls"),
      imagesUrls: Joi.array().optional().label("Images Urls"),
      longitude: Joi.number().optional().label("Longitude"),
      latitude: Joi.number().optional().label("Latitude"),
    })
    .label("Draw Info"),
  winnerEntryId: Joi.string()
    .optional()
    .label("Winner Entry Id")
    .allow(null, ""),
});
