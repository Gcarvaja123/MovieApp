import {create} from 'zustand'




export const useFilter = create((set) => ({
    istoprated : true,
    ispopular : false,/* 
    popularity : "desc", */
    genres: [],
    filters : {
        popularity : "desc",
        genres : [],
        valoration : [0,10],
        date1 : "",
        date2 :""
    }
    ,

    addFilters : (pop, gen, val, d1, d2) => set((state) =>({
        filters : {
            popularity :pop,
            genres:gen,
            valoration:val,
            date1 : d1,
            date2 : d2
        }
    })),
    addGenre: (idgenre) => set((state) => ({
        genres : [...state.genres, idgenre]
    })),

    removeGenre : (idgenre) => set((state) =>({
        genres : state.genres.filter(e => e != idgenre)
    })),
    changePopularity : () => set((state) => ({
        popularity : state.popularity == "desc" ? "asc" : "desc" 
    }))
}))