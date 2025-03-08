import {atom, selector} from 'recoil'
export const loggedInUser = atom({
    key : 'loggedInUser',
    default : selector({
        key : 'loggedInUserSelector',
        get : ({}) => {
            const user = JSON.parse(localStorage.getItem('user') as string)
            if(!user)
                return {}
            else
                return user
        }
    })
})



export const searchAtom = atom({
    key : 'searchAtom',
    default: ''
})