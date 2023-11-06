import {registerModel} from "./Models.tsx";

export const defaultUser = (value : registerModel) => {
    return {
        ...value,
        role : [
            {
                id :'64eca78f56f5b814c66000cc'
            }
        ],

    }
}