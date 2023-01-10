export const columns = [
    {
        name: "Prénom",
        width: "15%",
        cell: row => row.firstname
    },
    {
        name: "Nom",
        width: "15%",
        cell: row => row.lastname
    },
]