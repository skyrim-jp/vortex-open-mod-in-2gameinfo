import { selectors, util } from "vortex-api";
import { IExtensionContext, IMod, IState } from "vortex-api/lib/types/api";

function main(context: IExtensionContext) {
  context.registerAction(
    "mods-action-icons",
    1000,
    "link",
    {},
    "2game.info で開く",
    (instanceIds) => {
      const state: IState = context.api.store.getState();
      const gameMode = selectors.activeGameId(state);
      const subdomain = getSubDomain(gameMode);
      const mod: IMod = util.getSafe(
        state.persistent.mods,
        [gameMode, instanceIds[0]],
        undefined
      );
      if (mod !== undefined) {
        const modId: string = mod.attributes.modId;
        const url = `https://${subdomain}.2game.info/detail.php?id=${modId}`;
        util.opn(url);
      }
    },
    (_) => {
      const state = context.api.store.getState();
      const gameId = selectors.activeGameId(state);
      const modDbId = getSubDomain(gameId);
      return modDbId !== undefined;
    }
  );
  return true;
}

function getSubDomain(gameMode: string): string | undefined {
  switch (gameMode) {
    case "cyberpunk2077":
      return "cyberpunk2077";
    case "fallout4":
      return "fallout4";
    case "fallout76":
      return "fallout76";
    case "mountandblade2bannerlord":
      return "mountandblade2bannerlord";
    case "rimworld":
      return "rimworld";
    case "skyrim":
      return "skyrim";
    case "skyrimse":
      return "skyrimspecialedition";
    case "starfield":
      return "starfield";
    default:
      return undefined;
  }
}

module.exports = {
  default: main,
};
