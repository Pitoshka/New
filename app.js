// 2) Разработать консольное приложение "Разность массивов":
//Имеется два массива: {"Alex", "Dima", "Kate", "Galina", "Ivan"} и {"Dima", "Ivan", "Kate"}. 
//Необходимо получить результирующий массив, который будет равен первому массиву с исключёнными значениями из второго массива.
//Выполнить задание следует двумя способами:
//1) Реализовать оптимальный вариант выполненного задания без использования коллекций (При выполнении задания на Python: реализовать работу 
//с коллекцией через индексы: Статья - Python коллекции (RUS))
//2) Реализовать оптимальный вариант с использованием коллекций

let arr1 = ["Alex", "Dima", "Kate", "Galina", "Ivan", "Nikita"];
let arr2 = ["Dima", "Ivan", "Kate","Nikita"];

//1
let difference = arr1.filter(x => !arr2.includes(x));
console.log(difference);
 
//2
const diffArray = (arr1, arr2) => { //indexOf return -1 if value not exist
    const newArr = [];
    for (let key of arr1) {
        if (arr2.indexOf(key) === -1) {
            newArr[newArr.length] = key;
        }
    }
    return newArr;
}
console.log(diffArray(arr1,arr2));
 

//3 
let collection1 = new Set(arr1);
let collection2 = new Set(arr2);
collection1.forEach( (value) => {
    if(collection2.has(value))
    {
        collection1.delete(value);
    }
})
console.log(collection1);
collection1.clear();
collection2.clear();



