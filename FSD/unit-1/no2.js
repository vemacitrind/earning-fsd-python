// Write a JS to store an array of objects having height and name. Display names by sorting an array according to height.

people = [
    {
        name : "JOSHI VEDANT K.",
        height : 182.88
    },
    {
        name : "TIMANIYA NISHANT P.",
        height : 170
    },
    {
        name : "RAVAL RAHUL V.",
        height : 180
    }
]

sorted_people = people.sort((a,b)=> a.height - b.height ) //accesding order
console.log(sorted_people);
