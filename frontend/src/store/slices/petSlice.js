import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pets: [],
    error: null,
    loading: false
}


const petSlice = createSlice({
    name: "pets",
    initialState,

    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload
        },

        addPet: (state, action) => {
            state.pets.push(action.payload)
        },

        updatePets: (state, action) => {
            const updatedPet = action.payload

            const index = state.pets.findIndex((pet) => pet.id === updatedPet.id)

            if (index !== -1) {
                state.pets[index] = updatedPet
            }
        },

        removePets: (state, action) => {
            state.pets = state.pets.filter(pet => pet.id !== action.payload)
        },


        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        }
    },
})


export const {
    setPets,
    addPet,
    updatePets,
    removePets,
    setLoading,
    setError
} = petSlice.actions

export default petSlice.reducer