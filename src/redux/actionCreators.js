export const GET_KITTY = "GET_KITTY";
export function getKitty(kitty){
  return{
    type: GET_KITTY,
    kitty
  }
}
