const fs = require('fs');  

// fs.readFile('1.txt', 'utf-8', (err, data) => { //асинхронная операция
//     //console.log(data);
// })

const path = 'task/1';
const number = 2;

console.log(selectCases(path, number));

function selectCases(pathToTheFile, numberOfLines)
{
    let readedText = fs.readFileSync(pathToTheFile + ".txt", 'utf-8');
    let textForOriginal = new String();
    let textForNewFile = new String();
    let textValue = new String();

    textForOriginal = textForNewFile = getFirstLine(readedText);
    textValue = deleteFirstLine(readedText);

    for(let i=0; i<numberOfLines; i++)
    {
        textForNewFile += getFirstLine(textValue);
        textValue = deleteFirstLine(textValue);
    }

    textForOriginal += textValue;

    let newFilePath = path + "_res";
    writeFileWithPathAndText(path, textForOriginal);
    writeFileWithPathAndText(newFilePath, textForNewFile);

    return newFilePath + ".txt";
}

function getFirstLine(text)
{
    for ( i=0; i<text.length; i++)
    {
        if(text[i] === '\n') 
        {
            textFirstLine = text.slice(0,i+1)
            break
        }
    }
    return textFirstLine;
}

function deleteFirstLine(text)
{
    textWithoutFirstLine = text.replace(getFirstLine(text),"")
    return textWithoutFirstLine;
}

function writeFileWithPathAndText(path, text)
{
    fs.writeFile(path +".txt",text, (err) => {
        if(err) console.log(err);
    })
}
