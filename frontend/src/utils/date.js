const STARTING_YEAR = '2022'

export function allYears (){
    const date = new Date()
    let year = date.getFullYear()
    const totalYears = (year - STARTING_YEAR) + 1
    const years = []
    for(let i=0;i<totalYears;i++){
        years.push(year)
        year--
    }
    return years
}

export function getFormattedDate (date) {
    const d = new Date(date)
    const month= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${d.getDate()} de ${month[d.getMonth()]} de ${d.getFullYear()}`
}

export function getCurrentMonthDate (){
    const now = new Date()
    const date = {
        month : now.getMonth()+1,
        year : now.getFullYear(),
    }
   return `${date.year}-${date.month}-01`
}

export function getCurrentDate (){
    const now = new Date()
    return {
        month : now.getMonth()+1,
        year : now.getFullYear(),
    }
}

// export function getDates (){
//     const now = new Date()
//     const month = now.getMonth()+1
//     const year = now.getFullYear()
//     const lastDay = (new Date (year,month,0)).getDate
//     return {
//         startingDate : {
//             day : 1,
//             month : month,
//             year : year
//         },
//         endingDate : {
//             day : lastDay,
//             month : month,
//             year : year
//         }
//     }
// }

export function getDates (month, year){
    const date = new Date(year,month,0)
    // return {
    //     startingDate : {
    //         day : 1,
    //         month : date.getMonth()+1,
    //         year : date.getFullYear()
    //     },
    //     endingDate : {
    //         day : date.getDate(),
    //         month : date.getMonth()+1,
    //         year : date.getFullYear()
    //     }
    // }
    return {
        startingDate : `${date.getFullYear()}-${date.getMonth()+1}-01` ,
        endingDate : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
}