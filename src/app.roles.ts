import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  UserAdmin = "ADMIN",
  UserAgent = "AGENT",
  UserBanca = "BANCA",
}

export enum AppResource {
  USER = "USER",
  AGENT = "AGENT",
  SUBAGENT = "SUBAGENT",
  NOTIFICATION = "NOTIFICATION",
  PROVISORIO = "PROVISORIO",
  ADDRESS = "ADDRESS",
  EXPEDIENT = "EXPEDIENT",
}

export const roles: RolesBuilder = new RolesBuilder();

roles

  //*********************************************************************************** */
  //UserBanca
  //*********************************************************************************** */
  .grant(AppRoles.UserBanca)

  .createAny(AppResource.ADDRESS)
  .createAny(AppResource.AGENT)
  .createAny(AppResource.EXPEDIENT)
  .createAny(AppResource.NOTIFICATION)
  .createAny(AppResource.PROVISORIO)
  .createAny(AppResource.SUBAGENT)

  .updateAny(AppResource.ADDRESS)
  .updateAny(AppResource.AGENT)
  .updateAny(AppResource.EXPEDIENT)
  .updateAny(AppResource.NOTIFICATION)
  .updateAny(AppResource.PROVISORIO)
  .updateAny(AppResource.SUBAGENT)
  .updateOwn([AppResource.USER]) /*Solo su usuario*/

  .deleteAny(AppResource.AGENT)
  .deleteAny(AppResource.NOTIFICATION)

  //*********************************************************************************** */
  //UserAdmin
  //*********************************************************************************** */
  .grant(AppRoles.UserAdmin)

  .extend(AppRoles.UserBanca) //Todos los mismo que tiene el usuario de la banca
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER])
  .deleteAny([AppResource.USER])

  //*********************************************************************************** */
  //UserAgent (Solo OWN , acciones sobre sus propios recursos)
  //*********************************************************************************** */
  .grant(AppRoles.UserAgent)

  .createOwn(AppResource.ADDRESS)
  .createOwn(AppResource.AGENT)
  .createOwn(AppResource.EXPEDIENT)
  .createOwn(AppResource.NOTIFICATION)
  .createOwn(AppResource.PROVISORIO)
  .createOwn(AppResource.SUBAGENT)

  .updateOwn(AppResource.ADDRESS)
  .updateOwn(AppResource.AGENT)
  .updateOwn(AppResource.EXPEDIENT)
  .updateOwn(AppResource.NOTIFICATION)
  .updateOwn(AppResource.PROVISORIO)
  .updateOwn(AppResource.SUBAGENT);

//Any : podra impactar cualquier usuario.
//Own : acciones sobresu propios recursos.
